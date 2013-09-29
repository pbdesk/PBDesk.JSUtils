/// <reference path="../../PBDeskUtils.js" />
/// <reference path="../lib/jasmine-1.3.1/jasmine.js" />

describe("PBDeskJS.StrUtils", function () {
    
    describe("IsValidEmail", function () {

        it("Positive Test", function () {
            expect(PBDeskJS.StrUtils.IsValidEmail("a@a.com")).toBeTruthy();
        });
        it("Negative Test", function () {
            expect(PBDeskJS.StrUtils.IsValidEmail("asdf")).toBeFalsy();
        });
        it("When Input string is empty", function () {
            expect(PBDeskJS.StrUtils.IsValidEmail('')).toBeFalsy();
        });
        it("When Input string is null", function () {
            expect(PBDeskJS.StrUtils.IsValidEmail(null)).toBeFalsy();
        });
    });

    

});