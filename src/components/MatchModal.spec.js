import React from 'react';
import { shallow } from 'enzyme';
import MatchModal, { StyledBlock } from './MatchModal';
import theme from '../theme';

const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);

  return {
    wrapper
  };
};

describe('MatchModal', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup(MatchModal, {
      onClose: () => null,
      match: {
        time: 123,
        sell: { id: 3, price: 50, quantity: 3 },
        buy: { id: 4, price: 60, quantity: 6 }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders StyledBlock', () => {
    const { wrapper } = setup(StyledBlock, { theme });
    expect(wrapper).toMatchSnapshot();
  });
});
