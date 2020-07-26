class BitList {
    /**
     * Constrctor.
     * @param {Array|Number} initialValue Initial value may be a number, an array or an object.
     */
    constructor(initialValue) {
        // Init raw list here. Our "raw list" is just a number.
        // In this class we play with the binary representation of the number.
        // If we set nth bit to true, we must add pow(2, n) to the raw list.
        // If we set it to false, we must subtract pow(2, n) from the raw list.
        this.rawList = 0;
        if (initialValue instanceof Array) {
            this.setArray(initialValue);
        } else if (
            typeof initialValue === "object" &&
            !(initialValue === null)
        ) {
            this.setObject(initialValue);
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
     * @returns {Boolean} The value of the requested bit.
     * @since 1.0.0
     * @author Mikhail Kormanowsky
     */
    getBit(bit) {
        if (!(typeof bit === "number" && bit >= 0)) {
            throw new TypeError(
                `Unexpexted bit type. Expected a non-negative number, but got ${bit}`
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
                `Unexpexted bit type. Expected a non-negative number, but got ${bit}`
            );
        }
        // Check if old and new value are different
        if (value ^ this.getBit(bit)) {
            // To set bit to true means here to add pow(2, bit) to the raw list (to set bit number bit to 1).
            // To set it to false means to subtarct pow(2, bit) from the raw list.
            if (value) {
                this.rawList += 2 ** bit;
            } else {
                this.rawList -= 2 ** bit;
            }
        }
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
     * @param {Object} array Object to copy from.
     * @see BitList#setArray
     * @since 1.0.0
     * @author Mikhail Kormanowsky
     */
    setObject(object) {
        this.setArray(Object.values(object));
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
     *
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
}

module.exports = BitList;