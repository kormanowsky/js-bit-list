/**
 * js-bit-list working example
 * @author Mikhail Kormanowsky
 */

const BitList = require("./index");

const MyBitList = BitList.useKeys(["myKey", "otherKey"]);

let myBitListInstance = new MyBitList({ myKey: true });

console.log("It works!");
console.log("Number", myBitListInstance.toNumber());
console.log("myKey value", myBitListInstance.get("myKey"));
console.log("Setting other key...");
myBitListInstance.set("otherKey", 1);
console.log("otherKey value", myBitListInstance.get("otherKey"));
console.log(myBitListInstance.enabledKeys());
