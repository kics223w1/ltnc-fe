class Medicine {
  public readonly medicine_id: string;
  public readonly remaining: string;
  public readonly name: string;
  public readonly unit: string;
  public readonly description: string;
  public readonly cost_out: string;
  public readonly ingredients: string;


  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    medicine_id: string,
    remaining: string,
    name: string,
    unit: string,
    description: string,
    cost_out: string,
    ingredients: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.medicine_id = medicine_id;
    this.remaining = remaining;
    this.name = name;
    this.unit = unit;
    this.description = description;
    this.cost_out = cost_out;
    this.ingredients = ingredients;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Medicine;
