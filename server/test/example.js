const { expect } = require("chai");

describe("Testing my test skills", () => {
    it("My first testcase", () => {
        expect(true).to.be.true;
    });

    it("Testing without chai", () => {
        throw new Error();
    });
});