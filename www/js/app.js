// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
// .config(['$httpProvider', function($httpProvider) {
          // $httpProvider.defaults.useXDomain = true;

          // /**
           // * Just setting useXDomain to true is not enough. AJAX request are also
           // * send with the X-Requested-With header, which indicate them as being
           // * AJAX. Removing the header is necessary, so the server is not
           // * rejecting the incoming request.
           // **/
          // delete $httpProvider.defaults.headers.common['X-Requested-With'];
      // }
  // ])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.devices', {
      url: "/devices",
      views: {
        'menuContent' :{
          templateUrl: "templates/devices.html",
		  controller: 'DevicesCtrl'
        }
      }
    })
	
	.state('app.switchables', {
      url: "/switchables",
      views: {
        'menuContent' :{
          templateUrl: "templates/switchables.html",
		  controller: 'SwitchablesCtrl'
        }
      }
    })
	
	.state('app.thermostat', {
      url: "/thermostat",
      views: {
        'menuContent' :{
          templateUrl: "templates/thermostat.html",
		  controller: 'ThermostatCtrl'
        }
      }
    })
	
    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.events', {
      url: "/events",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
          controller: 'EventsCtrl'
        }
      }
    })
	.state('app.methods', {
      url: "/methods",
      views: {
        'menuContent' :{
          templateUrl: "templates/methods.html",
          controller: 'MethodsCtrl'
        }
      }
    })
	.state('app.server', {
      url: "/server",
      views: {
        'menuContent' :{
          templateUrl: "templates/server.html",
          controller: 'ServerCtrl'
        }
      }
    })
	.state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
