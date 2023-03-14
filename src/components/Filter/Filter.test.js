import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Provider } from "react-redux";
import Filter from "./Filter";
import { store } from "../../store";

test("selecting a checkbox shows the category selected", () => {
  render(
    <Provider store={store}>
      <Filter />
    </Provider>
  );

  const truckCheckbox = screen.getByRole("checkbox", { name: /truck/i });
  user.click(truckCheckbox);

  const truck = screen.getByText(/truck$/i);

  expect(truck).toBeInTheDocument();
});

test("Clear Filter button clears the selected filters", () => {
  render(
    <Provider store={store}>
      <Filter />
    </Provider>
  );

  const bikeCheckbox = screen.getByRole("checkbox", { name: /bike/i });
  const carCheckbox = screen.getByRole("checkbox", { name: /car/i });

  user.click(carCheckbox);
  user.click(bikeCheckbox);

  const car = screen.getByText(/car$/i);
  const bike = screen.getByText(/bike$/i);

  const clearButton = screen.getByRole("button", { name: /clear filter/i });
  user.click(clearButton);

  // screen.logTestingPlaygroundURL();

  expect(car).not.toBeInTheDocument();
  expect(bike).not.toBeInTheDocument();
});
