// import assertion library
const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();

// import
const {
  sortedIndex,
  sortedItemIndex,
  insert,
  insertItem
} = require("../utils/arrays");

describe("# Array", function() {
  describe("## sortedIndex()", function() {
    it("should return an number", function() {
      let res = sortedIndex([], 0);
      expect(res).to.be.a("number");
    });

    it("should return 0 when array is empty", function() {
      let res = sortedIndex([], 0);
      expect(res).to.be.equal(0);
    });

    it("should return the right index", function() {
      let res = sortedIndex([1, 3], 2);
      expect(res).to.be.equal(1);
      res = sortedIndex([1, 3], 3);
      expect(res).to.be.equal(1);
      res = sortedIndex([1, 3], 1);
      expect(res).to.be.equal(0);
      res = sortedIndex([1, 3], 4);
      expect(res).to.be.equal(2);
    });
  });

  describe("## sortedItemIndex()", function() {
    it("should return a number", function() {
      let res = sortedItemIndex([], [0, 0]);
      expect(res).to.be.a("number");
    });

    it("should return 0 when array is empty", function() {
      let res = sortedItemIndex([], [0, 0]);
      expect(res).to.be.equal(0);
    });

    it("should return the right index", function() {
      let res = sortedItemIndex(
        [
          [1, 1],
          [2, -1],
          [3, -1]
        ],
        [0, 0]
      );
      expect(res).to.be.equal(0);
      res = sortedItemIndex(
        [
          [1, 1],
          [2, -1],
          [3, -1]
        ],
        [1, 0]
      );
      expect(res).to.be.equal(0);
      res = sortedItemIndex(
        [
          [1, 1],
          [2, -1],
          [3, -1]
        ],
        [3, 0]
      );
      expect(res).to.be.equal(2);
    });
  });

  describe("## insert()", function() {
    it("should return an array", function() {
      let res = insert([], 0);
      expect(res).to.be.an("array");
    });

    it("should return a sorted array", function() {
      let res = [];
      insert(res, 0);
      insert(res, 1);
      insert(res, 2);
      res.should.be.an("array");
      res.length.should.be.equal(3);
      expect(res).to.deep.equal([0, 1, 2]);
    });
  });

  describe("## insertItem()", function() {
    it("should return an array", function() {
      let res = insert([], [0, 0]);
      expect(res).to.be.an("array");
    });

    it("should return a sorted array", function() {
      let res = [];
      insertItem(res, [0, 1]);
      insertItem(res, [2, 4]);
      insertItem(res, [1, -1]);
      res.should.be.an("array");
      res.length.should.be.equal(3);
      expect(res).to.deep.equal([
        [0, 1],
        [1, -1],
        [2, 4]
      ]);
    });

    it("should not insert an item if not a two length array", function() {
      let res = [];
      insertItem(res, [0, 1]);
      insertItem(res, [2, 4]);
      insertItem(res, [1]);
      insertItem(res, []);
      insertItem(res, [1, 2, 3]);
      res.should.be.an("array");
      res.length.should.be.equal(2);
      expect(res).to.deep.equal([
        [0, 1],
        [2, 4]
      ]);
    });
  });
});
