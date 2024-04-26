import { describe, it, expect } from "vitest";
import { execute, executeCallbackly, setDebug } from "../src";

setDebug(false);

describe("bf", () => {
  it("hell world", () => {
    const code = `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`;
    const excepted = "Hello World!\n";
    execute(code).then((res) => {
      expect(res).toBe(excepted);
    });
  });
  it("should be ascii characters output", () => {
    const code = ".+[.+]";
    const excepted = [...new Uint8Array(256)]
      .map((_, i) => String.fromCharCode(i))
      .join("");
    execute(code).then((res) => {
      expect(res).toBe(excepted);
    });
  });
  it("should be ascii characters output", () => {
    const code = ".+[.+]";
    let result = "";
    const excepted = [...new Uint8Array(256)]
      .map((_, i) => String.fromCharCode(i))
      .join("");
    executeCallbackly(code, void 0, (res) => {
      result = res.output_buffer;
    });
    expect(result).toBe(excepted);
  });
});
