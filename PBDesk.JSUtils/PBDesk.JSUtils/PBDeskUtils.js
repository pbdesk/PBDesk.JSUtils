var PBDeskJS;
(function (PBDeskJS) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.InjectScript = function (url) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", url);
            head.appendChild(script);
        };

        Utils.Random = function (to, from) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        };

        Utils.Clone = function (obj) {
            if (null == obj || "object" != typeof obj)
                return obj;

            if (obj instanceof Date) {
                var copyDt = new Date();
                copyDt.setTime(obj.getTime());
                return copyDt;
            }

            if (obj instanceof Array) {
                var copyArr = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copyArr[i] = Utils.Clone(obj[i]);
                }
                return copyArr;
            }

            if (obj instanceof Object) {
                var copyOb = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr))
                        copyOb[attr] = Utils.Clone(obj[attr]);
                }
                return copyOb;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        };
        return Utils;
    })();
    PBDeskJS.Utils = Utils;

    var StrUtils = (function () {
        function StrUtils() {
        }
        StrUtils.StripHTML = function (originalStr, replacerStr) {
            if (typeof replacerStr === "undefined") { replacerStr = ""; }
            var regex = /<\S[^><]*>/g;
            return originalStr.replace(regex, replacerStr);
        };

        StrUtils.IsValidEmail = function (sText) {
            var regexEmail = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
            return regexEmail.test(sText);
        };

        StrUtils.IsValidUrl = function (originalStr) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(originalStr);
        };

        StrUtils.IsEmpty = function (text) {
            var editorTextLength = text.replace(/\s+|\n+|\t+/g, "").length;
            return editorTextLength === 0;
        };

        StrUtils.StripHTMLAndTrim = function (text) {
            var htmlStriper = /<(?:.|\s)*?>/g;
            text = text.replace(htmlStriper, " ");
            while (text.indexOf("  ") >= 0) {
                text = text.replace("  ", " ");
            }
            return text.replace(/^\s+|\s+$/g, "");
        };

        StrUtils.Trim = function (text) {
            return text.replace(/^\s+|\s+$/g, "");
        };

        StrUtils.LTrim = function (text) {
            return text.replace(/^\s+/, "");
        };

        StrUtils.RTrim = function (text) {
            return text.replace(/\s+$/, "");
        };

        StrUtils.Format = function (text) {
            if (arguments.length <= 1) {
                //if there are not 2 or more arguments there's nothing to replace
                //just return the original text
                return text;
            }

            //decrement to move to the second argument in the array
            var tokenCount = arguments.length - 2;
            for (var token = 0; token <= tokenCount; token++) {
                //iterate through the tokens and replace their placeholders from the original text in order
                text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
            }
            return text;
        };
        return StrUtils;
    })();
    PBDeskJS.StrUtils = StrUtils;

    var DOMUtils = (function () {
        function DOMUtils() {
        }
        DOMUtils.GetElementValue = function (eid) {
            return document.getElementById(eid).textContent;
        };

        DOMUtils.SetElementValue = function (eid, val) {
            document.getElementById(eid).textContent = val;
        };

        DOMUtils.GetMetaContents = function (metaTagName) {
            var m = document.getElementsByTagName('meta');
            for (var i in m) {
                try  {
                    if (m[i].name.toLowerCase() === metaTagName.toLowerCase()) {
                        return m[i].content;
                    }
                } catch (Error) {
                    continue;
                }
            }
            return "";
        };
        return DOMUtils;
    })();
    PBDeskJS.DOMUtils = DOMUtils;

    var CookieUtils = (function () {
        function CookieUtils() {
        }
        CookieUtils.Read = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0)
                    return c.substring(nameEQ.length, c.length);
            }
            return null;
        };

        CookieUtils.Create = function (name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        };

        CookieUtils.Erase = function (name) {
            CookieUtils.Create(name, "", -1);
        };
        return CookieUtils;
    })();
    PBDeskJS.CookieUtils = CookieUtils;
})(PBDeskJS || (PBDeskJS = {}));
//# sourceMappingURL=PBDeskUtils.js.map
