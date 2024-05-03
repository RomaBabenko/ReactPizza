import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import NotFound from "./NotFound";
import styles from "../scss/components/Pagination.module.scss";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import {
  fetchPizzas,
  selectPizzaData,
  setPaginationVisibility,
} from "../redux/slices/pizzaSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { items, status, paginationVisible } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const togglePaginationVisibility = () => {
    dispatch(setPaginationVisibility(!paginationVisible));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
        hidePagination: !paginationVisible,
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [
    categoryId,
    sort.sortProperty,
    searchValue,
    currentPage,
    paginationVisible,
  ]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      {status === "error" && <NotFound />}
      {status !== "error" && (
        <>
          <div className="content__top">
            <Categories
              categoryId={categoryId}
              onClickCategory={onClickCategory}
            />
            <Sort />
          </div>
          <h2 className="content__title">Усі піци</h2>
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>

          {paginationVisible && (
            <div className={styles.pagination}>
              <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
              />

              <button
                className="button button--uncover"
                onClick={togglePaginationVisibility}
              >
                <p>Показати всі піци</p>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
