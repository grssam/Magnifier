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
const ICON_OPEN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAC9ElEQVR42p2SW0iTYRjH19TuhhdeRbchQmQXmuDZodtMN1djw0Qr3PIiMq0sdaOaghch6qahlrGQzBBPTSnFPM+lpm6mqFPxbM6ppeYB3eHbv+8z8CJXWX94eD943ufH7/3el0b7QwQCwamkpKSM4uJnoxWVNaY3FVXGkhcqXUpKSqZIJDpNO2ZcYmNjFdk5CogTpZCkPcXNxyrE3crEw8wnSJdKlzgczpm/QZx4PF7Xpejr9gyVFprJDTQbNtEwvAnt9DYqNHOQyJ4jMTFxLyQk5Pew8HCWiBslQG6lHmrdOt4ObuPdyB7ej+2jfngX6sHvqOw2Ij6tCFwub8nf35/h0IbJZM4kyF+j/KPpYLBpwoyWaRtapwm0TFnRaNhHrW4T+XXjCOcJQVoJj1B8fX3PhXG4yKkeRa1+E82TZrTPEOicAzrngY45O9pIaKNhD680Jggk6RSo5AiI1IxgRQhQ8mEWDaM76JixoWvBDu0CDkszT6B1yoyagXWIpUUICgpSOzIKDg3n42XLPJoMO+ias6Fn0Y7eLzis7gXScMaMusENXLuXR4Gqj4A8PDzcAoNCbIqaETSPb6FnwYJ+I4GBZTt0JhysfUuk5ewe6vVrYEXFUqB0h7dGNsrCLkvQMvIN/Yv70C9bMbRCYHiVwOcVG3RGCz7N76K4bgjMUDYCAgLOO+KcKCgoiIyK4uNBdjn6ZrdgWLPA8NX6s9asGFs1o0o7jQt+oXbyhpUObUh6rlarNbe1dyAu7iouihKg7l3ExLoVk+ukzeIuZMoqsDiRYLPZWi8vLxdHkML8/Hwb+cMRL5ZY5HI5VygUlsWLbxD3pZm4k/oIt++m4kpMzCyfz48mR+i/MpwDAwPzlEol4efnB1dXV4JOpyuoY1JNHx8fN7IfTA5HUO+M2u/o3ZxlsVhZKpXK7u3tfQBxcnIqpP1rkpOTB0tLS+Hu7k5B7M7Ozkra/0Qmk3E8PT0pCMjjZDnUPmboDAYjgITIye+T/wv5ARO/1YZFgyOzAAAAAElFTkSuQmCC";
const ICON_CLOSE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACnklEQVR42p2T3UuacRTHndrutIuuhrejm7F2UQSVaRJlNCsIbYHd2F0UqWTihZCDoJucdRGBEARBL7BiV9FVUTOoxFapvWlqL5r1D4yN8rtzfheDrWdb68Dh98jznM/v+z3nKJP9Jdrb21/09/f7Jicn4wsLC/m5ublcMBiMDAwMvLdYLBrZI6PIarUGRkdH0dvbi8HBQXi9XvT09MDn88Hj8WSNRuPLf0EUJpPpc0dHR4EU4PDwENFoFLu7uzg5OcHa2hqD0NfX97Wuru7PsKamJktraytmZ2exvb2NcDiMvb097O/vIxKJiN8bGxtwuVygC7M1NTUqSTUGgyHFNtbX10VhLBbD8fGxyKOjIxwcHIgLFhcXGQRSZX5Aqaqqek3eMT8/j52dHcTjcZyeniKRSCCZTIqTgQxbXV2FzWaDXq8PPgCRzGYKLC8vCzsMOTs7+yUZyMq2trbgdrtRW1v7SUqRnnqElZUV0WAuSqfTyGQyPzOVSokLuFcOh4NBHx+ANBpNiU6nu6O9Eb3hoouLC1xeXuLq6kqc5+fnwiJbb2lpAX3vkZwavZhpa2sTU2I1XJzNZpHL5cTJYLa4tLSE+vp6aLXaN1KcZ4FA4C2Pf2RkRFjL5/O4ubkRyc/X19diotSGAk1sTFIN0f2hUOgbL11XVxfMZjM2Nzdxe3srkhX6/X7wZBsbG0Pl5eVFUpCJ8fHxO7oJ3d3d32mXTASaoed73mT+mzidTnR2dqZpf95Rifx3hpLG/oEs3VdXV0OtVt/L5fIA2+SXlZWVJTQZPfWtmfeMv5fam1cNDQ3DU1NThYqKCgFRKBQTsv8Nu93+ZXp6GqWlpQwpKJXKMdlTgjbTWFZWhuLiYpCdYUnZjwy5SqXS0jlE+fypkB/TCtArFwC79QAAAABJRU5ErkJggg%3D%3D";
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
- zoom level menu
- add color tools
*/

function Magnifier(aWindow) {
  this.chromeWin = aWindow;
  this.tabbrowser = aWindow.gBrowser;
  this.chromeDoc = aWindow.document;

  // Bind!!!
  this.onPopupShown = this.onPopupShown.bind(this);
  this.onPopupHiding = this.onPopupHiding.bind(this);
  this.onButtonClick = this.onButtonClick.bind(this);
  this.onKeyPressed = this.onKeyPressed.bind(this);
  this.onPanelMouseOver = this.onPanelMouseOver.bind(this);
  this.onPanelMouseOut = this.onPanelMouseOut.bind(this);
  this.update = this.update.bind(this);
  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseClick = this.onMouseClick.bind(this);
  this.onTabSelect = this.onTabSelect.bind(this);
  this.onGridClicked = this.onGridClicked.bind(this);
  this.onGridKeyPressed = this.onGridKeyPressed.bind(this);
  this.startRenderingLoop = this.startRenderingLoop.bind(this);
  this.isOpen = false;

  this._init();
}

Magnifier.prototype = {

  _init: function magnifier__init() {
    this.zoomWindow = {
      x: 0,
      y: 0,
      cx: null,
      cy: null,
      width: 304 / 8 + 1,
      height: 304 / 8 + 1,
      zoom: 8,
    }

    this.buildButton();
    this.buildPanel();
    this.buildEyeDropper();

    listen(this.chromeWin, this.tabbrowser.tabContainer, "TabSelect", this.onTabSelect, false);
  },
  destroy: function magnifier_destroy() {
    this.panel.hidePopup();
    this.panel.parentNode.removeChild(this.panel);
    this.button.parentNode.removeChild(this.button);
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
    this.colortext.setAttribute("style", "border: 1px solid #333; color: #333; -moz-box-flex: 1");
    this.colortext.className = "devtools-searchinput";

    let XHTML = "http://www.w3.org/1999/xhtml";
    this.resetButton = this.chromeDoc.createElementNS(XHTML, "div");
    this.resetButton.innerHTML = "Reset";
    this.resetButton.setAttribute("style", "text-decoration: none; margin: 2px; padding: 1px; cursor: pointer");
    this.resetButton.addEventListener("click", this.startRenderingLoop, true);

    hbox.appendChild(this.colorbox);
    hbox.appendChild(this.colortext);
    hbox.appendChild(this.resetButton);
    this.panel.appendChild(hbox);
  },
  buildPanel: function magnifier_buildPanel() {
    this.panel = this.chromeDoc.createElement("panel");
    this.panel.id = "devtools-magnifier-panel";
    this.panel.setAttribute("noautofocus", true);
    this.panel.setAttribute("noautohide", true);
    this.panel.setAttribute("backdrag", true);
    this.panel.setAttribute("titlebar", "normal");
    this.panel.setAttribute("level", "floating");
    this.panel.setAttribute("orient", "vertical");

    this.panel.setAttribute("style", "border-radius: 4px; -moz-appearance: none; padding: 10px;");

    this.panel.setAttribute("type", "arrow");
    this.panel.addEventListener("popupshown", this.onPopupShown, true);
    this.panel.addEventListener("popuphiding", this.onPopupHiding, true);
    this.panel.addEventListener("keydown", this.onKeyPressed, true);
    this.panel.addEventListener("keydown", this.onGridKeyPressed, true);
    this.panel.addEventListener("mouseover", this.onPanelMouseOver, true);
    this.panel.addEventListener("mouseout", this.onPanelMouseOut, true);
    this.chromeDoc.querySelector("#mainPopupSet").appendChild(this.panel);

    let box = this.chromeDoc.createElement("box");
    box.setAttribute("style", "display:block; position: relative");

    this.panel.appendChild(box);

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
  buildButton: function magnifier_buildButton() {
    let button = this.chromeDoc.createElement("toolbarbutton");
    button.id = "devtools-magnifier-button";
    button.className = "chromeclass-toolbar-additional";
    button.setAttribute("style", "list-style-image: url(" + ICON_CLOSE +")");
    button.onclick = this.onButtonClick;
    this.chromeDoc.querySelector("#urlbar").appendChild(button);
    return this.button = button;
  },
  /* ---------- Content copy ---------- */
  startRenderingLoop: function() {
    if (!this.isRendering)
      this.canvas.style.border = "1px solid white";
    this.isRendering = true;
    this.update();
  },
  stopRenderingLoop: function() {
    this.canvas.style.border = "1px solid black";
    this.isRendering = false;
  },
  update: function magnifier_update() {
    let win = this.tabbrowser.selectedBrowser.contentWindow;
    if (win) { // Why do I need to do that?
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawWindow(win,
        this.zoomWindow.x + win.scrollX + 1, this.zoomWindow.y + win.scrollY + 1,
        this.zoomWindow.width, this.zoomWindow.height, "white");
    }
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
    let browser = this.tabbrowser.selectedBrowser;
    browser.addEventListener("mousemove", this.onMouseMove, true);
    browser.addEventListener("click", this.onMouseClick, true);
    browser.addEventListener("keydown", this.onKeyPressed, true);
    browser.addEventListener("keydown", this.onGridKeyPressed, true);
  },
  deattachPageEvents: function magnifier_deattachPageEvents() {
    let browser = this.tabbrowser.selectedBrowser;
    browser.removeEventListener("mousemove", this.onMouseMove, true);
    browser.removeEventListener("click", this.onMouseClick, true);
    browser.removeEventListener("keydown", this.onKeyPressed, true);
    browser.removeEventListener("keydown", this.onGridKeyPressed, true);
  },
  onPopupShown: function magnifier_onPopupShown() {
    this.button.setAttribute("style", "list-style-image: url(" + ICON_OPEN + ")");
    this.isOpen = true;
    this.startRenderingLoop();
    this.attachPageEvents();
  },
  onPopupHiding: function magnifier_onPopupHiding() {
    this.button.setAttribute("style", "list-style-image: url(" + ICON_CLOSE + ")");
    this.isOpen = false;
    this.stopRenderingLoop();
    this.deattachPageEvents();
  },
  onButtonClick: function magnifier_onButtonClick() {
    if (this.isOpen) {
      this.panel.hidePopup();
    } else {
      this.panel.openPopup(this.button, "after_start");
    }
  },
  onPanelMouseOver: function magnifier_onPanelMouseOver() {
    this.panel.style.background = "-moz-linear-gradient(top, rgba(0, 125, 200, 0.45) 0%, rgba(0,0,0,0) 10%)";
  },
  onPanelMouseOut: function magnifier_onPanelMouseOut() {
    this.panel.style.background = "-moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 10%)"
  },
  onTabSelect: function magnifier_onTabSelect() {
    if (this.isOpen)
      this.panel.hidePopup();
  },
  onMouseMove: function magnifier_onMouseMove(e) {
    this.zoomWindow.x = e.clientX - this.zoomWindow.width / 2;
    this.zoomWindow.y = e.clientY - this.zoomWindow.height / 2;
  },
  onMouseClick: function magnifier_onMouseClick(e) {
    if (!this.isRendering) return;
    this.stopRenderingLoop();
    e.preventDefault();
    e.stopPropagation();
  },
  onKeyPressed: function magnifier_onKeyPressed(e) {
    if (e.keyCode == e.DOM_VK_ESCAPE)
      this.panel.hidePopup();
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
      if (aWindow.magnifier)
        aWindow.magnifier.destroy();
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
