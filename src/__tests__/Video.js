/* global describe, expect, it, beforeEach */

import React from 'react';
import { render } from '../scripts/testUtils';
import Video from '../components/Video';

describe('Video', () => {
  const id = 'testId';
  const title = 'Test video';
  const description = 'Test video description';
  let getByTitle;
  let getByText;

  beforeEach(() => {
    ({ getByTitle, getByText } = render(
      <Video id={id} title={title} description={description}/>
    ));
  });

  it('renders an iframe with the video title', () => {
    expect(getByTitle(title).closest('iframe')).toBeInTheDocument();
  });

  it('renders the title', () => {
    expect(getByText(title)).toBeInTheDocument();
  });

  it('renders the description', () => {
    expect(getByText(description)).toBeInTheDocument();
  });
});
