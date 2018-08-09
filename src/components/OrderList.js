import React from 'react';
import PropTypes from 'prop-types';
import { Cell, HeaderRow, Row, Table } from './Table';
import { orderPropType } from './propTypes';

const OrderList = ({ orders, title }) => (
  <div>
    {title}
    <Table>
      <HeaderRow>
        <Cell>Order Id</Cell>
        <Cell>Price</Cell>
        <Cell>Quantity</Cell>
      </HeaderRow>
      {orders.map(order => (
        <Row key={order.id}>
          <Cell>{order.id}</Cell>
          <Cell>{order.price}</Cell>
          <Cell>{order.quantity}</Cell>
        </Row>
      ))}
    </Table>
  </div>
);

OrderList.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
  title: PropTypes.string.isRequired
};

export default OrderList;
