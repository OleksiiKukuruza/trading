import React from 'react';
import { shallow } from 'enzyme';
import { Table, Row, HeaderRow, Cell } from './Table';
import theme from '../theme';

const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);

  return {
    wrapper
  };
};

describe('Table', () => {
  it('renders Table without crashing', () => {
    const { wrapper } = setup(Table, { theme });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Row without crashing', () => {
    const { wrapper } = setup(Row, { theme });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders HeaderRow without crashing', () => {
    const { wrapper } = setup(HeaderRow, { theme });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Cell without crashing', () => {
    const { wrapper } = setup(Cell, { theme });
    expect(wrapper).toMatchSnapshot();
  });
});
