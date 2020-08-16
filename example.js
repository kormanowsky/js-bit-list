/**
 * js-bit-list working example
 * @author Mikhail Kormanowsky
 */

const BitList = require("./index");

const MyBitList = BitList.useKeys(["myKey", "otherKey"]);

let myBitListInstance = new MyBitList({myKey: true});

console.log("It works!");
console.log("Number", myBitListInstance.toNumber());
console.log("myKey value", myBitListInstance.toObject().myKey);