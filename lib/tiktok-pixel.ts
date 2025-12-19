const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ""

export const initTikTokPixel = () => {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID || TIKTOK_PIXEL_ID === "YOUR_TIKTOK_PIXEL_ID") return

  // @ts-ignore
  !(function (w, d, t) {
    // @ts-ignore
    w.TiktokAnalyticsObject = t
    // @ts-ignore
    var ttq = (w[t] = w[t] || [])
    // @ts-ignore
    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
    ]
    // @ts-ignore
    ttq.setAndDefer = function (t, e) {
      // @ts-ignore
      t[e] = function () {
        // @ts-ignore
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
      }
    }
    // @ts-ignore
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
    // @ts-ignore
    ttq.instance = function (t) {
      // @ts-ignore
      for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n])
      return e
    }
    // @ts-ignore
    ttq.load = function (e, n) {
      // @ts-ignore
      var i = "https://analytics.tiktok.com/i18n/pixel/events.js"
      // @ts-ignore
      ttq._i = ttq._i || {}
      // @ts-ignore
      ttq._i[e] = []
      // @ts-ignore
      ttq._i[e]._u = i
      // @ts-ignore
      ttq._t = ttq._t || {}
      // @ts-ignore
      ttq._t[e] = +new Date()
      // @ts-ignore
      ttq._o = ttq._o || {}
      // @ts-ignore
      ttq._o[e] = n || {}
      var o = document.createElement("script")
      o.type = "text/javascript"
      o.async = !0
      o.src = i + "?sdkid=" + e + "&lib=" + t
      var a = document.getElementsByTagName("script")[0]
      // @ts-ignore
      a.parentNode.insertBefore(o, a)
    }

    ttq.load(TIKTOK_PIXEL_ID)
    ttq.page()
  })(window, document, "ttq")
}

export const trackTikTokEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID || TIKTOK_PIXEL_ID === "YOUR_TIKTOK_PIXEL_ID") return

  // @ts-ignore
  if (window.ttq) {
    // @ts-ignore
    window.ttq.track(eventName, data)
  }
}

export const trackTikTokPageView = () => {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID || TIKTOK_PIXEL_ID === "YOUR_TIKTOK_PIXEL_ID") return

  // @ts-ignore
  if (window.ttq) {
    // @ts-ignore
    window.ttq.page()
  }
}
