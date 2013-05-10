/// <reference path="../../PBDeskUtils.ts" />
/// <reference path="../DefinitelyTyped/jasmine.d.ts" />

describe("PBDeskJS.Utils", function () { 

    describe("Random Function", function () { 
        it("Exact 1", function () { 
            expect(PBDeskJS.Utils.Random(1, 1)).toBe(1);
        });
    });

});