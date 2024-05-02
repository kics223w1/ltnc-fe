class MedicineHistory {
  public readonly id: string;
  public readonly medicine_id: string;
  public readonly export_date: string;
  public readonly cost_out: number;
  public readonly prev_remaining: number;
  public readonly curr_remaining: number;
  public readonly description: string;
  public readonly batchMedicine: {
    id: string;
    medicine_id: string;
    quantity: number;
    cost_in: number;
    expire: string;
    vendor: string;
  };

  constructor(data: {
    id: string;
    medicine_id: string;
    export_date: string;
    cost_out: number;
    prev_remaining: number;
    curr_remaining: number;
    description: string;
    batchMedicine: {
      id: string;
      medicine_id: string;
      quantity: number;
      cost_in: number;
      expire: string;
      vendor: string;
    };
  }) {
    this.id = data.id;
    this.medicine_id = data.medicine_id;
    this.export_date = data.export_date;
    this.cost_out = data.cost_out;
    this.prev_remaining = data.prev_remaining;
    this.curr_remaining = data.curr_remaining;
    this.description = data.description;
    this.batchMedicine = data.batchMedicine;
  }
}

export default MedicineHistory;
