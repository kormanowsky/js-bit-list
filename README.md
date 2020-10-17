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
let predefinedList = new BitList([0, 0, 0, 1, 1, 0, 0]);
let predefinedListFromNumber = new BitList(31);
```

## Working with objects

Bit list may work with objects so it is convenient to use it when you need to configure something. Imagine you have a list of cities and want to configure, which of them are available for delivery.

```javascript
// Create a list of keys (your cities here)
const Cities = ["Moscow", "London", "Paris", "Prague"];
// Tip: extend BitList to use your own keys
const CitiesBitList = BitList.useKeys(Cities);
/**
 * v1.1.0- (not recommended)
 */
class CitiesBitList extends BitList {
  setObject(object) {
    return super.setObject(object, Cities);
  }

  toObject() {
    return super.toObject(Cities);
  }
}
/**
 * END v1.1.0-
 */
// Then use your class for configuration
let citiesOfRussia = new CitiesBitList().setObject({ Moscow: true });
// Convert to number
let citiesNumber = citiesOfRussia.toNumber();
// ...
// Later, convert it back to object
let citiesFromNumber = new CitiesBitList(citiesNumber).toObject();
```

## New in v1.3.0: React support

The new `useBitList()` hook may be used in React applications.

```javascript
import BitList from "js-bit-list";
const MyBitList = BitList.useKeys(["myKey"]);
const [list, setList] = useBitList(MyBitList, { myKey: 1 });
// Later
const listNumber = list.toNumber();
list.setObject({ myKey: 0 });
setList(list);
```

### See example.js for working example
