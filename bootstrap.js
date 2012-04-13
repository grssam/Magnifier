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
let global = this;

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
const ICON_OPEN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACYUlEQVR42mNgwATMwcHBelV1jYu6J0x/OmHmkjcdfdOvV9Y2z8wpKHDw8fHhwqKHgdHKyko5NDKhq6Vv7ufGSUv/N87Y+r9p2ob/jf0LfhbXtO2ISchwAAIWFF2WlpZCXn4h9RkVXS+nbrzyd/uVj/+3X/3yf+vlT/+XHXr4v2n6xr+xqQU7nJw8lVFss7S0swpPLt3XteTIr3Vn3//ffu37/123fv3fcePH/y2Xv/yfu+fe/+Titp9O7p4ZcF0qKirsdo4uUWnlvXfm7rr9b8e1b//33/vz/8D9v2B6z+2f/9efe/+/uGvpfxd3n6XIzuS0c3RLyq2f+mAp0Fn7gAqPPPz7/+ijf2D60P3fQGd//l8zeeN/Zw+frSihaWJu5Z9e1nNj6cG7/w7d/fH/5JO//089/Qemjz38/X/39Y//8+on/3d08uhDCRxbW1stF++QtT3zN38/dPP9/3PPfv6/+PLX//PPf/4/+ejr/9VH7vyNzyr9bG/v7AjXpKenx11VVeVYU1O7Pq+y9d20FTu/H7nx8t/5xx//n7r39t+6Q5d+5VW1v3J29+5RV1fnBWvS0tLiiYqK8k9LS9tZVlb+Oj8/f4NfSNzarulLby5ct/PhtMXr7xTWtO/39g9tBIaFCigGGJycnKQjIyN94+Lidjs6Or7W1NTaDZR09vX11Y6IiA5MSs9Kjk/NiA6NjLRxdnYWBmsCgYKCgu7s7Oz9dnZ2b6WlpXezsbEFAIV5YAEGCm2gi9jgGmAA6MRpQE2fRUVF97Ozs/sBhXgZiAHAiFcWEBBIBDI9gJiNgUgAAHoZLRyzGpV/AAAAAElFTkSuQmCC";
const ICON_CLOSE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACMUlEQVR42o2RT2iSYRzHDWNSbSClJ4960cCLqChNp6GGaCtFUEMwExEUVFCUqUQnoVQEtdFhMAJvSl0SQ9SzXvyHmmyKf/BQqy47jA306fe8MEnqsB+8PC8vfN7f9/l8SaR/h6zX67mRSORjMplcHB4e/kwkEoNoNPrB7Xbv8Xi8u/9hSLfEYjHTZDK9jcfj56lUCmWzWZROpxHAlwcHByWr1boHc3uDEolE9zUazetAIPC9UCgsW60WarfbqNlsolqthjKZzNJut5fkcjlzYxuAYpvNVj0+Pr6q1+uo0+mgXq+Hut0uAZdKJeTz+S4VCoVzTbFYLIpEIjH7/f7TYrG4wtBwOEQnJyfE2e/3UaPRQLFYDAGY+zvmHQBtIGVSrVbRYDBAo9EIjcdj4sQ/wLHxvZVK5ZcNm0KhcB82fqtUKiu8ZTKZoOl0SpwYxpHBLpLJZMkNObu7uxy1Wl04Ojq6wNFmsxlaLBZoPp8Tm0HQ0ul0nkulUtka4nK590C3DKJ+CoVCv3O53AWIWeFtEHMF0FUwGPwB94vTaLQdAuJwONtms3nf4XB8hSrOPB7PZ51OV4AOh/l8fgqWT8PhcE2r1b4BFyzcAJbCgMK1FoulDMWesdnsMp/Pf6xSqR4ajcbn0NsrqOiFwWB4JBAIHhAQHq/X+87lctXA6C8Gg1Emk8nP4PP2tTBsGxJtrYHrgYjvATqn0+k1CoXyFD7tkG4yUDyTSqW+hNcn8GyRbjh/APE8KJeiYd95AAAAAElFTkSuQmCC";
const ICON_RIGHT_ARROW = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAYAAADAvYV+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALBJREFUeNqUkCsOAjEQhltRhwLNFZAIPAdBYzgSAoPiGFwAC0cgoQn03WGm2d0syfbBn3wjmi/t/GUAsERuyAxhJVgnU17IqlWmeGTXKvc5/iPDVA8a8xgjZEg92DgFmUg9yOM0QgjA6jkl2XvfIp9ZLxfAh8N+WMM5l7v5jWyFENdBttZOyXeU1pzz588pyWPwpUt2c2MMdESt9aFYEwVAPphN9U+UUg8p5aLmfQUYAGDUZxKAAai7AAAAAElFTkSuQmCC";
const ICON_LEFT_ARROW = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAYAAADAvYV+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMxJREFUeNqUkbEOgjAQhnukZZE44Mykmwm7Pokru4OPZOILuPsCxsHJ2c3VRIYCQXr+NcFEBIp/8uWul//umlYws3AQgAuIPNGvGNzA3B76zAk4g/Gn0rF6y7+KZGNaAI712k6hMzbGPAC3AYW1MUHh2WW0vI1VVe0Au7BeialKDJQnpVwR0Rq5cZmpTsqyXCAcwKjNqJQiarxIiKYT0mnT7Ps+ff0grnNHcYa4F/8oz/NNURQGsMXZoLVeokkDHrQhTdNJlmVXm78EGACX3OmuRm5+1QAAAABJRU5ErkJggg==";
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

let gAddon;

// Global reload function
let reload = function() {};

/*
Main function to run on every window
Original code by Paul Rouget https://gist.github.com/2145830

TODO:
- add color tools
*/

function Magnifier(aWindow) {
  this.chromeWin = aWindow;
  this.tabbrowser = aWindow.gBrowser;
  this.chromeDoc = aWindow.document;
  // Preferences
  this.zoomChrome = pref("zoomChrome");
  this.docked = pref("docked");
  this.position = JSON.parse(pref("JSONrect"));
  this.state = pref("state");
  this.zoomLevel = pref("zoomLevel");
  // Bind!!!
  this.onPopupShown = this.onPopupShown.bind(this);
  this.onPopupHiding = this.onPopupHiding.bind(this);
  this.onButtonClick = this.onButtonClick.bind(this);
  this.onKeyPressed = this.onKeyPressed.bind(this);
  this.update = this.update.bind(this);
  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseClick = this.onMouseClick.bind(this);
  this.onTabSelect = this.onTabSelect.bind(this);
  this.onGridClicked = this.onGridClicked.bind(this);
  this.onGridKeyPressed = this.onGridKeyPressed.bind(this);
  this.startRenderingLoop = this.startRenderingLoop.bind(this);
  this.onZoomChromeChange = this.onZoomChromeChange.bind(this);
  this.toggleOptionPane = this.toggleOptionPane.bind(this);
  this.panelStateChange = this.panelStateChange.bind(this);
  this.onMouseScrolled = this.onMouseScrolled.bind(this);
  this.onZoomClick = this.onZoomClick.bind(this);
  this.resizeDragStart = this.resizeDragStart.bind(this);
  this.resizeDrag = this.resizeDrag.bind(this);
  this.resizeDragEnd = this.resizeDragEnd.bind(this);
  this.saveToolbarButtonInfo= this.saveToolbarButtonInfo.bind(this);
  this.isOpen = false;
  this.optionsVisible = false;

  this._init();
}

Magnifier.prototype = {

  _init: function magnifier__init() {
    if (this.position.width == 0 || this.position.height == 0) {
      this.position.width = 304;
      this.position.height = 304;
      pref("JSONrect", JSON.stringify(this.position));
    }

    let gWidth = Math.floor(this.position.width / this.zoomLevel) + 1;
    let gHeight = Math.floor(this.position.height / this.zoomLevel) + 1;
    let gZoom = this.zoomLevel;
    this.zoomWindow = {
      x: 0,
      y: 0,
      cx: null,
      cy: null,
      width: gWidth,
      height: gHeight,
      zoom: gZoom,
    }

    this.dragStart = {
      x: -1,
      y: -1,
      height: -1,
      width: -1,
    }

    this.buildButton();
    this.buildPanel();
    this.buildOptionsPanel();

    listen(this.chromeWin, this.tabbrowser.tabContainer, "TabSelect", this.onTabSelect, false);
  },
  destroy: function magnifier_destroy() {
    // Clearing the memory.
    this.destroyButton();
    this.panel.hidePopup();
    this.panel.parentNode.removeChild(this.panel);
    this.panel = null;
    this.button.parentNode.removeChild(this.button);
    this.button = null;
  },
  onZoomChromeChange: function magnifier_onZoomChromeChange(e) {
    e.stopPropagation();
    e.preventDefault();
    this.stopRenderingLoop();
    this.deattachPageEvents();
    this.zoomChrome = !this.zoomChrome;
    this.moveWithMouseOption.disabled = !this.zoomChrome;
    this.attachPageEvents();
    this.startRenderingLoop();
  },
  panelStateChange: function magnifier_panelStateChange(e) {
    e.stopPropagation();
    e.preventDefault();
    this.state = (++this.state)%2;
    this.stopRenderingLoop();
    this.startRenderingLoop();
  },
  setupZoom: function magnifier_setupZoom() {
    this.canvas.width = this.zoomWindow.width;
    this.canvas.height = this.zoomWindow.height;

    let csswidth = (this.zoomWindow.width * this.zoomWindow.zoom) + "px";
    let cssheight = (this.zoomWindow.height * this.zoomWindow.zoom) + "px";

    this.canvas.style.width = this.grid.style.width = csswidth;
    this.canvas.style.height = this.grid.style.height = cssheight;

    this.grid.style.backgroundSize = this.zoomWindow.zoom + "px " + this.zoomWindow.zoom + "px";

    this.crosshair.style.height = this.crosshair.style.width = (this.zoomWindow.zoom - 1) + "px";
    this.moveCrosshair(Math.floor(this.zoomWindow.width / 2), Math.floor(this.zoomWindow.height / 2));
  },
  moveCrosshair: function magnifier_moveCrosshair(x, y) {
    this.zoomWindow.cx = ~~x;
    this.zoomWindow.cy = ~~y;
    this.crosshair.style.left = (this.zoomWindow.zoom * this.zoomWindow.cx) + "px";
    this.crosshair.style.top = (this.zoomWindow.zoom * this.zoomWindow.cy) + "px";
  },
  /* ---------- UI builders ---------- */
  buildOptionsPanel: function magnifier_buildOptionsPanel() {
    let (secondPane = this.chromeDoc.createElement("vbox")) {
      secondPane.setAttribute("orient", "vertical");
      secondPane.setAttribute("style", "border: solid #aaa;" +
                                       "border-width: 0px 0px 0px 1px; padding: 10px 4px;" +
                                       "-moz-transition-property: opacity, margin;" +
                                       "-moz-transition-duration: 400ms, 300ms;");
      if (this.optionsVisible) {
        secondPane.style.opacity = 1;
        secondPane.style.margin = "0px 2px";
      }
      else {
        secondPane.style.opacity = 0;
        secondPane.style.margin = "0px -175px 0px 0px";
      }
      let (zoomSlider = this.chromeDoc.createElement("hbox")) {
        zoomSlider.setAttribute("flex", "1");
        let (spacer = this.chromeDoc.createElement("spacer")) {
          spacer.setAttribute("flex", "1");
          zoomSlider.appendChild(spacer);
        }
        let label2 = this.chromeDoc.createElement("label");
        label2.setAttribute("value", "2x");
        label2.setAttribute("style", "padding: 4px 2px;color:#eee");
        zoomSlider.appendChild(label2);
        let zoomScope = this.chromeDoc.createElement("box");
        zoomScope.setAttribute("style", "min-width: 100px; max-width: 100px; min-height: 24px;" +
          "background-repeat: no-repeat; border: 1px solid black;" +
          "margin: 2px 1px; max-height: 24px");
        zoomScope.style.backgroundImage = "-moz-linear-gradient(right, #eee 1px, rgba(0,0,0,0) 1px)";
        zoomScope.style.backgroundSize = ((this.zoomLevel - 2)*(100/14)) + "% 100%";
        zoomSlider.appendChild(zoomScope);
        this.zoomScope = zoomScope;
        listen(this.chromeWin, this.zoomScope, "click", this.onZoomClick);
        let label16 = this.chromeDoc.createElement("label");
        label16.setAttribute("value", "16x");
        label16.setAttribute("style", "padding: 4px 2px;color:#eee");
        zoomSlider.appendChild(label16);
        this.secondPane = secondPane;
        secondPane.appendChild(zoomSlider);
      }
       let (optionsBox = this.chromeDoc.createElement("box")) {
        optionsBox.setAttribute("orient", "vertical");
        let zoomChromeOption = this.chromeDoc.createElement("checkbox");
        zoomChromeOption.setAttribute("label", "Zoom the whole Browser");
        zoomChromeOption.setAttribute("style", "color:#eee");
        zoomChromeOption.setAttribute("checked", this.zoomChrome);
        this.zoomChromeOption = zoomChromeOption;
        listen(this.chromeWin, zoomChromeOption, "command", this.onZoomChromeChange);
        optionsBox.appendChild(zoomChromeOption);
        let moveWithMouseOption = this.chromeDoc.createElement("checkbox");
        moveWithMouseOption.setAttribute("label", "Move with mouse");
        moveWithMouseOption.setAttribute("checked", (this.state == 1));
        moveWithMouseOption.setAttribute("style", "color:#eee");
        moveWithMouseOption.setAttribute("disabled", !this.zoomChrome);
        this.moveWithMouseOption = moveWithMouseOption;
        listen(this.chromeWin, moveWithMouseOption, "command", this.panelStateChange);
        optionsBox.appendChild(moveWithMouseOption);
        secondPane.appendChild(optionsBox);
      } 
      this.panel.appendChild(secondPane);
    }
  },
  buildPanel: function magnifier_buildPanel() {
    this.panel = this.chromeDoc.createElement("panel");
    this.panel.id = "devtools-magnifier-panel";
    this.panel.setAttribute("noautofocus", true);
    this.panel.setAttribute("noautohide", true);
    this.panel.setAttribute("backdrag", true);
    this.panel.setAttribute("level", "floating");
    this.panel.setAttribute("orient", "horizontal");

    this.panel.setAttribute("style", "border-radius: 4px; border:1px solid #111;");
    this.panel.style.backgroundImage = "-moz-linear-gradient(top, #7d7e7d 0%, #0e0e0e 100%)";

    listen(this.chromeWin, this.panel, "popupshown", this.onPopupShown, true);
    listen(this.chromeWin, this.panel, "popuphiding", this.onPopupHiding, true);
    listen(this.chromeWin, this.panel, "keypress", this.onKeyPressed, true);
    listen(this.chromeWin, this.panel, "keydown", this.onGridKeyPressed, true);
    listen(this.chromeWin, this.panel, "DOMMouseScroll", this.onMouseScrolled, true);
    this.chromeDoc.querySelector("#mainPopupSet").appendChild(this.panel);

    // Left/Upper box containing the color and zoom information
    let (firstPane = this.chromeDoc.createElement("vbox")) {
      firstPane.setAttribute("style", "margin: 0px 2px");
      let (colorInfoBox = this.chromeDoc.createElement("box")) {
        colorInfoBox.setAttribute("orient", "horizontal");
        colorInfoBox.setAttribute("style", "padding: 10px");
        // Color Box
        this.colorbox = this.chromeDoc.createElement("box");
        this.colorbox.setAttribute("style", "width: 32px; border: 1px solid #333");
        // Color Name
        this.colortext = this.chromeDoc.createElement("textbox");
        this.colortext.setAttribute("style", "border: 1px solid #333;color:#eee");
        this.colortext.className = "devtools-searchinput";
        // Start/Stop Rendering button
        let XHTML = "http://www.w3.org/1999/xhtml";
        this.resetButton = this.chromeDoc.createElementNS(XHTML, "div");
        this.resetButton.innerHTML = "Restart Drawing";
        this.resetButton.setAttribute("style", "text-decoration: none; margin: 2px;" +
          "padding: 3px; cursor: pointer;color:#eee");
        if (this.isRendering)
          this.resetButton.innerHTML = "Lock Zoom";
        listen(this.chromeWin, this.resetButton, "click", this.startRenderingLoop, true);
        // Show/Hide Options button
        this.toggleOptions = this.chromeDoc.createElement("toolbarbutton");
        this.toggleOptions.className = "chromeclass-toolbar-additional toolbarbutton-1";
        this.toggleOptions.setAttribute("style", "list-style-image: url(" +
          (this.optionsVisible?ICON_LEFT_ARROW:ICON_RIGHT_ARROW) +")");
        this.toggleOptions.onclick = this.toggleOptionPane;
        colorInfoBox.appendChild(this.colorbox);
        colorInfoBox.appendChild(this.colortext);
        colorInfoBox.appendChild(this.resetButton);
        let (spacer = this.chromeDoc.createElement("spacer")) {
          spacer.setAttribute("flex", "1");
          colorInfoBox.appendChild(spacer);
        }
        colorInfoBox.appendChild(this.toggleOptions);
        firstPane.appendChild(colorInfoBox);
      }
      let (canvasBox = this.chromeDoc.createElement("box")) {
        canvasBox.setAttribute("style", "display:block; position: relative; margin: 5px 10px");
        let XHTML = "http://www.w3.org/1999/xhtml";
        // Canvas displaying zoomed screen
        this.canvas = this.chromeDoc.createElementNS(XHTML, "canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.setAttribute("style", "image-rendering:-moz-crisp-edges;background-color:black");
        canvasBox.appendChild(this.canvas);
        // Grid separating each pixel
        this.grid = this.chromeDoc.createElement("box");
        this.grid.setAttribute("style", "position: absolute; top: 0; left: 0;");
        canvasBox.appendChild(this.grid);
        listen(this.chromeWin, this.grid, "click", this.onGridClicked, true);
        // Crosshair highlighting the pixel
        this.crosshair = this.chromeDoc.createElement("box");
        this.crosshair.setAttribute("style", "display: block; position: absolute;"
          + "border-width: 2px; border-style: solid; -moz-box-sizing: content-box;"
          + "margin-left: -1px; margin-top: -1px; pointer-events: none;");
        canvasBox.appendChild(this.crosshair);
        this.canvasBox = canvasBox;
        firstPane.appendChild(canvasBox);
      }
      let (spacer = this.chromeDoc.createElement("spacer")) {
        spacer.setAttribute("flex", "1");
        firstPane.appendChild(spacer);
      }
      let (sizeBox = this.chromeDoc.createElement("hbox")) {
        sizeBox.setAttribute("style", "max-height: 3px;");
        let (spacer = this.chromeDoc.createElement("spacer")) {
          spacer.setAttribute("flex", "1");
          sizeBox.appendChild(spacer);
        }
        let resizer = this.chromeDoc.createElement("box");
        resizer.setAttribute("draggable", "true");
        resizer.setAttribute("style", "min-height:3px;max-height:3px;margin:-5px 0px 5px;" +
          "min-width:3px;max-width:3px;cursor: se-resize;-moz-appearance:resizer;");
        listen(this.chromeWin, resizer, "mousedown", this.resizeDragStart);
        listen(this.chromeWin, this.chromeWin, "mousemove", this.resizeDrag);
        listen(this.chromeWin, this.chromeWin, "mouseup", this.resizeDragEnd);
        this.resizer = resizer;
        sizeBox.appendChild(resizer);
        firstPane.appendChild(sizeBox);
      }
      this.panel.appendChild(firstPane);
    }
    this.setupZoom();
  },
  updateGridColor: function magnifier_updateGridColor() {
    let g = this.color.r + this.color.g + this.color.b;
    g = g / 3;
    let c = g < 128 ? "rgba(255,255,255," : "rgba(0,0,0,";
    this.crosshair.style.borderColor = c + "0.5)";

    if (this.lastGridColor && this.lastGridColor == c) return;
    this.chromeWin.clearTimeout(this.gridColorTimeout);
    this.lastGridColor = c;

    let self = this;
    this.gridColorTimeout = this.chromeWin.setTimeout(function() {
      self.grid.style.backgroundImage = "-moz-linear-gradient(left, " + c +"0.15) 1px, transparent 1px)," +
                                        "-moz-linear-gradient(top, " + c + "0.15) 1px, transparent 1px)";
    }, 250);
  },
  destroyButton: function magnifier_destroyButton() {
    try {
      this.button.parentNode.removeChild(this.button);
    } catch (ex) {}
  },
  saveToolbarButtonInfo: function magnifier_saveTooolbarButtonInfo() {
    if (this.chromeDoc.getElementById("devtools-magnifier-button") &&
        this.button.parentNode) {
      pref("buttonParentID", this.button.parentNode.getAttribute("id") || "");
      pref("buttonNextSiblingID", (this.button.nextSibling || "") && 
        this.button.nextSibling.getAttribute("id").replace(/^wrapper-/i, ""));
    }
    else
      pref("buttonParentID", "");
  },
  buildButton: function magnifier_buildButton() {
    // add toolbar button
    let button = this.chromeDoc.createElement("toolbarbutton");
    button.id = "devtools-magnifier-button";
    button.className = "chromeclass-toolbar-additional toolbarbutton-1";
    button.setAttribute("style", "list-style-image: url(" + ICON_CLOSE +")");
    button.onclick = this.onButtonClick;

    this.chromeDoc.getElementById("navigator-toolbox").palette.appendChild(button);
    let buttonParentID = pref("buttonParentID");
    if (buttonParentID.length > 0) {
      let parent = this.chromeDoc.getElementById(buttonParentID);
      if (parent) {
        let nextSiblingID = pref("buttonNextSiblingID");
        let nextSibling = this.chromeDoc.getElementById(nextSiblingID);
        if (!nextSibling) {
          let currentset = parent.getAttribute("currentset").split(",");
          let i = currentset.indexOf("devtools-magnifier-button") + 1;
          if (i > 0) {
            let len = currentset.length;
            for (; i < len; i++) {
              nextSibling = this.chromeDoc.getElementById(currentset[i]);
              if (nextSibling)
                break;
            }
          }
        }
        parent.insertItem("devtools-magnifier-button", nextSibling, null, false);
      }
    }
    listen(this.chromeWin, this.chromeWin, "aftercustomization", this.saveToolbarButtonInfo);

    return this.button = button;
  },
  /* ---------- Content copy ---------- */
  startRenderingLoop: function() {
    this.isRendering = true;
    this.resetButton.innerHTML = "Lock Zoom";
    this.update();
  },
  stopRenderingLoop: function() {
    this.resetButton.innerHTML = "Restart Drawing";
    this.isRendering = false;
  },
  update: function magnifier_update() {
    let win = this.zoomChrome? this.chromeWin:
                               this.tabbrowser.selectedBrowser.contentWindow;
    if (win) { // Why do I need to do that?
      let x = this.zoomWindow.x + 1, y = this.zoomWindow.y + 1;
      if (this.zoomChrome) { // Some wierd adjustments
        x -= win.screenX + 8;
        y -= win.screenY;
      }
      else {
        x -= win.scrollX;
        y -= win.scrollY;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawWindow(win, x, y, this.zoomWindow.width, this.zoomWindow.height, "white");
    }
    else
      this.chromeWin.alert("ASD");
    if (this.isRendering) this.chromeWin.mozRequestAnimationFrame(this.update);
    this.updateColor();
  },
  updateColor: function magnifier_updateColor() {
    let pixel = this.ctx.getImageData(this.zoomWindow.cx, this.zoomWindow.cy, 1, 1).data;
    let r = ~~pixel[0];
    let g = ~~pixel[1];
    let b = ~~pixel[2];
    this.color = {r:r, g:g, b:b};
    this.colorName = "rgb(" + r + "," + g + "," + b + ")";
    this.colorbox.style.backgroundColor = this.colorName;
    this.colortext.value = this.colorName;
    this.updateGridColor();
  },
  /* ---------- Events and callbacks ---------- */
  attachPageEvents: function magnifier_attachPageEvents() {
    let win = this.zoomChrome? this.chromeWin:
                               this.tabbrowser.selectedBrowser;
    win.addEventListener("mousemove", this.onMouseMove, true);
    win.addEventListener("click", this.onMouseClick, true);
    win.addEventListener("keypress", this.onKeyPressed, true);
    win.addEventListener("keydown", this.onGridKeyPressed, true);
  },
  deattachPageEvents: function magnifier_deattachPageEvents() {
    let win = this.zoomChrome? this.chromeWin:
                               this.tabbrowser.selectedBrowser;
    win.removeEventListener("mousemove", this.onMouseMove, true);
    win.removeEventListener("click", this.onMouseClick, true);
    win.removeEventListener("keypress", this.onKeyPressed, true);
    win.removeEventListener("keydown", this.onGridKeyPressed, true);
  },
  onPopupShown: function magnifier_onPopupShown(e) {
    if (e.target != this.panel)
      return;
    this.button.setAttribute("style", "list-style-image: url(" + ICON_OPEN + ")");
    this.isOpen = true;
    this.startRenderingLoop();
    this.attachPageEvents();
  },
  onPopupHiding: function magnifier_onPopupHiding(e) {
    if (e.target != this.panel)
      return;
    // Saving the preferences.
    this.position.top = this.panel.boxObject.y;
    this.position.left = this.panel.boxObject.x;
    pref("JSONrect", JSON.stringify(this.position));
    pref("state", this.state);
    pref("zoomLevel", this.zoomLevel);
    pref("docked", this.docked);
    pref("zoomChrome", this.zoomChrome);

    this.button.setAttribute("style", "list-style-image: url(" + ICON_CLOSE + ")");
    this.isOpen = false;
    this.stopRenderingLoop();
    this.deattachPageEvents();
  },
  onButtonClick: function magnifier_onButtonClick(e) {
    if (this.isOpen) {
      this.panel.hidePopup();
    } else {
      this.panel.openPopupAtScreen(this.position.left, this.position.top, false);
    }
  },
  toggleOptionPane: function magnifier_toggleOptionPane(e) {
    this.toggleOptions.setAttribute("style", "list-style-image: url(" +
      (this.optionsVisible?ICON_RIGHT_ARROW:ICON_LEFT_ARROW) +")");
    this.optionsVisible = !this.optionsVisible;
    if (this.optionsVisible) {
      this.secondPane.style.opacity = 1;
      this.secondPane.style.margin = "0px 2px";
    }
    else {
      this.secondPane.style.opacity = 0;
      this.secondPane.style.margin = "0px -175px 0px 0px";
    }
  },
  onTabSelect: function magnifier_onTabSelect(e) {
    if (this.isOpen && !this.zoomChrome)
      this.panel.hidePopup();
  },
  onMouseMove: function magnifier_onMouseMove(e) {
    this.zoomWindow.x = (this.zoomChrome? e.screenX: e.clientX) - this.zoomWindow.width / 2;
    this.zoomWindow.y = (this.zoomChrome? e.screenY: e.clientY) - this.zoomWindow.height / 2;
    if (this.state == 1 && this.zoomChrome && this.isRendering) {
      this.panel.moveTo(e.screenX - this.position.width / 2 - this.zoomLevel / 2 - 15,
                        e.screenY - this.position.height / 2 - this.zoomLevel / 2 - 50);
    }
  },
  onMouseScrolled: function magnifier_onMouseScrolled(e) {
    let change = e.detail > 0 ? 1: -1;
    this.zoomLevel = Math.min(Math.max(this.zoomLevel - change, 2), 16);
    let gWidth = Math.floor(this.position.width / this.zoomLevel) + 1;
    let gHeight = Math.floor(this.position.height / this.zoomLevel) + 1;
    this.zoomWindow.width = gWidth;
    this.zoomWindow.height = gHeight;
    this.zoomWindow.zoom = this.zoomLevel;
    this.zoomScope.style.backgroundSize = ((this.zoomLevel - 2)*(100/14)) + "% 100%";
    this.setupZoom();
    this.stopRenderingLoop();
    this.startRenderingLoop();
  },
  onZoomClick: function magnifier_onZoomClick(e) {
    try {
      this.zoomLevel = 2 + Math.floor((e.screenX + 10 - this.zoomScope.boxObject.x)/(100/14));
    } catch (ex) {return;}
    this.zoomLevel = Math.min(Math.max(this.zoomLevel, 2), 16);
    let gWidth = Math.floor(this.position.width / this.zoomLevel) + 1;
    let gHeight = Math.floor(this.position.height / this.zoomLevel) + 1;
    this.zoomWindow.width = gWidth;
    this.zoomWindow.height = gHeight;
    this.zoomWindow.zoom = this.zoomLevel;
    this.zoomScope.style.backgroundSize = ((this.zoomLevel - 2)*(100/14)) + "% 100%";
    this.setupZoom();
    this.stopRenderingLoop();
    this.startRenderingLoop();
  },
  onMouseClick: function magnifier_onMouseClick(e) {
    if (e.screenX >= this.zoomScope.boxObject.x -8 &&
        e.screenX <= this.zoomScope.boxObject.x + this.zoomScope.boxObject.width + 8 &&
        e.screenY >= this.zoomScope.boxObject.y &&
        e.screenY <= this.zoomScope.boxObject.y + this.zoomScope.boxObject.height) {
      this.onZoomClick({screenX: e.screenX});
      return;
    }
    else if (this.zoomChrome && !(e.screenX >= this.canvasBox.boxObject.x &&
             e.screenX <= this.canvasBox.boxObject.x + this.canvasBox.boxObject.width &&
             e.screenY >= this.canvasBox.boxObject.y &&
             e.screenY <= this.canvasBox.boxObject.y + this.canvasBox.boxObject.height))
      return;
    if (!this.isRendering) return;
    this.stopRenderingLoop();
    e.preventDefault();
    e.stopPropagation();
  },
  resizeDragStart: function magnifier_resizeDragStart(e) {
    this.dragStart.x = e.screenX;
    this.dragStart.y = e.screenY;
    this.dragStart.origWidth = this.position.width;
    this.dragStart.origHeight = this.position.height;
    this.dragStart.width = this.panel.boxObject.width;
    this.dragStart.height = this.panel.boxObject.height;
    this.dragMouseDown = true;
  },
  resizeDrag: function magnifier_resizeDrag(e) {
    if (this.dragStart.x == -1 || this.dragStart.y == -1 || !this.dragMouseDown)
      return;
    let width = this.dragStart.width + e.screenX - this.dragStart.x;
    let height = this.dragStart.height + e.screenY - this.dragStart.y;
    e.preventDefault();
    e.stopPropagation();
    if (width > 350) {
      this.position.width = this.dragStart.origWidth + e.screenX - this.dragStart.x;
      this.zoomWindow.width = Math.floor(this.position.width / this.zoomLevel) + 1;
    }
    if (height > 350) {
      this.position.height = this.dragStart.origHeight + e.screenY - this.dragStart.y;
      this.zoomWindow.height = Math.floor(this.position.height / this.zoomLevel) + 1;
    }
    this.setupZoom();
  },
  resizeDragEnd: function magnifier_resizeDragEnd(e) {
    if (!this.dragMouseDown)
      return;
    this.dragMouseDown = false;
    let self = this;
    this.chromeWin.setTimeout(function() {
      self.stopRenderingLoop();
      self.startRenderingLoop();
    }, 100);
    this.dragStart = {
      x: -1,
      y: -1,
      height: -1,
      width: -1,
    }
  },
  onKeyPressed: function magnifier_onKeyPressed(e) {
    if (e.keyCode == e.DOM_VK_ESCAPE) {
      e.stopPropagation();
      e.preventDefault();
      this.panel.hidePopup();
    }
  },
  onGridClicked: function magnifier_onGridClicked(e) {
    if (this.isRendering) return;
    let x = (~~e.clientX - this.grid.parentNode.boxObject.x) / this.zoomWindow.zoom;
    let y = (~~e.clientY - this.grid.parentNode.boxObject.y) / this.zoomWindow.zoom;
    this.moveCrosshair(x, y);
    this.updateColor();
  },
  onGridKeyPressed: function magnifier_onGridKeyPressed(e) {
    if (this.isRendering) return;
    switch (e.keyCode) {
      case e.DOM_VK_LEFT:
        if (this.zoomWindow.cx)
          this.moveCrosshair(--this.zoomWindow.cx, this.zoomWindow.cy);
      break;
      case e.DOM_VK_RIGHT:
        if (this.zoomWindow.cx < this.zoomWindow.width - 2)
          this.moveCrosshair(++this.zoomWindow.cx, this.zoomWindow.cy);
      break;
      case e.DOM_VK_UP:
        if (this.zoomWindow.cy)
          this.moveCrosshair(this.zoomWindow.cx, --this.zoomWindow.cy);
      break;
      case e.DOM_VK_DOWN:
        if (this.zoomWindow.cy < this.zoomWindow.height - 2)
          this.moveCrosshair(this.zoomWindow.cx, ++this.zoomWindow.cy);
      break;
    }
    e.preventDefault();
    e.stopPropagation();
    this.updateColor();
  },
}

function magnifier (window) {
  function onUnload(aWindow) {
    try{
      if (aWindow.magnifier) {
        aWindow.magnifier.destroy();
        aWindow.magnifier = null;
        //delete aWindow.magnifier;
      }
    } catch(e) {}
  }
  onUnload(window);
  window.magnifier = new Magnifier(window);
  unload(function () {onUnload(window);}, window);
}

function disable(id) {
  AddonManager.getAddonByID(id, function(addon) {
    addon.userDisabled = true;
  });
}

function startup(data, reason) AddonManager.getAddonByID(data.id, function(addon) {
  gAddon = addon;
  // Load various javascript includes for helper functions
  ["helper", "pref"].forEach(function(fileName) {
    let fileURI = addon.getResourceURI("scripts/" + fileName + ".js");
    Services.scriptloader.loadSubScript(fileURI.spec, global);
  });

  // Apply the changes in UI
  watchWindows(magnifier);

  reload = function() {
    unload();
    watchWindows(magnifier);
  };
});

function shutdown(data, reason) {
  if (reason != APP_SHUTDOWN)
    unload();
}

function install() {}

function uninstall() {}
