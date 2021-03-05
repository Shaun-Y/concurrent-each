const ceach = require('./index');

const testData = new Array(1e4).fill('a');

describe('concurrent-each', () => {
  it('map 1 batch', async () => {
    let expected = testData.map((d) => d.toUpperCase());
    let actual = await ceach.map(testData, (data) => data.toUpperCase(), 1);

    expect(actual).toEqual(expected);
  });

  it('map 10 batches', async () => {
    let expected = testData.map((d) => d.toUpperCase());
    let actual = await ceach.map(testData, (data) => data.toUpperCase(), 10);

    expect(actual).toEqual(expected);
  });

  it('map 100 batches', async () => {
    let expected = testData.map((d) => d.toUpperCase());
    let actual = await ceach.map(testData, (data) => data.toUpperCase(), 100);

    expect(actual).toEqual(expected);
  });

  it('map 1000 batches', async () => {
    let expected = testData.map((d) => d.toUpperCase());
    let actual = await ceach.map(testData, (data) => data.toUpperCase(), 1000);

    expect(actual).toEqual(expected);
  });
});
