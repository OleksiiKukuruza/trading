import React from 'react';
import styled from 'styled-components';
import OrderList from './OrderList';
import MatchListContainer from '../containers/MatchListContainer';

const StyledMain = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    flex: 1;
  }
`;

const Main = ({ sellOrders, buyOrders, matches }) => (
  <StyledMain>
    <OrderList orders={buyOrders} title="Buy" />
    <OrderList orders={sellOrders} title="Sell" />
    <MatchListContainer matches={matches} />
  </StyledMain>
);

export default Main;
