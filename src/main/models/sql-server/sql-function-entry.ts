class SQLServerFunctionEntry {
  public name: string;
  public content: string;

  constructor(name: string) {
    this.name = name;
    this.content = '';
  }

  public setContent(content: string) {
    this.content = content;
  }

  public buildFunction(): string {
    return `function ${this.name}(obj) {
      return "${this.content}"
    }`;
  }
}

export default SQLServerFunctionEntry;
