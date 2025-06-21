// src/types/catalog.ts
export interface Control {
  id: string;
  props?: { name: string; value: string }[];
  parts?: { name: string; prose: string }[];
}

export interface Group {
  title?: string;
  groups?: Group[];
  controls?: Control[];
}

export interface Catalog {
  catalog: { groups: Group[] };
}
