import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SelectionStoreContext } from "../../store";

import { Button } from "../button/button";
import { Selection } from "../selection/selection";

import './style.css';
import { SelectedList } from "../selected-list/selected-list";

export const Widget = observer(() => {
  const store = useContext(SelectionStoreContext)

  return (
    <div id="widget">
      <h1>Select items</h1>
      <p>You currently have {store.savedElements.length} selected items.</p>
      <SelectedList
        selectedElements={store.savedElements} 
        handleSelectChange={(element) => store.removeElement(element)}
      />
      <Button 
        size="big" 
        type="primary" 
        text="Change my choice" 
        onClick={() => store.setIsOpened(true)}
      />
      {store.isOpened && (<Selection /> )}
    </div>
  )
})
