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
const ICON_OPTIONS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACN0lEQVR42mNgwAXq65mmnHwi3L//vAADOWDGofv+s488Oj3n8IMjPftvihDUUF+/im3GkXulUw7fCZx25L7FrEP3t8w88uA0CM84eK9lwu67cjMP3vMDyWE1YOr+W61AhadnHLiLF08/ePfolL23jTANOHC3EIhPT4HhvXd2TNl/q3fK/juzp+6/dwImDlIzad9NfQwDJu64HTZ5z+3TIDxpz+1ih/r9LDC5zg031CfvvbUNJDdh7+0joatWMcM1Juzfz9G3+3pU387ru/p33zjdv+P6fJB427bbot07ruf0bbvsBuJ37LxuBZYH4t6dV0vL5t7ghZi+44pj9/Zrp7u2XQXjzq2XY8Eatl6ZDRIH4aZN502BQoxd264dgKnr2XF9EdiApi0Xbdu3Xj7dBsUdmy/HgV2w5eoSkDgIN2+8ZAcyoG3LpUMwda2bLi6He6Npwxnz5k0XNrdsvHC6ecOFeeBoXXFSrWndxdbmTReTQfzadZcsQfJgvOF8f/O6s5oogViz6nRy/dpzp0G4bu05lEAsW3xaHSi2DSy3+uwuoPFMGLFQseLE1PIVp06XL4fgsuUnd5SvONFbtuLk7IqVJ0/AxIFqjqfN3M2PYUDuosMTCxYdOZ23AD/OX3T0aNbi/SoYBnjmTmJPm7ErMX3SPv3kSTvMUmfuP5I+68BpCN5bkjJ7n3HG7H3FydP3WROVmeKm7CxNnLb7dPzUXRsYHOpZSM6NWqH1bHFT9gi7dS/ixqcOAIKNhvsWmZLDAAAAAElFTkSuQmCC";
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
  this.panelStateChange = this.panelStateChange.bind(this);
  this.onMouseScrolled = this.onMouseScrolled.bind(this);
  this.onZoomClick = this.onZoomClick.bind(this);
  this.resizeDragStart = this.resizeDragStart.bind(this);
  this.resizeDrag = this.resizeDrag.bind(this);
  this.resizeDragEnd = this.resizeDragEnd.bind(this);
  this.saveToolbarButtonInfo= this.saveToolbarButtonInfo.bind(this);
  this.isOpen = false;

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
    this.buildEyeDropper();

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
    this.optionsMenu.lastChild.disabled = !this.zoomChrome;
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
    this.moveCrosshair(this.zoomWindow.width / 2, this.zoomWindow.height / 2);
  },
  moveCrosshair: function magnifier_moveCrosshair(x, y) {
    this.zoomWindow.cx = ~~x;
    this.zoomWindow.cy = ~~y;
    this.crosshair.style.left = (this.zoomWindow.zoom * this.zoomWindow.cx) + "px";
    this.crosshair.style.top = (this.zoomWindow.zoom * this.zoomWindow.cy) + "px";
  },
  /* ---------- UI builders ---------- */
  buildEyeDropper: function magnifier_eyeDropper() {
    let hbox = this.chromeDoc.createElement("hbox");
    this.colorbox = this.chromeDoc.createElement("box");
    this.colorbox.setAttribute("style", "width: 32px; border: 1px solid #333");

    this.colortext = this.chromeDoc.createElement("textbox");
    this.colortext.setAttribute("style", "border: 1px solid #333; -moz-box-flex: 1");
    this.colortext.className = "devtools-searchinput";

    let XHTML = "http://www.w3.org/1999/xhtml";
    this.resetButton = this.chromeDoc.createElementNS(XHTML, "div");
    this.resetButton.innerHTML = "Restart Drawing";
    this.resetButton.setAttribute("style", "text-decoration: none; margin: 2px; padding: 1px; cursor: pointer");
    if (this.isRendering)
      this.resetButton.innerHTML = "Lock Zoom";
    listen(this.chromeWin, this.resetButton, "click", this.startRenderingLoop, true);

    this.optionsButton = this.chromeDoc.createElement("toolbarbutton");
    this.optionsButton.setAttribute("type", "menu");
    this.optionsButton.setAttribute("style", "list-style-image: url(" + ICON_OPTIONS +")");
    this.optionsButton.className = "chromeclass-toolbar-additional";
    this.optionsMenu = this.chromeDoc.createElement("menupopup");
    this.optionsMenu.setAttribute("class", "popup-internal-box");
    let (item = this.chromeDoc.createElement("menuitem")) {
      item.setAttribute("label", "Zoom the whole Browser");
      item.setAttribute("type", "checkbox");
      item.setAttribute("checked", this.zoomChrome);
      listen(this.chromeWin, item, "command", this.onZoomChromeChange);
      this.optionsMenu.appendChild(item);
    }
    let (item = this.chromeDoc.createElement("menuitem")) {
      item.setAttribute("label", "Move with mouse");
      item.setAttribute("type", "checkbox");
      item.setAttribute("checked", (this.state == 1));
      item.setAttribute("disabled", !this.zoomChrome);
      listen(this.chromeWin, item, "command", this.panelStateChange);
      this.optionsMenu.appendChild(item);
    }
    this.optionsButton.appendChild(this.optionsMenu);

    hbox.appendChild(this.colorbox);
    hbox.appendChild(this.colortext);
    hbox.appendChild(this.resetButton);
    hbox.appendChild(this.optionsButton);
    this.panel.appendChild(hbox);
    let (spacer = this.chromeDoc.createElement("spacer")) {
      spacer.setAttribute("flex", "1");
      this.panel.appendChild(spacer);
    }
    let sizeBox = this.chromeDoc.createElement("hbox");
    sizeBox.setAttribute("style", "height: 3px;");
    let (spacer = this.chromeDoc.createElement("spacer")) {
      spacer.setAttribute("flex", "1");
      sizeBox.appendChild(spacer);
    }
    let resizer = this.chromeDoc.createElement("box");
    resizer.setAttribute("draggable", "true");
    resizer.setAttribute("style", "min-height:10px;max-height:10px;min-width:10px;" +
      "max-width:10px;cursor: se-resize;-moz-appearance:resizer;box-shadow:0px 0px 4px 4px rgba(50,200,225,0.5)");
    listen(this.chromeWin, resizer, "mousedown", this.resizeDragStart);
    listen(this.chromeWin, this.chromeWin, "mousemove", this.resizeDrag);
    listen(this.chromeWin, this.chromeWin, "mouseup", this.resizeDragEnd);
    this.resizer = resizer;
    sizeBox.appendChild(resizer);
    this.panel.appendChild(sizeBox);
  },
  buildPanel: function magnifier_buildPanel() {
    this.panel = this.chromeDoc.createElement("panel");
    this.panel.id = "devtools-magnifier-panel";
    this.panel.setAttribute("noautofocus", true);
    this.panel.setAttribute("noautohide", true);
    this.panel.setAttribute("backdrag", true);
    this.panel.setAttribute("level", "floating");
    this.panel.setAttribute("orient", "vertical");

    this.panel.setAttribute("style", "border-radius: 10px;" +
                                     "-moz-appearance: tooltip; padding: 10px;");

    listen(this.chromeWin, this.panel, "popupshown", this.onPopupShown, true);
    listen(this.chromeWin, this.panel, "popuphiding", this.onPopupHiding, true);
    listen(this.chromeWin, this.panel, "keypress", this.onKeyPressed, true);
    listen(this.chromeWin, this.panel, "keydown", this.onGridKeyPressed, true);
    listen(this.chromeWin, this.panel, "DOMMouseScroll", this.onMouseScrolled, true);
    this.chromeDoc.querySelector("#mainPopupSet").appendChild(this.panel);

    let hbox = this.chromeDoc.createElement("hbox");
    let box = this.chromeDoc.createElement("box");
    box.setAttribute("style", "display:block; position: relative");

    hbox.appendChild(box);
    let zoomSlider = this.chromeDoc.createElement("vbox");
    zoomSlider.setAttribute("flex", "1");
    let (spacer = this.chromeDoc.createElement("spacer")) {
      spacer.setAttribute("flex", "1");
      zoomSlider.appendChild(spacer);
    }
    let label16 = this.chromeDoc.createElement("label");
    label16.setAttribute("value", "16 x");
    label16.setAttribute("style", "padding: 0px 1px");
    zoomSlider.appendChild(label16);
    let zoomScope = this.chromeDoc.createElement("box");
    zoomScope.setAttribute("style", "min-width: 24px; max-width: 24px; min-height: 150px;" +
                                    "background-repeat: no-repeat; border: 1px solid black;" +
                                    "margin: 2px 6px");
    zoomScope.style.backgroundImage = "-moz-linear-gradient(bottom, blue 1px, transparent 3px)";
    zoomScope.style.backgroundSize = "100% " + ((150 - (this.zoomLevel - 2)*(150/14))/1.5) + "%";
    zoomSlider.appendChild(zoomScope);
    this.zoomScope = zoomScope;
    listen(this.chromeWin, this.zoomScope, "click", this.onZoomClick);
    let label2 = this.chromeDoc.createElement("label");
    label2.setAttribute("value", "2 x");
    label2.setAttribute("style", "padding: 0px 2px");
    zoomSlider.appendChild(label2);
    let (spacer = this.chromeDoc.createElement("spacer")) {
      spacer.setAttribute("flex", "1");
      zoomSlider.appendChild(spacer);
    }
    this.zoomSlider = zoomSlider;
    hbox.appendChild(zoomSlider);
    this.panel.appendChild(hbox);

    let XHTML = "http://www.w3.org/1999/xhtml";
    this.canvas = this.chromeDoc.createElementNS(XHTML, "canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.setAttribute("style", "image-rendering:-moz-crisp-edges;"
      + "border: 1px solid white; background-color:black");
    box.appendChild(this.canvas);

    this.grid = this.chromeDoc.createElement("box");
    this.grid.setAttribute("style", "position: absolute; top: 0; left: 0;");
    box.appendChild(this.grid);
    listen(this.chromeWin, this.grid, "click", this.onGridClicked, true);

    this.crosshair = this.chromeDoc.createElement("box");
    this.crosshair.setAttribute("style", "display: block; position: absolute;"
      + "border-width: 2px; border-style: solid; -moz-box-sizing: content-box;"
      + "margin-left: -1px; margin-top: -1px; pointer-events: none;");
    box.appendChild(this.crosshair);

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
    if (!this.isRendering)
      this.canvas.style.border = "1px solid white";
    this.isRendering = true;
    this.resetButton.innerHTML = "Lock Zoom";
    this.update();
  },
  stopRenderingLoop: function() {
    this.canvas.style.border = "1px solid black";
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
  onButtonClick: function magnifier_onButtonClick() {
    if (this.isOpen) {
      this.panel.hidePopup();
    } else {
      this.panel.openPopupAtScreen(this.position.left, this.position.top, false);
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
      this.panel.moveTo(e.screenX - this.panel.boxObject.width / 2 + this.zoomLevel,
                        e.screenY - this.panel.boxObject.height / 2 + this.zoomLevel);
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
    this.zoomScope.style.backgroundSize = "100% " + ((150 - (this.zoomLevel - 2)*(150/14))/1.5) + "%";
    this.setupZoom();
    this.stopRenderingLoop();
    this.startRenderingLoop();
  },
  onZoomClick: function magnifier_onZoomClick(e) {
    try {
      this.zoomLevel = 16 - Math.floor((e.screenY + 10 - this.zoomScope.boxObject.y)/(150/14));
    } catch (ex) {return;}
    this.zoomLevel = Math.min(Math.max(this.zoomLevel, 2), 16);
    let gWidth = Math.floor(this.position.width / this.zoomLevel) + 1;
    let gHeight = Math.floor(this.position.height / this.zoomLevel) + 1;
    this.zoomWindow.width = gWidth;
    this.zoomWindow.height = gHeight;
    this.zoomWindow.zoom = this.zoomLevel;
    this.zoomScope.style.backgroundSize = "100% " + ((150 - (this.zoomLevel - 2)*(150/14))/1.5) + "%";
    this.setupZoom();
    this.stopRenderingLoop();
    this.startRenderingLoop();
  },
  onMouseClick: function magnifier_onMouseClick(e) {
    if (e.screenX >= this.zoomScope.boxObject.x &&
        e.screenX <= this.zoomScope.boxObject.x + this.zoomScope.boxObject.width &&
        e.screenY >= this.zoomScope.boxObject.y - 8 &&
        e.screenY <= this.zoomScope.boxObject.y + this.zoomScope.boxObject.height + 8) {
      this.onZoomClick({screenY: e.screenY});
      return;
    }
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
    this.position.width = this.dragStart.origWidth + e.screenX - this.dragStart.x;
    this.position.height = this.dragStart.origHeight + e.screenY - this.dragStart.y;
    this.zoomWindow.width = Math.floor(this.position.width / this.zoomLevel) + 1;
    this.zoomWindow.height = Math.floor(this.position.height / this.zoomLevel) + 1;
    this.setupZoom();
    e.preventDefault();
    e.stopPropagation();
    this.panel.sizeTo(width, height);
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
