 export type Settings = {
  vesselCap: number;
  pourSize: number;
  description: string;
  id: string;
};


export 
type Props = {
  pouring: boolean;
  pouredCount: number;
  maxPourCount: number;
  message: string;
  onCheck: () => void;
  onRemove: () => void;
};
export type Task = {
  id: string;
  task: string;
  mass: number[];
};