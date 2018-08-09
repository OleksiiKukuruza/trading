import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OrderList from './OrderList';
import MatchListContainer from '../containers/MatchListContainer';
import { matchPropType, orderPropType } from './propTypes';

const StyledMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacingUnit}px;

  > div {
    flex: 1;
    margin: ${props => props.theme.spacingUnit}px;
  }
`;

const Main = ({ sellOrders, buyOrders, matches }) => (
  <StyledMain>
    <OrderList orders={buyOrders} title="Buy" />
    <OrderList orders={sellOrders} title="Sell" />
    <MatchListContainer matches={matches} />
  </StyledMain>
);

Main.propTypes = {
  sellOrders: PropTypes.arrayOf(orderPropType).isRequired,
  buyOrders: PropTypes.arrayOf(orderPropType).isRequired,
  matches: PropTypes.arrayOf(matchPropType).isRequired
};

export default Main;
