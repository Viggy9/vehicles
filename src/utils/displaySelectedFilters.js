import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function displaySelectedFilters(
  categories,
  brands,
  models,
  variants
) {
  return categories.map((category, index) => {
    return (
      <div key={category} style={{ marginBottom: "0.5rem" }}>
        {`${index + 1}) ${capitalizeFirstLetter(category)}`}
        {brands.map((b, index) => {
          if (b.parent === category) {
            return (
              <div key={b.name} style={{ marginLeft: "1rem" }}>
                {`${index + 1}. ${capitalizeFirstLetter(b.name)}`}
                {models.map((model, index) => {
                  if (model.parent === b.name) {
                    return (
                      <div key={model.name} style={{ marginLeft: "1rem" }}>
                        {`${index + 1}. ${capitalizeFirstLetter(model.name)}`}
                        {variants.map((variant, index) => {
                          if (variant.parent === model.name) {
                            return (
                              <div key={variant.name} style={{ marginLeft: "1rem" }}>
                                {`${index + 1}. ${capitalizeFirstLetter(
                                  variant.name
                                )}`}
                              </div>
                            );
                          }
                          return false;
                        })}
                      </div>
                    );
                  }
                  return false;
                })}
              </div>
            );
          }
          return false;
        })}
      </div>
    );
  });
}