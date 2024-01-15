import { useDispatch, useSelector } from "react-redux";
import {
  setUsernameFilter,
  selectUsernameFilter,
  setNameFilter,
  selectNameFilter,
  setEmailFilter,
  selectEmailFilter,
  setOnlySelectedFilter,
  selectOnlySelectedFilter,
  resetFilters,
} from "../../redux/slices/filterSlice";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const usernameFilter = useSelector(selectUsernameFilter);
  const nameFilter = useSelector(selectNameFilter);
  const emailFilter = useSelector(selectEmailFilter);
  const onlySelectedFilter = useSelector(selectOnlySelectedFilter);

  const handleUsernameFilterChange = (e) => {
    dispatch(setUsernameFilter(e.target.value));
  };
  const handleNameFilterChange = (e) => {
    dispatch(setNameFilter(e.target.value));
  };
  const handleEmailFilterChange = (e) => {
    dispatch(setEmailFilter(e.target.value));
  };
  const handleOnlySelectedFilterChange = () => {
    dispatch(setOnlySelectedFilter());
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            value={usernameFilter}
            onChange={handleUsernameFilterChange}
            type="text"
            placeholder="Filter by Username..."
          />
        </div>
        <div className="filter-group">
          <input
            value={nameFilter}
            onChange={handleNameFilterChange}
            type="text"
            placeholder="Filter by Name..."
          />
        </div>
        <div className="filter-group">
          <input
            value={emailFilter}
            onChange={handleEmailFilterChange}
            type="text"
            placeholder="Filter by Email..."
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlySelectedFilter}
              onChange={handleOnlySelectedFilterChange}
            />{" "}
            Only Selected
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
