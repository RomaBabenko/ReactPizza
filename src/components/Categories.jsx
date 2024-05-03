import React, { useEffect } from "react";

function Categories({ categoryId, onClickCategory }) {
  const [open, setOpen] = React.useState(false);

  const categories = [
    "Усі",
    "М'ясні",
    "Вегетаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  const onClickCategoryItem = (index) => {
    onClickCategory(index);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".categories") === null) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="categories">
      <ul className="categories__list">
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>

      <div className="categories__label">
        <span onClick={() => setOpen(!open)}>{categories[categoryId]}</span>
      </div>
      {open && (
        <div className="categories__popup">
          <ul>
            {categories.map((categoryName, index) => (
              <li
                key={categoryName}
                onClick={() => onClickCategoryItem(index)}
                className={categoryId === index ? "active" : ""}
              >
                {categoryName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Categories;
