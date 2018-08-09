import PropTypes from 'prop-types';

export const orderPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired
});

export const matchPropType = PropTypes.shape({
  time: PropTypes.number.isRequired,
  sell: orderPropType.isRequired,
  buy: orderPropType.isRequired
});
