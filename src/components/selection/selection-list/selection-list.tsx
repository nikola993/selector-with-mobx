import { ElementInterface } from "../../../definitions"

import { SelectionItem } from "../selection-item/selection-item"

import './style.css'

type SelectionListProps = {
  filteredEelemnts: ElementInterface[],
  isMaxSelected: boolean,
  handleSelectChange: (element: ElementInterface) => void
}

export const SelectionList = ({ filteredEelemnts, isMaxSelected, handleSelectChange }: SelectionListProps) => {
  return (
    <div id="element-selection-list">
      {filteredEelemnts.map((element: ElementInterface) => (
        <SelectionItem
          disabled={isMaxSelected && !(element.selected)}
          element={element}
          key={element.id}
          onSelect={() => handleSelectChange(element)}
        />
      ))}
    </div>
  )
}
