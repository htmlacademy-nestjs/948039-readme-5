export type EntityType = string;

export interface Entity<T extends EntityType> {
  id?: T;
};
