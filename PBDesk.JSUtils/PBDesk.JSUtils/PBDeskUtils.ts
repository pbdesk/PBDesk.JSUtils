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
