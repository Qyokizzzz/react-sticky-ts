var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import require$$0, { memo, useRef, useCallback, useEffect, useState, cloneElement } from "react";
import raf from "raf";
class EventServer {
  constructor() {
    __publicField(this, "subscribers");
    __publicField(this, "root");
    this.subscribers = [];
    this.root = null;
  }
  setRoot(ref) {
    this.root = ref;
  }
  subscribe(handler) {
    this.subscribers = this.subscribers.concat(handler);
  }
  unsubscribe(handler) {
    this.subscribers = this.subscribers.filter((current) => current !== handler);
  }
}
var es = new EventServer();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, k) {
  var b, d = {}, e = null, l = null;
  k !== void 0 && (e = "" + k);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (l = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const events = ["resize", "scroll", "touchstart", "touchmove", "touchend", "pageshow", "load"];
function Container(props) {
  const ref = useRef(null);
  const containerVarBox = useRef({
    framePending: false,
    rafHandle: null,
    es
  });
  const notifySubscribers = useCallback((evt) => {
    if (!containerVarBox.current.framePending) {
      const {
        currentTarget
      } = evt;
      containerVarBox.current.rafHandle = raf(() => {
        containerVarBox.current.framePending = false;
        const node = ref.current;
        if (node) {
          const {
            top,
            bottom
          } = node.getBoundingClientRect();
          containerVarBox.current.es.subscribers.forEach((handler) => handler(top, bottom, currentTarget === window ? document.body : node));
        }
      });
      containerVarBox.current.framePending = true;
    }
  }, []);
  useEffect(() => {
    containerVarBox.current.es.setRoot(ref.current);
  }, []);
  useEffect(() => {
    events.forEach((event) => window.addEventListener(event, notifySubscribers));
    const {
      rafHandle
    } = containerVarBox.current;
    return () => {
      if (rafHandle) {
        raf.cancel(rafHandle);
      }
      events.forEach((event) => window.removeEventListener(event, notifySubscribers));
    };
  }, [notifySubscribers]);
  return /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({}, props), {
    ref,
    onScroll: notifySubscribers,
    onTouchStart: notifySubscribers,
    onTouchMove: notifySubscribers,
    onTouchEnd: notifySubscribers
  }));
}
var container = memo(Container);
const initialState = {
  isSticky: false,
  wasSticky: false,
  distanceFromTop: 0,
  distanceFromBottom: 0,
  calculatedHeight: 0,
  style: {}
};
function Sticky(props) {
  const {
    children,
    disableCompensation
  } = props;
  const [state, setState] = useState(initialState);
  const ref = useRef(null);
  const childRef = useRef(null);
  const stickyVarBox = useRef({
    es,
    props,
    state
  });
  const handleContainerEvent = useCallback((distanceFromTop2, distanceFromBottom2, eventSource) => {
    const {
      root
    } = stickyVarBox.current.es;
    if (!ref.current || !childRef.current || !root || !root.offsetParent)
      return;
    const {
      topOffset = 0,
      bottomOffset = 0,
      disableHardwareAcceleration,
      relative
    } = stickyVarBox.current.props;
    let preventingStickyStateChanges = false;
    const placeholderClientRect = ref.current.getBoundingClientRect();
    const contentClientRect = childRef.current.getBoundingClientRect();
    const calculatedHeight2 = contentClientRect.height;
    let btmd = 0;
    if (relative) {
      preventingStickyStateChanges = eventSource !== root;
      distanceFromTop2 = -(eventSource.scrollTop + eventSource.offsetTop) + ref.current.offsetTop;
      btmd = root.offsetTop - root.offsetParent.scrollTop;
    }
    const bottomDifference = distanceFromBottom2 - bottomOffset - calculatedHeight2;
    const wasSticky2 = !!stickyVarBox.current.state.isSticky;
    const isSticky2 = preventingStickyStateChanges ? wasSticky2 : distanceFromTop2 <= -topOffset && distanceFromBottom2 > -bottomOffset;
    if (root) {
      distanceFromBottom2 = (relative ? root.scrollHeight - root.scrollTop : distanceFromBottom2) - calculatedHeight2;
    }
    const style2 = !isSticky2 ? {} : {
      position: "fixed",
      top: bottomDifference > 0 ? btmd : bottomDifference,
      left: placeholderClientRect == null ? void 0 : placeholderClientRect.left,
      width: placeholderClientRect == null ? void 0 : placeholderClientRect.width
    };
    if (!disableHardwareAcceleration) {
      style2.transform = "translateZ(0)";
    }
    setState({
      isSticky: isSticky2,
      wasSticky: wasSticky2,
      distanceFromTop: distanceFromTop2,
      distanceFromBottom: distanceFromBottom2,
      calculatedHeight: calculatedHeight2,
      style: style2
    });
  }, []);
  const {
    isSticky,
    wasSticky,
    distanceFromTop,
    distanceFromBottom,
    calculatedHeight,
    style
  } = state;
  useEffect(() => {
    const esRef = stickyVarBox.current.es;
    esRef.subscribe(handleContainerEvent);
    return () => {
      esRef.unsubscribe(handleContainerEvent);
    };
  }, [handleContainerEvent]);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.paddingBottom = disableCompensation ? "0px" : `${isSticky ? calculatedHeight : 0}px`;
    }
  }, [isSticky, disableCompensation, calculatedHeight]);
  const element = cloneElement(children({
    isSticky,
    wasSticky,
    distanceFromTop,
    distanceFromBottom,
    calculatedHeight,
    style
  }), {
    ref: childRef
  });
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      ref
    }), element]
  });
}
var sticky = memo(Sticky);
export { sticky as Sticky, container as StickyContainer };
