const { useState } = require("react");

// ReactJS support

/**
 * A React hook for bit list.
 * @param {*} bitListClass A bit list class (child of BitList) to use
 * @param {*} initialValue An initial value to use.
 * @since 1.3.0
 * @example const [bitList, setBitList] = useBitList(new MyBitList({"mykey":true}))
 */
function useBitList(initialInstance) {
  const [rawList, setRawList] = useState(initialInstance.rawList),
    instance = new initialInstance.constructor(rawList);
  return [
    instance,
    (newInstance) => {
      setRawList(newInstance.rawList);
    },
  ];
}

module.exports = {
  useBitList
}
