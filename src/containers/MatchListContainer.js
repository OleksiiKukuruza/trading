import { compose, withState, withHandlers } from 'recompose';
import MatchList from '../components/MatchList';

export const openModal = ({ setOpenedMatch }) => match => setOpenedMatch(match);
export const closeModal = ({ setOpenedMatch }) => () => setOpenedMatch(null);

const MatchListContainer = compose(
  withState('openedMatch', 'setOpenedMatch', null),
  withHandlers({
    openModal,
    closeModal
  })
)(MatchList);

export default MatchListContainer;
