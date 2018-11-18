class CodeSection {
  constructor(first_line, node_id, section_id){
    this.contents = [];
    this.section_id = "node_" + node_id + "_section_" + section_id;
    this.priority = CodeSection.checkPriority(first_line);
  }
  
  get completed() {
    return {
      section_id: this.section_id,
      priority: this.priority,
      contents: CodeSection.preserveLineBreaks(this.contents)
    };
  }
  
  continues = (line) =>
    this.priority === CodeSection.checkPriority(line);

  appendLine = (line) => {
    this.contents.push(
      CodeSection.cleanLine(line)
    );
  }
  
    
  static preserveLineBreaks(contents){
    return Array.from(contents, c => c === "" ? " " : c);
  }
  
  static cleanLine(raw_line) {
    return raw_line.replace(/^([+-]\s)?(.*)$/,"$2");
  }
  
  static checkPriority(line) {
    let flag = line[0];
    let flagMap = { "+": "high", "-": "low"};
    
    return flagMap[flag] ? flagMap[flag] : "normal";
  }
}

export default CodeSection;