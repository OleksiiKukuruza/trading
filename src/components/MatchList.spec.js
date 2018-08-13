import React from 'react';
import { shallow } from 'enzyme';
import MatchList from './MatchList';
import { Row } from './Table';

const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);

  return {
    wrapper
  };
};

describe('MatchList', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup(MatchList, {
      openModal: () => null,
      closeModal: () => null,
      openedMatch: {
        time: 123,
        sell: { id: 3, price: 50, quantity: 3 },
        buy: { id: 4, price: 60, quantity: 6 }
      },
      matches: [
        {
          time: 123,
          sell: { id: 3, price: 50, quantity: 3 },
          buy: { id: 4, price: 60, quantity: 6 }
        }
      ]
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('handles click on a row', () => {
    const openModal = jest.fn();
    const openedMatch = {
      time: 123,
      sell: { id: 3, price: 50, quantity: 3 },
      buy: { id: 4, price: 60, quantity: 6 }
    };
    const { wrapper } = setup(MatchList, {
      openModal,
      closeModal: () => null,
      openedMatch,
      matches: [openedMatch]
    });
    const firstRow = wrapper.find(Row).at(0);
    firstRow.simulate('click');
    expect(openModal).toHaveBeenCalledWith(openedMatch);
  });
});
