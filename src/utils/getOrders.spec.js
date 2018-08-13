import getOrders from './getOrders';

describe('getOrders', () => {
  it('make fetch request on api url with page and and extracts json', async () => {
    const result = { test: 'test' };
    fetch.mockResponse(JSON.stringify(result));
    const res = await getOrders(6);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5001/listOrders?start=6&size=100'
    );
    expect(res).toEqual(result);
  });
});
