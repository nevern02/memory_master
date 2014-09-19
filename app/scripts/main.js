'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
    var width = 1280;
    var height = 800;

    chrome.app.window.create('index.html', {
        'bounds': {
            'width': width,
            'height': height,
            'left': Math.round((screen.availWidth - width) / 2),
            'top': Math.round((screen.availHeight - height)/2)
        }
    });
});
