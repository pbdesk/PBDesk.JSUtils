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

        describe("Input as non-object or null", function () {
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

        });

        describe("Input Object of Date Type", function () { 

            xit("Non Clone", function () {
                var obj1 = new Date();
                var obj2 = obj1;
                //expect(obj2).toEqual(obj1);
                expect(obj2).toBe(obj1);
                obj1 = new Date(2013, 1, 1);
                //expect(obj2).toEqual(obj1);
                expect(obj2).toBe(obj1);
            })

            it("acutal == clone", function () {
                var actual = new Date();
                var clone = PBDeskJS.Utils.Clone(actual);
                expect(clone).toEqual(actual);
                
            });

            it("actual === clone", function () {
                var actual = new Date();
                var clone = PBDeskJS.Utils.Clone(actual);

                expect(clone).not.toBe(actual);

            });

            it("clone != actual", function () {
                var actual = new Date(2013,1,1);
                var clone = PBDeskJS.Utils.Clone(actual);
                actual = actual.setYear(2012);
                expect(clone).toNotEqual(actual);
            });

        });

        describe("Input object of Array Type", function () {

            describe("Empty Array Test", function () {
                it("=== check", function () {
                    var actual = new Array();
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone).not.toBe(actual);
                });

                it("Length check", function () {
                    var actual = new Array();
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone.length).toBe(0);
                });
            });

            describe("Misc. Tests", function () {
                it("Changing Original Array after cloning - Length Test", function () {
                    var actual = new Array();
                    var clone = PBDeskJS.Utils.Clone(actual);
                    actual[0] = "test";
                    expect(clone.length).toBe(0);
                });
            });

            describe("Cloning array of size 1", function () {
                it("Length Test", function () {
                    var actual = new Array();
                    actual[0] = "test";
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone.length).toBe(1);
                });

                it("Value Test", function () {
                    var actual = new Array();
                    actual[0] = "test";
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone[0]).toEqual("test");
                });

                it("Value Test Case-2", function () {
                    var actual = new Array();
                    actual[0] = "test";
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone[0]).toEqual(actual[0]);
                });

                it("Changing Value after cloning.", function () {
                    var actual = new Array();
                    actual[0] = "alpha";
                    var clone = PBDeskJS.Utils.Clone(actual);
                    actual[0] = "beta";
                    expect(clone[0]).toEqual("alpha");
                });

                it("Changing Value after cloning. Negative Test", function () {
                    var actual = new Array();
                    actual[0] = "alpha";
                    var clone = PBDeskJS.Utils.Clone(actual);
                    actual[0] = "beta";
                    expect(clone[0]).not.toEqual(actual[0]);
                });
            });
           
            describe("Cloning array of size 2", function () {

                var actual = [];

                beforeEach(function () {
                    actual = ['abc', 'def'];
                });

                afterEach(function () {
                    actual = [];
                });

                it("Length Test", function () {
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone.length).toBe(2);
                });

                it("Value Test", function () {
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone[1]).toEqual("def");
                });

                it("Value Test Case-2", function () {
                    var clone = PBDeskJS.Utils.Clone(actual);
                    expect(clone[1]).toEqual(actual[1]);
                });

                it("Changing Value after cloning.", function () {
                    var clone = PBDeskJS.Utils.Clone(actual);
                    actual[0] = "ghi";
                    expect(clone[1]).toEqual("def");
                });

                it("Changing Value after cloning. Negative Test", function () {
                    var clone = PBDeskJS.Utils.Clone(actual);
                    actual[1] = "hig";
                    expect(clone[1]).not.toEqual(actual[1]);
                });

                it("Splicing 1 item", function () {
                    var clone = PBDeskJS.Utils.Clone(actual);
                    actual.splice(1, 1);
                    expect(clone.length).toBe(2);
                });
            });

        });
    });

});