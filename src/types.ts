export type Operation = Record<string, () => void>;
export type Operator = "+" | "-" | ">" | "<" | "[" | "]" | "." | ",";
export type Callback = (runtime: Runtime) => void;
export interface Runtime {
  operator?: Operator | null;
  memory: Uint8Array;
  pointer: number;
  input: string;
  output_buffer: string;
  exited: boolean;
}
