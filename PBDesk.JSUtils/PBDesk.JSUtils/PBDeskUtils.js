var PBDeskJS;
(function (PBDeskJS) {
    var Utils = (function () {
        function Utils() { }
        Utils.InjectScript = function InjectScript(url) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", url);
            head.appendChild(script);
        }
        Utils.Random = function Random(to, from) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }
        return Utils;
    })();
    PBDeskJS.Utils = Utils;    
    var StrUtils = (function () {
        function StrUtils() { }
        StrUtils.StripHTML = function StripHTML(originalStr, replacerStr) {
            if (typeof replacerStr === "undefined") { replacerStr = ""; }
            var regex = /<\S[^><]*>/g;
            return originalStr.replace(regex, replacerStr);
        }
        StrUtils.IsValidEmail = function IsValidEmail(sText) {
            var regexEmail = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
            return regexEmail.test(sText);
        }
        StrUtils.IsValidUrl = function IsValidUrl(originalStr) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(originalStr);
        }
        StrUtils.IsEmpty = function IsEmpty(text) {
            var editorTextLength = text.replace(/\s+|\n+|\t+/g, "").length;
            return editorTextLength === 0;
        }
        StrUtils.StripHTMLAndTrim = function StripHTMLAndTrim(text) {
            var htmlStriper = /<(?:.|\s)*?>/g;
            text = text.replace(htmlStriper, " ");
            while(text.indexOf("  ") >= 0) {
                text = text.replace("  ", " ");
            }
            return text.replace(/^\s+|\s+$/g, "");
        }
        StrUtils.Trim = function Trim(text) {
            return text.replace(/^\s+|\s+$/g, "");
        }
        StrUtils.LTrim = function LTrim(text) {
            return text.replace(/^\s+/, "");
        }
        StrUtils.RTrim = function RTrim(text) {
            return text.replace(/\s+$/, "");
        }
        StrUtils.Format = function Format(text) {
            if(arguments.length <= 1) {
                return text;
            }
            var tokenCount = arguments.length - 2;
            for(var token = 0; token <= tokenCount; token++) {
                text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
            }
            return text;
        }
        return StrUtils;
    })();
    PBDeskJS.StrUtils = StrUtils;    
    var DOMUtils = (function () {
        function DOMUtils() { }
        DOMUtils.GetElementValue = function GetElementValue(eid) {
            return document.getElementById(eid).textContent;
        }
        DOMUtils.SetElementValue = function SetElementValue(eid, val) {
            document.getElementById(eid).textContent = val;
        }
        DOMUtils.GetMetaContents = function GetMetaContents(metaTagName) {
            var m = document.getElementsByTagName('meta');
            for(var i in m) {
                try  {
                    if(m[i].name.toLowerCase() === metaTagName.toLowerCase()) {
                        return m[i].content;
                    }
                } catch (Error) {
                    continue;
                }
            }
            return "";
        }
        return DOMUtils;
    })();
    PBDeskJS.DOMUtils = DOMUtils;    
    var CookieUtils = (function () {
        function CookieUtils() { }
        CookieUtils.Read = function Read(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while(c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if(c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }
        CookieUtils.Create = function Create(name, value, days) {
            var expires = "";
            if(days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }
        CookieUtils.Erase = function Erase(name) {
            CookieUtils.Create(name, "", -1);
        }
        return CookieUtils;
    })();
    PBDeskJS.CookieUtils = CookieUtils;    
})(PBDeskJS || (PBDeskJS = {}));
