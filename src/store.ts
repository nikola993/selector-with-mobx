import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";

import { ElementInterface } from "./definitions";

const mockElements = (): Element[] => {
  const array = []
  for (let index = 1; index <= 300; index++) {
    array.push(new Element(`Element ${index}`)) 
  }
  return array
}

class Element implements ElementInterface {
  id = uuidv4();
  name = "";
  selected = false;
  saved = false;

  constructor(name: string) {
    makeAutoObservable(this);
    this.name = name;
  }

  setSelectedElement(value: boolean) {
    this.selected = value
  }

  setSaveElement(value: boolean) {
    this.saved = value;
  }
}

class SelectionStore {
  elements: Element[] = []
  filter: string = ''
  search: string = ''
  isOpened: boolean = false

  constructor(mockElements: Element[]){
    makeAutoObservable(this)
    this.elements = mockElements
  }

  get isMaxSelected() {
    return this.selectedElements.length >= 3
  }

  get filteredEelemnts() {
    const numberToFilter = parseInt(this.filter)

    return this.elements.filter((element, index) => {
      if (this.filter !== "" && index < numberToFilter) {
        return false;
      }
      if (this.search !== "" && !element.name.includes(this.search)) {
        return false;
      }
      return true;
    });
  }

  get savedElements() {
    return selectionStore.elements.filter(element => element.saved)
  }

  get selectedElements() {
    return this.elements.filter(element => element.selected)
  }

  removeElement(element: ElementInterface) {
    element.setSaveElement(false)
    element.setSelectedElement(false)
  }

  toggleSelected(element: ElementInterface) {
    element.setSelectedElement(!element.selected)
  }

  saveSelectedElements() {
    this.selectedElements.forEach(element => {
      element.setSaveElement(true)
    })
    this.savedElements.forEach(element => {
      if (!element.selected) {
        element.setSaveElement(false)
      }
    })
  }

  setIsOpened(isOpened: boolean) {
    this.isOpened = isOpened

    if (!isOpened) {
      this.resetState()
    }
  }

  setFilter(filter: string) {
    this.filter = filter
  }

  setSearch(search: string) {
    this.search = search
  }

  resetState() {
    this.selectedElements.forEach(element => {
      if (!element.saved) {
        element.setSelectedElement(false)
      }
    })
    this.filter = ''
    this.search = ''
  }
}

const selectionStore = new SelectionStore(mockElements())
export const SelectionStoreContext = createContext(selectionStore)
