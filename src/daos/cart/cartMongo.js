import MongoClass from "../../containers/containerMongo.js";
import mongoose from "mongoose";

export class MongoCart extends MongoClass {
  constructor() {
    super("carts", {
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          cantidad: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
    });
  }
}
