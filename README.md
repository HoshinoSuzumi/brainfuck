# @uniiem/brainfuck

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/HoshinoSuzumi/brainfuck/ci.yml)
![NPM Downloads](https://img.shields.io/npm/dm/%40uniiem%2Fbrainfuck)
![NPM Version (with dist tag)](https://img.shields.io/npm/v/%40uniiem%2Fbrainfuck/latest)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40uniiem%2Fbrainfuck)
![GitHub License](https://img.shields.io/github/license/HoshinoSuzumi/brainfuck)

The reimplementation of BrainfuckJs using TypeScript.

## Installtion

```bash
npm i @uniiem/brainfuck
```

## API

```typescript
declare const setDebug: (value: boolean) => boolean;

declare const execute: (program: string, input?: string) => Promise<unknown>;
declare const executeCallbackly: (program: string, input?: string, callback?: Callback) => Promise<unknown>;

// Type Definations
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
```

## Sponsor

Buy me a coffee~

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3D5ANK41%26type%3Dpledges&style=flat)](https://patreon.com/5ANK41)
[![爱发电](https://afdian.moeci.com/11/badge.svg)](https://afdian.net/a/hoshino_suzumi)
