const expect = require("chai").expect;
const should = require("chai").should();
const _ = require("lodash");
const { getPerson, Person } = require("./index");

describe("#mocha chai basics", () => {
  //unit test'll go here
  it("true should be true", () => {
    true.should.be.true;
  });

  it("I expect true to be true", () => {
    expect(true).to.be.true;
  });
});

describe("#index initial conditions", () => {
  it("initial person is an object", () => {
    const person = getPerson();
    _.isObject(person).should.be.true;
  });

  it("armor bonus by default is 0 wearing leatherArmor", () => {
    const person = getPerson();
    person.armorBonus.should.equal(0);
    // FIXME: should be 2 by default using leatherArmor
    //   fix is to not set armorBonus to 0
  });
});

describe("#Person", () => {
  describe.only("#rollDice", () => {
    it("should return a finite number (not NaN nor inifinity)", () => {
      const number = Person.rollDice(1, 20);
      _.isFinite(number).should.be.true;
      console.log("number: ", number);
    });

    it("should not have 0 in a 1000 samples", () => {
      const samples = new Array(1000);
      const rollDiceSamples = _.map(samples, (item) => Person.rollDice(1, 20));

      const anyZeros = _.filter(rollDiceSamples, (item) => item === 0);
      anyZeros.length.should.equal(0);
    });
  });
});
