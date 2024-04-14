import { ElementInterface } from "../../definitions";

import './style.css';

type ItemElementProps = {
  element: ElementInterface,
  handleOnClick: () => void
}

export const ItemElement = ({ element, handleOnClick }: ItemElementProps) => {
  return (
    <div 
      id="element-wrapper" 
      key={element.id} 
      className={element.selected ? 'item-element-selected' : 'item-element'}
    >
        <span id="item-element-text">{element.name}</span>
        <button id="item-element-button" onClick={handleOnClick}>&#10005;</button>
    </div>
  );
}
