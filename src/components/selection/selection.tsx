import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ElementInterface } from "../../definitions";
import { SelectionStoreContext } from "../../store";

import { Button } from "../button/button";
import { SelectionFilters } from "./filters/filters";
import { SelectionList } from "./selection-list/selection-list";
import { SelectedList } from "../selected-list/selected-list";

import './style.css';

export const Selection = observer(() => {
  const store = useContext(SelectionStoreContext)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    store.setSearch(event.target.value)
  }

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    store.setFilter(event.target.value)
  }

  const handleSelectChange = (element: ElementInterface) => {
    store.toggleSelected(element)
  }

  const handleOnClose = () => {
    store.setIsOpened(false)
  }

  const handleOnSave = () => {
    store.saveSelectedElements()
    store.setIsOpened(false)
  }

  return (
    <div id="element-selection">
      <span id="close" onClick={handleOnClose}>&#10005;</span>
      <h2>Select items</h2>
      <p>Click on an element to select it.</p>
      <SelectionFilters 
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      />
      <SelectionList 
        filteredEelemnts={store.filteredEelemnts}
        handleSelectChange={handleSelectChange}
        isMaxSelected={store.isMaxSelected}
      />
      <p>Current selected items:</p>
      <SelectedList
        selectedElements={store.selectedElements} 
        handleSelectChange={handleSelectChange}
      />
      <Button
        size="small"
        type="primary"
        text="Save"
        onClick={handleOnSave}
      />
      <Button
        size="small"
        type="secondary"
        text="Cancel"
        onClick={handleOnClose}
      />
    </div> 
  )
})
