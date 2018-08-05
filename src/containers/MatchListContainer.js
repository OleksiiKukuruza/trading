import { compose, withState, withHandlers } from 'recompose';
import MatchList from '../components/MatchList';

const MatchListContainer = compose(
  withState('openedMatch', 'setOpenedMatch', null),
  withHandlers({
    openModal: ({ setOpenedMatch }) => match => setOpenedMatch(match),
    closeModal: ({ setOpenedMatch }) => () => setOpenedMatch(null)
  })
)(MatchList);

export default MatchListContainer;
