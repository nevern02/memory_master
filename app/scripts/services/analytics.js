MemoryMaster.service('Analytics', function() {
  var isBrowser = !window.location.protocol.match(/chrome-extension/);
  var appService = null
  var appTracker = null
  var webTracker = null

  if (typeof(ga) != 'undefined') {
    webTracker = ga;
    webTracker('create', 'UA-38872336-5', 'auto');
  } else if (!isBrowser) {
    appService = analytics.getService('memory_master');
    appTracker = appService.getTracker('UA-38872336-6');
  }

  this.sendView = function(name) {
    if (isBrowser) {
      webTracker && webTracker('send', 'pageview', '/' + name);
    } else {
      appTracker && appTracker.sendAppView(name);
    }
  }

  this.sendEvent = function(action, value) {
    if (isBrowser) {
      webTracker && ('send', 'event', 'Game', action, null, value);
    } else {
      appTracker && appTracker.sendEvent('Game', action, null, value);
    }
  }
});
