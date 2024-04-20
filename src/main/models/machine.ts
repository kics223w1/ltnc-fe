class Machine {
  public readonly id: string;
  public readonly name: string;
  public readonly vendor: string;
  public readonly status: string;
  public readonly description: string;
  constructor(
    id: string,
    name: string,
    vendor: string,
    status: string,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.vendor = vendor;
    this.status = status;
    this.description = description;
  }

  public static initFromJSON(
    id: string,
    name: string,
    vendor: string,
    status: string,
    description: string
  ) {
    return new Machine(id, name, vendor, status, description);
  }
}

export default Machine;
