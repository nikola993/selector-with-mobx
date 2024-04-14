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

  constructor(name: string) {
    makeAutoObservable(this);
    this.name = name;
  }

  toggleElement() {
    this.selected = !this.selected;
  }

  unselectElement() {
    this.selected = false;
  }
}

class SelectionStore {
  elements: Element[] = []
  filter: string = ''
  search: string = ''
  isOpened: boolean = false
  widgetStore

  constructor(widgetStore: WidgetStore, mockElements: Element[]){
    makeAutoObservable(this)
    this.elements = mockElements
    this.widgetStore = widgetStore
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

  get selectedElements() {
    return this.elements.filter(element => element.selected)
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
    this.elements.forEach(element => element.selected = this.widgetStore.selectedElements.some(selectedElement => selectedElement.id === element.id))
    this.filter = ''
    this.search = ''
  }
}

class WidgetStore {
  selectedElements: Element[] = []
  selectionStore: SelectionStore

  constructor() {
    makeAutoObservable(this)
    this.selectionStore = new SelectionStore(this, mockElements())
  }

  removeSelectedElement(element: Element) {
    element.unselectElement()
    this.selectedElements.splice(this.selectedElements.indexOf(element), 1)
  }

  saveSelectedElements() {
    this.selectedElements = this.selectionStore.selectedElements
  }
}

export const WidgetStoreContext = createContext(new WidgetStore())
