import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import {
  setApplyFilter,
  setShowFilter,
  setClearFilter,
} from "../../reducers/application";
import TreeList from "../TreeView/TreeView";
import displaySelectedFilters from "../../utils/displaySelectedFilters";
import "./Filter.scss";

const Filter = () => {
  const { filters, categories, brands, models, variants } = useSelector(
    (state) => state.application
  );
  const dispatch = useDispatch();

  const selectedFilters = displaySelectedFilters(
    categories,
    brands,
    models,
    variants
  );
  return (
    <Container className="filter-container">
      <Row className="header">
        <Col xs={5}>
          <Button variant="link" onClick={() => dispatch(setShowFilter(false))}>
            Go Back
          </Button>
        </Col>
        <Col xs={5}>
          <Button variant="link" onClick={() => dispatch(setClearFilter())}>
            Clear Filter
          </Button>
        </Col>
      </Row>
      <TreeList filters={filters} />
        <div>
          <span className="filter-text">Selected Variants:</span>
          {selectedFilters}
          <div className="apply-button">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                dispatch(setApplyFilter(true));
                dispatch(setShowFilter(false));
              }}
            >
              Apply Filter
            </Button>
          </div>
        </div>
    </Container>
  );
};

export default Filter;
