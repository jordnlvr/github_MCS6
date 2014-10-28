
(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    // create an object to store the models for each view
    window.APP = {
      models: {
        home: {
          title: 'Home'
        },
        settings: {
          title: 'Settings'
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    };


    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {  
      
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
        navigator.splashscreen.hide();

        window.analytics.Start();
        window.analytics.Monitor();
        feedback.initialize('ad9606a0-3a2c-11e4-8eba-e11ea7f27fc0');

        //var el = new Everlive('rZCduBbNvcl0cB8N');
        //el.push.currentDevice().enableNotifications(pushSettings, successCallback, errorCallback);
        //el.push.currentDevice().register(customParameters, successCallback, errorCallback);


      app = new kendo.mobile.Application(document.body, {
        
        // comment out the following line to get a UI which matches the look
        // and feel of the operating system
        //skin: 'flat',

        // the application needs to know which view to load first
        initial: 'views/home.html'
      });

    }, false);

    document.addEventListener('pause', function () {
        window.analytics.Stop();
    });

    document.addEventListener('resume', function () {
        window.analytics.Start();
    });

}());

(function (g) {

    var productId = "923cdee8e93f46039014244c48bf5fcf"; // App unique product key

    function log(msg) {
        var height = 0;

        //$console.append("<p style='color: white;'>" + msg + "</p>");
        //$console.children().each(function () {
        //    height = height + $(this).outerHeight();
        //});
        //$console.scrollTop(height);
    }

    // Make analytics available via the window.analytics variable
    // Start analytics by calling window.analytics.Start()
    var analytics = g.analytics = g.analytics || {};
    analytics.Start = function () {
        // Handy shortcuts to the analytics api
        var factory = window.plugins.EqatecAnalytics.Factory;
        var monitor = window.plugins.EqatecAnalytics.Monitor;

        // Create the monitor instance using the unique product key for platform-friends-hybrid
        //var productId = appSettings.eqatec.productKey;
        var version = appSettings.eqatec.version || '1.0.0.2';


        // Create the monitor instance using the unique product key for CS Analytics
        var settings = factory.CreateSettings(productId, version);
        settings.LoggingInterface = factory.CreateTraceLogger();
        factory.CreateMonitorWithSettings(settings,
          function () {
              console.log("Monitor created");
              log("Monitor Created");
              // Start the monitor inside the success-callback
              monitor.Start(function () {
                  console.log("Monitor started");
                  log("Monitor Started");
              });
          },
          function (msg) {
              console.log("Error creating monitor: " + msg);
              log("Error Creating this Stupid Monitor: " + msg);
          });
    }
    analytics.Stop = function () {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.Stop();
    }
    analytics.Monitor = function () {
        return window.plugins.EqatecAnalytics.Monitor;
    }

    function trackException(monitor) {
        try {
            throw new Error("Test.ErrorMessage");
        }
        catch (e) {
            /**
             * Track an exception with a context message. Delivers the exception
             * information to the server as soon as possible.
             * 
             * @param exception the exception
             * @param message the message
             */
            monitor.TrackExceptionMessage(e, e.message);
        }
    }

})(window);




    function enablePushNotifications() {

    var el = new Everlive('rZCduBbNvcl0cB8N');
    var currentDevice = el.push.currentDevice();
};