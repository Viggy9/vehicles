import { createSlice } from "@reduxjs/toolkit";
import { getVehicleList } from "../api";

const appInitialState = {
  filters: [
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
  ],
  categories: [],
  brands: [],
  models: [],
  variants: [],
  applyFilter: false,
  vehicleList: [],
  showFilter: false,
  selectedItems: [],
  clearFilter: false,
  isVehicleListResolved: false,
};

const application = createSlice({
  name: "application",
  initialState: appInitialState,
  reducers: {
    updateCategories(state, { payload }) {
      return {
        ...state,
        categories: payload,
      };
    },
    updateBrands(state, { payload }) {
      return {
        ...state,
        brands: payload,
      };
    },
    updateModels(state, { payload }) {
      return {
        ...state,
        models: payload,
      };
    },
    updateVariants(state, { payload }) {
      return {
        ...state,
        variants: payload,
      };
    },
    setApplyFilter(state, { payload }) {
      return {
        ...state,
        applyFilter: payload,
      };
    },
    setVehicleListSuccess(state, { payload }) {
      return {
        ...state,
        vehicleList: payload,
        isVehicleListResolved: true,
      };
    },
    setShowFilter(state, { payload }) {
      return {
        ...state,
        showFilter: payload,
      };
    },
    setSelectedItems(state, { payload }) {
      return {
        ...state,
        selectedItems: payload,
      };
    },
    setClearFilter(state) {
      return {
        ...state,
        categories: [],
        brands: [],
        models: [],
        variants: [],
        selectedItems: [],
        applyFilter: false,
      };
    },
  },
});
export const {
  updateCategories,
  updateBrands,
  updateModels,
  updateVariants,
  setApplyFilter,
  setVehicleListSuccess,
  setShowFilter,
  setSelectedItems,
  setClearFilter,
  setVehicleListLoading,
} = application.actions;

export default application.reducer;

export const fetchVehicleList = () => async (dispatch) => {
  try {
    const res = await getVehicleList();
    dispatch(setVehicleListSuccess(res));
  } catch (e) {
    console.warn("Failed to fetch vehicle list");
  }
};

// Mock Vehicle List 
// const vehicleList = [
//   {
//     id: 1,
//     name: "BMW X6 4WD",
//     category: "car",
//     brand: "bmw",
//     model: "x6",
//     variant: "4WD",
//   },
//   {
//     id: 2,
//     name: "BMW X6 2WD",
//     category: "car",
//     brand: "bmw",
//     model: "x6",
//     variant: "2WD",
//   },
//   {
//     id: 3,
//     name: "BMW X6 4^4",
//     category: "car",
//     brand: "bmw",
//     model: "x6",
//     variant: "4^4",
//   },
//   {
//     id: 4,
//     name: "BMW X7",
//     category: "car",
//     brand: "bmw",
//     model: "x7",
//   },
//   {
//     id: 5,
//     name: "Volvo Polestar",
//     category: "car",
//     brand: "volvo",
//     model: "polestar",
//   },
//   {
//     id: 6,
//     name: "KTM 200 Duke",
//     category: "bike",
//     brand: "ktm",
//     model: "duke",
//   },
//   {
//     id: 7,
//     name: "Mahindra Cruzio",
//     category: "bus",
//     brand: "mahindra",
//     model: "cruzio",
//   },
//   {
//     id: 8,
//     name: "Ashok Leyland DOST",
//     category: "truck",
//     brand: "ashok leyland",
//     model: "dost",
//   },
// ],