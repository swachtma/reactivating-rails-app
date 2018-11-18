/* global expect*/
import CodeFence from '../../../containers/lib/code_fence';

const test_node = {
  id: 78,
  chapter_id: 2,
  node_type: 'code_block',
  content: '``` javascript(/client/src/App.js)\n+ console.log("high")\n- console.log("low")\nconsole.log("normal")\n```'
};

describe("CodeFence Integration Tests",()=>{
  let code_block = new CodeFence(test_node);
  test("parses code sections",()=>{
    expect(code_block.sections.length).toEqual(3);
    expect(code_block.sections[0].priority).toEqual("high");
    expect(code_block.sections[1].priority).toEqual("low");
    expect(code_block.sections[2].priority).toEqual("normal");
  });
  
  test("parses code type",()=>{
    expect(code_block.block_type).toEqual("javascript");
  });
  
  test("parses code path",()=>{
    expect(code_block.block_path).toEqual("/client/src/App.js");
  });
  
  test("assigns each section an ID",()=>{
    expect(code_block.sections[0].section_id).toEqual("node_78_section_0");
  });
});

describe("ParseCodeBlock.fenceLine()",()=>{
  test("returns true only if code fence",()=>{
    expect(CodeFence.fenceLine("```")).toBeTruthy();
    expect(CodeFence.fenceLine("``` ")).toBeTruthy();
    expect(CodeFence.fenceLine("* ")).toBeFalsy();
  });
});

describe("ParseCodeBlock.parseFenceOpen()",()=>{
  let examples = [
    {test: "```", outcome: ["",""]},
    {test: "``` ", outcome: ["",""]},
    {test: "```javascript", outcome: ["javascript",""]},
    {test: "``` javascript", outcome: ["javascript",""]},
    {test: "```javascript(path/to/file.ext)", outcome: ["javascript","path/to/file.ext"]},
    {test: "``` javascript(path/to/file.ext)", outcome: ["javascript","path/to/file.ext"]}
  ];
  
  examples.forEach((example => {
    test("test value provide outcome",()=>{
      expect(CodeFence.parseFenceOpen(example.test)).toEqual(example.outcome);
    });
  }));
});

describe("ParseCodeBlock.getContentLines()",() =>{
  test("removes open and close fence",()=>{
    let test_value = ["```","test value","```"];
    expect(CodeFence.getContentLines(test_value)).toEqual(["test value"]);
  });
});