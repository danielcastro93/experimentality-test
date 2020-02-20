/* global describe, expect, it, beforeEach */

import React from 'react';
import { render, act, fireEvent } from '../scripts/testUtils';
import SearchBar from '../components/SearchBar';

jest.useFakeTimers();

describe('SearchBar', () => {
  const onChange = jest.fn();
  let getByLabelText;
  let getByPlaceholderText;

  beforeEach(() => {
    ({ getByLabelText, getByPlaceholderText } = render(
      <SearchBar onChange={onChange} />
    ));
  });

  it('renders a button to open the bar', () => {
    expect(getByLabelText('Open search bar')).toBeInTheDocument();
  });

  it('renders a the bar hidden', () => {
    expect(getByLabelText('Search bar')).toHaveStyle(`
      width: 0;
    `);
  });

  it('opens the bar when the open button is clicked', async () => {
    const openBarButton = getByLabelText('Open search bar');

    await act(async () => {
      fireEvent.click(openBarButton);
    });

    expect(getByLabelText('Search bar')).toHaveStyle(`
      width: 100%;
    `);
  });

  it('renders a button to close the bar', () => {
    expect(getByLabelText('Close search bar')).toBeInTheDocument();
  });

  it('renders an input', () => {
    expect(getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders a remove search value when the value exists', async () => {
    const openBarButton = getByLabelText('Open search bar');
    const input = getByPlaceholderText('Search');

    await act(async () => {
      await fireEvent.click(openBarButton);
      fireEvent.input(input, { target: { value: 'Test' } });
    });

    expect(getByLabelText('Remove search value')).toBeInTheDocument();
  });

  it('runs onChange after a timeout when a value is set', async () => {
    const openBarButton = getByLabelText('Open search bar');
    const input = getByPlaceholderText('Search');

    await act(async () => {
      await fireEvent.click(openBarButton);
      fireEvent.input(input, { target: { value: 'Test' } });
    });

    expect(onChange).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onChange).toHaveBeenCalled();
  });
});
