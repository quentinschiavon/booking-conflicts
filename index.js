/**
 * TODO :
 *  - ability to match data with interval from result
 */

// import data
const bookings = require("./data/bookings");

//imports
const { findConflictIntervals } = require("./src/conflicts");

let res = findConflictIntervals(bookings);
console.log(res);
