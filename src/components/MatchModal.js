import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Cell, HeaderRow, Row } from './Table';
import { matchPropType } from './propTypes';

export const StyledBlock = styled.div`
  border: 1px solid ${props => props.theme.primary.main};

  :not(:last-child) {
    margin-bottom: ${props => 4 * props.theme.spacingUnit}px;
  }
`;

const MatchModal = ({ match, onClose }) => (
  <Modal
    isOpen
    onRequestClose={onClose}
    style={{
      content: {
        bottom: 'auto',
        minHeight: '10rem',
        left: '50%',
        padding: '2rem',
        position: 'fixed',
        right: 'auto',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        minWidth: '20rem',
        width: '80%',
        maxWidth: '60rem'
      }
    }}
  >
    <StyledBlock>
      <HeaderRow>
        <Cell>General Info:</Cell>
      </HeaderRow>
      <Row>
        <Cell>Match Time</Cell>
        <Cell>{new Date(match.time).toLocaleTimeString()}</Cell>
      </Row>
      <Row>
        <Cell>Match Price</Cell>
        <Cell>{(match.buy.price + match.sell.price) / 2}</Cell>
      </Row>
      <Row>
        <Cell>Match Amount</Cell>
        <Cell>{Math.min(match.sell.quantity, match.buy.quantity)}</Cell>
      </Row>
    </StyledBlock>
    <StyledBlock>
      <HeaderRow>
        <Cell>Sell Info:</Cell>
      </HeaderRow>
      <Row>
        <Cell>Id:</Cell>
        <Cell>{match.sell.id}</Cell>
      </Row>
      <Row>
        <Cell>Price:</Cell>
        <Cell>{match.sell.price}</Cell>
      </Row>
      <Row>
        <Cell>Amount:</Cell>
        <Cell>{match.sell.quantity}</Cell>
      </Row>
    </StyledBlock>
    <StyledBlock>
      <HeaderRow>
        <Cell>Buy Info:</Cell>
      </HeaderRow>
      <Row>
        <Cell>Id:</Cell>
        <Cell>{match.buy.id}</Cell>
      </Row>
      <Row>
        <Cell>Price:</Cell>
        <Cell>{match.buy.price}</Cell>
      </Row>
      <Row>
        <Cell>Amount:</Cell>
        <Cell>{match.buy.quantity}</Cell>
      </Row>
    </StyledBlock>
  </Modal>
);

MatchModal.propTypes = {
  match: matchPropType.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MatchModal;
