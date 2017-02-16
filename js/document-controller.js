var BookIt = BookIt || {};
BookIt.DocumentController = function () {
	this.customerDocumentsPage = null;
	this.documentUploadPage = null;
	this.viewUploadPage = null;
	this.documentList = null;
	this.$ctnErr = null;
	this.$upErr = null;
	this.$viewDoc = null;
   /* this.$btnSubmit = null;
    this.$txtMobile = null;
    this.$txtShareService = null;
   
    this.shareSucceededPage = null;*/
};
BookIt.DocumentController.prototype.init = function () {
    this.mainMenuPageId = "#page-main-menu";
    this.customerDocumentsPage = "#page-customer-documents";
    this.documentUploadPage = "#page-upload-document";
    this.viewUploadPage = "#page-view-document";
    this.documentList = $("#documentList");
    this.$ctnErr = $("#doc-err", this.$customerDocumentsPage);
    this.$upErr = $("#up-err", this.$documentUploadPage);
    this.$viewDoc = $("#view-doc", this.$viewUploadPage);
    /*this.shareSucceededPage = "#page-share-succeeded";
    this.$btnSubmit = $("#btn-share", this.$shareLinkPage);
    
    this.$txtMobile = $("#txt-share-mobile", this.$shareLinkPage);
    this.$txtShareService = $("#txt-share-service", this.$shareLinkPage);*/
};
BookIt.DocumentController.prototype.loadCustomerDocuments = function (customer) {
    var me = this,
    invalidInput = false,
    invisibleStyle = "bi-invisible",
    invalidInputStyle = "bi-invalid-input";
    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$ctnErr.html('');
   // alert(customer);
    $.mobile.loading("show");
    $.ajax({
        type: 'GET',
        url: BookIt.Settings.customerDocumentsUrl,
        data: "customer=" + customer,
        success: function (resp) {
            $.mobile.loading("hide");
            var resp = JSON.parse(resp);
            if (resp.success === true) { 
                // Go to success page.
            	var data = resp.extras.docs;
            	$.each(data, function(i,item){
            		
            		var filename = item.fileName;
            		var status = 'pending';
            		if(filename)
            			status = 'uploaded';
            		
            		/*var doc = '<tr>';
            		 doc += '<td>'+item.name+'</td>';
            		 doc += '<td>'+status+'</td>'
                     doc += '<td><a href="#" class="ui-btn ui-corner-all ui-icon-arrow-u ui-btn-icon-notext">Upload</a></td>';
            		 if(filename)
            			 doc += '<td><a href="#" class="ui-btn ui-corner-all ui-icon-arrow-d ui-btn-icon-notext">download</a></td>';
            		 else
            			 doc += '<td></td>';
                     doc += '</tr>';*/
                     
                    //var doc = '<li>'+item.name+'<a href="" class="ui-btn ui-icon-arrow-u ui-btn-icon-right ui-btn-icon-notext">upload</a></li>';
                    
                    var doc = "<li class='ui-li-has-alt'>";
                   // doc += '<div>';
                    if(filename)
                    	doc += "<a href='view-document.html?source="+filename+"&type=view' class='ui-btn ui-btn-icon-left ui-icon-check'>"+item.name+"</a>";
                    else
                    	doc += "<a href='#' class='ui-btn ui-btn-icon-left ui-icon-cross'>"+item.name+"</a>";
                   // doc += "</div>";
                   // doc += "<div data-role='controlgroup' data-type='horizontal' >";
                    doc += "<a href='upload-documents.html?document="+item.id+"&source=photolibrary' class='ui-btn last ui-btn-icon-notext ui-icon-arrow-u' title='Upload'></a>";
                    doc += "<a href='upload-documents.html?document="+item.id+"&source=camera' class='ui-btn first ui-btn-icon-notext ui-icon-camera' title='camera'></a>";
                    doc += "<a href='view-document.html?source="+filename+"&type=share' class='ui-btn ui-btn-icon-notext ui-icon-forward' title='camera'></button>";
                    
                   // doc += "<a href='javascript:window.plugins.socialsharing.share(null, null,"+filename+", null)' data-icon='forward' data-inline='true' data-iconpos='notext' title='share'></a>";
                    //doc += "</div>";
                    doc += "</li>";
                    

                    me.documentList.append(doc);
                });
            	me.documentList.listview('refresh');
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case BookIt.ApiMessages.DB_ERROR:
                        // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Oops! we had a problem and could not get documents.  Please try again in a few minutes.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                    }
                }
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! we had a problem and could not get documents.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });   
};

BookIt.DocumentController.prototype.uploadDocuments = function (id,source) {
    var me = this,
    invalidInput = false,
    invisibleStyle = "bi-invisible",
    invalidInputStyle = "bi-invalid-input";
    // Reset styles.
    me.$upErr.removeClass().addClass(invisibleStyle);
    me.$upErr.html('');
    
    if(source=='camera')
    {
    	navigator.camera.getPicture(uploadPhoto,
    		uploadFail,
            { quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.CAMERA }
            );
    }else{
    	navigator.camera.getPicture(uploadPhoto,
        		uploadFail,
                { quality: 50, 
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                );
    }
    
    function uploadPhoto(imageURI) {
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.png';
        options.mimeType="text/plain";

        var params = new Object();

        options.params = params;

        var ft = new FileTransfer();
        var url = app.uploadDocumentsUrl+'?document='+id;
        ft.upload(imageURI, encodeURI(url), win, fail, options);
    }
    function uploadFail(message) {
    	//alert('get picture failed');
    	 me.$upErr.html("<p>Oops! we had a problem to upload documents.  Please try again in a few minutes.</p>");
         me.$upErr.addClass("bi-ctn-err").slideDown();
    }

    function win(r) {
       // console.log("Code = " + r.responseCode);
       // console.log("Response = " + r.response);
       // console.log("Sent = " + r.bytesSent);
        
        me.$upErr.html("<p>Your document uploaded successfully.</p>");
        me.$upErr.addClass("bi-ctn-err").slideDown();
    }

    function fail(error) {
        //alert("An error has occurred: Code = " + error.code);
       // console.log("upload error source " + error.source);
        //console.log("upload error target " + error.target);
        
        me.$upErr.html("<p>Oops! we had a problem to upload documents.  Please try again in a few minutes.</p>");
        me.$upErr.addClass("bi-ctn-err").slideDown();
    }
    
};
BookIt.DocumentController.prototype.viewDocument = function (source) {
	 var me = this,
	    invalidInput = false,
	    invisibleStyle = "bi-invisible",
	    invalidInputStyle = "bi-invalid-input";
	    // Reset styles.
	   // me.$upErr.removeClass().addClass(invisibleStyle);
	// alert(source);
	 
	 var width  = $(window).width();
	 var height = $(window).height();
	 
	 //var onInApp = window.open(source, '_blank', 'location=no,hidden=yes,closebuttoncaption=Done,toolbar=no');
	 me.$viewDoc.attr('src','');
	 me.$viewDoc.attr('width',width)
	//  me.$viewDoc.attr('height',height)
	  me.$viewDoc.attr('src',source);
	    
	  //  me.$viewDoc.src = source;
};