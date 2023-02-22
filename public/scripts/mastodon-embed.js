// https://gist.github.com/GreenFootballs/ad1ed63883683b4c4455ec6ea5a95d35

/**
 * Revised by Charles Johnson - https://github.com/GreenFootballs
 *
 * Runs automatically at window.onload(), searches document for iframes with a class of "mastodon-embed"
 * and resizes them to fit the content, using window.postMessage() to get the content height from the
 * embedded page.
 *
 * Adds an object named "_mastodonTools" to the window element, with an "embed" method.
 *
 * To resize dynamically added Mastodon iframes, call "_mastodonTools.embed(container, callback)"
 * where "container" is the enclosing element for the dynamic content.
 *
 * The "container" parameter can be a string with a CSS selector, a reference to a DOM element,
 * or left undefined to search the entire document.
 *
 * The "callback" parameter is an optional function called after all iframes are resized.
 */
(function () {
  "use strict";

  /**
   * @param {() => void} loaded
   */
  var ready = function (loaded) {
    if (document.readyState === "complete") {
      loaded();
    } else {
      document.addEventListener("readystatechange", function () {
        if (document.readyState === "complete") {
          loaded();
        }
      });
    }
  };

  ready(function () {
    window._mastodonTools = {
      iframes: new Map(),
      onRender: null,
      embed: function (container, callback) {
        window._mastodonTools.onRender = null;
        if (typeof container === "string") {
          container = document.querySelector(container);
          if (!container) return;
        } else if (typeof container === "undefined") {
          container = document;
        }
        var embeds = container.querySelectorAll("iframe.mastodon-embed");
        if (!embeds) return;
        Array.from(embeds).forEach(function (iframe, index, arr) {
          var id = 0,
            failCount = 0,
            idBuffer = new Uint32Array(1);
          while (id === 0 || window._mastodonTools.iframes.has(id)) {
            id = crypto.getRandomValues(idBuffer)[0]; // select unique id for each iframe
            failCount++;
            if (failCount > 100) {
              // give up and assign (easily guessable) unique number
              id = -(window._mastodonTools.iframes.size + 1);
              break;
            }
          }
          window._mastodonTools.iframes.set(id, iframe);
          iframe.scrolling = "no";
          iframe.style.overflow = "hidden";
          iframe.onload = function () {
            iframe.contentWindow.postMessage(
              { type: "setHeight", id: id },
              "*"
            ); // Send message requesting content height
          };
          iframe.onload();
          if (index === arr.length - 1 && typeof callback === "function")
            window._mastodonTools.onRender = callback;
        });
      },
    };
    window.addEventListener("message", function (e) {
      // The embedded page replies with the content height
      var data = e.data || {};
      if (
        typeof data !== "object" ||
        data.type !== "setHeight" ||
        !window._mastodonTools.iframes.has(data.id)
      )
        return;
      var iframe = window._mastodonTools.iframes.get(data.id);
      if ("source" in e && iframe.contentWindow !== e.source) return;
      iframe.height = data.height;
      if (typeof window._mastodonTools.onRender === "function") {
        window._mastodonTools.onRender();
        window._mastodonTools.onRender = null;
      }
    });
    window._mastodonTools.embed();
  });
})();
