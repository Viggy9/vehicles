import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategories,
  updateBrands,
  updateModels,
  updateVariants,
  setSelectedItems,
} from "../../reducers/application";
import { FILTERS } from "../../utils/constants";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import "./TreeView.scss";

const TreeList = ({ filters }) => {
  const dispatch = useDispatch();
  const { selectedItems } = useSelector((state) => state.application);

  useEffect(() => {
    const categories = selectedItems.map((i) => {
      if (i.type === FILTERS.CATEGORY) {
        return i.name;
      }
      return false;
    });
    dispatch(updateCategories(categories.filter((i) => i)));

    const brands = selectedItems.map((i) => {
      if (i.type === FILTERS.BRAND) {
        return { name: i.name, parent: i.parent };
      }
      return false;
    });
    dispatch(updateBrands(brands.filter((i) => i)));

    const models = selectedItems.map((i) => {
      if (i.type === FILTERS.MODEL) {
        return { name: i.name, parent: i.parent };
      }
      return false;
    });
    dispatch(updateModels(models.filter((i) => i)));

    const variants = selectedItems.map((i) => {
      if (i.type === FILTERS.VARIANT) {
        return { name: i.name, parent: i.parent };
      }
      return false;
    });
    dispatch(updateVariants(variants.filter((i) => i)));
  }, [selectedItems]);

  const filterChildren = (item, selectedItems) => {
    selectedItems = selectedItems.filter((i) => i.id !== item.id);
    if (item.children) {
      item.children.forEach((child) => {
        selectedItems = selectedItems.filter((i) => i.id !== child.id);
        selectedItems = filterChildren(child, selectedItems);
      });
    }
    return selectedItems;
  };

  const handleChange = (item) => {
    const index = selectedItems.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      const updatedselectedItems = filterChildren(item, [...selectedItems]);
      dispatch(setSelectedItems(updatedselectedItems));
    } else {
      dispatch(
        setSelectedItems([
          ...selectedItems,
          {
            id: item.id,
            type: item.type,
            name: item.name,
            parent: item.parent,
          },
        ])
      );
    }
  };

  return (
    <ul>
      {filters.map((item) => (
        <li key={item.id} className="list-item">
          <input
            type="checkbox"
            checked={selectedItems.findIndex((i) => i.id === item.id) >= 0}
            onChange={() => handleChange(item)}
          />
          {` ${capitalizeFirstLetter(item.name)} (${item.total})`}

          {item.children &&
            selectedItems.findIndex((i) => i.id === item.id) >= 0 && (
              <TreeList filters={item.children} />
            )}
        </li>
      ))}
    </ul>
  );
};

TreeList.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      total: PropTypes.number,
      children: PropTypes.arrayOf(PropTypes.object),
    })
  ),
};

export default TreeList;
