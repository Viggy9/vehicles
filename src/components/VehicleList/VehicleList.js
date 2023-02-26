import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Container } from "react-bootstrap";
import { setShowFilter, setClearFilter } from "../../reducers/application";
import "./VehicleList.scss";

const VehicleList = () => {
  const dispatch = useDispatch();
  const { categories, brands, models, variants, vehicleList, applyFilter } =
    useSelector((state) => state.application);

  let filteredVehicles = vehicleList;

  if (applyFilter) {
    filteredVehicles = vehicleList.filter((vehicle) => {
      if (categories.length > 0 && !categories.includes(vehicle.category)) {
        return false;
      }
      if (brands.length > 0) {
        const vehicleBrand = brands.find(
          (b) => b.name === vehicle.brand && b.parent === vehicle.category
        );
        const categoryBrand = brands.find((b) => b.parent === vehicle.category);
        if (!vehicleBrand && categoryBrand) {
          return false;
        }
      }
      if (models.length > 0) {
        const vehicleModel = models.find(
          (m) => m.name === vehicle.model && m.parent === vehicle.brand
        );
        const brandModel = models.find((m) => m.parent === vehicle.brand);
        if (!vehicleModel && brandModel) {
          return false;
        }
      }
      if (variants.length > 0) {
        const vehicleVariant = variants.find(
          (v) => v.name === vehicle.variant && v.parent === vehicle.model
        );
        const modelVariant = variants.find((v) => v.parent === vehicle.model);
        if (!vehicleVariant && modelVariant) {
          return false;
        }
      }
      return true;
    });
  }

  return (
    <Container className="vehicle-container">
      <Row>
        <Col className="header">
          <div className="header-text">Vehicles List</div>
          <div>
            <Button
              variant="link"
              onClick={() => dispatch(setShowFilter(true))}
            >
              Filter
            </Button>
            <Button variant="link" onClick={() => dispatch(setClearFilter())}>
              Clear Filter
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {filteredVehicles.map((vehicle) => (
          <Col xs={4} key={vehicle.id} className="vehicle-list">
            <div className="vehicle-text">{vehicle.name}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VehicleList;
