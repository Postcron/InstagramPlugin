/*
    The MIT License (MIT)
    Copyright (c) 2013 - 2014 Vlad Stirbu

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var exec = require('cordova/exec');

var hasCheckedInstall,
    isAppInstalled;

var Plugin = {
  // calls to see if the device has the Instagram app
  isInstalled: function (callback) {
    exec(function (version) {
      hasCheckedInstall = true;
      isAppInstalled = true;
      callback && callback(null, version ? version : true);
    },

    function () {
      hasCheckedInstall = true;
      isAppInstalled = false;
      callback && callback(null, false);
    }, "Instagram", "isInstalled", []);
  },
  shareImage: function (mediaPath, caption, errorCallback, successCallback) {
    // sanity check
    if (hasCheckedInstall && !isAppInstalled) {
      console.log("oops, Instagram is not installed ... ");
      return errorCallback && errorCallback("oops, Instagram is not installed ... ");
    }

    if (cordova && cordova.plugins && cordova.plugins.clipboard && caption !== '') {
      console.log("copying caption: ", caption);
      cordova.plugins.clipboard.copy(caption);
    }

    exec(successCallback, errorCallback, "Instagram", "shareImage", [mediaPath]);
  },
  shareVideo: function (mediaPath, caption, errorCallback, successCallback) {
    // sanity check
    if (hasCheckedInstall && !isAppInstalled) {
      console.log("oops, Instagram is not installed ... ");
      return errorCallback && errorCallback("oops, Instagram is not installed ... ");
    }

    if (cordova && cordova.plugins && cordova.plugins.clipboard && caption !== '') {
      console.log("copying caption: ", caption);
      cordova.plugins.clipboard.copy(caption);
    }

    exec(successCallback, errorCallback, "Instagram", "shareVideo", [mediaPath]);
  },
  shareAsset: function (assetLocalIdentifier, caption, errorCallback, successCallback) {
      // sanity check
      if (hasCheckedInstall && !isAppInstalled) {
          console.log("oops, Instagram is not installed ... ");
          return errorCallback && errorCallback("oops, Instagram is not installed ... ");
      }

      if (cordova && cordova.plugins && cordova.plugins.clipboard && caption !== '') {
        console.log("copying caption: ", caption);
        cordova.plugins.clipboard.copy(caption);
      }

      exec(successCallback, errorCallback, "Instagram", "shareAsset", [assetLocalIdentifier]);
  }
};

module.exports = Plugin;
