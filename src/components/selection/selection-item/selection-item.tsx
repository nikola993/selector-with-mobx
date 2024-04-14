import { observer } from "mobx-react-lite"

import { ElementInterface } from "../../../definitions"

import './style.css'

type SelectionItemProps = {
  element: ElementInterface,
  disabled: boolean,
  onSelect: () => void
}

export const SelectionItem = observer(({ element, disabled, onSelect}: SelectionItemProps) => {
  return (
    <div id="selection-item">
      <input 
        disabled={disabled} 
        type="checkbox" 
        checked={element.selected} 
        onChange={() => onSelect()}
        id="selection-checkbox"
      />
      <p>{element.name}</p>
    </div>
  )
})
