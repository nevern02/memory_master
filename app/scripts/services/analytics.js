MemoryMaster.service('Analytics', function() {
  var isBrowser = !window.location.protocol.match(/chrome-extension/);
  var appService = null
  var appTracker = null
  var webTracker = null

  if (typeof(ga) != 'undefined') {
    ga('create', 'UA-38872336-5', 'auto');
    ga(function(tracker) {
      webTracker = tracker;
    });
  } else if (!isBrowser) {
    appService = analytics.getService('memory_master');
    appTracker = appService.getTracker('UA-38872336-6');
  }

  this.sendView = function(name) {
    if (isBrowser && webTracker) {
      webTracker.set('page', '/' + name);
      webTracker.send('pageview');
    } else {
      appTracker && appTracker.sendAppView(name);
    }
  }

  this.sendEvent = function(action, value) {
    if (isBrowser) {
      webTracker && webTracker.send('event', 'Game', action, 'default', value);
    } else {
      appTracker && appTracker.sendEvent('Game', action, 'default', value);
    }
  }
});
