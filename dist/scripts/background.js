"use strict";chrome.app.runtime.onLaunched.addListener(function(){var a=1280,b=800;chrome.app.window.create("index.html",{bounds:{width:a,height:b,left:Math.round((screen.availWidth-a)/2),top:Math.round((screen.availHeight-b)/2)}})});