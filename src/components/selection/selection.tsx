import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ElementInterface } from "../../definitions";
import { WidgetStoreContext } from "../../store";

import { Button } from "../button/button";
import { SelectionFilters } from "./filters/filters";
import { SelectionList } from "./selection-list/selection-list";
import { SelectedList } from "../selected-list/selected-list";

import './style.css';

export const Selection = observer(() => {
  const store = useContext(WidgetStoreContext)

  const handleSelectChange = (element: ElementInterface) => {
    element.toggleElement()
  }

  const handleOnClose = () => {
    store.selectionStore.setIsOpened(false)
  }

  const handleOnSave = () => {
    store.saveSelectedElements()
    store.selectionStore.setIsOpened(false)
  }

  return (
    <div id="element-selection">
      <span id="close" onClick={handleOnClose}>&#10005;</span>
      <h2>Select items</h2>
      <p>Click on an element to select it.</p>
      <SelectionFilters />
      <SelectionList 
        filteredEelemnts={store.selectionStore.filteredEelemnts}
        handleSelectChange={handleSelectChange}
        isMaxSelected={store.selectionStore.isMaxSelected}
      />
      <p>Current selected items:</p>
      <SelectedList
        selectedElements={store.selectionStore.selectedElements} 
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
