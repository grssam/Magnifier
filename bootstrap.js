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
const BACKGROUND_NOISE = "data:image/png;base64,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";
const OPTIONS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAY1JREFUeNpi/P//PwMMMK5mIAv8D4XQbALSJOtlZOWXYqAU/J79lCx9rKnSDCxQNjcQi0FpYsBXIH4FpcGeB2JeKE0M+AXEn0E0zAGSTx/cqifF9dIKao1A6g44GJ/eEHQ31nhBiv6dZ29IAKmXMAew//n77zOJIcgOZz26wv5CU5U03UA98DTwHxL8WkAsQqT2N0B8jRESDQx/jX2EGFg5lBgYGQSIS7UMHxh+/7jHfHbLO1gI/AQa9hpEE+mAT/+R1P7Xsv0BdMArBkZG4kLx///vQAf8YDi7BZIIgZaLAtNAOolpYBKQ+gjmKJvwmimJPyRF/6l7L0Fp4BtyGnhHSRp4LMRHVhpggUQJw2s5ZY0DJKaB14ywwuTi7i8vrh02JSUNMP7+8QXugEGRBp49vB1ESghKyasuR04DCjyMJKWBB1/+o6aB33/+vqEkDTySUiFN97M7GGngOiVp4D+ZaQBcEP37D3YIB1KaIAT+APEPJkYwTZF+sAaoQV/IrQ3/znlKln4mYG0IEGAAjIaoHzMdX2kAAAAASUVORK5CYII=";
const SCOPE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnhJREFUeNqklc9rE0EUx2c2TZOgQU1tUhtiY1tK2luRXEQUBKEH8eCpVw+iF0+CZ/Ho1Uul/gEeiicPgnjQgwoNeClJiEZj2tU0P9rFRBO6uzO+mZ2JW5jdZjXwzXuZzJvZ93lvZnH4xDT634+5rv9z7JjPf8dASeE3Qb8Crj0Oigu/CzpQTdJ8Fjij1yoPmZgfNDOsl0+tTKE2E/O95vk9QMKySZeJ+YHZturxxm8bMTE/SAkk+lmQLcaY3xqxFA76eGLStkU4+PC9ryoFVjThPGC/zxzInm82FtLYQ6F0duERmM9+TQi4U5eWZhq8cQaUjyWjmNu3xW9TNJ3bVRGQWTO7CBsb7kmu38ugqKDgpiEbbhwRktG7h/tNN4VDyIwo+4GkIQnMf69V7g4zsklPxTYc0o5Lfzq78FjSsB68TuXPJRvyv90+UdYmFfvbcptfm5yGJBCBTfePPO+H50SGXn0rspO4cGRf7rjBQAxK55weoA7+JdBpUKZeLcdUC5ydy/XBbIPaoCJ2yoDs89cSKBydRRidpJPZiYnLN56p4jtvnq/iVq0DGxrIHHwhd57scQKUoj0wBdYTGKNFsBc9kvgAc0uMOmiAsWi8woufYMq8p67czJimqb4bup0ifrexLeOVp8BFYxlIUJE52+qjO2uvU6Ct3eY0aDI7F8uvcBL9zZeruFmryqx97wFJA7ILsRMhhkswXnBn7XkDChr0+j1iWZZc9BN+v1GRWfs+gIY5nh516iwvojaM90a5AO2nOo/Hr9aN4UUUixsw3gv6MvoB6EvSD/wuqBYMWt/Kc98cGPTqrWBvQ1djolHQe5VCxnvN+yPAAOEsDxWasUUvAAAAAElFTkSuQmCC";
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
  this.toggleRendering = this.toggleRendering.bind(this);
  this.onStateChange = this.onStateChange.bind(this);
  this.onMouseScrolled = this.onMouseScrolled.bind(this);
  this.onZoomClick = this.onZoomClick.bind(this);
  this.resizeDragStart = this.resizeDragStart.bind(this);
  this.resizeDrag = this.resizeDrag.bind(this);
  this.resizeDragEnd = this.resizeDragEnd.bind(this);
  this.panelDragStart = this.panelDragStart.bind(this);
  this.panelDrag = this.panelDrag.bind(this);
  this.panelDragEnd = this.panelDragEnd.bind(this);
  this.saveToolbarButtonInfo = this.saveToolbarButtonInfo.bind(this);
  this.changeColorFormat = this.changeColorFormat.bind(this);
  this.isOpen = false;
  this.colorFormat = "RGB";
  this.os = {
    linux: this.chromeWin.navigator.oscpu.search(/linux/i) > -1,
    mac: this.chromeWin.navigator.oscpu.search(/mac/i) > -1,
    windows: this.chromeWin.navigator.oscpu.search(/windows/i) > -1,
  };

  this._init();
}

Magnifier.prototype = {

  _init: function magnifier__init() {
    if (this.position.width == 0 || this.position.height == 0) {
      this.position.width = 475;
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

    this.panelDragOffset = {
      x: 0,
      y: 0,
    }

    this.buildButton();
    this.createHotKey();
    this.addMenuItem();
    this.buildPanel();

    listen(this.chromeWin, this.tabbrowser.tabContainer, "TabSelect", this.onTabSelect, false);
  },
  destroy: function magnifier_destroy() {
    // Clearing the memory.
    this.destroyButton();
    this.removeMenuItem();
    this.removeKey();
    this.panel.hidePopup();
    this.panel.parentNode.removeChild(this.panel);
    this.panel = null;
  },
  onStateChange: function magnifier_onStateChange(e) {
    let self = this;
    this.stateList.blur();
    this.chromeWin.setTimeout(function() {
      e.stopPropagation();
      e.preventDefault();
      self.stopRenderingLoop();
      self.deattachPageEvents();
      self.state = self.stateList.selectedIndex;
      self.attachPageEvents();
      self.startRenderingLoop();
    }, 50);
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
  buildPanel: function magnifier_buildPanel() {
    this.panel = this.chromeDoc.createElement("panel");
    this.panel.id = "devtools-magnifier-panel";
    this.panel.setAttribute("noautofocus", true);
    this.panel.setAttribute("noautohide", true);
    this.panel.setAttribute("level", "floating");
    this.panel.setAttribute("orient", "horizontal");

    this.panel.setAttribute("style",
                            "border-radius: 4px !important; border:1px solid #111;" +
                            "-moz-appearance:none; background: rgb(53,67,82);");

    listen(this.chromeWin, this.panel, "popupshown", this.onPopupShown, true);
    listen(this.chromeWin, this.panel, "popuphiding", this.onPopupHiding, true);
    listen(this.chromeWin, this.panel, "keypress", this.onKeyPressed, true);
    listen(this.chromeWin, this.panel, "keydown", this.onGridKeyPressed, true);
    listen(this.chromeWin, this.panel, "mousedown", this.panelDragStart, true);
    listen(this.chromeWin, this.chromeWin, "mousemove", this.panelDrag, true);
    listen(this.chromeWin, this.chromeWin, "mouseup", this.panelDragEnd, true);
    listen(this.chromeWin, this.panel, "DOMMouseScroll", this.onMouseScrolled, true);
    this.chromeDoc.querySelector("#mainPopupSet").appendChild(this.panel);

    // Left/Upper box containing the color and zoom information
    let (wrapper = this.chromeDoc.createElement("vbox")) {
      wrapper.setAttribute("style", "background: url('" + BACKGROUND_NOISE + "');");
      let (colorInfoBox = this.chromeDoc.createElement("toolbar")) {
        colorInfoBox.setAttribute("class", "devtools-toolbar");
        colorInfoBox.setAttribute("style", "border-bottom: 1px solid rgb(20,30,39) !important;");
        colorInfoBox.setAttribute("flex", "1");
        // Color Box
        this.colorbox = this.chromeDoc.createElement("box");
        this.colorbox.setAttribute("class", "devtools-searchinput");
        this.colorbox.setAttribute("style",
                                   "margin-left: 4px !important; width: 32px;" +
                                   "background-image: url('') !important;" +
                                   "box-shadow: 0 0 0 black !important");
        // Color Name
        this.colortext = this.chromeDoc.createElement("textbox");
        this.colortext.setAttribute("class", "devtools-searchinput");
        if (this.os.linux)
          this.colortext.style.width = "150px";
        this.colorFormatList = this.chromeDoc.createElement("menulist");
        this.colorFormatList.setAttribute("class", "devtools-menulist");
        let (menupop = this.chromeDoc.createElement("menupopup")) {
          ["RGB", "HSL", "Hex"].forEach(function(label) {
            let item = this.chromeDoc.createElement("menuitem");
            item.setAttribute("label", label);
            item.setAttribute("style", "text-align: center");
            menupop.appendChild(item);
          }.bind(this));
          this.colorFormatList.appendChild(menupop);
        }
        listen(this.chromeWin, this.colorFormatList, "command", this.changeColorFormat);
        // Start/Stop Rendering button
        this.resetButton = this.chromeDoc.createElement("toolbarbutton");
        this.resetButton.className = "developer-toolbar-button";
        this.resetButton.setAttribute("type", "checkbox");
        this.resetButton.setAttribute("style",
                                      "min-height: 24px !important; max-height: 24px !important;" +
                                      "min-width: 24px !important; max-width: 24px !important;" +
                                      "list-style-image: url(" + SCOPE + ");");
        if (this.isRendering) {
          this.resetButton.setAttribute("checked", true);
          this.resetButton.style.MozImageRegion = "rect(0px, 32px, 16px, 16px)";
        }
        else {
          this.resetButton.style.MozImageRegion = "rect(0px, 16px, 16px, 0px)";
        }
        this.resetButton.addEventListener("command", this.toggleRendering);
        // Close button
        this.closeButton = this.chromeDoc.createElement("toolbarbutton");
        this.closeButton.className = "devtools-closebutton";
        this.closeButton.onclick = this.onButtonClick;
        colorInfoBox.appendChild(this.colorbox);
        colorInfoBox.appendChild(this.colortext);
        colorInfoBox.appendChild(this.colorFormatList);
                // Zoom content or chrome option
        let stateList = this.chromeDoc.createElement("menulist");
        stateList.setAttribute("class", "devtools-menulist");
        let (menupop = this.chromeDoc.createElement("menupopup")) {
          ["Content Zoom", "Browser Zoom", "Mouse Zoom"].forEach(function(label) {
            let item = this.chromeDoc.createElement("menuitem");
            item.setAttribute("label", label);
            item.setAttribute("style", "text-align: center");
            menupop.appendChild(item);
          }.bind(this));
          stateList.appendChild(menupop);
        }
        this.stateList = stateList;
        listen(this.chromeWin, stateList, "command", this.onStateChange);
        colorInfoBox.appendChild(stateList);
        let (spacer = this.chromeDoc.createElement("spacer")) {
          spacer.setAttribute("flex", "1");
          colorInfoBox.appendChild(spacer);
        }
        colorInfoBox.appendChild(this.resetButton);
        let (menu = this.chromeDoc.createElement("toolbarbutton")) {
          menu.setAttribute("type", "checkbox");
          menu.setAttribute("class", "developer-toolbar-button");
          menu.setAttribute("style",
                            "min-height: 24px !important; max-height: 24px !important;" +
                            "min-width: 24px !important; max-width: 24px !important;" +
                            "list-style-image: url(" + OPTIONS + ")");
          menu.style.MozImageRegion = "rect(0px, 16px, 16px, 0px)";
          let (menupop = this.chromeDoc.createElement("menupopup")) {
            menu.addEventListener("command", function() {
              if (menupop.state == "open") {
                menupop.hidePopup();
                menu.style.MozImageRegion = "rect(0px, 16px, 16px, 0px)";
              }
              else {
                menu.style.MozImageRegion = "rect(0px, 32px, 16px, 16px)";
                menupop.openPopup(menu, "after_start");
              }
            });
            menupop.addEventListener("popuphidden", function() {
              menu.checked = false;
              menu.style.MozImageRegion = "rect(0px, 16px, 16px, 0px)";
            });
            // Show gridlines option
            let showGridOption = this.chromeDoc.createElement("menuitem");
            showGridOption.setAttribute("label", "Show Gridlines");
            showGridOption.setAttribute("type", "checkbox");
            showGridOption.setAttribute("checked", pref("showGrid"));
            this.showGrid = pref("showGrid");
            showGridOption.addEventListener("command", function() {
              this.showGrid = !this.showGrid;
            }.bind(this));
            menupop.appendChild(showGridOption);
            menu.appendChild(menupop);
          }
          colorInfoBox.appendChild(menu);
        }
        colorInfoBox.appendChild(this.closeButton);
        wrapper.appendChild(colorInfoBox);
      }
      let hbox = this.chromeDoc.createElement("hbox");
      let firstPane = this.chromeDoc.createElement("vbox");
      let (canvasBox = this.chromeDoc.createElement("box")) {
        canvasBox.setAttribute("style", "display:block; position: relative; margin: 10px 10px 5px");
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
        let (zoomSlider = this.chromeDoc.createElement("hbox")) {
          zoomSlider.setAttribute("flex", "1");
          let label2 = this.chromeDoc.createElement("label");
          label2.setAttribute("value", "2x");
          label2.setAttribute("style", "padding: 0px 2px;color:#eee");
          zoomSlider.appendChild(label2);
          let zoomScope = this.chromeDoc.createElement("box");
          zoomScope.setAttribute("flex", "1");
          zoomScope.setAttribute("style", "min-height: 14px;" +
            "background-repeat: no-repeat; border: 1px solid black;" +
            "margin: 1px 1px; max-height: 14px");
          zoomScope.style.backgroundImage = "-moz-linear-gradient(right, #eee 1px, rgba(0,0,0,0) 1px)";
          zoomScope.style.backgroundSize = ((this.zoomLevel - 2)*
                                           (zoomScope.boxObject.width/6)) + "% 100%";
          zoomSlider.appendChild(zoomScope);
          this.zoomScope = zoomScope;
          listen(this.chromeWin, this.zoomScope, "click", this.onZoomClick);
          let label8 = this.chromeDoc.createElement("label");
          label8.setAttribute("value", "8x");
          label8.setAttribute("style", "padding: 0px 2px;color:#eee");
          zoomSlider.appendChild(label8);
          sizeBox.appendChild(zoomSlider);
        }
        let resizer = this.chromeDoc.createElement("box");
        resizer.setAttribute("draggable", "true");
        resizer.setAttribute("style", "min-height:3px;max-height:3px;margin-right: 2px;" +
          "min-width:3px;max-width:3px;cursor: se-resize;-moz-appearance:resizer;");
        listen(this.chromeWin, resizer, "mousedown", this.resizeDragStart);
        listen(this.chromeWin, this.chromeWin, "mousemove", this.resizeDrag);
        listen(this.chromeWin, this.chromeWin, "mouseup", this.resizeDragEnd);
        this.resizer = resizer;
        sizeBox.appendChild(resizer);
        firstPane.appendChild(sizeBox);
      }
      hbox.appendChild(firstPane);
      wrapper.appendChild(hbox);
      this.panel.appendChild(wrapper);
    }
    this.setupZoom();
  },
  updateGridColor: function magnifier_updateGridColor() {
    if (!this.showGrid || !this.isRendering) {
      this.lastGridColor = null;
      this.grid.style.backgroundImage = "-moz-linear-gradient(left, rgba(0,0,0,0) 1px, transparent 1px)," +
                                        "-moz-linear-gradient(top, rgba(0,0,0,0) 1px, transparent 1px)";
      return;
    }
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
      this.button = null;
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
  removeMenuItem: function magnifier_removeMenuItem() {
    try {
      this.menuitem.parentNode.removeChild(this.menuitem);
      this.menuitem = null;
      this.appitem.parentNode.removeChild(this.appitem);
      this.appitem = null;
    } catch(ex) {}
  },
  addMenuItem: function magnifier_addMenuItem() {
    let XUL = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    let menuitem = this.chromeDoc.createElementNS(XUL, "menuitem");
    menuitem.setAttribute("id", "devtools-magnifier-tools-menu");
    menuitem.setAttribute("label", "Magnifier");
    menuitem.setAttribute("accesskey", "M");
    menuitem.setAttribute("key", "devtools-magnifier-key");
    menuitem.onclick = this.onButtonClick;
    this.menuitem = menuitem;
    this.chromeDoc.getElementById("menuWebDeveloperPopup").
      insertBefore(menuitem, this.chromeDoc.getElementById("webConsole"));

    if (!this.os.mac) {
      let appMenu = this.chromeDoc.getElementById("appmenu_webDeveloper_popup");
      if (appMenu) {
        let appMenuItem = this.chromeDoc.createElementNS(XUL, "menuitem");
        appMenuItem.setAttribute("id", "appmenu_devtools-magnifier");
        appMenuItem.setAttribute("label", "Magnifier");
        appMenuItem.setAttribute("accesskey", "M");
        appMenuItem.setAttribute("key", "devtools-magnifier-key");
        appMenuItem.onclick = this.onButtonClick;
        this.appitem = appMenuItem;
        appMenu.insertBefore(appMenuItem, this.chromeDoc.getElementById("appmenu_webConsole"));
      }
    }
  },
  removeKey: function magnifier_removeKey() {
    try {
      this.keyset.parentNode.removeChild(this.keyset);
      this.keyset = null;
    } catch(ex) {}
  },
  createHotKey: function magnifier_createHotKey() {
    let XUL = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    let keyset = this.chromeDoc.createElementNS(XUL, "keyset");
    keyset.setAttribute("id", "devtools-magnifier-keyset");
    this.keyset = keyset;
    // add hotkey
    let key = this.chromeDoc.createElementNS(XUL, "key");
    key.setAttribute("id", "devtools-magnifier-key");
    key.setAttribute("key", "M");
    key.setAttribute("modifiers", "accel,shift");
    key.setAttribute("oncommand", "void(0);");
    listen(this.chromeWin, key, "command", this.onButtonClick);
    this.chromeDoc.getElementById("mainKeyset").parentNode.
      appendChild(keyset).appendChild(key);
  },
  /* ---------- Content copy ---------- */
  startRenderingLoop: function() {
    this.isRendering = true;
    this.update();
  },
  stopRenderingLoop: function() {
    this.isRendering = false;
  },
  toggleRendering: function magnifier_toggleRendering() {
    if (this.isRendering) {
      this.stopRenderingLoop();
      this.resetButton.style.MozImageRegion = "rect(0px, 16px, 16px, 0px)";
    }
    else {
      this.startRenderingLoop();
      this.resetButton.style.MozImageRegion = "rect(0px, 32px, 16px, 16px)";
    }
  },
  update: function magnifier_update() {
    let win = this.state > 0? this.chromeWin:
                              this.tabbrowser.selectedBrowser.contentWindow;
    if (win) { // Why do I need to do that?
      let x = this.zoomWindow.x + 1, y = this.zoomWindow.y;
      if (this.state > 0) { // Some wierd adjustments
        x -= win.screenX + (this.os.windows?8:0);
        y -= win.screenY + (this.os.windows?0:26);
      }
      else {
        x += win.scrollX;
        y += win.scrollY;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawWindow(win, x, y, this.zoomWindow.width, this.zoomWindow.height, "white");
    }
    if (this.isRendering) this.chromeWin.mozRequestAnimationFrame(this.update);
    this.updateColor();
  },
  changeColorFormat: function magnifier_changeColorFormat() {
    let self = this;
    this.colorFormatList.blur();
    let wasRendering = this.isRendering;
    this.chromeWin.setTimeout(function() {
      self.colorFormat = self.colorFormatList.getItemAtIndex(self.colorFormatList.selectedIndex).label;
      self.updateColor();
      if (wasRendering)
        self.startRenderingLoop();
    }, 50);
  },
  updateColor: function magnifier_updateColor() {
    let pixel = this.ctx.getImageData(this.zoomWindow.cx, this.zoomWindow.cy, 1, 1).data;
    let r = ~~pixel[0];
    let g = ~~pixel[1];
    let b = ~~pixel[2];
    this.color = {r:r, g:g, b:b};
    if (this.colorFormat == "RGB")
      this.colorName = "rgb(" + r + "," + g + "," + b + ")";
    else if (this.colorFormat == "HSL") {
      let {h,s,l} = this.RGB2HSL(this.color);
      this.colorName = "hsl(" + h + "," + s + "," + l + ")";
    }
    else {
      let hex = this.RGB2Hex(this.color);
      this.colorName = "#" + hex;
    }
    this.colorbox.style.backgroundColor = this.colorName;
    this.colortext.value = this.colorName;
    this.updateGridColor();
  },
  RGB2HSL: function magnifier_RGB2HSL({r,g,b}) {
    let h, s, l, min, max, delta;
    if (r > g){
      max = Math.max (r, b);
      min = Math.min (g, b);
    } else{
      max = Math.max (g, b);
      min = Math.min (r, b);
    }
    l = (max + min) / 2.0;

    if (max == min) {
      s = 0.0;
      h = 0.0;
    } else {
      delta = (max - min);
      if (l < 128) {
        s = 255 * delta / (max + min);
      } else {
        s = 255 * delta / (511 - max - min);
      }
      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h = h * 42.5;
      if (h < 0){ h += 255; }
      else if (h > 255){ h -= 255; }
    }

    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);
    return {h:h,s:s,l:l};
  },
  RGB2Hex: function magnifier_RGB2Hex({r,g,b}) {
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "" + hex(r) + hex(g) + hex(b);
  },
  /* ---------- Events and callbacks ---------- */
  attachPageEvents: function magnifier_attachPageEvents() {
    let win = this.state > 0? this.chromeWin:
                              this.tabbrowser.selectedBrowser;
    win.addEventListener("mousemove", this.onMouseMove, true);
    win.addEventListener("click", this.onMouseClick, true);
    win.addEventListener("keypress", this.onKeyPressed, true);
    win.addEventListener("keydown", this.onGridKeyPressed, true);
  },
  deattachPageEvents: function magnifier_deattachPageEvents() {
    let win = this.state > 0? this.chromeWin:
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
    this.stateList.selectedIndex = this.state;
    this.startRenderingLoop();
    this.resetButton.setAttribute("checked", true);
    this.resetButton.style.MozImageRegion = "rect(0px, 32px, 16px, 16px)";
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
    pref("showGrid", this.showGrid);

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
  onTabSelect: function magnifier_onTabSelect(e) {
    if (this.isOpen && this.state == 0)
      this.panel.hidePopup();
  },
  onMouseMove: function magnifier_onMouseMove(e) {
    if (!this.isRendering)
      return;
    this.zoomWindow.x = (this.state > 0? e.screenX: e.clientX) - this.zoomWindow.width / 2;
    this.zoomWindow.y = (this.state > 0? e.screenY: e.clientY) - this.zoomWindow.height / 2;
    if (this.state == 2 && this.isRendering) {
      this.panel.moveTo(e.screenX - this.position.width / 2 - this.zoomLevel / 2 -
                        (this.canvasBox.boxObject.x - this.panel.boxObject.x),
                        e.screenY - this.position.height / 2 - this.zoomLevel / 2 -
                        (this.canvasBox.boxObject.y - this.panel.boxObject.y));
    }
  },
  onMouseScrolled: function magnifier_onMouseScrolled(e) {
    let change = e.detail > 0 ? 0.25: -0.25;
    this.zoomLevel = Math.min(Math.max(this.zoomLevel - change, 2), 8);
    let gWidth = Math.floor((this.docked?this.position.dockedWidth:
                                         this.position.width) / this.zoomLevel) + 1;
    let gHeight = Math.floor((this.docked?this.position.dockedHeight:
                                          this.position.height) / this.zoomLevel) + 1;
    this.zoomWindow.x -= (gWidth - this.zoomWindow.width) / 2;
    this.zoomWindow.y -= (gHeight - this.zoomWindow.height) / 2;
    this.zoomWindow.width = gWidth;
    this.zoomWindow.height = gHeight;
    this.zoomWindow.zoom = this.zoomLevel;
    this.zoomScope.style.backgroundSize = ((this.zoomLevel - 2)*(100/6)) + "% 100%";
    this.setupZoom();
    if (!this.isRendering)
      this.update();
  },
  onZoomClick: function magnifier_onZoomClick(e) {
    try {
      this.zoomLevel = 2 + Math.floor(4*(e.screenX + 10 - this.zoomScope.boxObject.x)/
                                      (this.zoomScope.boxObject.width/6))/4;
    } catch (ex) {return;}
    this.zoomLevel = Math.min(Math.max(this.zoomLevel, 2), 8);
    let gWidth = Math.floor((this.docked?this.position.dockedWidth:
                                         this.position.width) / this.zoomLevel) + 1;
    let gHeight = Math.floor((this.docked?this.position.dockedHeight:
                                          this.position.height) / this.zoomLevel) + 1;
    this.zoomWindow.x -= Math.floor((gWidth - this.zoomWindow.width) / 2);
    this.zoomWindow.y -= Math.floor((gHeight - this.zoomWindow.height) / 2);
    this.zoomWindow.width = gWidth;
    this.zoomWindow.height = gHeight;
    this.zoomWindow.zoom = this.zoomLevel;
    this.zoomScope.style.backgroundSize = ((this.zoomLevel - 2)*(100/6)) + "% 100%";
    this.setupZoom();
    if (!this.isRendering)
      this.update();
  },
  onMouseClick: function magnifier_onMouseClick(e) {
    if (this.colorFormatList.firstChild.state == "open" ||
        this.colorFormatList.firstChild.state == "hiding")
      return;
    let screenY = e.screenY + (this.os.windows?8:-55), screenX = e.screenX;
    if (this.state > 0 && !(screenX >= this.canvasBox.boxObject.x &&
        screenX <= this.canvasBox.boxObject.x + this.canvasBox.boxObject.width &&
        screenY >= this.canvasBox.boxObject.y &&
        screenY <= this.canvasBox.boxObject.y + this.canvasBox.boxObject.height) &&
        (screenX >= this.panel.boxObject.x &&
        screenX <= this.panel.boxObject.x + this.panel.boxObject.width &&
        screenY >= this.panel.boxObject.y &&
        screenY <= this.panel.boxObject.y + this.panel.boxObject.height))
      return;
    if (!this.isRendering) return;
    this.stopRenderingLoop();
    this.resetButton.removeAttribute("checked");
    this.resetButton.style.MozImageRegion = "rect(0px, 16px, 16px, 0px)";
    e.preventDefault();
    e.stopPropagation();
  },
  panelDragStart: function magnifier_panelDragStart(e) {
    let screenY = e.screenY + (this.os.windows?8:-55), screenX = e.screenX;
    this.panelDragOffset.x = screenX - this.panel.boxObject.x;
    this.panelDragOffset.y = screenY - this.panel.boxObject.y;
    this.panelDragOffset.wasRendering = this.isRendering;
    this.panelDragOffset.mouseMoved = false;
    this.panelDragMouseDown = true;
  },
  panelDrag: function magnifier_panelDrag(e) {
    if (!this.panelDragMouseDown || this.dragMouseDown) {
      this.panelDragMouseDown = false;
      return;
    }
    e.preventDefault();
    this.panelDragOffset.mouseMoved = true;
    let x = e.screenX, y = e.screenY;
    if (this.panelDragOffset.x != null)
      x -= this.panelDragOffset.x;
    if (this.panelDragOffset.y != null)
      y -= this.panelDragOffset.y;
    let screenWidth = this.chromeWin.screen.width,
        screenHeight = this.chromeWin.screen.height;
    if (this.docked) {
      if (e.screenX > 0.1*screenWidth &&
          e.screenX < 0.9*screenWidth &&
          e.screenY > 0.1*screenHeight &&
          e.screenY < 0.9*screenHeight)
        this.docked = this.dockPanel("");
      if (!this.docked && (e.screenX < this.panel.boxObject.x ||
          e.screenX > this.panel.boxObject.x + this.panel.boxObject.width)) {
        x = e.screenX - this.panel.boxObject.width / 2;
        this.panelDragOffset.x = this.panel.boxObject.width / 2;
      }
      else if (!this.docked && (e.screenY < this.panel.boxObject.y ||
          e.screenY > this.panel.boxObject.y + this.panel.boxObject.height)) {
        y = e.screenY - this.panel.boxObject.height / 2;
        this.panelDragOffset.y = this.panel.boxObject.height / 2;
      }
    }
    else {
      let indicationPlace = "";
      if (e.screenX < 0.05*screenWidth)
        indicationPlace = "left";
      else if (e.screenX > 0.95*screenWidth)
        indicationPlace = "right";
      else if (e.screenY < 0.05*screenHeight)
        indicationPlace = "top";
      else if (e.screenY > 0.95*screenHeight)
        indicationPlace = "bottom";
      if (indicationPlace != "")
        this.showIndicatoryPanel(indicationPlace);
      else if (this.iPanel && this.iPanel.state == "open")
        this.iPanel.hidePopup();
    }
    if (!this.docked)
      this.panel.moveTo(x, y);
  },
  panelDragEnd: function magnifier_panelDragEnd(e) {
    if (!this.panelDragMouseDown || this.dragMouseDown || !this.panelDragOffset.mouseMoved) {
      this.panelDragMouseDown = false;
      return;
    }
    let screenWidth = this.chromeWin.screen.width,
        screenHeight = this.chromeWin.screen.height;
    let dockTo = "";
    if (e.screenX < 0.05*screenWidth)
      dockTo = "left";
    else if (e.screenX > 0.95*screenWidth)
      dockTo = "right";
    else if (e.screenY < 0.05*screenHeight)
      dockTo = "top";
    else if (e.screenY > 0.95*screenHeight)
      dockTo = "bottom";
    if (dockTo != "")
      this.docked = this.dockPanel(dockTo);
    if (this.panelDragOffset.wasRendering) {
      let self = this;
      this.chromeWin.setTimeout(function() {
        self.stopRenderingLoop();
        self.startRenderingLoop();
      }, 100);
    }
    this.panelDragMouseDown = false;
  },
  dockPanel: function magnifier_dockPanel(aDockTo) {
    let width = this.chromeWin.screen.width,
        height = this.chromeWin.screen.height;
    if (this.iPanel && this.iPanel.state == "open")
      this.iPanel.hidePopup();
    switch(aDockTo) {
      case "top":
        this.position.dockedWidth = width - 40;
        this.position.dockedHeight = 250;
        this.zoomWindow.width = Math.floor((width - 40) / this.zoomLevel) + 1;
        this.zoomWindow.height = Math.floor(250 / this.zoomLevel) + 1;
        this.setupZoom();
        this.panel.moveTo(0, 0);
        this.panel.setAttribute("orient", "horizontal");
        break;
      case "bottom":
        this.position.dockedWidth = width - 40;
        this.position.dockedHeight = 250;
        this.zoomWindow.width = Math.floor((width - 40) / this.zoomLevel) + 1;
        this.zoomWindow.height = Math.floor(250 / this.zoomLevel) + 1;
        this.setupZoom();
        this.panel.moveTo(0, height - 340);
        this.panel.setAttribute("orient", "horizontal");
        break;
      case "left":
        this.position.dockedWidth = 300;
        this.position.dockedHeight = height - 40;
        this.zoomWindow.height = Math.floor((height - 40) / this.zoomLevel) + 1;
        this.zoomWindow.width = Math.floor(300 / this.zoomLevel) + 1;
        this.setupZoom();
        this.panel.moveTo(0, 0);
        this.panel.setAttribute("orient", "vertical");
        break;
      case "right":
        this.position.dockedWidth = 300;
        this.position.dockedHeight = height - 40;
        this.zoomWindow.height = Math.floor((height - 40) / this.zoomLevel) + 1;
        this.zoomWindow.width = Math.floor(300 / this.zoomLevel) + 1;
        this.setupZoom();
        this.panel.moveTo(width - 310, 0);
        this.panel.setAttribute("orient", "vertical");
        break;
      default:
        if (this.docked) {
          this.zoomWindow.width = Math.floor(this.position.width / this.zoomLevel) + 1;
          this.zoomWindow.height = Math.floor(this.position.height / this.zoomLevel) + 1;
          this.panel.setAttribute("orient", "horizontal");
          if (!this.os.windows)
            this.panel.sizeTo(this.position.width + 20,
                              this.position.height + 50);
          this.setupZoom();
          if (!this.isRendering)
            this.update();
        }
        return false;
    }
    if (!this.os.windows)
      this.panel.sizeTo(this.position.dockedWidth + 40, this.position.dockedHeight + 40);
    if (!this.isRendering)
      this.update();
    return true;
  },
  showIndicatoryPanel: function magnifier_showIndicatoryPanel(aWhere) {
    if (!this.iPanel) {
      this.iPanel = this.chromeDoc.createElement("panel");
      this.iPanel.id = "devtools-magnifier-indication-panel";
      this.iPanel.setAttribute("noautofocus", true);
      this.iPanel.setAttribute("noautohide", true);
      this.iPanel.setAttribute("level", "floating");
      this.iPanel.setAttribute("style", "-moz-appearance: none !important;background:rgba(0,100,150,0.1);" +
                                        "border:3px solid #36a;border-radius:5px;");
      if (!this.os.windows) {
        let label = this.chromeDoc.createElement("label");
        label.setAttribute("value", "Dock here");
        this.iPanel.appendChild(label);
        this.iPanel.style.background = "white";
      }
      this.chromeDoc.querySelector("#mainPopupSet").appendChild(this.iPanel);
    }
    let x = 0, y = 0, width = 0, height = 0,
        screenWidth = this.chromeWin.screen.width,
        screenHeight = this.chromeWin.screen.height;
    switch (aWhere) {
      case "left":
        width = 300;
        height = screenHeight;
        if (!this.os.windows)
          y = screenHeight/2 - 50;
        break;
      case "right":
        width = 300;
        height = screenHeight;
        x = screenWidth - (this.os.windows?304:100);
        if (!this.os.windows)
          y = screenHeight/2 - 50;
        break;
      case "top":
        width = screenWidth;
        height = 300;
        if (!this.os.windows)
          x = screenWidth/2 - 50;
        break;
      case "bottom":
        width = screenWidth;
        height = 300;
        y = screenHeight - (this.os.windows?310:50);
        if (!this.os.windows)
          x = screenWidth/2 - 50;
        break;
    }
    if (!this.os.windows) {
      width = 100;
      height = 50;
    }
    if (this.iPanel.state == "open")
      this.iPanel.moveTo(x, y);
    else
      this.iPanel.openPopupAtScreen(x, y);
    this.iPanel.sizeTo(width, height);
  },
  resizeDragStart: function magnifier_resizeDragStart(e) {
    if (this.docked)
      return;
    this.dragStart.x = e.screenX;
    this.dragStart.y = e.screenY;
    this.dragStart.origWidth = this.position.width;
    this.dragStart.origHeight = this.position.height;
    this.dragStart.width = this.panel.boxObject.width;
    this.dragStart.height = this.panel.boxObject.height;
    this.dragStart.wasRendering = this.isRendering;
    this.dragMouseDown = true;
    this.stopRenderingLoop();
  },
  resizeDrag: function magnifier_resizeDrag(e) {
    if (this.dragStart.x == -1 || this.dragStart.y == -1 || !this.dragMouseDown)
      return;
    let width = this.dragStart.width + e.screenX - this.dragStart.x;
    let height = this.dragStart.height + e.screenY - this.dragStart.y;
    e.preventDefault();
    e.stopPropagation();
    if (width > 475) {
      this.position.width = this.dragStart.origWidth + e.screenX - this.dragStart.x;
      this.zoomWindow.width = Math.floor(this.position.width / this.zoomLevel) + 1;
    }
    if (height > 350) {
      this.position.height = this.dragStart.origHeight + e.screenY - this.dragStart.y;
      this.zoomWindow.height = Math.floor(this.position.height / this.zoomLevel) + 1;
    }
    this.setupZoom();
    this.update();
    if (!this.os.windows)
      this.panel.sizeTo(width, height);
  },
  resizeDragEnd: function magnifier_resizeDragEnd(e) {
    if (!this.dragMouseDown)
      return;
    this.dragMouseDown = false;
    let self = this;
    if (this.dragStart.wasRendering)
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
