import { observer } from "mobx-react-lite"

import "./style.css"

type SelectionFiltersProps = {
  handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SelectionFilters = observer(({ handleFilter, handleSearch }: SelectionFiltersProps) => {
  return (
    <div id="filter-wrapper">
    <label htmlFor="search">Search:</label>
      <input 
        id="search"
        type="text"
        placeholder="Search..."
        onChange={(event) => handleSearch(event)}
      />
      <label htmlFor="select">Filter:</label>
      <select id="select" onChange={(event) => handleFilter(event)}>
        <option value="" hidden>No filter</option>
        <option value="10">&gt;10</option>
        <option value="50">&gt;50</option>
        <option value="100">&gt;100</option>
      </select>
    </div>
  );
})
