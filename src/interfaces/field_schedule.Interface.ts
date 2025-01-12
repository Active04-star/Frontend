import { BlockStatus } from "../enum/blockStatus"; // Enum previamente definido

export interface IField_Blocks {
  id: string;
  start_time: string; // Representa 'start_time'
  end_time: string; // Representa 'end_time'
  status: BlockStatus; // Enum con los posibles estados del campo
}
