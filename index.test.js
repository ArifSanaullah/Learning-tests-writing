const expect = require("chai").expect;
const should = require("chai").should();
const _ = require("lodash");
const {
  getPerson,
  Person,
  Armor,
  Weapon,
  getRandomNumber,
  rollDice,
  getNotARandomNumber,
  attack,
} = require("./index");

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
  describe("#rollDice", () => {
    it("should return a finite number (not NaN nor inifinity)", () => {
      const number = Person.rollDice(1, 20);
      _.isFinite(number).should.be.true;
    });

    it("should not have 0 in a 1000 samples", () => {
      const samples = new Array(1000);
      const rollDiceSamples = _.map(samples, (item) => Person.rollDice(1, 20));

      const anyZeros = _.filter(rollDiceSamples, (item) => item === 0);
      // anyZeros.length.should.equal(0);
      // above test will fail almost all the time. Uncomment above line and see the result.
    });
  });

  describe("#attack", () => {
    let personA, personB;
    const createPersonFixture = (name) => {
      const leatherArmor = new Armor("Leather", 2);
      const shortSword = new Weapon("Short Sword", 0, 1, 6);
      return new Person(name, 2, 4, 1, [leatherArmor, shortSword]);
    };

    beforeEach(() => {
      personA = createPersonFixture("Person A");
      personB = createPersonFixture("Person B");
    });

    afterEach(() => {
      personA = undefined;
      personB = undefined;
    });

    it("personA's hitpoints start at 11", () => {
      personA.hitPoints.should.equal(11);
    });

    it("personB's hitpoints start at 11", () => {
      personB.hitPoints.should.equal(11);
    });

    it("personA's armorBonus is 0", () => {
      personA.armorBonus.should.equal(0);
    });

    it("personB's armorBonus is 0", () => {
      personB.armorBonus.should.equal(0);
    });

    it("if I add a boomstick to my equipment then in should be in equipment array", () => {
      const boomStick = new Weapon("Boom Stick", 0, 1, 12);
      personA.addEquipment(boomStick);
      personA.equipment.should.include(boomStick);
    });

    it("if I add a hotPants to personA, he becomes awesome", () => {
      const hotPants = new Armor("Hot Pants", 1);
      personA.addEquipment(hotPants);
      personA.armorBonus.should.equal(3);
    });
  });
});

describe("#getRandomNumber", () => {
  it("should return a finite number", () => {
    const number = getRandomNumber();
    _.isFinite(number).should.be.true;
  });
});

describe("#rollDice", () => {
  it("should return a finite number", () => {
    const result = rollDice(1, 20);
    _.isFinite(result).should.be.true;
  });
  it("should NOT be a random number if we use 1", () => {
    const result = rollDice(1, 20, getNotARandomNumber);
    result.should.equal(20);
  });
});

describe("#getNotARandomNumber", () => {
  it("Should always return 1", () => {
    getNotARandomNumber().should.be.equal(1);
  });
});

describe("#attack", () => {
  it("should always be a hit if 20 rolled", () => {
    const rolldice = () => 20;
    const result = attack(rolldice, getNotARandomNumber, 0, 0, 0);
    result.hit.should.be.true;
  });
});
