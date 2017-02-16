var BookIt = BookIt || {};

// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
    	//alert('deviceready');
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

app.signupController = new BookIt.SignUpController();
app.signinController = new BookIt.SignInController();
app.shareLinkController = new BookIt.ShareLinkController();
app.DocumentController = new BookIt.DocumentController();
app.CustomerController = new BookIt.CustomerController();
app.Session = BookIt.Session.getInstance();
app.uploadDocumentsUrl = BookIt.Settings.uploadDocumentsUrl;


//$(document).delegate("#page-signup", "pagebeforeshow", function () {
//    // Reset the signup form.
//    app.signupController.resetSignUpForm();
//});

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
	        case "page-index":	            
		       	 var employee = app.Session.get();
		       	 var userProfileModel = employee.userProfileModel;
		       	 if(userProfileModel){
		       	 var userType = userProfileModel.type;
		       	 var userId = userProfileModel.id;
		       	   if(userType=='school')
		                   $.mobile.navigate('#page-main-menu');
		                else                	
		                   $.mobile.changePage(me.documentsPage, { dataUrl : 'customer-documents.html?customer='+userId, data : { 'customer' : userId }, reloadPage : true, changeHash : true});
		       	 }
		       	 break;
            case "page-signup":
                
            	 var employee = app.Session.get();
            	 var userProfileModel = employee.userProfileModel;
            	 if(userProfileModel){
            	 var userType = userProfileModel.type;
            	 var userId = userProfileModel.id;
            	   if(userType=='school')
                        $.mobile.navigate('#page-main-menu');
                     else                	
                        $.mobile.changePage(me.documentsPage, { dataUrl : 'customer-documents.html?customer='+userId, data : { 'customer' : userId }, reloadPage : true, changeHash : true});
            	 }
            	// Reset the signup form.
                app.signupController.resetSignUpForm();
                break;
            case "page-signin":
            	 var employee = app.Session.get();
	           	 var userProfileModel = employee.userProfileModel;
	           	 if(userProfileModel){
	           	 var userType = userProfileModel.type;
	           	 var userId = userProfileModel.id;
	           	   if(userType=='school')
	                       $.mobile.navigate('#page-main-menu');
	                    else                	
	                       $.mobile.changePage(me.documentsPage, { dataUrl : 'customer-documents.html?customer='+userId, data : { 'customer' : userId }, reloadPage : true, changeHash : true});
	           	 }
                // Reset the signin form.
                app.signinController.resetSignInForm();
                break;
            case "page-share-link":
                // Reset the share-link form.
                app.shareLinkController.resetShareLinkForm();
                break;
        }
    }
});
$(document).on('pagebeforeshow', "#page-main-menu",function () {
    $(document).on('click', "#customerListBtn",function () {
    var employee = app.Session.get();
    var employeeId = employee.userProfileModel.id;
        $.mobile.changePage('customer-list.html', { dataUrl : "customer-list.html?employee="+employeeId, data : { 'employee' : employeeId }, reloadPage : false, changeHash : true });
    }); 
}); 
$(document).on('pagebeforecreate', "#page-customer-list", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
    parameter = parameters.replace("employee=","");
    app.CustomerController.init();
    
    app.CustomerController.onCustomerListCommand(parameter);
});

$(document).on('pagebeforeshow', "#page-customer-documents", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
    parameter = parameters.replace("customer=","");
    
    app.DocumentController.init();
    
    app.DocumentController.loadCustomerDocuments(parameter);
});

$(document).on('pagebeforeshow', "#page-upload-document", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
    var parameters = parameters.split("&");
    parameter = parameters[0].replace("document=","");
    source = parameters[1].replace("source=","");
    
    
    app.DocumentController.init();
    
    app.DocumentController.uploadDocuments(parameter,source);
});

$(document).on('pagebeforeshow', "#page-view-document", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
    var parameters = parameters.split("&");
    source = parameters[0].replace("source=","");
    type = parameters[1].replace("type=","");
    
    if(type=='share')
    	window.plugins.socialsharing.share(null, null,source, null);
    
    app.DocumentController.init();
   // alert(parameter);
    
    app.DocumentController.viewDocument(source);
});

$(document).delegate("#page-signup", "pagebeforecreate", function () {

    app.signupController.init();

    app.signupController.$btnSubmit.off("tap").on("tap", function () {
        app.signupController.onSignupCommand();
    });

});
$(document).delegate("#page-signin", "pagebeforecreate", function () {

    app.signinController.init();

    app.signinController.$btnSubmit.off("tap").on("tap", function () {
        app.signinController.onSignInCommand();
    });

});
$(document).delegate("#page-share-link", "pagebeforecreate", function () {

    app.shareLinkController.init();
    
    app.shareLinkController.$btnSubmit.off("tap").on("tap", function () {
    	var employee = app.Session.get();
        app.shareLinkController.onShareLinkCommand(employee);
    });

});