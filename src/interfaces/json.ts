export type JSONValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | null
  | JSONObjectInterface
  | JSONObjectInterface[]
  | any;

export interface JSONObjectInterface {
  [key: string]: JSONValue;
}
