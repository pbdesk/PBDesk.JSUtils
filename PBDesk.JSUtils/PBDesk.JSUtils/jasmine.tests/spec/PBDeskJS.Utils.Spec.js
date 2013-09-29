/// <reference path="../../PBDeskUtils.js" />
/// <reference path="../lib/jasmine-1.3.1/jasmine.js" />

describe("PBDeskJS.Utils", function () {

    beforeEach(function () {
        this.addMatchers({
            toBeBetween: function (floor, ceiling) {
                if (floor > ceiling) {
                    var temp = floor;
                    floor = ceiling;
                    ceiling = temp;
                }
                return this.actual > floor && this.actual < ceiling;
            },

            toBeBetweenInclusive: function (floor, ceiling) {
                if (floor > ceiling) {
                    var temp = floor;
                    floor = ceiling;
                    ceiling = temp;
                }
                return this.actual >= floor && this.actual <= ceiling;
            }

        });
    });

    describe("Random", function () {
        var vTo = 0;
        var vFrom = 0;
        var vResult = 0;

        it("Number between 1 and 5", function () {
            vTo = 1;
            vFrom = 5;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeBetweenInclusive(vTo, vFrom);
        });

        it("Number between 5 and 1", function () {
            vTo = 5;
            vFrom = 1;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeBetweenInclusive(vTo, vFrom);
        });

        it("Number between 0 and 1", function () {
            vTo = 0;
            vFrom = 1;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeBetweenInclusive(vTo, vFrom);
        });

        it("Number between 0 and 0", function () {
            vTo = 0;
            vFrom = 0;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBe(0);
        });

        it("Number between 1 and 1", function () {
            vTo = 1;
            vFrom = 1;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBe(1);
        });

        it("Number between -1 and -1", function () {
            vTo = -1;
            vFrom = -1;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBe(-1);
        });

        it("Number between -1 and 1", function () {
            vTo = -1;
            vFrom = 1;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeBetweenInclusive(vTo, vFrom);
        });

        it("Number between -100 and -1", function () {
            vTo = -100;
            vFrom = -1;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeBetweenInclusive(vTo, vFrom);
        });

        it("Number between 1 and 10000", function () {
            vTo = 1;
            vFrom = 10000;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeBetweenInclusive(vTo, vFrom);
        });

        it("Number between 50 and 100 - Less Than", function () {
            vTo = 50;
            vFrom = 100;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeLessThan(vFrom+1);
        });

        it("Number between 120 and 150 - Greater Than", function () {
            vTo = 120;
            vFrom = 150;
            vResult = PBDeskJS.Utils.Random(vTo, vFrom);
            expect(vResult).toBeGreaterThan(vTo - 1);
        });


      
    });

    describe("Clone() Method", function () {

        it("Non Object - Numeric Value", function () {
            var actual = 1;
            var clone = PBDeskJS.Utils.Clone(actual);
            expect(clone).toEqual(actual);
        });

        it("Non Object - String Value", function () {
            var actual = '1';
            var clone = PBDeskJS.Utils.Clone(actual);
            expect(clone).toEqual(actual);
        });

        it("Null Object", function () {
            var actual = '1';
            var clone = PBDeskJS.Utils.Clone(actual);
            expect(clone).toEqual(actual);
        });

        describe("Date as  input Object", function () { 

            it("Non Clone", function () {
                var obj1 = Date();
                var obj2 = obj1;
                expect(obj2).toEqual(obj1);
                expect(obj2).toBe(obj1);
                obj1 = Date(2013, 10, 1);
                expect(obj2).toEqual(obj1);
                expect(obj2).toBe(obj1);
            })

            it("Date Object", function () {
                var actual = Date();
                var clone = PBDeskJS.Utils.Clone(actual);
                expect(clone).toEqual(actual);
                actual = actual + 1;
                expect(clone).toNotEqual(actual);
            });

        });
    });

});