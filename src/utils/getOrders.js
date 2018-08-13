const getOrders = start =>
  fetch(`http://localhost:5001/listOrders?start=${start}&size=100`).then(res =>
    res.json()
  );

export default getOrders;
