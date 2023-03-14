import { render, screen } from "@testing-library/react";
import App from "./App";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { Provider } from "react-redux";
import { store } from "./store";

const handlers = [
  rest.get("/vehicles", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "BMW X6 4WD",
          category: "car",
          brand: "bmw",
          model: "x6",
          variant: "4WD",
        },
        {
          id: 2,
          name: "BMW X6 2WD",
          category: "car",
          brand: "bmw",
          model: "x6",
          variant: "2WD",
        },
        {
          id: 3,
          name: "BMW X6 4^4",
          category: "car",
          brand: "bmw",
          model: "x6",
          variant: "4^4",
        },
        {
          id: 4,
          name: "BMW X7",
          category: "car",
          brand: "bmw",
          model: "x7",
        },
        {
          id: 5,
          name: "Volvo Polestar",
          category: "car",
          brand: "volvo",
          model: "polestar",
        },
        {
          id: 6,
          name: "KTM 200 Duke",
          category: "bike",
          brand: "ktm",
          model: "duke",
        },
        {
          id: 7,
          name: "Mahindra Cruzio",
          category: "bus",
          brand: "mahindra",
          model: "cruzio",
        },
        {
          id: 8,
          name: "Ashok Leyland DOST",
          category: "truck",
          brand: "ashok leyland",
          model: "dost",
        },
      ])
    );
  }),
];
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test("renders vehicle list", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const volvo = await screen.findByText("Volvo Polestar");
  const bmw = await screen.findByText("BMW X6 4WD");
  const ktm = await screen.findByText("KTM 200 Duke");

  expect(volvo).toBeInTheDocument();
  expect(bmw).toBeInTheDocument();
  expect(ktm).toBeInTheDocument();
});