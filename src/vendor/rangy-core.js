/**
 * Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Copyright 2013, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.772
 * Build date: 26 February 2013
 */
var rangy;
(rangy =
  rangy ||
  (function () {
    function h(c, d) {
      var e = typeof c[d];
      return e == b || (e == a && !!c[d]) || e == 'unknown';
    }
    function i(b, c) {
      return typeof b[c] == a && !!b[c];
    }
    function j(a, b) {
      return typeof a[b] != c;
    }
    function k(a) {
      return function (b, c) {
        var d = c.length;
        while (d--) if (!a(b, c[d])) return !1;
        return !0;
      };
    }
    function o(a) {
      return a && l(a, g) && n(a, f);
    }
    function p(a) {
      return i(a, 'body') ? a.body : a.getElementsByTagName('body')[0];
    }
    function s(a) {
      i(window, 'console') && h(window.console, 'log') && window.console.log(a);
    }
    function t(a, b) {
      b ? window.alert(a) : s(a);
    }
    function u(a) {
      (r.initialized = !0),
        (r.supported = !1),
        t(
          'Rangy is not supported on this page in your browser. Reason: ' + a,
          r.config.alertOnFail
        );
    }
    function v(a) {
      t('Rangy warning: ' + a, r.config.alertOnWarn);
    }
    function y(a) {
      return a.message || a.description || String(a);
    }
    function z() {
      if (r.initialized) return;
      var a,
        b = !1,
        c = !1;
      h(document, 'createRange') &&
        ((a = document.createRange()),
        l(a, e) && n(a, d) && (b = !0),
        a.detach());
      var f = p(document);
      if (!f || f.nodeName.toLowerCase() != 'body') {
        u('No body element found');
        return;
      }
      f &&
        h(f, 'createTextRange') &&
        ((a = f.createTextRange()), o(a) && (c = !0));
      if (!b && !c) {
        u('Neither Range nor TextRange are available');
        return;
      }
      (r.initialized = !0),
        (r.features = { implementsDomRange: b, implementsTextRange: c });
      var g, i;
      for (var j in q) (g = q[j]) instanceof C && g.init();
      for (var k = 0, m = x.length; k < m; ++k)
        try {
          x[k](r);
        } catch (t) {
          (i =
            'Rangy init listener threw an exception. Continuing. Detail: ' +
            y(t)),
            s(i);
        }
    }
    function B(a) {
      (a = a || window), z();
      for (var b = 0, c = A.length; b < c; ++b) A[b](a);
    }
    function C(a, b) {
      (this.name = a),
        (this.initialized = !1),
        (this.supported = !1),
        (this.init = b);
    }
    var a = 'object',
      b = 'function',
      c = 'undefined',
      d = [
        'startContainer',
        'startOffset',
        'endContainer',
        'endOffset',
        'collapsed',
        'commonAncestorContainer',
      ],
      e = [
        'setStart',
        'setStartBefore',
        'setStartAfter',
        'setEnd',
        'setEndBefore',
        'setEndAfter',
        'collapse',
        'selectNode',
        'selectNodeContents',
        'compareBoundaryPoints',
        'deleteContents',
        'extractContents',
        'cloneContents',
        'insertNode',
        'surroundContents',
        'cloneRange',
        'toString',
        'detach',
      ],
      f = [
        'boundingHeight',
        'boundingLeft',
        'boundingTop',
        'boundingWidth',
        'htmlText',
        'text',
      ],
      g = [
        'collapse',
        'compareEndPoints',
        'duplicate',
        'moveToElementText',
        'parentElement',
        'select',
        'setEndPoint',
        'getBoundingClientRect',
      ],
      l = k(h),
      m = k(i),
      n = k(j),
      q = {},
      r = {
        version: '1.3alpha.772',
        initialized: !1,
        supported: !0,
        util: {
          isHostMethod: h,
          isHostObject: i,
          isHostProperty: j,
          areHostMethods: l,
          areHostObjects: m,
          areHostProperties: n,
          isTextRange: o,
          getBody: p,
        },
        features: {},
        modules: q,
        config: { alertOnFail: !0, alertOnWarn: !1, preferTextRange: !1 },
      };
    (r.fail = u),
      (r.warn = v),
      {}.hasOwnProperty
        ? (r.util.extend = function (a, b, c) {
            var d, e;
            for (var f in b)
              b.hasOwnProperty(f) &&
                ((d = a[f]),
                (e = b[f]),
                c &&
                  d !== null &&
                  typeof d == 'object' &&
                  e !== null &&
                  typeof e == 'object' &&
                  r.util.extend(d, e, !0),
                (a[f] = e));
            return a;
          })
        : u('hasOwnProperty not supported'),
      (function () {
        var a = document.createElement('div');
        a.appendChild(document.createElement('span'));
        var b = [].slice,
          c;
        try {
          b.call(a.childNodes, 0)[0].nodeType == 1 &&
            (c = function (a) {
              return b.call(a, 0);
            });
        } catch (d) {}
        c ||
          (c = function (a) {
            var b = [];
            for (var c = 0, d = a.length; c < d; ++c) b[c] = a[c];
            return b;
          }),
          (r.util.toArray = c);
      })();
    var w;
    h(document, 'addEventListener')
      ? (w = function (a, b, c) {
          a.addEventListener(b, c, !1);
        })
      : h(document, 'attachEvent')
      ? (w = function (a, b, c) {
          a.attachEvent('on' + b, c);
        })
      : u(
          'Document does not have required addEventListener or attachEvent method'
        ),
      (r.util.addListener = w);
    var x = [];
    (r.init = z),
      (r.addInitListener = function (a) {
        r.initialized ? a(r) : x.push(a);
      });
    var A = [];
    (r.addCreateMissingNativeApiListener = function (a) {
      A.push(a);
    }),
      (r.createMissingNativeApi = B),
      (C.prototype = {
        fail: function (a) {
          throw (
            ((this.initialized = !0),
            (this.supported = !1),
            new Error("Module '" + this.name + "' failed to load: " + a))
          );
        },
        warn: function (a) {
          r.warn('Module ' + this.name + ': ' + a);
        },
        deprecationNotice: function (a, b) {
          r.warn(
            'DEPRECATED: ' +
              a +
              ' in module ' +
              this.name +
              'is deprecated. Please use ' +
              b +
              ' instead'
          );
        },
        createError: function (a) {
          return new Error('Error in Rangy ' + this.name + ' module: ' + a);
        },
      }),
      (r.createModule = function (a, b) {
        var c = new C(a, function () {
          if (!c.initialized) {
            c.initialized = !0;
            try {
              b(r, c), (c.supported = !0);
            } catch (d) {
              var e = "Module '" + a + "' failed to load: " + y(d);
              s(e);
            }
          }
        });
        q[a] = c;
      }),
      (r.requireModules = function (a) {
        for (var b = 0, c = a.length, d, e; b < c; ++b) {
          (e = a[b]), (d = q[e]);
          if (!d || !(d instanceof C))
            throw new Error("required module '" + e + "' not found");
          d.init();
          if (!d.supported)
            throw new Error("required module '" + e + "' not supported");
        }
      });
    var D = !1,
      E = function (a) {
        D || ((D = !0), r.initialized || z());
      };
    if (typeof window == c) {
      u('No window found');
      return;
    }
    if (typeof document == c) {
      u('No document found');
      return;
    }
    return (
      h(document, 'addEventListener') &&
        document.addEventListener('DOMContentLoaded', E, !1),
      w(window, 'load', E),
      r
    );
  })()),
  rangy.createModule('DomUtil', function (a, b) {
    function h(a) {
      var b;
      return (
        typeof a.namespaceURI == c ||
        (b = a.namespaceURI) === null ||
        b == 'http://www.w3.org/1999/xhtml'
      );
    }
    function i(a) {
      var b = a.parentNode;
      return b.nodeType == 1 ? b : null;
    }
    function j(a) {
      var b = 0;
      while ((a = a.previousSibling)) ++b;
      return b;
    }
    function k(a) {
      switch (a.nodeType) {
        case 7:
        case 10:
          return 0;
        case 3:
        case 8:
          return a.length;
        default:
          return a.childNodes.length;
      }
    }
    function l(a, b) {
      var c = [],
        d;
      for (d = a; d; d = d.parentNode) c.push(d);
      for (d = b; d; d = d.parentNode) if (g(c, d)) return d;
      return null;
    }
    function m(a, b, c) {
      var d = c ? b : b.parentNode;
      while (d) {
        if (d === a) return !0;
        d = d.parentNode;
      }
      return !1;
    }
    function n(a, b) {
      return m(a, b, !0);
    }
    function o(a, b, c) {
      var d,
        e = c ? a : a.parentNode;
      while (e) {
        d = e.parentNode;
        if (d === b) return e;
        e = d;
      }
      return null;
    }
    function p(a) {
      var b = a.nodeType;
      return b == 3 || b == 4 || b == 8;
    }
    function q(a) {
      if (!a) return !1;
      var b = a.nodeType;
      return b == 3 || b == 8;
    }
    function r(a, b) {
      var c = b.nextSibling,
        d = b.parentNode;
      return c ? d.insertBefore(a, c) : d.appendChild(a), a;
    }
    function s(a, b, c) {
      var d = a.cloneNode(!1);
      d.deleteData(0, b), a.deleteData(b, a.length - b), r(d, a);
      if (c)
        for (var e = 0, f; (f = c[e++]); )
          f.node == a && f.offset > b
            ? ((f.node = d), (f.offset -= b))
            : f.node == a.parentNode && f.offset > j(a) && ++f.offset;
      return d;
    }
    function t(a) {
      if (a.nodeType == 9) return a;
      if (typeof a.ownerDocument != c) return a.ownerDocument;
      if (typeof a.document != c) return a.document;
      if (a.parentNode) return t(a.parentNode);
      throw b.createError('getDocument: no document found for node');
    }
    function u(a) {
      var d = t(a);
      if (typeof d.defaultView != c) return d.defaultView;
      if (typeof d.parentWindow != c) return d.parentWindow;
      throw b.createError('Cannot get a window object for node');
    }
    function v(a) {
      if (typeof a.contentDocument != c) return a.contentDocument;
      if (typeof a.contentWindow != c) return a.contentWindow.document;
      throw b.createError(
        'getIframeDocument: No Document object found for iframe element'
      );
    }
    function w(a) {
      if (typeof a.contentWindow != c) return a.contentWindow;
      if (typeof a.contentDocument != c) return a.contentDocument.defaultView;
      throw b.createError(
        'getIframeWindow: No Window object found for iframe element'
      );
    }
    function x(a) {
      return (
        a && d.isHostMethod(a, 'setTimeout') && d.isHostObject(a, 'document')
      );
    }
    function y(a, b, c) {
      var e;
      a
        ? d.isHostProperty(a, 'nodeType')
          ? (e =
              a.nodeType == 1 && a.tagName.toLowerCase() == 'iframe'
                ? v(a)
                : t(a))
          : x(a) && (e = a.document)
        : (e = document);
      if (!e)
        throw b.createError(
          c + '(): Parameter must be a Window object or DOM node'
        );
      return e;
    }
    function z(a) {
      var b;
      while ((b = a.parentNode)) a = b;
      return a;
    }
    function A(a, c, d, e) {
      var f, g, h, i, k;
      if (a == d) return c === e ? 0 : c < e ? -1 : 1;
      if ((f = o(d, a, !0))) return c <= j(f) ? -1 : 1;
      if ((f = o(a, d, !0))) return j(f) < e ? -1 : 1;
      (g = l(a, d)),
        (h = a === g ? g : o(a, g, !0)),
        (i = d === g ? g : o(d, g, !0));
      if (h === i)
        throw b.createError(
          'comparePoints got to case 4 and childA and childB are the same!'
        );
      k = g.firstChild;
      while (k) {
        if (k === h) return -1;
        if (k === i) return 1;
        k = k.nextSibling;
      }
    }
    function C(a) {
      try {
        return a.parentNode, !1;
      } catch (b) {
        return !0;
      }
    }
    function D(a) {
      if (!a) return '[No node]';
      if (B && C(a)) return '[Broken node]';
      if (p(a)) return '"' + a.data + '"';
      if (a.nodeType == 1) {
        var b = a.id ? ' id="' + a.id + '"' : '';
        return (
          '<' +
          a.nodeName +
          b +
          '>[' +
          a.childNodes.length +
          '][' +
          a.innerHTML.slice(0, 20) +
          ']'
        );
      }
      return a.nodeName;
    }
    function E(a) {
      var b = t(a).createDocumentFragment(),
        c;
      while ((c = a.firstChild)) b.appendChild(c);
      return b;
    }
    function G(a) {
      (this.root = a), (this._next = a);
    }
    function H(a) {
      return new G(a);
    }
    function I(a, b) {
      (this.node = a), (this.offset = b);
    }
    function J(a) {
      (this.code = this[a]),
        (this.codeName = a),
        (this.message = 'DOMException: ' + this.codeName);
    }
    var c = 'undefined',
      d = a.util;
    d.areHostMethods(document, [
      'createDocumentFragment',
      'createElement',
      'createTextNode',
    ]) || b.fail('document missing a Node creation method'),
      d.isHostMethod(document, 'getElementsByTagName') ||
        b.fail('document missing getElementsByTagName method');
    var e = document.createElement('div');
    d.areHostMethods(
      e,
      ['insertBefore', 'appendChild', 'cloneNode'] ||
        !d.areHostObjects(e, [
          'previousSibling',
          'nextSibling',
          'childNodes',
          'parentNode',
        ])
    ) || b.fail('Incomplete Element implementation'),
      d.isHostProperty(e, 'innerHTML') ||
        b.fail('Element is missing innerHTML property');
    var f = document.createTextNode('test');
    d.areHostMethods(
      f,
      ['splitText', 'deleteData', 'insertData', 'appendData', 'cloneNode'] ||
        !d.areHostObjects(e, [
          'previousSibling',
          'nextSibling',
          'childNodes',
          'parentNode',
        ]) ||
        !d.areHostProperties(f, ['data'])
    ) || b.fail('Incomplete Text Node implementation');
    var g = function (a, b) {
        var c = a.length;
        while (c--) if (a[c] === b) return !0;
        return !1;
      },
      B = !1;
    (function () {
      var b = document.createElement('b');
      b.innerHTML = '1';
      var c = b.firstChild;
      (b.innerHTML = '<br>'), (B = C(c)), (a.features.crashyTextNodes = B);
    })();
    var F;
    typeof window.getComputedStyle != c
      ? (F = function (a, b) {
          return u(a).getComputedStyle(a, null)[b];
        })
      : typeof document.documentElement.currentStyle != c
      ? (F = function (a, b) {
          return a.currentStyle[b];
        })
      : b.fail('No means of obtaining computed style properties found'),
      (G.prototype = {
        _current: null,
        hasNext: function () {
          return !!this._next;
        },
        next: function () {
          var a = (this._current = this._next),
            b,
            c;
          if (this._current) {
            b = a.firstChild;
            if (b) this._next = b;
            else {
              c = null;
              while (a !== this.root && !(c = a.nextSibling)) a = a.parentNode;
              this._next = c;
            }
          }
          return this._current;
        },
        detach: function () {
          this._current = this._next = this.root = null;
        },
      }),
      (I.prototype = {
        equals: function (a) {
          return !!a && this.node === a.node && this.offset == a.offset;
        },
        inspect: function () {
          return '[DomPosition(' + D(this.node) + ':' + this.offset + ')]';
        },
        toString: function () {
          return this.inspect();
        },
      }),
      (J.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11,
      }),
      (J.prototype.toString = function () {
        return this.message;
      }),
      (a.dom = {
        arrayContains: g,
        isHtmlNamespace: h,
        parentElement: i,
        getNodeIndex: j,
        getNodeLength: k,
        getCommonAncestor: l,
        isAncestorOf: m,
        isOrIsAncestorOf: n,
        getClosestAncestorIn: o,
        isCharacterDataNode: p,
        isTextOrCommentNode: q,
        insertAfter: r,
        splitDataNode: s,
        getDocument: t,
        getWindow: u,
        getIframeWindow: w,
        getIframeDocument: v,
        getBody: d.getBody,
        isWindow: x,
        getContentDocument: y,
        getRootContainer: z,
        comparePoints: A,
        isBrokenNode: C,
        inspectNode: D,
        getComputedStyleProperty: F,
        fragmentFromNodeChildren: E,
        createIterator: H,
        DomPosition: I,
      }),
      (a.DOMException = J);
  }),
  rangy.createModule('DomRange', function (a, b) {
    function r(a, b) {
      return (
        a.nodeType != 3 && (i(a, b.startContainer) || i(a, b.endContainer))
      );
    }
    function s(a) {
      return a.document || j(a.startContainer);
    }
    function t(a) {
      return new e(a.parentNode, h(a));
    }
    function u(a) {
      return new e(a.parentNode, h(a) + 1);
    }
    function v(a, b, d) {
      var e = a.nodeType == 11 ? a.firstChild : a;
      return (
        g(b)
          ? d == b.length
            ? c.insertAfter(a, b)
            : b.parentNode.insertBefore(a, d == 0 ? b : l(b, d))
          : d >= b.childNodes.length
          ? b.appendChild(a)
          : b.insertBefore(a, b.childNodes[d]),
        e
      );
    }
    function w(a, b, c) {
      Y(a), Y(b);
      if (s(b) != s(a)) throw new f('WRONG_DOCUMENT_ERR');
      var d = k(a.startContainer, a.startOffset, b.endContainer, b.endOffset),
        e = k(a.endContainer, a.endOffset, b.startContainer, b.startOffset);
      return c ? d <= 0 && e >= 0 : d < 0 && e > 0;
    }
    function x(a) {
      var b;
      for (
        var c, d = s(a.range).createDocumentFragment(), e;
        (c = a.next());

      ) {
        (b = a.isPartiallySelectedSubtree()),
          (c = c.cloneNode(!b)),
          b &&
            ((e = a.getSubtreeIterator()), c.appendChild(x(e)), e.detach(!0));
        if (c.nodeType == 10) throw new f('HIERARCHY_REQUEST_ERR');
        d.appendChild(c);
      }
      return d;
    }
    function y(a, b, d) {
      var e, f;
      d = d || { stop: !1 };
      for (var g, h; (g = a.next()); )
        if (a.isPartiallySelectedSubtree()) {
          if (b(g) === !1) {
            d.stop = !0;
            return;
          }
          (h = a.getSubtreeIterator()), y(h, b, d), h.detach(!0);
          if (d.stop) return;
        } else {
          e = c.createIterator(g);
          while ((f = e.next()))
            if (b(f) === !1) {
              d.stop = !0;
              return;
            }
        }
    }
    function z(a) {
      var b;
      while (a.next())
        a.isPartiallySelectedSubtree()
          ? ((b = a.getSubtreeIterator()), z(b), b.detach(!0))
          : a.remove();
    }
    function A(a) {
      for (
        var b, c = s(a.range).createDocumentFragment(), d;
        (b = a.next());

      ) {
        a.isPartiallySelectedSubtree()
          ? ((b = b.cloneNode(!1)),
            (d = a.getSubtreeIterator()),
            b.appendChild(A(d)),
            d.detach(!0))
          : a.remove();
        if (b.nodeType == 10) throw new f('HIERARCHY_REQUEST_ERR');
        c.appendChild(b);
      }
      return c;
    }
    function B(a, b, c) {
      var d = !!b && !!b.length,
        e,
        f = !!c;
      d && (e = new RegExp('^(' + b.join('|') + ')$'));
      var g = [];
      return (
        y(new D(a, !1), function (a) {
          (!d || e.test(a.nodeType)) && (!f || c(a)) && g.push(a);
        }),
        g
      );
    }
    function C(a) {
      var b = typeof a.getName == 'undefined' ? 'Range' : a.getName();
      return (
        '[' +
        b +
        '(' +
        c.inspectNode(a.startContainer) +
        ':' +
        a.startOffset +
        ', ' +
        c.inspectNode(a.endContainer) +
        ':' +
        a.endOffset +
        ')]'
      );
    }
    function D(a, b) {
      (this.range = a), (this.clonePartiallySelectedTextNodes = b);
      if (!a.collapsed) {
        (this.sc = a.startContainer),
          (this.so = a.startOffset),
          (this.ec = a.endContainer),
          (this.eo = a.endOffset);
        var c = a.commonAncestorContainer;
        this.sc === this.ec && g(this.sc)
          ? ((this.isSingleCharacterDataNode = !0),
            (this._first = this._last = this._next = this.sc))
          : ((this._first = this._next =
              this.sc === c && !g(this.sc)
                ? this.sc.childNodes[this.so]
                : m(this.sc, c, !0)),
            (this._last =
              this.ec === c && !g(this.ec)
                ? this.ec.childNodes[this.eo - 1]
                : m(this.ec, c, !0)));
      }
    }
    function E(a) {
      (this.code = this[a]),
        (this.codeName = a),
        (this.message = 'RangeException: ' + this.codeName);
    }
    function K(a) {
      return function (b, c) {
        var d,
          e = c ? b : b.parentNode;
        while (e) {
          d = e.nodeType;
          if (o(a, d)) return e;
          e = e.parentNode;
        }
        return null;
      };
    }
    function O(a, b) {
      if (N(a, b)) throw new E('INVALID_NODE_TYPE_ERR');
    }
    function P(a) {
      if (!a.startContainer) throw new f('INVALID_STATE_ERR');
    }
    function Q(a, b) {
      if (!o(b, a.nodeType)) throw new E('INVALID_NODE_TYPE_ERR');
    }
    function R(a, b) {
      if (b < 0 || b > (g(a) ? a.length : a.childNodes.length))
        throw new f('INDEX_SIZE_ERR');
    }
    function S(a, b) {
      if (L(a, !0) !== L(b, !0)) throw new f('WRONG_DOCUMENT_ERR');
    }
    function T(a) {
      if (M(a, !0)) throw new f('NO_MODIFICATION_ALLOWED_ERR');
    }
    function U(a, b) {
      if (!a) throw new f(b);
    }
    function V(a) {
      return (q && c.isBrokenNode(a)) || (!o(G, a.nodeType) && !L(a, !0));
    }
    function W(a, b) {
      return b <= (g(a) ? a.length : a.childNodes.length);
    }
    function X(a) {
      return (
        !!a.startContainer &&
        !!a.endContainer &&
        !V(a.startContainer) &&
        !V(a.endContainer) &&
        W(a.startContainer, a.startOffset) &&
        W(a.endContainer, a.endOffset)
      );
    }
    function Y(a) {
      P(a);
      if (!X(a))
        throw new Error(
          'Range error: Range is no longer valid after DOM mutation (' +
            a.inspect() +
            ')'
        );
    }
    function bb(a, b) {
      Y(a);
      var c = a.startContainer,
        d = a.startOffset,
        e = a.endContainer,
        f = a.endOffset,
        i = c === e;
      g(e) && f > 0 && f < e.length && l(e, f, b),
        g(c) &&
          d > 0 &&
          d < c.length &&
          ((c = l(c, d, b)),
          i ? ((f -= d), (e = c)) : e == c.parentNode && f >= h(c) && f++,
          (d = 0)),
        a.setStartAndEnd(c, d, e, f);
    }
    function lb() {}
    function mb(a) {
      (a.START_TO_START = db),
        (a.START_TO_END = eb),
        (a.END_TO_END = fb),
        (a.END_TO_START = gb),
        (a.NODE_BEFORE = hb),
        (a.NODE_AFTER = ib),
        (a.NODE_BEFORE_AND_AFTER = jb),
        (a.NODE_INSIDE = kb);
    }
    function nb(a) {
      mb(a), mb(a.prototype);
    }
    function ob(a, b) {
      return function () {
        Y(this);
        var c = this.startContainer,
          d = this.startOffset,
          e = this.commonAncestorContainer,
          f = new D(this, !0),
          g,
          h;
        c !== e &&
          ((g = m(c, e, !0)), (h = u(g)), (c = h.node), (d = h.offset)),
          y(f, T),
          f.reset();
        var i = a(f);
        return f.detach(), b(this, c, d, c, d), i;
      };
    }
    function pb(a, b, c) {
      function e(a, b) {
        return function (c) {
          P(this), Q(c, F), Q(p(c), G);
          var d = (a ? t : u)(c);
          (b ? f : i)(this, d.node, d.offset);
        };
      }
      function f(a, c, d) {
        var e = a.endContainer,
          f = a.endOffset;
        if (c !== a.startContainer || d !== a.startOffset) {
          if (p(c) != p(e) || k(c, d, e, f) == 1) (e = c), (f = d);
          b(a, c, d, e, f);
        }
      }
      function i(a, c, d) {
        var e = a.startContainer,
          f = a.startOffset;
        if (c !== a.endContainer || d !== a.endOffset) {
          if (p(c) != p(e) || k(c, d, e, f) == -1) (e = c), (f = d);
          b(a, e, f, c, d);
        }
      }
      (a.prototype = new lb()),
        d.extend(a.prototype, {
          setStart: function (a, b) {
            P(this), O(a, !0), R(a, b), f(this, a, b);
          },
          setEnd: function (a, b) {
            P(this), O(a, !0), R(a, b), i(this, a, b);
          },
          setStartAndEnd: function () {
            P(this);
            var a = arguments,
              c = a[0],
              d = a[1],
              e = c,
              f = d;
            switch (a.length) {
              case 3:
                f = a[2];
                break;
              case 4:
                (e = a[2]), (f = a[3]);
            }
            b(this, c, d, e, f);
          },
          setBoundary: function (a, b, c) {
            this['set' + (c ? 'Start' : 'End')](a, b);
          },
          setStartBefore: e(!0, !0),
          setStartAfter: e(!1, !0),
          setEndBefore: e(!0, !1),
          setEndAfter: e(!1, !1),
          collapse: function (a) {
            Y(this),
              a
                ? b(
                    this,
                    this.startContainer,
                    this.startOffset,
                    this.startContainer,
                    this.startOffset
                  )
                : b(
                    this,
                    this.endContainer,
                    this.endOffset,
                    this.endContainer,
                    this.endOffset
                  );
          },
          selectNodeContents: function (a) {
            P(this), O(a, !0), b(this, a, 0, a, n(a));
          },
          selectNode: function (a) {
            P(this), O(a, !1), Q(a, F);
            var c = t(a),
              d = u(a);
            b(this, c.node, c.offset, d.node, d.offset);
          },
          extractContents: ob(A, b),
          deleteContents: ob(z, b),
          canSurroundContents: function () {
            Y(this), T(this.startContainer), T(this.endContainer);
            var a = new D(this, !0),
              b =
                (a._first && r(a._first, this)) ||
                (a._last && r(a._last, this));
            return a.detach(), !b;
          },
          detach: function () {
            c(this);
          },
          splitBoundaries: function () {
            bb(this);
          },
          splitBoundariesPreservingPositions: function (a) {
            bb(this, a);
          },
          normalizeBoundaries: function () {
            Y(this);
            var a = this.startContainer,
              c = this.startOffset,
              d = this.endContainer,
              e = this.endOffset,
              f = function (a) {
                var b = a.nextSibling;
                b &&
                  b.nodeType == a.nodeType &&
                  ((d = a),
                  (e = a.length),
                  a.appendData(b.data),
                  b.parentNode.removeChild(b));
              },
              i = function (b) {
                var f = b.previousSibling;
                if (f && f.nodeType == b.nodeType) {
                  a = b;
                  var g = b.length;
                  (c = f.length),
                    b.insertData(0, f.data),
                    f.parentNode.removeChild(f);
                  if (a == d) (e += c), (d = a);
                  else if (d == b.parentNode) {
                    var i = h(b);
                    e == i ? ((d = b), (e = g)) : e > i && e--;
                  }
                }
              },
              j = !0;
            if (g(d)) d.length == e && f(d);
            else {
              if (e > 0) {
                var k = d.childNodes[e - 1];
                k && g(k) && f(k);
              }
              j = !this.collapsed;
            }
            if (j) {
              if (g(a)) c == 0 && i(a);
              else if (c < a.childNodes.length) {
                var l = a.childNodes[c];
                l && g(l) && i(l);
              }
            } else (a = d), (c = e);
            b(this, a, c, d, e);
          },
          collapseToPoint: function (a, b) {
            P(this), O(a, !0), R(a, b), this.setStartAndEnd(a, b);
          },
        }),
        nb(a);
    }
    function qb(a) {
      (a.collapsed =
        a.startContainer === a.endContainer && a.startOffset === a.endOffset),
        (a.commonAncestorContainer = a.collapsed
          ? a.startContainer
          : c.getCommonAncestor(a.startContainer, a.endContainer));
    }
    function rb(a, b, d, e, f) {
      (a.startContainer = b),
        (a.startOffset = d),
        (a.endContainer = e),
        (a.endOffset = f),
        (a.document = c.getDocument(b)),
        qb(a);
    }
    function sb(a) {
      P(a),
        (a.startContainer =
          a.startOffset =
          a.endContainer =
          a.endOffset =
          a.document =
            null),
        (a.collapsed = a.commonAncestorContainer = null);
    }
    function tb(a) {
      (this.startContainer = a),
        (this.startOffset = 0),
        (this.endContainer = a),
        (this.endOffset = 0),
        (this.document = a),
        qb(this);
    }
    a.requireModules(['DomUtil']);
    var c = a.dom,
      d = a.util,
      e = c.DomPosition,
      f = a.DOMException,
      g = c.isCharacterDataNode,
      h = c.getNodeIndex,
      i = c.isOrIsAncestorOf,
      j = c.getDocument,
      k = c.comparePoints,
      l = c.splitDataNode,
      m = c.getClosestAncestorIn,
      n = c.getNodeLength,
      o = c.arrayContains,
      p = c.getRootContainer,
      q = a.features.crashyTextNodes;
    (D.prototype = {
      _current: null,
      _next: null,
      _first: null,
      _last: null,
      isSingleCharacterDataNode: !1,
      reset: function () {
        (this._current = null), (this._next = this._first);
      },
      hasNext: function () {
        return !!this._next;
      },
      next: function () {
        var a = (this._current = this._next);
        return (
          a &&
            ((this._next = a !== this._last ? a.nextSibling : null),
            g(a) &&
              this.clonePartiallySelectedTextNodes &&
              (a === this.ec &&
                (a = a.cloneNode(!0)).deleteData(this.eo, a.length - this.eo),
              this._current === this.sc &&
                (a = a.cloneNode(!0)).deleteData(0, this.so))),
          a
        );
      },
      remove: function () {
        var a = this._current,
          b,
          c;
        !g(a) || (a !== this.sc && a !== this.ec)
          ? a.parentNode && a.parentNode.removeChild(a)
          : ((b = a === this.sc ? this.so : 0),
            (c = a === this.ec ? this.eo : a.length),
            b != c && a.deleteData(b, c - b));
      },
      isPartiallySelectedSubtree: function () {
        var a = this._current;
        return r(a, this.range);
      },
      getSubtreeIterator: function () {
        var a;
        if (this.isSingleCharacterDataNode)
          (a = this.range.cloneRange()), a.collapse(!1);
        else {
          a = new tb(s(this.range));
          var b = this._current,
            c = b,
            d = 0,
            e = b,
            f = n(b);
          i(b, this.sc) && ((c = this.sc), (d = this.so)),
            i(b, this.ec) && ((e = this.ec), (f = this.eo)),
            rb(a, c, d, e, f);
        }
        return new D(a, this.clonePartiallySelectedTextNodes);
      },
      detach: function (a) {
        a && this.range.detach(),
          (this.range =
            this._current =
            this._next =
            this._first =
            this._last =
            this.sc =
            this.so =
            this.ec =
            this.eo =
              null);
      },
    }),
      (E.prototype = { BAD_BOUNDARYPOINTS_ERR: 1, INVALID_NODE_TYPE_ERR: 2 }),
      (E.prototype.toString = function () {
        return this.message;
      });
    var F = [1, 3, 4, 5, 7, 8, 10],
      G = [2, 9, 11],
      H = [5, 6, 10, 12],
      I = [1, 3, 4, 5, 7, 8, 10, 11],
      J = [1, 3, 4, 5, 7, 8],
      L = K([9, 11]),
      M = K(H),
      N = K([6, 10, 12]),
      Z = document.createElement('style'),
      $ = !1;
    try {
      (Z.innerHTML = '<b>x</b>'), ($ = Z.firstChild.nodeType == 3);
    } catch (_) {}
    a.features.htmlParsingConforms = $;
    var ab = $
        ? function (a) {
            var b = this.startContainer,
              d = j(b);
            if (!b) throw new f('INVALID_STATE_ERR');
            var e = null;
            return (
              b.nodeType == 1 ? (e = b) : g(b) && (e = c.parentElement(b)),
              e === null ||
              (e.nodeName == 'HTML' &&
                c.isHtmlNamespace(j(e).documentElement) &&
                c.isHtmlNamespace(e))
                ? (e = d.createElement('body'))
                : (e = e.cloneNode(!1)),
              (e.innerHTML = a),
              c.fragmentFromNodeChildren(e)
            );
          }
        : function (a) {
            P(this);
            var b = s(this),
              d = b.createElement('body');
            return (d.innerHTML = a), c.fragmentFromNodeChildren(d);
          },
      cb = [
        'startContainer',
        'startOffset',
        'endContainer',
        'endOffset',
        'collapsed',
        'commonAncestorContainer',
      ],
      db = 0,
      eb = 1,
      fb = 2,
      gb = 3,
      hb = 0,
      ib = 1,
      jb = 2,
      kb = 3;
    (lb.prototype = {
      compareBoundaryPoints: function (a, b) {
        Y(this), S(this.startContainer, b.startContainer);
        var c,
          d,
          e,
          f,
          g = a == gb || a == db ? 'start' : 'end',
          h = a == eb || a == db ? 'start' : 'end';
        return (
          (c = this[g + 'Container']),
          (d = this[g + 'Offset']),
          (e = b[h + 'Container']),
          (f = b[h + 'Offset']),
          k(c, d, e, f)
        );
      },
      insertNode: function (a) {
        Y(this), Q(a, I), T(this.startContainer);
        if (i(a, this.startContainer)) throw new f('HIERARCHY_REQUEST_ERR');
        var b = v(a, this.startContainer, this.startOffset);
        this.setStartBefore(b);
      },
      cloneContents: function () {
        Y(this);
        var a, b;
        if (this.collapsed) return s(this).createDocumentFragment();
        if (this.startContainer === this.endContainer && g(this.startContainer))
          return (
            (a = this.startContainer.cloneNode(!0)),
            (a.data = a.data.slice(this.startOffset, this.endOffset)),
            (b = s(this).createDocumentFragment()),
            b.appendChild(a),
            b
          );
        var c = new D(this, !0);
        return (a = x(c)), c.detach(), a;
      },
      canSurroundContents: function () {
        Y(this), T(this.startContainer), T(this.endContainer);
        var a = new D(this, !0),
          b = (a._first && r(a._first, this)) || (a._last && r(a._last, this));
        return a.detach(), !b;
      },
      surroundContents: function (a) {
        Q(a, J);
        if (!this.canSurroundContents()) throw new E('BAD_BOUNDARYPOINTS_ERR');
        var b = this.extractContents();
        if (a.hasChildNodes()) while (a.lastChild) a.removeChild(a.lastChild);
        v(a, this.startContainer, this.startOffset),
          a.appendChild(b),
          this.selectNode(a);
      },
      cloneRange: function () {
        Y(this);
        var a = new tb(s(this)),
          b = cb.length,
          c;
        while (b--) (c = cb[b]), (a[c] = this[c]);
        return a;
      },
      toString: function () {
        Y(this);
        var a = this.startContainer;
        if (a === this.endContainer && g(a))
          return a.nodeType == 3 || a.nodeType == 4
            ? a.data.slice(this.startOffset, this.endOffset)
            : '';
        var b = [],
          c = new D(this, !0);
        return (
          y(c, function (a) {
            (a.nodeType == 3 || a.nodeType == 4) && b.push(a.data);
          }),
          c.detach(),
          b.join('')
        );
      },
      compareNode: function (a) {
        Y(this);
        var b = a.parentNode,
          c = h(a);
        if (!b) throw new f('NOT_FOUND_ERR');
        var d = this.comparePoint(b, c),
          e = this.comparePoint(b, c + 1);
        return d < 0 ? (e > 0 ? jb : hb) : e > 0 ? ib : kb;
      },
      comparePoint: function (a, b) {
        return (
          Y(this),
          U(a, 'HIERARCHY_REQUEST_ERR'),
          S(a, this.startContainer),
          k(a, b, this.startContainer, this.startOffset) < 0
            ? -1
            : k(a, b, this.endContainer, this.endOffset) > 0
            ? 1
            : 0
        );
      },
      createContextualFragment: ab,
      toHtml: function () {
        Y(this);
        var a = this.commonAncestorContainer.parentNode.cloneNode(!1);
        return a.appendChild(this.cloneContents()), a.innerHTML;
      },
      intersectsNode: function (a, b) {
        Y(this), U(a, 'NOT_FOUND_ERR');
        if (j(a) !== s(this)) return !1;
        var c = a.parentNode,
          d = h(a);
        U(c, 'NOT_FOUND_ERR');
        var e = k(c, d, this.endContainer, this.endOffset),
          f = k(c, d + 1, this.startContainer, this.startOffset);
        return b ? e <= 0 && f >= 0 : e < 0 && f > 0;
      },
      isPointInRange: function (a, b) {
        return (
          Y(this),
          U(a, 'HIERARCHY_REQUEST_ERR'),
          S(a, this.startContainer),
          k(a, b, this.startContainer, this.startOffset) >= 0 &&
            k(a, b, this.endContainer, this.endOffset) <= 0
        );
      },
      intersectsRange: function (a) {
        return w(this, a, !1);
      },
      intersectsOrTouchesRange: function (a) {
        return w(this, a, !0);
      },
      intersection: function (a) {
        if (this.intersectsRange(a)) {
          var b = k(
              this.startContainer,
              this.startOffset,
              a.startContainer,
              a.startOffset
            ),
            c = k(
              this.endContainer,
              this.endOffset,
              a.endContainer,
              a.endOffset
            ),
            d = this.cloneRange();
          return (
            b == -1 && d.setStart(a.startContainer, a.startOffset),
            c == 1 && d.setEnd(a.endContainer, a.endOffset),
            d
          );
        }
        return null;
      },
      union: function (a) {
        if (this.intersectsOrTouchesRange(a)) {
          var b = this.cloneRange();
          return (
            k(
              a.startContainer,
              a.startOffset,
              this.startContainer,
              this.startOffset
            ) == -1 && b.setStart(a.startContainer, a.startOffset),
            k(a.endContainer, a.endOffset, this.endContainer, this.endOffset) ==
              1 && b.setEnd(a.endContainer, a.endOffset),
            b
          );
        }
        throw new E('Ranges do not intersect');
      },
      containsNode: function (a, b) {
        return b ? this.intersectsNode(a, !1) : this.compareNode(a) == kb;
      },
      containsNodeContents: function (a) {
        return this.comparePoint(a, 0) >= 0 && this.comparePoint(a, n(a)) <= 0;
      },
      containsRange: function (a) {
        var b = this.intersection(a);
        return b !== null && a.equals(b);
      },
      containsNodeText: function (a) {
        var b = this.cloneRange();
        b.selectNode(a);
        var c = b.getNodes([3]);
        if (c.length > 0) {
          b.setStart(c[0], 0);
          var d = c.pop();
          b.setEnd(d, d.length);
          var e = this.containsRange(b);
          return b.detach(), e;
        }
        return this.containsNodeContents(a);
      },
      getNodes: function (a, b) {
        return Y(this), B(this, a, b);
      },
      getDocument: function () {
        return s(this);
      },
      collapseBefore: function (a) {
        P(this), this.setEndBefore(a), this.collapse(!1);
      },
      collapseAfter: function (a) {
        P(this), this.setStartAfter(a), this.collapse(!0);
      },
      getBookmark: function (b) {
        var d = s(this),
          e = a.createRange(d);
        (b = b || c.getBody(d)), e.selectNodeContents(b);
        var f = this.intersection(e),
          g = 0,
          h = 0;
        return (
          f &&
            (e.setEnd(f.startContainer, f.startOffset),
            (g = e.toString().length),
            (h = g + f.toString().length),
            e.detach()),
          { start: g, end: h, containerNode: b }
        );
      },
      moveToBookmark: function (a) {
        var b = a.containerNode,
          c = 0;
        this.setStart(b, 0), this.collapse(!0);
        var d = [b],
          e,
          f = !1,
          g = !1,
          h,
          i,
          j;
        while (!g && (e = d.pop()))
          if (e.nodeType == 3)
            (h = c + e.length),
              !f &&
                a.start >= c &&
                a.start <= h &&
                (this.setStart(e, a.start - c), (f = !0)),
              f &&
                a.end >= c &&
                a.end <= h &&
                (this.setEnd(e, a.end - c), (g = !0)),
              (c = h);
          else {
            (j = e.childNodes), (i = j.length);
            while (i--) d.push(j[i]);
          }
      },
      getName: function () {
        return 'DomRange';
      },
      equals: function (a) {
        return tb.rangesEqual(this, a);
      },
      isValid: function () {
        return X(this);
      },
      inspect: function () {
        return C(this);
      },
    }),
      pb(tb, rb, sb),
      (a.rangePrototype = lb.prototype),
      d.extend(tb, {
        rangeProperties: cb,
        RangeIterator: D,
        copyComparisonConstants: nb,
        createPrototypeRange: pb,
        inspect: C,
        getRangeDocument: s,
        rangesEqual: function (a, b) {
          return (
            a.startContainer === b.startContainer &&
            a.startOffset === b.startOffset &&
            a.endContainer === b.endContainer &&
            a.endOffset === b.endOffset
          );
        },
      }),
      (a.DomRange = tb),
      (a.RangeException = E);
  }),
  rangy.createModule('WrappedRange', function (a, b) {
    a.requireModules(['DomUtil', 'DomRange']);
    var c,
      d,
      e = a.dom,
      f = a.util,
      g = e.DomPosition,
      h = a.DomRange,
      i = e.getBody,
      j = e.getContentDocument,
      k = e.isCharacterDataNode;
    a.features.implementsDomRange &&
      (function () {
        function k(a) {
          var b = g.length,
            c;
          while (b--) (c = g[b]), (a[c] = a.nativeRange[c]);
          a.collapsed =
            a.startContainer === a.endContainer &&
            a.startOffset === a.endOffset;
        }
        function l(a, b, c, d, e) {
          var f = a.startContainer !== b || a.startOffset != c,
            g = a.endContainer !== d || a.endOffset != e,
            h = !a.equals(a.nativeRange);
          if (f || g || h) a.setEnd(d, e), a.setStart(b, c);
        }
        function m(a) {
          a.nativeRange.detach(), (a.detached = !0);
          var b = g.length;
          while (b--) a[g[b]] = null;
        }
        var d,
          g = h.rangeProperties,
          n;
        (c = function (a) {
          if (!a) throw b.createError('WrappedRange: Range must be specified');
          (this.nativeRange = a), k(this);
        }),
          h.createPrototypeRange(c, l, m),
          (d = c.prototype),
          (d.selectNode = function (a) {
            this.nativeRange.selectNode(a), k(this);
          }),
          (d.cloneContents = function () {
            return this.nativeRange.cloneContents();
          }),
          (d.surroundContents = function (a) {
            this.nativeRange.surroundContents(a), k(this);
          }),
          (d.collapse = function (a) {
            this.nativeRange.collapse(a), k(this);
          }),
          (d.cloneRange = function () {
            return new c(this.nativeRange.cloneRange());
          }),
          (d.refresh = function () {
            k(this);
          }),
          (d.toString = function () {
            return this.nativeRange.toString();
          });
        var o = document.createTextNode('test');
        i(document).appendChild(o);
        var p = document.createRange();
        p.setStart(o, 0), p.setEnd(o, 0);
        try {
          p.setStart(o, 1),
            (d.setStart = function (a, b) {
              this.nativeRange.setStart(a, b), k(this);
            }),
            (d.setEnd = function (a, b) {
              this.nativeRange.setEnd(a, b), k(this);
            }),
            (n = function (a) {
              return function (b) {
                this.nativeRange[a](b), k(this);
              };
            });
        } catch (q) {
          (d.setStart = function (a, b) {
            try {
              this.nativeRange.setStart(a, b);
            } catch (c) {
              this.nativeRange.setEnd(a, b), this.nativeRange.setStart(a, b);
            }
            k(this);
          }),
            (d.setEnd = function (a, b) {
              try {
                this.nativeRange.setEnd(a, b);
              } catch (c) {
                this.nativeRange.setStart(a, b), this.nativeRange.setEnd(a, b);
              }
              k(this);
            }),
            (n = function (a, b) {
              return function (c) {
                try {
                  this.nativeRange[a](c);
                } catch (d) {
                  this.nativeRange[b](c), this.nativeRange[a](c);
                }
                k(this);
              };
            });
        }
        (d.setStartBefore = n('setStartBefore', 'setEndBefore')),
          (d.setStartAfter = n('setStartAfter', 'setEndAfter')),
          (d.setEndBefore = n('setEndBefore', 'setStartBefore')),
          (d.setEndAfter = n('setEndAfter', 'setStartAfter')),
          p.selectNodeContents(o),
          p.startContainer == o &&
          p.endContainer == o &&
          p.startOffset == 0 &&
          p.endOffset == o.length
            ? (d.selectNodeContents = function (a) {
                this.nativeRange.selectNodeContents(a), k(this);
              })
            : (d.selectNodeContents = function (a) {
                this.setStartAndEnd(a, 0, e.getNodeLength(a));
              }),
          p.selectNodeContents(o),
          p.setEnd(o, 3);
        var r = document.createRange();
        r.selectNodeContents(o),
          r.setEnd(o, 4),
          r.setStart(o, 2),
          p.compareBoundaryPoints(p.START_TO_END, r) == -1 &&
          p.compareBoundaryPoints(p.END_TO_START, r) == 1
            ? (d.compareBoundaryPoints = function (a, b) {
                return (
                  (b = b.nativeRange || b),
                  a == b.START_TO_END
                    ? (a = b.END_TO_START)
                    : a == b.END_TO_START && (a = b.START_TO_END),
                  this.nativeRange.compareBoundaryPoints(a, b)
                );
              })
            : (d.compareBoundaryPoints = function (a, b) {
                return this.nativeRange.compareBoundaryPoints(
                  a,
                  b.nativeRange || b
                );
              });
        var s = document.createElement('div');
        s.innerHTML = '123';
        var t = s.firstChild,
          u = i(document);
        u.appendChild(s),
          p.setStart(t, 1),
          p.setEnd(t, 2),
          p.deleteContents(),
          t.data == '13' &&
            ((d.deleteContents = function () {
              this.nativeRange.deleteContents(), k(this);
            }),
            (d.extractContents = function () {
              var a = this.nativeRange.extractContents();
              return k(this), a;
            })),
          u.removeChild(s),
          (u = null),
          f.isHostMethod(p, 'createContextualFragment') &&
            (d.createContextualFragment = function (a) {
              return this.nativeRange.createContextualFragment(a);
            }),
          i(document).removeChild(o),
          p.detach(),
          r.detach(),
          (d.getName = function () {
            return 'WrappedRange';
          }),
          (a.WrappedRange = c),
          (a.createNativeRange = function (a) {
            return (a = j(a, b, 'createNativeRange')), a.createRange();
          });
      })();
    if (a.features.implementsTextRange) {
      var l = function (a) {
          var b = a.parentElement(),
            c = a.duplicate();
          c.collapse(!0);
          var d = c.parentElement();
          (c = a.duplicate()), c.collapse(!1);
          var f = c.parentElement(),
            g = d == f ? d : e.getCommonAncestor(d, f);
          return g == b ? g : e.getCommonAncestor(b, g);
        },
        m = function (a) {
          return a.compareEndPoints('StartToEnd', a) == 0;
        },
        n = function (a, b, c, d, f) {
          var h = a.duplicate();
          h.collapse(c);
          var i = h.parentElement();
          e.isOrIsAncestorOf(b, i) || (i = b);
          if (!i.canHaveHTML) {
            var j = new g(i.parentNode, e.getNodeIndex(i));
            return {
              boundaryPosition: j,
              nodeInfo: { nodeIndex: j.offset, containerElement: j.node },
            };
          }
          var l = e.getDocument(i).createElement('span');
          l.parentNode && l.parentNode.removeChild(l);
          var m,
            n = c ? 'StartToStart' : 'StartToEnd',
            o,
            p,
            q,
            r,
            s = f && f.containerElement == i ? f.nodeIndex : 0,
            t = i.childNodes.length,
            u = t,
            v = u;
          for (;;) {
            v == t ? i.appendChild(l) : i.insertBefore(l, i.childNodes[v]),
              h.moveToElementText(l),
              (m = h.compareEndPoints(n, a));
            if (m == 0 || s == u) break;
            if (m == -1) {
              if (u == s + 1) break;
              s = v;
            } else u = u == s + 1 ? s : v;
            (v = Math.floor((s + u) / 2)), i.removeChild(l);
          }
          r = l.nextSibling;
          if (m == -1 && r && k(r)) {
            h.setEndPoint(c ? 'EndToStart' : 'EndToEnd', a);
            var w;
            if (/[\r\n]/.test(r.data)) {
              var x = h.duplicate(),
                y = x.text.replace(/\r\n/g, '\r').length;
              w = x.moveStart('character', y);
              while ((m = x.compareEndPoints('StartToEnd', x)) == -1)
                w++, x.moveStart('character', 1);
            } else w = h.text.length;
            q = new g(r, w);
          } else
            (o = (d || !c) && l.previousSibling),
              (p = (d || c) && l.nextSibling),
              p && k(p)
                ? (q = new g(p, 0))
                : o && k(o)
                ? (q = new g(o, o.data.length))
                : (q = new g(i, e.getNodeIndex(l)));
          return (
            l.parentNode.removeChild(l),
            {
              boundaryPosition: q,
              nodeInfo: { nodeIndex: v, containerElement: i },
            }
          );
        },
        o = function (a, b) {
          var c,
            d,
            f = a.offset,
            g = e.getDocument(a.node),
            h,
            j,
            l = i(g).createTextRange(),
            m = k(a.node);
          return (
            m
              ? ((c = a.node), (d = c.parentNode))
              : ((j = a.node.childNodes),
                (c = f < j.length ? j[f] : null),
                (d = a.node)),
            (h = g.createElement('span')),
            (h.innerHTML = '&#feff;'),
            c ? d.insertBefore(h, c) : d.appendChild(h),
            l.moveToElementText(h),
            l.collapse(!b),
            d.removeChild(h),
            m && l[b ? 'moveStart' : 'moveEnd']('character', f),
            l
          );
        };
      (d = function (a) {
        (this.textRange = a), this.refresh();
      }),
        (d.prototype = new h(document)),
        (d.prototype.refresh = function () {
          var a,
            b,
            c,
            d = l(this.textRange);
          m(this.textRange)
            ? (b = a = n(this.textRange, d, !0, !0).boundaryPosition)
            : ((c = n(this.textRange, d, !0, !1)),
              (a = c.boundaryPosition),
              (b = n(this.textRange, d, !1, !1, c.nodeInfo).boundaryPosition)),
            this.setStart(a.node, a.offset),
            this.setEnd(b.node, b.offset);
        }),
        (d.prototype.getName = function () {
          return 'WrappedTextRange';
        }),
        h.copyComparisonConstants(d),
        (d.rangeToTextRange = function (a) {
          if (a.collapsed) return o(new g(a.startContainer, a.startOffset), !0);
          var b = o(new g(a.startContainer, a.startOffset), !0),
            c = o(new g(a.endContainer, a.endOffset), !1),
            d = i(h.getRangeDocument(a)).createTextRange();
          return (
            d.setEndPoint('StartToStart', b), d.setEndPoint('EndToEnd', c), d
          );
        }),
        (a.WrappedTextRange = d);
      if (!a.features.implementsDomRange || a.config.preferTextRange) {
        var p = (function () {
          return this;
        })();
        typeof p.Range == 'undefined' && (p.Range = d),
          (a.createNativeRange = function (a) {
            return (a = j(a, b, 'createNativeRange')), i(a).createTextRange();
          }),
          (a.WrappedRange = d);
      }
    }
    (a.createRange = function (c) {
      return (
        (c = j(c, b, 'createRange')), new a.WrappedRange(a.createNativeRange(c))
      );
    }),
      (a.createRangyRange = function (a) {
        return (a = j(a, b, 'createRangyRange')), new h(a);
      }),
      (a.createIframeRange = function (c) {
        return (
          b.deprecationNotice('createIframeRange()', 'createRange(iframeEl)'),
          a.createRange(c)
        );
      }),
      (a.createIframeRangyRange = function (c) {
        return (
          b.deprecationNotice(
            'createIframeRangyRange()',
            'createRangyRange(iframeEl)'
          ),
          a.createRangyRange(c)
        );
      }),
      a.addCreateMissingNativeApiListener(function (b) {
        var c = b.document;
        typeof c.createRange == 'undefined' &&
          (c.createRange = function () {
            return a.createRange(c);
          }),
          (c = b = null);
      });
  }),
  rangy.createModule('WrappedSelection', function (a, b) {
    function r(a) {
      return typeof a == 'string' ? a == 'backward' : !!a;
    }
    function s(a, c) {
      if (!a) return window;
      if (d.isWindow(a)) return a;
      if (a instanceof T) return a.win;
      var e = d.getContentDocument(a, b, c);
      return d.getWindow(e);
    }
    function t(a) {
      return s(a, 'getWinSelection').getSelection();
    }
    function u(a) {
      return s(a, 'getDocSelection').document.selection;
    }
    function I(a, b, c) {
      var d = c ? 'end' : 'start',
        e = c ? 'start' : 'end';
      (a.anchorNode = b[d + 'Container']),
        (a.anchorOffset = b[d + 'Offset']),
        (a.focusNode = b[e + 'Container']),
        (a.focusOffset = b[e + 'Offset']);
    }
    function J(a) {
      var b = a.nativeSelection;
      (a.anchorNode = b.anchorNode),
        (a.anchorOffset = b.anchorOffset),
        (a.focusNode = b.focusNode),
        (a.focusOffset = b.focusOffset);
    }
    function K(a) {
      (a.anchorNode = a.focusNode = null),
        (a.anchorOffset = a.focusOffset = 0),
        (a.rangeCount = 0),
        (a.isCollapsed = !0),
        (a._ranges.length = 0);
    }
    function L(b) {
      var c;
      return (
        b instanceof g
          ? ((c = a.createNativeRange(b.getDocument())),
            c.setEnd(b.endContainer, b.endOffset),
            c.setStart(b.startContainer, b.startOffset))
          : b instanceof h
          ? (c = b.nativeRange)
          : m.implementsDomRange &&
            b instanceof d.getWindow(b.startContainer).Range &&
            (c = b),
        c
      );
    }
    function M(a) {
      if (!a.length || a[0].nodeType != 1) return !1;
      for (var b = 1, c = a.length; b < c; ++b)
        if (!d.isAncestorOf(a[0], a[b])) return !1;
      return !0;
    }
    function N(a) {
      var c = a.getNodes();
      if (!M(c))
        throw b.createError(
          'getSingleElementFromRange: range ' +
            a.inspect() +
            ' did not consist of a single element'
        );
      return c[0];
    }
    function O(a) {
      return !!a && typeof a.text != 'undefined';
    }
    function P(a, b) {
      var c = new h(b);
      (a._ranges = [c]),
        I(a, c, !1),
        (a.rangeCount = 1),
        (a.isCollapsed = c.collapsed);
    }
    function Q(b) {
      b._ranges.length = 0;
      if (b.docSelection.type == 'None') K(b);
      else {
        var c = b.docSelection.createRange();
        if (O(c)) P(b, c);
        else {
          b.rangeCount = c.length;
          var d,
            e = o(c.item(0));
          for (var f = 0; f < b.rangeCount; ++f)
            (d = a.createRange(e)), d.selectNode(c.item(f)), b._ranges.push(d);
          (b.isCollapsed = b.rangeCount == 1 && b._ranges[0].collapsed),
            I(b, b._ranges[b.rangeCount - 1], !1);
        }
      }
    }
    function R(a, c) {
      var d = a.docSelection.createRange(),
        e = N(c),
        f = o(d.item(0)),
        g = p(f).createControlRange();
      for (var h = 0, i = d.length; h < i; ++h) g.add(d.item(h));
      try {
        g.add(e);
      } catch (j) {
        throw b.createError(
          'addRange(): Element within the specified Range could not be added to control selection (does it have layout?)'
        );
      }
      g.select(), Q(a);
    }
    function T(a, b, c) {
      (this.nativeSelection = a),
        (this.docSelection = b),
        (this._ranges = []),
        (this.win = c),
        this.refresh();
    }
    function U(a) {
      (a.win = a.anchorNode = a.focusNode = a._ranges = null),
        (a.rangeCount = a.anchorOffset = a.focusOffset = 0),
        (a.detached = !0);
    }
    function W(a, b) {
      var c = V.length,
        d,
        e;
      while (c--) {
        (d = V[c]), (e = d.selection);
        if (b == 'deleteAll') U(e);
        else if (d.win == a) return b == 'delete' ? (V.splice(c, 1), !0) : e;
      }
      return b == 'deleteAll' && (V.length = 0), null;
    }
    function Z(a, c) {
      var d = o(c[0].startContainer),
        e = p(d).createControlRange();
      for (var f = 0, g; f < rangeCount; ++f) {
        g = N(c[f]);
        try {
          e.add(g);
        } catch (h) {
          throw b.createError(
            'setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)'
          );
        }
      }
      e.select(), Q(a);
    }
    function cb(a, b) {
      if (a.win.document != o(b)) throw new i('WRONG_DOCUMENT_ERR');
    }
    function db(b) {
      return function (c, d) {
        var e;
        this.rangeCount
          ? ((e = this.getRangeAt(0)), e['set' + (b ? 'Start' : 'End')](c, d))
          : ((e = a.createRange(this.win.document)), e.setStartAndEnd(c, d)),
          this.setSingleRange(e, this.isBackward());
      };
    }
    function eb(a) {
      var b = [],
        c = new j(a.anchorNode, a.anchorOffset),
        d = new j(a.focusNode, a.focusOffset),
        e = typeof a.getName == 'function' ? a.getName() : 'Selection';
      if (typeof a.rangeCount != 'undefined')
        for (var f = 0, h = a.rangeCount; f < h; ++f)
          b[f] = g.inspect(a.getRangeAt(f));
      return (
        '[' +
        e +
        '(Ranges: ' +
        b.join(', ') +
        ')(anchor: ' +
        c.inspect() +
        ', focus: ' +
        d.inspect() +
        ']'
      );
    }
    a.requireModules(['DomUtil', 'DomRange', 'WrappedRange']),
      (a.config.checkSelectionRanges = !0);
    var c = 'boolean',
      d = a.dom,
      e = a.util,
      f = e.isHostMethod,
      g = a.DomRange,
      h = a.WrappedRange,
      i = a.DOMException,
      j = d.DomPosition,
      k,
      l,
      m = a.features,
      n = 'Control',
      o = d.getDocument,
      p = d.getBody,
      q = g.rangesEqual,
      v = f(window, 'getSelection'),
      w = e.isHostObject(document, 'selection');
    (m.implementsWinGetSelection = v), (m.implementsDocSelection = w);
    var x = w && (!v || a.config.preferTextRange);
    x
      ? ((k = u),
        (a.isSelectionValid = function (a) {
          var b = s(a, 'isSelectionValid').document,
            c = b.selection;
          return c.type != 'None' || o(c.createRange().parentElement()) == b;
        }))
      : v
      ? ((k = t),
        (a.isSelectionValid = function () {
          return !0;
        }))
      : b.fail('Neither document.selection or window.getSelection() detected.'),
      (a.getNativeSelection = k);
    var y = k(),
      z = a.createNativeRange(document),
      A = p(document),
      B = e.areHostProperties(y, [
        'anchorNode',
        'focusNode',
        'anchorOffset',
        'focusOffset',
      ]);
    m.selectionHasAnchorAndFocus = B;
    var C = f(y, 'extend');
    m.selectionHasExtend = C;
    var D = typeof y.rangeCount == 'number';
    m.selectionHasRangeCount = D;
    var E = !1,
      F = !0;
    e.areHostMethods(y, ['addRange', 'getRangeAt', 'removeAllRanges']) &&
      typeof y.rangeCount == 'number' &&
      m.implementsDomRange &&
      (function () {
        var a = window.getSelection();
        if (a) {
          var b = p(document),
            c = b.appendChild(document.createElement('div'));
          c.contentEditable = 'false';
          var d = c.appendChild(document.createTextNode('\u00a0\u00a0\u00a0')),
            e = document.createRange();
          e.setStart(d, 1),
            e.collapse(!0),
            a.addRange(e),
            (F = a.rangeCount == 1),
            a.removeAllRanges();
          var f = e.cloneRange();
          e.setStart(d, 0),
            f.setEnd(d, 3),
            f.setStart(d, 2),
            a.addRange(e),
            a.addRange(f),
            (E = a.rangeCount == 2),
            b.removeChild(c),
            a.removeAllRanges(),
            e.detach(),
            f.detach();
        }
      })(),
      (m.selectionSupportsMultipleRanges = E),
      (m.collapsedNonEditableSelectionsSupported = F);
    var G = !1,
      H;
    A &&
      f(A, 'createControlRange') &&
      ((H = A.createControlRange()),
      e.areHostProperties(H, ['item', 'add']) && (G = !0)),
      (m.implementsControlRange = G),
      B
        ? (l = function (a) {
            return (
              a.anchorNode === a.focusNode && a.anchorOffset === a.focusOffset
            );
          })
        : (l = function (a) {
            return a.rangeCount ? a.getRangeAt(a.rangeCount - 1).collapsed : !1;
          });
    var S;
    f(y, 'getRangeAt')
      ? (S = function (a, b) {
          try {
            return a.getRangeAt(b);
          } catch (c) {
            return null;
          }
        })
      : B &&
        (S = function (b) {
          var c = o(b.anchorNode),
            d = a.createRange(c);
          return (
            d.setStartAndEnd(
              b.anchorNode,
              b.anchorOffset,
              b.focusNode,
              b.focusOffset
            ),
            d.collapsed !== this.isCollapsed &&
              d.setStartAndEnd(
                b.focusNode,
                b.focusOffset,
                b.anchorNode,
                b.anchorOffset
              ),
            d
          );
        });
    var V = [],
      X = function (a) {
        if (a && a instanceof T) return a.refresh(), a;
        a = s(a, 'getNativeSelection');
        var b = W(a),
          c = k(a),
          d = w ? u(a) : null;
        return (
          b
            ? ((b.nativeSelection = c), (b.docSelection = d), b.refresh())
            : ((b = new T(c, d, a)), V.push({ win: a, selection: b })),
          b
        );
      };
    (a.getSelection = X),
      (a.getIframeSelection = function (c) {
        return (
          b.deprecationNotice('getIframeSelection()', 'getSelection(iframeEl)'),
          a.getSelection(d.getIframeWindow(c))
        );
      });
    var Y = T.prototype;
    if (!x && B && e.areHostMethods(y, ['removeAllRanges', 'addRange'])) {
      Y.removeAllRanges = function () {
        this.nativeSelection.removeAllRanges(), K(this);
      };
      var $ = function (b, c) {
        var d = g.getRangeDocument(c),
          e = a.createRange(d);
        e.collapseToPoint(c.endContainer, c.endOffset),
          b.nativeSelection.addRange(L(e)),
          b.nativeSelection.extend(c.startContainer, c.startOffset),
          b.refresh();
      };
      D
        ? (Y.addRange = function (b, c) {
            if (G && w && this.docSelection.type == n) R(this, b);
            else if (r(c) && C) $(this, b);
            else {
              var d;
              E ? (d = this.rangeCount) : (this.removeAllRanges(), (d = 0)),
                this.nativeSelection.addRange(L(b).cloneRange()),
                (this.rangeCount = this.nativeSelection.rangeCount);
              if (this.rangeCount == d + 1) {
                if (a.config.checkSelectionRanges) {
                  var e = S(this.nativeSelection, this.rangeCount - 1);
                  e && !q(e, b) && (b = new h(e));
                }
                (this._ranges[this.rangeCount - 1] = b),
                  I(this, b, bb(this.nativeSelection)),
                  (this.isCollapsed = l(this));
              } else this.refresh();
            }
          })
        : (Y.addRange = function (a, b) {
            r(b) && C
              ? $(this, a)
              : (this.nativeSelection.addRange(L(a)), this.refresh());
          }),
        (Y.setRanges = function (a) {
          if (G && a.length > 1) Z(this, a);
          else {
            this.removeAllRanges();
            for (var b = 0, c = a.length; b < c; ++b) this.addRange(a[b]);
          }
        });
    } else {
      if (!(f(y, 'empty') && f(z, 'select') && G && x))
        return (
          b.fail('No means of selecting a Range or TextRange was found'), !1
        );
      (Y.removeAllRanges = function () {
        try {
          this.docSelection.empty();
          if (this.docSelection.type != 'None') {
            var a;
            if (this.anchorNode) a = o(this.anchorNode);
            else if (this.docSelection.type == n) {
              var b = this.docSelection.createRange();
              b.length && (a = o(b.item(0)));
            }
            if (a) {
              var c = p(a).createTextRange();
              c.select(), this.docSelection.empty();
            }
          }
        } catch (d) {}
        K(this);
      }),
        (Y.addRange = function (a) {
          this.docSelection.type == n
            ? R(this, a)
            : (h.rangeToTextRange(a).select(),
              (this._ranges[0] = a),
              (this.rangeCount = 1),
              (this.isCollapsed = this._ranges[0].collapsed),
              I(this, a, !1));
        }),
        (Y.setRanges = function (a) {
          this.removeAllRanges();
          var b = a.length;
          b > 1 ? Z(this, a) : b && this.addRange(a[0]);
        });
    }
    Y.getRangeAt = function (a) {
      if (a < 0 || a >= this.rangeCount) throw new i('INDEX_SIZE_ERR');
      return this._ranges[a].cloneRange();
    };
    var _;
    if (x)
      _ = function (b) {
        var c;
        a.isSelectionValid(b.win)
          ? (c = b.docSelection.createRange())
          : ((c = p(b.win.document).createTextRange()), c.collapse(!0)),
          b.docSelection.type == n ? Q(b) : O(c) ? P(b, c) : K(b);
      };
    else if (f(y, 'getRangeAt') && typeof y.rangeCount == 'number')
      _ = function (b) {
        if (G && w && b.docSelection.type == n) Q(b);
        else {
          b._ranges.length = b.rangeCount = b.nativeSelection.rangeCount;
          if (b.rangeCount) {
            for (var c = 0, d = b.rangeCount; c < d; ++c)
              b._ranges[c] = new a.WrappedRange(
                b.nativeSelection.getRangeAt(c)
              );
            I(b, b._ranges[b.rangeCount - 1], bb(b.nativeSelection)),
              (b.isCollapsed = l(b));
          } else K(b);
        }
      };
    else {
      if (
        !B ||
        typeof y.isCollapsed != c ||
        typeof z.collapsed != c ||
        !m.implementsDomRange
      )
        return (
          b.fail(
            "No means of obtaining a Range or TextRange from the user's selection was found"
          ),
          !1
        );
      _ = function (a) {
        var b,
          c = a.nativeSelection;
        c.anchorNode
          ? ((b = S(c, 0)),
            (a._ranges = [b]),
            (a.rangeCount = 1),
            J(a),
            (a.isCollapsed = l(a)))
          : K(a);
      };
    }
    Y.refresh = function (a) {
      var b = a ? this._ranges.slice(0) : null,
        c = this.anchorNode,
        d = this.anchorOffset;
      _(this);
      if (a) {
        var e = b.length;
        if (e != this._ranges.length) return !0;
        if (this.anchorNode != c || this.anchorOffset != d) return !0;
        while (e--) if (!q(b[e], this._ranges[e])) return !0;
        return !1;
      }
    };
    var ab = function (b, c) {
      var d = b.getAllRanges();
      b.removeAllRanges();
      for (var e = 0, f = d.length; e < f; ++e)
        a.rangesEqual(c, d[e]) || b.addRange(d[e]);
      b.rangeCount || K(b);
    };
    G
      ? (Y.removeRange = function (a) {
          if (this.docSelection.type == n) {
            var b = this.docSelection.createRange(),
              c = N(a),
              d = o(b.item(0)),
              e = p(d).createControlRange(),
              f,
              g = !1;
            for (var h = 0, i = b.length; h < i; ++h)
              (f = b.item(h)), f !== c || g ? e.add(b.item(h)) : (g = !0);
            e.select(), Q(this);
          } else ab(this, a);
        })
      : (Y.removeRange = function (a) {
          ab(this, a);
        });
    var bb;
    !x && B && m.implementsDomRange
      ? ((bb = function (a) {
          var b = !1;
          return (
            a.anchorNode &&
              (b =
                d.comparePoints(
                  a.anchorNode,
                  a.anchorOffset,
                  a.focusNode,
                  a.focusOffset
                ) == 1),
            b
          );
        }),
        (Y.isBackward = function () {
          return bb(this);
        }))
      : (bb = Y.isBackward =
          function () {
            return !1;
          }),
      (Y.isBackwards = Y.isBackward),
      (Y.toString = function () {
        var a = [];
        for (var b = 0, c = this.rangeCount; b < c; ++b)
          a[b] = '' + this._ranges[b];
        return a.join('');
      }),
      (Y.collapse = function (b, c) {
        cb(this, b);
        var d = a.createRange(b);
        d.collapseToPoint(b, c),
          this.setSingleRange(d),
          (this.isCollapsed = !0);
      }),
      (Y.collapseToStart = function () {
        if (!this.rangeCount) throw new i('INVALID_STATE_ERR');
        var a = this._ranges[0];
        this.collapse(a.startContainer, a.startOffset);
      }),
      (Y.collapseToEnd = function () {
        if (!this.rangeCount) throw new i('INVALID_STATE_ERR');
        var a = this._ranges[this.rangeCount - 1];
        this.collapse(a.endContainer, a.endOffset);
      }),
      (Y.selectAllChildren = function (b) {
        cb(this, b);
        var c = a.createRange(b);
        c.selectNodeContents(b), this.removeAllRanges(), this.addRange(c);
      }),
      (Y.deleteFromDocument = function () {
        if (G && w && this.docSelection.type == n) {
          var a = this.docSelection.createRange(),
            b;
          while (a.length)
            (b = a.item(0)), a.remove(b), b.parentNode.removeChild(b);
          this.refresh();
        } else if (this.rangeCount) {
          var c = this.getAllRanges();
          if (c.length) {
            this.removeAllRanges();
            for (var d = 0, e = c.length; d < e; ++d) c[d].deleteContents();
            this.addRange(c[e - 1]);
          }
        }
      }),
      (Y.eachRange = function (a, b) {
        for (var c = 0, d = this._ranges.length; c < d; ++c)
          if (a(this.getRangeAt(c))) return b;
      }),
      (Y.getAllRanges = function () {
        var a = [];
        return (
          this.eachRange(function (b) {
            a.push(b);
          }),
          a
        );
      }),
      (Y.setSingleRange = function (a, b) {
        this.removeAllRanges(), this.addRange(a, b);
      }),
      (Y.callMethodOnEachRange = function (a, b) {
        var c = [];
        return (
          this.eachRange(function (d) {
            c.push(d[a].apply(d, b));
          }),
          c
        );
      }),
      (Y.setStart = db(!0)),
      (Y.setEnd = db(!1)),
      (a.rangePrototype.select = function (a) {
        X(this.getDocument()).setSingleRange(this, a);
      }),
      (Y.changeEachRange = function (a) {
        var b = [],
          c = this.isBackward();
        this.eachRange(function (c) {
          a(c), b.push(c);
        }),
          this.removeAllRanges(),
          c && b.length == 1
            ? this.addRange(b[0], 'backward')
            : this.setRanges(b);
      }),
      (Y.containsNode = function (a, b) {
        return this.eachRange(function (c) {
          return c.containsNode(a, b);
        }, !0);
      }),
      (Y.getBookmark = function (a) {
        return {
          backward: this.isBackward(),
          rangeBookmarks: this.callMethodOnEachRange('getBookmark', [a]),
        };
      }),
      (Y.moveToBookmark = function (b) {
        var c = [];
        for (var d = 0, e, f; (e = b.rangeBookmarks[d++]); )
          (f = a.createRange(this.win)), f.moveToBookmark(e), c.push(f);
        b.backward ? this.setSingleRange(c[0], 'backward') : this.setRanges(c);
      }),
      (Y.toHtml = function () {
        return this.callMethodOnEachRange('toHtml').join('');
      }),
      (Y.getName = function () {
        return 'WrappedSelection';
      }),
      (Y.inspect = function () {
        return eb(this);
      }),
      (Y.detach = function () {
        W(this.win, 'delete'), U(this);
      }),
      (T.detachAll = function () {
        W(null, 'deleteAll');
      }),
      (T.inspect = eb),
      (T.isDirectionBackward = r),
      (a.Selection = T),
      (a.selectionPrototype = Y),
      a.addCreateMissingNativeApiListener(function (a) {
        typeof a.getSelection == 'undefined' &&
          (a.getSelection = function () {
            return X(a);
          }),
          (a = null);
      });
  });

module.exports = rangy;
