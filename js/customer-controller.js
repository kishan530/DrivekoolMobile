var BookIt = BookIt || {};
BookIt.CustomerController = function () {
	this.shareLinkPage = null;
    this.$ctnErr = null;
    this.shareSucceededPage = null;
    this.customerListPage = null;
    this.customerList = null;
};
BookIt.CustomerController.prototype.init = function () {
    this.customerListPage = "#page-customer-list";
    this.shareLinkPage = "#page-share-link";
    this.customerList = $("#customerList");
    this.$ctnErr = $("#csr-err", this.$customerListPage);
};
BookIt.CustomerController.prototype.onCustomerListCommand = function (employee) {
    var me = this,
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";
    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    $.mobile.loading("show");
    $.ajax({
        type: 'GET',
        url: BookIt.Settings.employeeCustomersUrl,
        data: "employee=" + employee,
        success: function (resp) {
            $.mobile.loading("hide");
            var resp = JSON.parse(resp);
            if (resp.success === true) { 
                // Go to success page.
            	var data = resp.extras.list;
            	$.each(data, function(i,item){            		           		
            		var doc = "<li><a href='customer-documents.html?customer="+item.id+"' class='ui-btn ui-btn-icon-left ui-icon-check'>"+item.name+"</a></li>";                    
                    me.customerList.append(doc);
                });
            	me.customerList.listview('refresh');
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case BookIt.ApiMessages.DB_ERROR:
                        // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Oops! we had a problem and could not log you on.  Please try again in a few minutes.</p>");
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
            me.$ctnErr.html("<p>Oops! we had a problem and could not log you on.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};
