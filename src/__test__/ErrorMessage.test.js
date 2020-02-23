import React from "react"
import { getByLabelText, getByText, getByTestId, queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait
} from "@testing-library/dom";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from "@testing-library/react"
import ErrorMessage from "../components/ErrorMessage";

var title= "Title test"
var title2= "Title2 test"
var permission= "permission test"
var description= "description test"

var mensaje = {
  title: title,
  title2: title2,
  permission: permission,
  description: description
}


test('Checks if component renders', () => {
    const { container } = render(<ErrorMessage />)
    expect(container.firstChild).toMatchSnapshot()
});

test("Props passed ar rendered", () => {
  const { getByText } = render(<ErrorMessage
      mensaje={mensaje}
    />);

    // const titleExpected = getByText(/Title test/i);
    const titleExpected = getByText(new RegExp(title));
    const title2Expected = getByText(new RegExp(title2));
    const permissionExpected = getByText(new RegExp(permission));
    const descriptionExpected = getByText(new RegExp(description));
    expect(titleExpected).toBeInTheDocument();
    expect(title2Expected).toBeInTheDocument();
    expect(permissionExpected).toBeInTheDocument();
    expect(descriptionExpected).toBeInTheDocument();
});