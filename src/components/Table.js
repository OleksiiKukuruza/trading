import PropTypes from "prop-types";
import styled from "styled-components";

const Row = styled.div`
  display: flex;

  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.background};
  }
`;

const HeaderRow = styled(Row)`
  background-color: ${props => props.theme.background};
`;

const Cell = styled.div`
  flex: ${props => props.size || 1};
  display: flex;
  justify-content: ${props => props.justifyContent || "flex-start"};
`;

Cell.propTypes = {
  size: PropTypes.number,
  justifyContent: PropTypes.string
};

export { Row, HeaderRow, Cell };
