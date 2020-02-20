/* global describe, expect, it, beforeEach */

import React from 'react';
import { render } from '../scripts/testUtils';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  let getByAltText;
  let getByText;

  beforeEach(() => {
    ({ getByText, getByAltText } = render(
      <Navbar handleSearchValueChange={jest.fn()} />
    ));
  });

  it('renders the logo', () => {
    expect(getByAltText('Experimentality Logo')).toBeInTheDocument();
  });

  it('renders the title', () => {
    expect(getByText('Experimentality')).toBeInTheDocument();
  });
});
