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

//app.DocumentController = new BookIt.DocumentController();
//app.CustomerController = new BookIt.CustomerController();



/*$(document).on('pagebeforeshow', "#page-upload-document", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
    parameter = parameters.replace("document=","");
    
    navigator.camera.getPicture(uploadPhoto,
            function(message) { alert('get picture failed'); },
            { quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
            );

    
    //app.DocumentController.init();
    
    //app.DocumentController.loadCustomerDocuments(parameter);
});*/
/*$(document).on('pagebeforeshow', "#page-view-document", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
    parameter = parameters.replace("url=","");
    
    app.DocumentController.init();
    
    app.DocumentController.viewDocument(parameter);
});
*/
/*$(document).on('pagebeforeshow', "#page-customer-documents", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
   // parameter = parameters.replace("customer=","");  
    alert(parameters);
}); */ 
/*$("#page-customer-documents").live("pageshow", function(e) {
	var query = window.location.search;
	//query = query.replace(“?id=”,“”); //query is now an ID, do stuff with it…
	alert(query);
	});*/

/*$(document).delegate("#page-customer-documents", "pagebeforecreate", function (event, data) {

	var parameters = $(this).data("url");
	 alert(parameters);
	 //alert(BookIt.customer);
    //app.DocumentController.init();
    
    //app.DocumentController.loadCustomerDocuments(59);

});*/
/*$(document).delegate("#page-customer-documents", "pagebeforecreate", function (event, data) {


 //alert(BookIt.customer);
//app.CustomerController.init();

//app.DocumentController.loadCustomerDocuments(59);

});*/

