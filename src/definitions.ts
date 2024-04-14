export type ElementType = {
  id: string;
  name: string;
  selected: boolean;
}

export interface ElementInterface extends ElementType {
  setSelectedElement(value: boolean): void;
  setSaveElement(value: boolean): void;
}

