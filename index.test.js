const log = console.log;
const expect = require("chai").expect;
const should = require("chai").should();
const _ = require("lodash");

describe("#mocha basics", () => {
  //unit test'll go here
  it("tru should be true", () => {
    true.should.be.true;
  });
  it("I expect true to be true", () => {
    expect(true).to.be.true;
  });
});
