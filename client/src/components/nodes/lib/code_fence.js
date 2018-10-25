import CodeSection from './code_section';

class CodeFence {
  constructor(node){
    let all_lines = node.content.trim().split("\n");
    
    this.node_id = node.id;
    this.content_lines = CodeFence.getContentLines(all_lines);
    [this.block_type, this.block_path] = CodeFence.parseFenceOpen(all_lines[0]);
    this.sections = this.parseSections([...this.content_lines]);
  }
  
  get copy(){
    return Array.from(this.content_lines, (line) =>{
      return CodeSection.cleanLine(line);
    }).join("\n");
  }
  
  parseSections = (remaining_lines) => {
    let current_section, sections = [];
    
    while(remaining_lines.length > 0){
      current_section = current_section || new CodeSection(remaining_lines[0], this.node_id, sections.length);
      if(current_section.continues(remaining_lines[0])){
        current_section.appendLine(remaining_lines.shift());
        if(remaining_lines.length === 0) { sections.push(current_section.completed) }
      } else {
        sections.push(current_section.completed);
        current_section = null;
      }
    }

    return sections;
  }
  
  static fenceLine = (line) => line.match(/^```/);
  
  static parseFenceOpen = (first_line) => {
    if(CodeFence.fenceLine(first_line)){
      return first_line.replace(/^(```\s?)([^()]*)?(\((.*)\))?\s*$/,["$2","$4"]).split(",");
    } else{
      return [undefined,undefined];
    }
  };
  
  static getContentLines = (lines) =>
    CodeFence.fenceLine(lines[0]) ? lines.slice(1,lines.length - 1) : lines;
}

export default CodeFence;