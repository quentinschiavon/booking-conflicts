// import assertion library
const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();

// import
const {
  createWeightList,
  formatDataToArrays,
  findConflictIntervals
} = require("../src/conflicts");

const mockData = [
  {
    startDate: 8,
    endDate: 9
  },
  {
    startDate: 9,
    endDate: 10
  },
  {
    startDate: 9,
    endDate: 10
  }
];

describe("# Conflicts", function() {
  describe("## createWeightList()", function() {
    it("should return an array", function() {
      let res = createWeightList([], [], 1);
      expect(res).to.be.an("array");
    });

    it("should return a sorted list with weight of items", function() {
      let res = createWeightList([], [1, 1, 2, 3], 1);
      res.should.be.an("array");
      res.length.should.be.equal(3);
      expect(res).to.deep.equal([
        [1, 2],
        [2, 1],
        [3, 1]
      ]);
    });
  });

  describe("## formatDataToArrays()", function() {
    it("should return an object", function() {
      let res = formatDataToArrays([]);
      expect(res).to.be.an("object");
    });

    it("should return an object with two keys: startList and endList", function() {
      let res = formatDataToArrays([]);
      res.should.be.an("object");
      expect(res).to.have.keys("startList", "endList");
    });

    it("startList should have a sorted array as value", function() {
      const { startList, endList } = formatDataToArrays(mockData);
      startList.should.be.an("array");
      startList.length.should.be.equal(3);
      expect(startList).to.deep.equal([8, 9, 9]);
    });

    it("endList should have a sorted array as value", function() {
      const { startList, endList } = formatDataToArrays(mockData);
      endList.should.be.an("array");
      endList.length.should.be.equal(3);
      expect(endList).to.deep.equal([9, 10, 10]);
    });
  });

  describe("## findConflictIntervals()", function() {
    it("should return an object", function() {
      let res = findConflictIntervals([]);
      expect(res).to.be.an("object");
    });

    it("should return an object with two keys: clearIntervals and conflictIntervals", function() {
      let res = findConflictIntervals([]);
      res.should.be.an("object");
      expect(res).to.have.keys("clearIntervals", "conflictIntervals");
    });

    it("clearIntervals should correspond to non conflict reservations", function() {
      const { clearIntervals, conflictIntervals } = findConflictIntervals(
        mockData
      );
      clearIntervals.should.be.an("array");
      clearIntervals.length.should.be.equal(1);
      expect(clearIntervals).to.deep.equal([[8, 9]]);
    });

    it("conflictIntervals should correspond to conflict reservations", function() {
      const { clearIntervals, conflictIntervals } = findConflictIntervals(
        mockData
      );
      conflictIntervals.should.be.an("array");
      conflictIntervals.length.should.be.equal(1);
      expect(conflictIntervals).to.deep.equal([[9, 10]]);
    });
  });
});
