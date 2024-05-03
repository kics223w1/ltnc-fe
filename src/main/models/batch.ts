import BatchMedicine from './batch-medicine';

class Batch {
  public readonly id: string;
  public readonly status: string;
  public readonly placer_name: string;
  public readonly placer_CID: string;
  public readonly placer_phone: string;
  public readonly import_date: string;
  public readonly total_type: number;
  public readonly description: string | null;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly batchMedicines: BatchMedicine[];

  constructor(
    id: string,
    status: string,
    placer_name: string,
    placer_CID: string,
    placer_phone: string,
    import_date: string,
    total_type: number,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    batchMedicines: BatchMedicine[]
  ) {
    this.id = id;
    this.status = status;
    this.placer_name = placer_name;
    this.placer_CID = placer_CID;
    this.placer_phone = placer_phone;
    this.import_date = import_date;
    this.total_type = total_type;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.batchMedicines = batchMedicines;
  }
}

export default Batch;
