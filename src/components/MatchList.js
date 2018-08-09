import React from 'react';
import { Cell, HeaderRow, Row, Table } from './Table';
import MatchModal from './MatchModal';
import PropTypes from 'prop-types';
import { matchPropType } from './propTypes';

const MatchList = ({ matches, openModal, closeModal, openedMatch }) => (
  <div>
    Matches
    <Table>
      <HeaderRow>
        <Cell>Match Time</Cell>
        <Cell>Price</Cell>
        <Cell>Quantity</Cell>
      </HeaderRow>
      {matches.map(match => (
        <Row
          key={`${match.sell.id}-${match.buy.id}`}
          onClick={() => openModal(match)}
        >
          <Cell>{new Date(match.time).toLocaleTimeString()}</Cell>
          <Cell>{(match.buy.price + match.sell.price) / 2}</Cell>
          <Cell>{Math.min(match.sell.quantity, match.buy.quantity)}</Cell>
        </Row>
      ))}
    </Table>
    {openedMatch && <MatchModal match={openedMatch} onClose={closeModal} />}
  </div>
);

MatchList.propTypes = {
  matches: PropTypes.arrayOf(matchPropType).isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  openedMatch: matchPropType
};

export default MatchList;
