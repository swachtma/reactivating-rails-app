/* global expect */
import CodeSection from './code_section';

const test_lines = [
  { test: "+ ", priority: "high" },
  { test: "some code", priority: "normal" },
  { test: "- ", priority: "low" },
  { test: "", priority: "normal" },
];

describe("CodeSection.checkPriority()", ()=>{
  test_lines.forEach((run) =>{
    test("returns flag prioity", ()=>{
      expect(CodeSection.checkPriority(run.test)).toEqual(run.priority);
    });
  });
});

describe("CodeSection.cleanLine()", ()=>{
    test("removes priority flags from line", ()=>{
      expect(CodeSection.cleanLine("+ test")).toEqual("test");
      expect(CodeSection.cleanLine("- test")).toEqual("test");
      expect(CodeSection.cleanLine(" test")).toEqual(" test");
    });
});