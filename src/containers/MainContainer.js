import Main from '../components/Main';
import { startOrdersPolling } from '../actions/ordersActions';
import { lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';
import { getSellOrders, getBuyOrders, getMatches } from '../selectors';

const mapStateToProps = state => ({
  sellOrders: getSellOrders(state),
  buyOrders: getBuyOrders(state),
  matches: getMatches(state)
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
