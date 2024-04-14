import { ElementInterface } from '../../definitions'

import { ItemElement } from '../element/element'

import './style.css'

type SelectedListProps = {
  selectedElements: ElementInterface[],
  handleSelectChange: (element: ElementInterface) => void
}

export const SelectedList = ({ selectedElements, handleSelectChange }: SelectedListProps) => {
  return (
    <>
      <div id="selection-selected-list">
      {selectedElements.map((element: ElementInterface) => (
        <ItemElement
          element={element} 
          key={element.id} 
          handleOnClick={() => handleSelectChange(element)}
        />
      ))}
      </div>
    </>
  )
}
