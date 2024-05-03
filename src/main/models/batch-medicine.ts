class BatchMedicine {
  public readonly id: string;
  public readonly medicine_id: string;
  public readonly quantity: number;
  public readonly cost_in: number;
  public readonly expire: Date;
  public readonly vendor: string;

  constructor(
    id: string,
    medicine_id: string,
    quantity: number,
    cost_in: number,
    expire: Date,
    vendor: string
  ) {
    this.id = id;
    this.medicine_id = medicine_id;
    this.quantity = quantity;
    this.cost_in = cost_in;
    this.expire = expire;
    this.vendor = vendor;
  }
}

export default BatchMedicine;
