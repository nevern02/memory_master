MemoryMaster.service('Analytics', function() {
  var isBrowser = !window.location.protocol.match(/chrome-extension/);
  var appConfig = null
  var appTracker = null
  var isEnabled = true
  var webTracker = null

  if (typeof(ga) !== 'undefined') {
    ga('create', 'UA-38872336-6', 'auto');
    ga(function(tracker) {
      webTracker = tracker;
    });
  } else if (!isBrowser) {
    var service = analytics.getService('memory_master');
    appTracker = service.getTracker('UA-38872336-6');

    service.getConfig().addCallback(function(config) {
      appConfig = config;
      isEnabled = appConfig.isTrackingPermitted();
    });
  }

  this.isEnabled = function() {
    return isEnabled;
  }

  this.sendView = function(name) {
    if (isBrowser && webTracker) {
      webTracker.set('page', '/' + name);
      webTracker.send('pageview');
    } else if (appTracker) {
      appTracker.sendAppView(name);
    }
  }

  this.sendEvent = function(action, value) {
    if (isBrowser) {
      webTracker && webTracker.send('event', 'Game', action, 'web', value);
    } else {
      appTracker && appTracker.sendEvent('Game', action, 'chrome', value);
    }
  }

  this.setEnabled = function(value) {
    if (isBrowser) {
      return true;
    } else {
      isEnabled = value;
      return appConfig.setTrackingPermitted(isEnabled);
    }
  }
});
