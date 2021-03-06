const ceach = require('./index');

const testData = new Array(1e4).fill('a');
const testDataNumeric = new Array(1e4).fill(1);

describe('concurrent-each', () => {
  it('map 1 batch', async () => {
    const expected = testData.map((d) => d.toUpperCase());
    const actual = await ceach.map(testData, (data) => data.toUpperCase(), 1);

    expect(actual).toEqual(expected);
  });

  it('map 10 batches', async () => {
    const expected = testData.map((d) => d.toUpperCase());
    const actual = await ceach.map(testData, (data) => data.toUpperCase(), 10);

    expect(actual).toEqual(expected);
  });

  it('map 100 batches', async () => {
    const expected = testData.map((d) => d.toUpperCase());
    const actual = await ceach.map(testData, (data) => data.toUpperCase(), 100);

    expect(actual).toEqual(expected);
  });

  it('map 1000 batches', async () => {
    const expected = testData.map((d) => d.toUpperCase());
    const actual = await ceach.map(testData, (data) => data.toUpperCase(), 1000);

    expect(actual).toEqual(expected);
  });

  it('forEach 10 batch', async () => {
    const expectedOne = testData.map((d) => d.toUpperCase());
    const expectedTwo = testData.map((d) => d.toUpperCase());

    const actualOne = [];
    const actualTwo = [];

    await ceach.forEach(
      testData,
      (data) => {
        actualOne.push(data.toUpperCase());
        actualTwo.push(data.toUpperCase());
      },
      10
    );

    expect(actualOne).toEqual(expectedOne);
    expect(actualTwo).toEqual(expectedTwo);
  });

  it('reduce 10 batch', async () => {
    const expected = testDataNumeric.reduce((acc, curr) => (acc += curr));
    const actual = await ceach.reduce(testDataNumeric, (acc, curr) => (acc += curr), 0, 10);

    expect(actual).toEqual(expected);
  });

  it('reduce 10 batch with initialValue', async () => {
    const expected = testDataNumeric.reduce((acc, curr) => (acc += curr), 123);
    const actual = await ceach.reduce(testDataNumeric, (acc, curr) => (acc += curr), 123, 10);

    expect(actual).toEqual(expected);
  });
});
