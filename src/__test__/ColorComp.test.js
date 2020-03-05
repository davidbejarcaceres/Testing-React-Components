import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColorPicker from '../components/ColorPicker';

afterEach(cleanup);

const testColor = 'brown darken-1';
const defaultColor = 'grey lighten-2';

function handleChangeColor(color){
  console.log(color)
}

test('ColorPicker Renders', () => {
  const { asFragment } = render(
    <ColorPicker
      onChange={handleChangeColor}
      selectedColor={testColor}
      overlay
      editing={true}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test('ColorPicker Renders if no selectedColor is passed, uses default prop', () => {
  const { asFragment } = render(
    <ColorPicker
      onChange={handleChangeColor}
      overlay
      editing={true}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

