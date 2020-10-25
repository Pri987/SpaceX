import React from 'react';
import { render } from '@testing-library/react';
import SpaceX from './components/SpaceX';

test('renders learn react link', () => {
  const { getByText } = render(<SpaceX />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
