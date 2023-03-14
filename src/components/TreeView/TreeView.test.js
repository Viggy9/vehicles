import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Provider } from "react-redux";
import TreeList from "./TreeView";
import {store} from '../../store';

test("selecting/unselecting checkboxes updates checked property", async () => {
  const filters = [
    {
      id: "1",
      type: "category",
      name: "bus",
      total: 1,
    },
    {
      id: "2",
      type: "category",
      name: "truck",
      total: 1,
    },
    {
      id: "3",
      type: "category",
      name: "car",
      total: 5,
      children: [
        {
          id: "3.1",
          type: "brand",
          name: "bmw",
          parent: "car",
          total: 4,
          children: [
            {
              id: "3.1.1",
              type: "model",
              name: "x7",
              parent: "bmw",
              total: 1,
            },
            {
              id: "3.1.2",
              type: "model",
              name: "x6",
              parent: "bmw",
              total: 3,
              children: [
                {
                  id: "3.1.2.1",
                  type: "variant",
                  name: "4WD",
                  parent: "x6",
                  total: 1,
                },
                {
                  id: "3.1.2.2",
                  type: "variant",
                  name: "2WD",
                  parent: "x6",
                  total: 1,
                },
                {
                  id: "3.1.2.3",
                  type: "variant",
                  name: "4^4",
                  parent: "x6",
                  total: 1,
                },
              ],
            },
          ],
        },
        {
          id: "3.2",
          type: "brand",
          name: "volvo",
          parent: "car",
          total: 1,
        },
      ],
    },
    {
      id: "4",
      type: "category",
      name: "bike",
      total: 1,
    },
  ];

  render(
    <Provider store={store}>
      <TreeList filters={filters} />
    </Provider>
  );

  const allCheckboxes = screen.getAllByRole('checkbox');
  
  for(let checkbox of allCheckboxes){
    user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  }

  for(let checkbox of allCheckboxes){
    user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  }
});
