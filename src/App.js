import React, { useEffect } from "react";
import VehicleList from "./components/VehicleList/VehicleList";
import Filter from "./components/Filter";
import { fetchVehicleList } from "./reducers/application";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { showFilter, isVehicleListResolved } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    if (!isVehicleListResolved) {
      dispatch(fetchVehicleList());
    }
  }, [isVehicleListResolved]);

  if (showFilter) {
    return <Filter />;
  }

  return !isVehicleListResolved ? "Loading...." : <VehicleList />;
}


export default App;
