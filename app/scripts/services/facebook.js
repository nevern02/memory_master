'use strict';

MemoryMaster.service('Facebook', function($http) {
  var authResponse = {};
  var user         = {};
  var initOptions = {
    appId      : '1664248503832367',
    xfbml      : true,
    version    : 'v2.5',
    status     : true
  };

  var getUser = function() {
    var options = {
      access_token: authResponse.accessToken,
      fields: 'email,name'
    };

    FB.api('/me', { options }, function(response) {
      user = response;
    });
  }

  this.initialize = function() {
    FB.init(initOptions);

    FB.Canvas.getPageInfo(
      function(info) {
        FB.Canvas.setSize({width: info.clientWidth, height: info.clientHeight});
      }
    );

    FB.Event.subscribe('auth.authResponseChange', function(event) {
      authResponse = event.authResponse;
      getUser();
    });
  }

  this.getUserId = function() { return authResponse.userID };
  this.getEmail  = function() { return user.email };
});
