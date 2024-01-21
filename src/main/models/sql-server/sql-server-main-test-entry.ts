import SQLServerFunctionEntry from './sql-function-entry';
import SQLServerUnitTestEntry from './sql-server-unit-test-entry';

class SQLServerMainTestEntry {
  private functionEntries: SQLServerFunctionEntry[];
  private unitTestEntries: SQLServerUnitTestEntry[];

  constructor() {
    this.functionEntries = [];
    this.unitTestEntries = [];
  }

  public getScript(unitTestName: string): string {
    let script = '';

    this.functionEntries.forEach((functionEntry) => {
      script += functionEntry.buildFunction();
    });

    this.unitTestEntries.forEach((unitTestEntry) => {
      if (unitTestEntry.name === unitTestName) {
        script += unitTestEntry.getScript();
      }
    });

    return script;
  }
}

export default SQLServerMainTestEntry;
