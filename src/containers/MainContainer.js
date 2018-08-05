import Main from '../components/Main';
import { startOrdersPolling } from '../actions/ordersActions';
import { lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';
import {
  getFirstSellOrders,
  getFirstBuyOrders,
  getFirstMatches
} from '../selectors';

const mapStateToProps = state => ({
  sellOrders: getFirstSellOrders(state),
  buyOrders: getFirstBuyOrders(state),
  matches: getFirstMatches(state)
});

const withFetch = connect(
  mapStateToProps,
  {
    startOrdersPolling
  }
);

const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.startOrdersPolling();
  }
});

const MainContainer = compose(
  withFetch,
  withLifecycle
)(Main);

export default MainContainer;
