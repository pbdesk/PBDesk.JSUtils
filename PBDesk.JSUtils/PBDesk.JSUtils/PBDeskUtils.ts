module PBDeskJS {
        
    export class Utils {

        static InjectScript(url: string) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", url);
            head.appendChild(script);
        }

        static Random(to: number, from: number): number {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        static Clone(obj: any) {
            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                var copyDt = new Date();
                copyDt.setTime(obj.getTime());
                return copyDt;
            }

            // Handle Array
            if (obj instanceof Array) {
                var copyArr = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copyArr[i] = Utils.Clone(obj[i]);
                }
                return copyArr;
            }

            // Handle Object
            if (obj instanceof Object) {
                var copyOb = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copyOb[attr] = Utils.Clone(obj[attr]);
                }
                return copyOb;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        }
        
        static DeepCompare() {
            var leftChain, rightChain;

            function compare2Objects(x, y) {
                var p;

                // remember that NaN === NaN returns false
                // and isNaN(undefined) returns true
                if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                    return true;
                }

                // Compare primitives and functions.     
                // Check if both arguments link to the same object.
                // Especially useful on step when comparing prototypes
                if (x === y) {
                    return true;
                }

                // Works in case when functions are created in constructor.
                // Comparing dates is a common scenario. Another built-ins?
                // We can even handle functions passed across iframes
                if ((typeof x === 'function' && typeof y === 'function') ||
                    (x instanceof Date && y instanceof Date) ||
                    (x instanceof RegExp && y instanceof RegExp) ||
                    (x instanceof String && y instanceof String) ||
                    (x instanceof Number && y instanceof Number)) {
                    return x.toString() === y.toString();
                }

                // At last checking prototypes as good a we can
                if (!(x instanceof Object && y instanceof Object)) {
                    return false;
                }

                if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                    return false;
                }

                if (x.constructor !== y.constructor) {
                    return false;
                }

                if (x.prototype !== y.prototype) {
                    return false;
                }

                // check for infinitive linking loops
                if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                    return false;
                }

                // Quick checking of one object beeing a subset of another.
                // todo: cache the structure of arguments[0] for performance
                for (p in y) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }
                }

                for (p in x) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }

                    switch (typeof (x[p])) {
                        case 'object':
                        case 'function':

                            leftChain.push(x);
                            rightChain.push(y);

                            if (!compare2Objects(x[p], y[p])) {
                                return false;
                            }

                            leftChain.pop();
                            rightChain.pop();
                            break;

                        default:
                            if (x[p] !== y[p]) {
                                return false;
                            }
                            break;
                    }
                }

                return true;
            }

            if (arguments.length < 1) {
                return true; //Die silently? Don't know how to handle such case, please help...
                // throw "Need two or more arguments to compare";
            }

            for (var i = 1, l = arguments.length; i < l; i++) {

                leftChain = []; //todo: this can be cached
                rightChain = [];

                if (!compare2Objects(arguments[0], arguments[i])) {
                    return false;
                }
            }

            return true;
        }

        static ResolveReferences(json) {
            if (typeof json === 'string')
                json = JSON.parse(json);

            var byid = {}, // all objects by id
                refs = []; // references to objects that could not be resolved

            function recurse(obj, prop, parent) {
                if (typeof obj !== 'object' || !obj) { // a primitive value
                    return obj;
                }
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    for (var i = 0; i < obj.length; i++)
                        if ("$ref" in obj[i]) {
                            obj[i] = recurse(obj[i], i, obj);
                        }
                        else {
                            obj[i] = recurse(obj[i], prop, obj);
                        }
                    return obj;
                }
                if ("$ref" in obj) { // a reference
                    var ref = obj.$ref;
                    if (ref in byid) {
                        return byid[ref];
                    }
                    // else we have to make it lazy:
                    refs.push([parent, prop, ref]);
                    return;
                } else if ("$id" in obj) {
                    var id = obj.$id;
                    delete obj.$id;
                    if ("$values" in obj) { // an array
                        obj = obj.$values.map(recurse);
                    }
                    else { // a plain object
                        for (var prop in obj) {
                            obj[prop] = recurse(obj[prop], prop, obj);
                        }
                    }
                    byid[id] = obj;
                }
                return obj;
            }

            json = recurse(json, null, null); // run it!

            for (var i = 0; i < refs.length; i++) { // resolve previously unknown references
                var ref = refs[i];
                ref[0][ref[1]] = byid[ref[2]];
                // Notice that this throws if you put in a reference at top-level
            }
            return json;
        }

    }

    export class StrUtils {
        
        static StripHTML(originalStr: string, replacerStr: string = ""): string {
            var regex = /<\S[^><]*>/g;
            return originalStr.replace(regex, replacerStr);
        }

        static IsValidEmail(sText: string): boolean {
            var regexEmail = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
            return regexEmail.test(sText);
        }

        static IsValidUrl(originalStr: string): boolean {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            return regexp.test(originalStr);
        }

        static IsEmpty(text: string): boolean {
            var editorTextLength = text.replace(/\s+|\n+|\t+/g, "").length;
            return editorTextLength === 0;
        }

        static StripHTMLAndTrim(text: string): string {
            var htmlStriper = /<(?:.|\s)*?>/g;
            text = text.replace(htmlStriper, " ");
            while (text.indexOf("  ") >= 0) {
                text = text.replace("  ", " ");
            }
            return text.replace(/^\s+|\s+$/g, "");
        }

        static Trim(text: string): string {
            return text.replace(/^\s+|\s+$/g, "");
        }

        static LTrim(text: string): string {
            return text.replace(/^\s+/, "");
        }

        static RTrim(text: string): string {
            return text.replace(/\s+$/, "");
        }

        static Format(text: string): string {
            //check if there are two arguments in the arguments list
            if (arguments.length <= 1) {
                //if there are not 2 or more arguments there's nothing to replace
                //just return the original text
                return text;
            }

            //decrement to move to the second argument in the array
            var tokenCount = arguments.length - 2;
            for (var token = 0; token <= tokenCount; token++) {
                //iterate through the tokens and replace their placeholders from the original text in order
                text = text.replace(new RegExp("\\{" + token + "\\}", "gi"),
                                                        arguments[token + 1]);
            }
            return text;
        }
        

    }

    export class DOMUtils {

        static GetElementValue(eid: string): string {
            return document.getElementById(eid).textContent;
        }

        static SetElementValue(eid, val) {
            document.getElementById(eid).textContent = val;
        }

        static GetMetaContents(metaTagName: string) {
            var m = document.getElementsByTagName('meta');
            for (var i in m) {
                try {
                    if (m[i].name.toLowerCase() === metaTagName.toLowerCase()) {
                        return m[i].content;
                    }
                }
                catch (Error) {
                    continue;
                }
            }
            return "";
        }
    }

     export class CookieUtils {
        
        static Read(name: string) {
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
        }

        static Create(name: string, value: any, days: number) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }            
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        static Erase(name: string) {
            CookieUtils.Create(name, "", -1);
        }
    }

}
