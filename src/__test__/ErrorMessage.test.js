import React from "react"
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait
} from "@testing-library/dom";
import '@testing-library/jest-dom/extend-expect'
import {render} from "@testing-library/react"
import ErrorMessage from "../components/ErrorMessage";


test('renders a message', () => {
    const { container, getByText } = render(<ErrorMessage />)
    expect(container.firstChild).toMatchSnapshot()
  })