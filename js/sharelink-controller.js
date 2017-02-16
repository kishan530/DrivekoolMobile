var BookIt = BookIt || {};
BookIt.ShareLinkController = function () {
	this.shareLinkPage = null;
    this.$btnSubmit = null;
    this.$txtMobile = null;
    this.$txtShareService = null;
    this.$ctnErr = null;
    this.shareSucceededPage = null;
};
BookIt.ShareLinkController.prototype.init = function () {
    this.mainMenuPageId = "#page-main-menu";
    this.shareLinkPage = "#page-share-link";
    this.shareSucceededPage = "#page-share-succeeded";
    this.$btnSubmit = $("#btn-share", this.$shareLinkPage);
    this.$ctnErr = $("#shr-err", this.$shareLinkPage);
    this.$txtMobile = $("#txt-share-mobile", this.$shareLinkPage);
    this.$txtShareService = $("#txt-share-service", this.$shareLinkPage);
};
BookIt.ShareLinkController.prototype.mobileIsValid = function (mobile) {
    var re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return re.test(mobile);
};
BookIt.ShareLinkController.prototype.resetShareLinkForm = function () {
    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";
    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtMobile.removeClass(invalidInputStyle);
    this.$txtMobile.val("");
};
BookIt.ShareLinkController.prototype.onShareLinkCommand = function (employee) {
    var me = this,
        mobile = me.$txtMobile.val().trim(),
        service = me.$txtShareService.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";
    
    var employeeId = employee.userProfileModel.id;
    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtMobile.removeClass(invalidInputStyle);
    // Flag each invalid field.
    if (mobile.length === 0) {
        me.$txtMobile.addClass(invalidInputStyle);
        invalidInput = true;
    }
    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    if (!me.mobileIsValid(mobile)) {
        me.$ctnErr.html("<p>Please enter a valid mobile Number.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        me.$txtMobile.addClass(invalidInputStyle);
        return;
    }
    $.mobile.loading("show");
    $.ajax({
        type: 'POST',
        url: BookIt.Settings.shareLinkUrl,
        data: "mobile=" + mobile + "&service=" + service +"&employee="+employeeId,
        success: function (resp) {
            $.mobile.loading("hide");
            var resp = JSON.parse(resp);
            if (resp.success === true) { 
                // Go to success page.
                $.mobile.navigate(me.shareSucceededPage);
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
