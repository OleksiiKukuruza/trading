import React from "react";
import styled from "styled-components";
import { Cell, HeaderRow, Row } from "./Table";

const StyledList = styled.div`
  margin: ${props => 2 * props.theme.spacingUnit}px;
`;

const StyledListContent = styled.div`
  border: 1px solid ${props => props.theme.background};
`;

const OrderList = ({ orders, title }) => (
  <StyledList>
    {title}
    <StyledListContent>
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
    </StyledListContent>
  </StyledList>
);

export default OrderList;
