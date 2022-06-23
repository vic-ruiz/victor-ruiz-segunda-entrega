import MongoClass from "../../containers/containerMongo.js";

export class MongoProducts extends MongoClass {
  constructor() {
    super("products", {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      code: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      stock: { type: Number, default: 0 },
    });
  }
}
