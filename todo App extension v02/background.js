'use strict';


chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    color: '#3aa757'
  }, function () {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          schemes: ['https']
        }
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
var ColorBadgeIcon = function () {
  this.random = function (max) {
    return Math.floor((Math.random() * max));
  }

  this.setIcon = function () {
    var canvas = document.getElementById("badge");
    var r = this.random(255),
      g = this.random(255),
      b = this.random(255);
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = 'rgb(' + [r, g, b].join(',') + ')';
    chrome.browserAction.setIcon({
      imageData: ctx.getImageData(0, 0, 19, 19)
    });
    ColorBadgeIcon.updateIcon(this);
  }
}

ColorBadgeIcon.updateIconColor = function (ctx) {
  window.setTimeout(function (badge) {
    badge.setIcon.call(badge)
  }, 1000, ctx);
}

document.addEventListener('DOMContentLoaded', function () {
  ColorBadgeIcon.updateIconColor(new ColorBadgeIcon());
});