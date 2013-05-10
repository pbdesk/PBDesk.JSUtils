
describe("PBDeskUtils Test", function () {

    describe("StrUtils", function () {

        describe("IsEmpty", function () {

            
            it("Negative Test", function () {
                var str = "abc";
                expect(PBDeskJS.StrUtils.IsEmpty(str)).toBeFalsy();
            });

            it("Possitive Test", function () {
                var str = "";
                expect(PBDeskJS.StrUtils.IsEmpty(str)).toBeTruthy();
            });

            it("White Space Test", function () {
                var str = " ";
                expect(PBDeskJS.StrUtils.IsEmpty(str)).toBeTruthy();
            });

            it("Padded String Test", function () {
                var str = " a ";
                expect(PBDeskJS.StrUtils.IsEmpty(str)).toBeFalsy();
            });

            it("LPadded String Test", function () {
                var str = " a";
                expect(PBDeskJS.StrUtils.IsEmpty(str)).toBeFalsy();
            });

            it("RPadded String Test", function () {
                var str = "a ";
                expect(PBDeskJS.StrUtils.IsEmpty(str)).toBeFalsy();
            });

            it("Space in between Test", function () {
                var str = "a  b";
                expect(PBDeskJS.StrUtils.IsEmpty(str)).toBeFalsy();
            });

            it("Number Test", function () {

                var fn = function () {
                    var str = 6;
                    return PBDeskJS.StrUtils.IsEmpty(str);
                };
                
                expect(fn).toThrow();
            });

        });

        describe("IsValidUrl", function () {
            it("Simple String Test", function () {
                var str = "abc";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeFalsy();
            });
            it("Empty String Test", function () {
                var str = "";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeFalsy();
            });
            it("Empty String with space Test", function () {
                var str = " ";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeFalsy();
            });
            it("www.xyz.com Test", function () {
                var str = "www.xyx.com";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeFalsy();
            });
            it("http://www.xyz.com Test", function () {
                var str = "http://www.xyx.com";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("Valid URL with leading spaces Test", function () {
                var str = "    http://www.xyx.com";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("Valid URL with Trailing spaces Test", function () {
                var str = "http://www.xyx.com   ";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("Valid URL with Leading & Trailing spaces Test", function () {
                var str = "   http://www.xyx.com   ";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("http://www.xyx.com.au Test", function () {
                var str = "http://www.xyx.com.au";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("http://test.xyx.de Test", function () {
                var str = "http://test.xyx.de";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("http://test.xyx.it/test Test", function () {
                var str = "http://test.xyx.it/test";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("http://test.xyx.edu/default.html Test", function () {
                var str = "http://test.xyx.edu/default.html";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("ftp://test.xyx.edu/filea", function () {
                var str = "ftp://test.xyx.edu/filea";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("InValid URL http:/www.xyx.com Test", function () {
                var str = "http:/www.xyx.com";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeFalsy();
            });
            it("InValid URL http//www.xyx.com Test", function () {
                var str = "http//www.xyx.com";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeFalsy();
            });
            xit("http//localhost:8080 Test", function () {
                var str = "http//localhost:8080";
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeTruthy();
            });
            it("Number input Test", function () {
                var str = 5;
                expect(PBDeskJS.StrUtils.IsValidUrl(str)).toBeFalsy();
            });
        });

        describe("IsValidEmail", function () {
        });


    });

    describe("Utils", function () {



    });

    describe("DOMUtils", function () {



    });

    describe("CookieUtils", function () {



    });


});