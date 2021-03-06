require('setimmediate');

/**
 * @param {Array} arr Input array
 * @param {Function} mapper Mapping function
 * @param {Number} [batch] Batch size
 */
const map = (arr, mapper, batch) => {
  // If no batch set then default to 1000 operations
  if (!batch) {
    batch = Math.ceil(arr.length / 1000);
  }

  return new Promise((resolve) => {
    const output = [];
    let i = 0;

    const execute = () => {
      if (i < arr.length - batch) {
        setImmediate(execute); // Schedule next batch onto task queue
      }

      output.push(...arr.slice(i, i + batch).map(mapper));
      i += batch;

      if (i >= arr.length) {
        resolve(output);
      }
    };

    setImmediate(execute); // First batch
  });
};

/**
 * @param {Array} arr
 * @param {Function} callback
 * @param {Number} [batch] Batch size
 */
const forEach = (arr, callback, batch) => {
  // If no batch set then default to 1000 operations
  if (!batch) {
    batch = Math.ceil(arr.length / 1000);
  }

  return new Promise((resolve) => {
    let i = 0;

    const execute = () => {
      if (i < arr.length - batch) {
        setImmediate(execute); // Schedule next batch onto task queue
      }

      arr.slice(i, i + batch).forEach(callback);

      i += batch;

      if (i >= arr.length) {
        resolve();
      }
    };

    setImmediate(execute); // First batch
  });
};

/**
 * @param {*} arr
 * @param {*} reducer
 * @param {*} initialValue
 * @param {Number} [batch] Batch size
 *
 */
const reduce = (arr, reducer, initialValue, batch) => {
  // If no batch set then default to 1000 operations
  if (!batch) {
    batch = Math.ceil(arr.length / 1000);
  }

  return new Promise((resolve) => {
    let i = 0;
    let accumulator = initialValue;
    // let lastValue = initialValue;

    const execute = () => {
      if (i < arr.length - batch) {
        setImmediate(execute); // Schedule next batch onto task queue
      }

      accumulator = arr.slice(i, i + batch).reduce(reducer, accumulator);
      i += batch;

      if (i >= arr.length) {
        resolve(accumulator);
      }
    };

    setImmediate(execute); // First batch
  });
};

module.exports = {
  map,
  forEach,
  reduce,
};
