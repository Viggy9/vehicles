import request from "./request";

export const getVehicleList = () =>
  request.get("/vehicles").then((res) => res.data);
