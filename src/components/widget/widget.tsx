import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { WidgetStoreContext } from "../../store";

import { Button } from "../button/button";
import { Selection } from "../selection/selection";

import './style.css';
import { SelectedList } from "../selected-list/selected-list";

export const Widget = observer(() => {
  const store = useContext(WidgetStoreContext)

  return (
    <div id="widget">
      <h1>Select items</h1>
      <p>You currently have {store.selectedElements.length} selected items.</p>
      <SelectedList
        selectedElements={store.selectedElements} 
        handleSelectChange={(element) => store.removeSelectedElement(element)}
      />
      <Button 
        size="big" 
        type="primary" 
        text="Change my choice" 
        onClick={() => store.selectionStore.setIsOpened(true)}
      />
      {store.selectionStore.isOpened && (
        <Selection />
      )}
    </div>
  )
})
