import React from 'react';
import styled from 'styled-components';
import { Cell, HeaderRow, Row } from './Table';

const StyledList = styled.div`
  margin: ${props => 2 * props.theme.spacingUnit}px;
`;

const StyledListContent = styled.div`
  border: 1px solid ${props => props.theme.background};
`;

const MatchList = ({ matches }) => (
  <StyledList>
    Matches
    <StyledListContent>
      <HeaderRow>
        <Cell>Match Time</Cell>
        <Cell>Price</Cell>
        <Cell>Quantity</Cell>
      </HeaderRow>
      {matches.map(match => (
        <Row key={`${match.sell.id}-${match.buy.id}`}>
          <Cell>{match.time}</Cell>
          <Cell>{(match.buy.price + match.sell.price) / 2}</Cell>
          <Cell>{Math.min(match.sell.quantity, match.buy.quantity)}</Cell>
        </Row>
      ))}
    </StyledListContent>
  </StyledList>
);

export default MatchList;
