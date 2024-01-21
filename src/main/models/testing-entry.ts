class TestingEntry {
  public name: string;
  public bgColor: string;

  constructor(name: string, bgColor: string) {
    this.name = name;
    this.bgColor = bgColor;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

export default TestingEntry;
