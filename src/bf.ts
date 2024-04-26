import { Callback, Operation, Operator } from "./types";

let input: string[] = [];
let output: string[] = [];
let ptr: number;
let _debug = false;
const setDebug = (value: boolean) => (_debug = value);

const _mem_size = 256;
let mem: Uint8Array;

let outputCallback: Callback = () => {};
const make_cb = (op?: Operator | null, exited: boolean = false) =>
  outputCallback({
    operator: op,
    memory: mem,
    pointer: ptr,
    input: input.join(""),
    output_buffer: output.join(""),
    exited: exited,
  });

const ops: Operation = {
  "+": () => {
    mem[ptr] = mem[ptr] || 0;
    mem[ptr] < 255 ? mem[ptr]++ : (mem[ptr] = 0);
    make_cb("+");
    _debug && console.log("+", mem[ptr], ptr, mem);
  },
  "-": () => {
    mem[ptr] = mem[ptr] || 0;
    mem[ptr]--;
    make_cb("-");
    _debug && console.log("-", mem[ptr], ptr, mem);
  },
  "<": () => {
    if (ptr > 0) {
      ptr--;
      make_cb("<");
    }
    _debug && console.log("<", ptr, mem);
  },
  ">": () => {
    ptr++;
    make_cb(">");
    _debug && console.log(">", ptr, mem);
  },
  ".": () => {
    const char = String.fromCharCode(mem[ptr]);
    output.push(char);
    make_cb(".");
    _debug && console.log(".", char, mem[ptr], mem);
  },
  ",": () => {
    const char = input.shift();
    if (typeof char === "string") {
      mem[ptr] = char.charCodeAt(0);
      make_cb(",");
    }
    _debug && console.log(",", char, mem[ptr], mem);
  },
};

const program = (operations: Function[]) => {
  return (inputString?: string) => {
    mem = new Uint8Array(_mem_size);
    ptr = 0;
    output = [];
    input = (inputString && inputString.split("")) || [];

    operations.forEach((op) => op());
    make_cb(null, true);
    return output.join("");
  };
};

const loop = (operations: Function[]) => {
  return () => {
    let loopCount = 0;
    while (mem[ptr] > 0) {
      if (loopCount++ > 20000) throw new Error("Loop count exceeded");
      operations.forEach((op) => op());
    }
  };
};

let program_chars: string[] = [];

const parseProgram = () => {
  const operations: Function[] = [];
  let nextChar;
  while (program_chars.length > 0) {
    nextChar = program_chars.shift();
    if (ops[nextChar!]) {
      operations.push(ops[nextChar!]);
    } else if (nextChar === "[") {
      operations.push(parseLoop());
    } else if (nextChar === "]") {
      throw new Error("Unexpected closing bracket");
    } else {
      // ignore it
    }
  }

  return program(operations);
};

const parseLoop = (): Function => {
  const operations: Function[] = [];
  let nextChar;

  while (program_chars[0] !== "]") {
    nextChar = program_chars.shift();
    if (nextChar === undefined) {
      throw new Error("Unexpected end of program");
    } else if (ops[nextChar]) {
      operations.push(ops[nextChar]);
    } else if (nextChar === "[") {
      operations.push(parseLoop());
    } else {
      // ignore it
    }
  }
  program_chars.shift();

  return loop(operations);
};

const execute = (program: string, input?: string) => {
  return new Promise((resolve, reject) => {
    program_chars = program.split("");
    try {
      resolve(parseProgram()(input));
    } catch (e) {
      reject(e);
    }
  });
};

const executeCallbackly = (
  program: string,
  input?: string,
  callback?: Callback
) => {
  return new Promise((resolve, reject) => {
    program_chars = program.split("");
    outputCallback = callback || (() => {});
    try {
      resolve(parseProgram()(input));
    } catch (e) {
      reject(e);
    }
  });
};

export { execute, executeCallbackly, setDebug };
