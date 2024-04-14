export type ElementType = {
  id: string;
  name: string;
  selected: boolean;
}

export interface ElementInterface extends ElementType {
  toggleElement(): void;
  unselectElement(): void;
}

