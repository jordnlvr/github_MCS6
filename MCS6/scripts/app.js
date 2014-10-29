var app = (function (win) {
    'use strict';

    var analytics = win.analytics = win.analytics || {};

    analytics.isAnalytics = function () {
        return isKeySet("923cdee8e93f46039014244c48bf5fcf");
    };

    analytics.Start = function () {

        // Handy shortcuts to the analytics api
        var factory = win.plugins.EqatecAnalytics.Factory;
        var monitor = win.plugins.EqatecAnalytics.Monitor;

        // Create the monitor instance using the unique product key for platform-friends-hybrid
        var productId = "923cdee8e93f46039014244c48bf5fcf";
        var version = '1.0.0.6';
        //date of version: 10/28 2:17am

        var settings = factory.CreateSettings(productId, version);
        settings.LoggingInterface = factory.CreateTraceLogger();

        factory.CreateMonitorWithSettings(settings,
            function () {
                console.log('Monitor created');
                // Start the monitor inside the success-callback
                monitor.Start(function () {
                    console.log('Monitor started');
                });
            },
            function (msg) {
                console.log('Error creating monitor: ' + msg);
            });
    };

    analytics.Stop = function () {
        var monitor = win.plugins.EqatecAnalytics.Monitor;
        monitor.Stop();
    };

    analytics.TrackFeature = function (feature) {
        var monitor = win.plugins.EqatecAnalytics.Monitor;
        monitor.TrackFeature(feature);
    };

    analytics.Monitor = function () {
        return win.plugins.EqatecAnalytics.Monitor;
    };





    // Global error handling
    var showAlert = function (message, title, callback) {
        alert(message, callback || function () {
        }, title, 'OK');
    };

    var showError = function (message) {
        showAlert(message, 'Error occured');
    };

    win.addEventListener('error', function (e) {
        e.preventDefault();

        var message = e.message + "' from " + e.filename + ":" + e.lineno;

        showAlert(message, 'Error occured');

        return true;
    });

    // Global confirm dialog
    var showConfirm = function (message, title, callback) {
        navigator.notification.confirm(message, callback || function () {
        }, title, ['OK', 'Cancel']);
    };

    var isNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value === '';
    };

    var isKeySet = function (key) {
        var regEx = /^\$[A-Z_]+\$$/;
        return !isNullOrEmpty(key) && !regEx.test(key);
    };

    // Handle device back button tap
    var onBackKeyDown = function (e) {
        e.preventDefault();

        navigator.notification.confirm('Do you really want to exit?', function (confirmed) {
            var exit = function () {
                navigator.app.exitApp();
            };

            if (confirmed === true || confirmed === 1) {
                // Stop EQATEC analytics monitor on app exit
                if (analytics.isAnalytics()) {
                    analytics.Stop();
                }
                AppHelper.logout().then(exit, exit);
            }
        }, 'Exit', ['OK', 'Cancel']);
    };

    var onDeviceReady = function () {
        // Handle "backbutton" event
        document.addEventListener('backbutton', onBackKeyDown, false);

        navigator.splashscreen.hide();

        if (analytics.isAnalytics()) {
            analytics.Start();
            analytics.TrackFeature(localStorage);
        }

        // Initialize AppFeedback
        if (isKeySet("ad9606a0-3a2c-11e4-8eba-e11ea7f27fc0")) {
            try {
                feedback.initialize("ad9606a0-3a2c-11e4-8eba-e11ea7f27fc0");
                console.log('Feedback initialized!');
            } catch (err) {
                console.log('Something went wrong:');
                console.log(err);
            }
        } else {
            console.log('Telerik AppFeedback API key is not set. You cannot use feedback service.');
        }
    };

    // Handle "deviceready" event
    document.addEventListener('deviceready', onDeviceReady, false);

    // Initialize Everlive SDK
    //var el = new Everlive({
    //    apiKey: appSettings.everlive.apiKey,
    //    scheme: appSettings.everlive.scheme
    //});

    var emptyGuid = '00000000-0000-0000-0000-000000000000';

    var AppHelper = {


        // Date formatter. Return date in d.m.yyyy format
        formatDate: function (dateString) {
            return kendo.toString(new Date(dateString), 'MMM d, yyyy');
        }
        
    };

    var os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

    // Initialize KendoUI mobile application
    var mobileApp = new kendo.mobile.Application(document.body, {
        transition: 'slide',
        statusBarStyle: statusBarStyle
        //skin: 'flat',
        //initial: 'views/home.html'
    });

    var getYear = (function () {
        return new Date().getFullYear();
    }());

    return {
        showAlert: showAlert,
        showError: showError,
        showConfirm: showConfirm,
        isKeySet: isKeySet,
        mobileApp: mobileApp,
        helper: AppHelper,
        //everlive: el,
        getYear: getYear
    };
}(window));

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
            alert: function (e) {
                alert(e.data.name);
            }
        }
    }
};