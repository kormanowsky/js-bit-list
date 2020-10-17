/**
 * The BitList class.
 * @since 1.0.0
 * @author Mikhail Kormanowsky
 */
class BitList {
  /**
   * Constructor.
   * @param {Array|Number|undefined} initialValue Initial value may be a number or an array.
   * @since 1.0.0
   * @author Mikhail Kormanowsky
   */
  constructor(initialValue) {
    // Init raw list here. Our "raw list" is just a number.
    // In this class we play with the binary representation of the number.
    // If we set nth bit to true, we must add pow(2, n) to the raw list.
    // If we set it to false, we must subtract pow(2, n) from the raw list.
    this.rawList = 0;
    if (initialValue instanceof Array) {
      this.setArray(initialValue);
    } else if (typeof initialValue === "number") {
      this.rawList = initialValue;
    } else if (!(typeof initialValue === "undefined")) {
      throw new TypeError(
        `Unexpected initial value type. Expected an array or a number, but got ${initialValue}`
      );
    }
  }

  /**
   * Returns a single bit.
   * @param {Number} bit Index of the bit.
   * @returns {Number} The value of the requested bit.
   * @since 1.0.0
   * @author Mikhail Kormanowsky
   */
  getBit(bit) {
    if (!(typeof bit === "number" && bit >= 0)) {
      throw new TypeError(
        `Unexpected bit type. Expected a non-negative number, but got ${bit}`
      );
    }
    // We take the remainder to strip everything except the part which starts with requested bit.
    // We use >= comparsion to check whether the requested bit
    // is set to 1 (if so, the raw list will be >= 2 ** (requested_bit)).
    // We use +() to convert boolean to number.
    return +(this.rawList % 2 ** (bit + 1) >= 2 ** bit);
  }

  /**
   * Sets given bit to given value.
   * @param {Number} bit Index of the bit.
   * @param {any} value Value of the bit.
   * @see BitList#getBit
   * @since 1.0.0
   * @author Mikhail Kormanowsky
   */
  setBit(bit, value) {
    if (!(typeof bit === "number" && bit >= 0)) {
      throw new TypeError(
        `Unexpected bit type. Expected a non-negative number, but got ${bit}`
      );
    }
    // Check if old and new value are different
    if (value ^ this.getBit(bit)) {
      // To set bit to true means here to add pow(2, bit) to the raw list (to set bit number bit to 1).
      // To set it to false means to subtract pow(2, bit) from the raw list.
      if (value) {
        this.rawList += 2 ** bit;
      } else {
        this.rawList -= 2 ** bit;
      }
    }
  }

  /**
   * Copies given number to the bit list.
   * @param {Number} array Number to copy from.
   * @since 1.1.0
   * @author Mikhail Kormanowsky
   */
  setNumber(number) {
    this.rawList = number;
  }

  /**
   * Copies values from given Array to the bit list.
   * @param {Array} array Array to copy from.
   * @see BitList#setBit
   * @since 1.0.0
   * @author Mikhail Kormanowsky
   */
  setArray(array) {
    array.forEach((element, index) => this.setBit(index, element));
  }

  /**
   * Copies values from given object to the bit list.
   * @param {Object} object Object to copy from.
   * @param {Array} keys An array containing all possible object keys in standard order.
   * @see BitList#setArray
   * @since 1.0.2
   * @author Mikhail Kormanowsky
   */
  setObject(object, keys) {
    Object.keys(object).forEach((key) => {
      let keyIndex = keys.indexOf(key);
      if (keyIndex === -1) {
        return;
      }
      this.setBit(keyIndex, object[key]);
    });
  }

  /**
   * Converts this bit list to number.
   * @returns {Number} A non-negative number representing this bit list.
   * @since 1.0.0
   * @author Mikhail Kormanowsky
   */
  toNumber() {
    return this.rawList;
  }

  /**
   * Converts this bit list to Array.
   * @returns {Array} Array with bits.
   * @since 1.0.0
   * @author Mikhail Kormanowsky
   */
  toArray() {
    let array = [],
      rawList = this.rawList;
    while (rawList > 0) {
      array.push(rawList % 2);
      rawList = Math.floor(rawList / 2);
    }
    if (!array.length) {
      return [0];
    }
    return array;
  }

  /**
   * Converts this bit list to Object.
   * @param {Array} keys An array containing all possible object keys in standard order.
   * @since 1.0.2
   * @author Mikhail Kormanowsky
   */
  toObject(keys) {
    let array = this.toArray(),
      result = {};
    keys.forEach((key) => {
      result[key] = 0;
    });
    array.forEach((bit, index) => {
      if (index < keys.length) {
        result[keys[index]] = bit;
      }
    });
    return result;
  }

  /**
   * Creates customized BitList class using given keys for objects.
   * @param {Array} keys An array of keys to use for objects in generated class.
   * @returns {Object} A class that extends BitList and uses given keys for objects.
   * The returned class also supports Object instance as initialValue in constructor.
   * @example
   * ```javascript
   * const BitListWithMyKeys = BitList.useKeys(["myKey1", "myKey2"]);
   * // ...
   * let bitListInstance = new BitListWithMyKeys({myKey1: true, myKey2: false});
   * ```
   * @since 1.2.0
   * @author Mikhail Kormanowsky
   */
  static useKeys(keys) {
    /**
     * A BitList with keys for objects.
     * @extends BitList
     * @since 1.2.0
     * @author Mikhail Kormanowsky
     */
    return class extends this {
      /**
       * It is the same as parent class' constructor but it supports Objects as initial value.
       * @param {Array|Number|Object} initialValue The initial value.
       * @see BitList#constructor
       * @since 1.2.0
       * @author Mikhail Kormanowsky
       */
      constructor(initialValue) {
        try {
          super(initialValue);
        } catch (error) {
          if (typeof initialValue === "object" && initialValue !== null) {
            super(0);
            this.setObject(initialValue);
          } else {
            throw error;
          }
        }
      }

      /**
       * @param {Object} object
       * @see BitList#setObject
       * @since 1.2.0
       * @author Mikhail Kormanowsky
       */
      setObject(object) {
        return super.setObject(object, keys);
      }

      /**
       * @see BitList#toObject
       * @since 1.2.0
       * @author Mikhail Kormanowsky
       */
      toObject() {
        return super.toObject(keys);
      }
    };
  }
}

// Browser support
if (typeof window === "object") {
  window.BitList = BitList;
}

// ReactJS support

/**
 * A React hook for bit list.
 * @param {*} bitListClass A bit list class (child of BitList) to use
 * @param {*} initialValue An initial value to use.
 * @since 1.3.0
 * @example const [getBitList, setBitList] = useBitList(MyBitList, {"mykey":true})
 */
function useBitList(bitListClass, initialValue) {
  let instance = new bitListClass(initialValue);
  return [() => instance, (newInstance) => (instance = newInstance)];
}

export { useBitList };
export default BitList;
