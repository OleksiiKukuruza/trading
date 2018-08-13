import React from 'react';
import { openModal, closeModal } from './MatchListContainer';

describe('MatchListContainer', () => {
  it('sets modal opened', () => {
    const setOpenedMatch = jest.fn();
    const match = { time: 100 };
    openModal({ setOpenedMatch })(match);
    expect(setOpenedMatch).toHaveBeenCalledWith(match);
  });

  it('hides modal', () => {
    const setOpenedMatch = jest.fn();
    closeModal({ setOpenedMatch })();
    expect(setOpenedMatch).toHaveBeenCalledWith(null);
  });
});
