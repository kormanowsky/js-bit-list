# JavaScirpt Bit List 
- Bit list is a data structure which may be used to store arrays of boolean values in a number. This method allows such arrays to be used in places where the data shortness is important, e. g. in query string parameters.
- This data structure plays with the binary representation of the numbers. Each element (named "bit") is just a bit of the number. To set the nth bit to true means to add pow(2, n) to the number, to set it to false means to subtract pow(2, n) from the number. 
## Examples 
```javascript 
// Import the class 
const BitList = require("js-bit-list");
// Create new bit list
let list = new BitList();
// Add some values 
list.setBit(3, 1); 
list.setBit(4, 1);
// Convert to number 
let num = list.toNumber(); // Gives 2**3 + 2**4 = 24
// Convert to array
let arr = list.toArray(); // Gives [0, 0, 0, 1, 1]
// Predefined values 
let predefinedList = new BitList([0, 0, 0, 1, 1, 0, 0])
let predefinedListFromNumber = new BitList(31);
```
