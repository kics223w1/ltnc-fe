class SQLServerUnitTestEntry {
  public name: string;
  private script: string;

  constructor(name: string) {
    this.name = name;
    this.script = '';
  }

  public getScript() {
    return this.script;
  }

  public setScript(script: string) {
    this.script = script;
  }
}

export default SQLServerUnitTestEntry;
