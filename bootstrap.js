/* ***** BEGIN LICENSE BLOCK *****
 * Version: MIT/X11 License
 * 
 * Copyright (c) 2011 Girish Sharma
 * 
 * Permission is hereby granted, free of charge, to any person obtaining copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Contributor:
 *   Girish Sharma <scrapmachines@gmail.com> (Creator)
 *
 * ***** END LICENSE BLOCK ***** */
 
"use strict";
const global = this;

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

let gAddon;

function searchSpyBot(window) {

  let {document, gBrowser, gURLBar} = window;
  function $(id) document.getElementById(id);
  let {async} = makeWindowHelpers(window);

  // Disable the add-on when customizing
  window.addEventListener("beforecustomization", function() {
    // NB: Disabling will unload listeners, so manually add and remove below
    if (gAddon.userDisabled)
      return;
    unload();

    // Listen for one customization finish to re-enable the addon
    window.addEventListener("aftercustomization", function reenable() {
      window.removeEventListener("aftercustomization", reenable, false);
      reload();
    }, false);
  });

  // Get the current browser's URI even if loading
  function getURI() {
    let channel = gBrowser.selectedBrowser.webNavigation.documentChannel;
    if (channel != null)
      return channel.originalURI;

    // Just return the finished loading uri
    return gBrowser.selectedBrowser.currentURI;
  }

  // Function to add a listener for detecting searchable sites
  function autoDetectSearchEngine() {
    // Watch for urlbar value change
    var changeListener =
    {
      QueryInterface: function(aIID) {
        if (aIID.equals(Ci.nsIWebProgressListener) ||
          aIID.equals(Ci.nsISupportsWeakReference) ||
          aIID.equals(Ci.nsISupports))
          return this;
        throw Components.results.NS_NOINTERFACE;
      },

      onLocationChange: function(aProgress, aRequest, aURI) {
      }
    };
    gBrowser.addProgressListener(changeListener);
    unload( function() {
      gBrowser.removeProgressListener(changeListener);
    }, window);

    listen(window, gBrowser, "load", function(e) {
      if (!e.originalTarget.hasFocus())
        return;
    });
  }
  if (!pref("autoAddSearchEngine"))
    autoDetectSearchEngine = function() {};
  autoDetectSearchEngine();

}

function disable(id) {
  AddonManager.getAddonByID(id, function(addon) {
    addon.userDisabled = true;
  });
}

function startup(data, reason) AddonManager.getAddonByID(data.id, function(addon) {
  gAddon = addon;
  Cu.import("resource://services-sync/util.js");
  // Load various javascript includes for helper functions
  ["helper", "pref"].forEach(function(fileName) {
    let fileURI = addon.getResourceURI("scripts/" + fileName + ".js");
    Services.scriptloader.loadSubScript(fileURI.spec, global);
  });

  // Apply the changes in UI
  watchWindows(searchSpyBot);

  reload = function() {
    unload();

    watchWindows(searchSpyBot);
    pref.observe([
      "autoAddSearchEngine"
    ], reload);
    pref.observe([
      "addSearchNow",
    ], addSearchEngine);
  };

  function addSearchEngine() {
    if (!pref("addSearchNow"))
      return;
  }

  // Watch for preference changes to reprocess the keyword data
  pref.observe([
    "autoAddSearchEngine"
  ], reload);
  pref.observe([
    "addSearchNow",
  ], addSearchEngine);
});

function shutdown(data, reason) {
  if (reason != APP_SHUTDOWN)
    unload();
}

function install() {}

function uninstall() {}
