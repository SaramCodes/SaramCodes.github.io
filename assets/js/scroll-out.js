var ScrollOut = function () {
    "use strict"
    function S(e, t, n) { return e < t ? t : n < e ? n : e } function w(e) { return +(0 < e) - +(e < 0) } var t = {}
    function A(e) { return t[e] || (t[e] = e.replace(/([A-Z])/g, n)) } function n(e) { return "-" + e[0].toLowerCase() } var D = window, E = document.documentElement
    function L(e, t) { return e && 0 !== e.length ? e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (t || E).querySelectorAll(e)) : [] } var P, b = function (e, t) { for (var n in t) e.setAttribute("data-" + A(n), t[n]) }, x = []
    function H() { x.slice().forEach(function (e) { return e() }), P = x.length ? requestAnimationFrame(H) : 0 } function O() { } var y = "scroll", W = "resize", _ = "addEventListener", N = "removeEventListener", T = 0
    return function (h) {
        var o, c, l, i, p, g, t, s = (h = h || {}).onChange || O, f = h.onHidden || O, u = h.onShown || O, a = h.cssProps ? (o = h.cssProps, function (e, t) {
            for (var n in t) (!0 === o || o[n]) && e.style.setProperty("--" + A(n), (r = t[n], Math.round(1e4 * r) / 1e4))
            var r
        }) : O, e = h.scrollingElement, m = e ? L(e)[0] : D, X = e ? L(e)[0] : E, r = ++T, v = function (e, t, n) { return e[t + r] !== (e[t + r] = JSON.stringify(n)) }, n = function () { i = !0 }, d = function () {
            i && (i = !1, l = L(h.targets || "[data-scroll]", L(h.scope || X)[0]).map(function (e) { return { $: e, ctx: {} } }))
            var v = X.clientWidth, d = X.clientHeight, e = w(-p + (p = X.scrollLeft || D.pageXOffset)), t = w(-g + (g = X.scrollTop || D.pageYOffset)), n = X.scrollLeft / (X.scrollWidth - v || 1), r = X.scrollTop / (X.scrollHeight - d || 1)
            c = { scrollDirX: e, scrollDirY: t, scrollPercentX: n, scrollPercentY: r }, l.forEach(function (e) {
                for (var t = e.$, n = t, r = 0, o = 0; r += n.offsetLeft, o += n.offsetTop, (n = n.offsetParent) && n !== m;); var i = t.clientWidth, c = t.clientHeight, l = (S(r + i, p, p + v) - S(r, p, p + v)) / i, s = (S(o + c, g, g + d) - S(o, g, g + d)) / c, f = S((p - (i / 2 + r - v / 2)) / (v / 2), -1, 1), u = S((g - (c / 2 + o - d / 2)) / (d / 2), -1, 1), a = +(h.offset ? h.offset <= g : (h.threshold || 0) < l * s)
                e.ctx = { elementHeight: c, elementWidth: i, intersectX: 1 === l ? 0 : w(r - p), intersectY: 1 === s ? 0 : w(o - g), offsetX: r, offsetY: o, viewportX: f, viewportY: u, visible: a, visibleX: l, visibleY: s }
            })
        }, Y = (t = function () {
            if (l) {
                var e = { scrollDirX: c.scrollDirX, scrollDirY: c.scrollDirY }
                v(X, "_SA", e) && b(X, e), v(X, "_S", c) && a(X, c)
                for (var t = l.length - 1; -1 < t; t--) {
                    var n = l[t], r = n.$, o = n.ctx, i = o.visible
                    v(r, "_SO", o) && a(r, o), v(r, "_SV", i) && (b(r, { scroll: i ? "in" : "out" }), o.index = t, s(r, o, X), (i ? u : f)(r, o, X)), i && h.once && l.splice(t, 1)
                }
            }
        }, x.push(t), P || H(), function () { !(x = x.filter(function (e) { return e !== t })).length && P && (P = 0, cancelAnimationFrame(P)) })
        return n(), d(), D[_](W, n), m[_](y, d), { index: n, teardown: function () { Y(), D[N](W, n), m[N](y, d) }, update: d }
    }
}()