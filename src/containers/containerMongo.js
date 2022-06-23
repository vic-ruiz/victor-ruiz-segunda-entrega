import mongoose from "mongoose";
import config from "../config.js";

mongoose.connect(config.mongoDB.URL, config.mongoDB.options);

class MongoClass {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  }

  async getAll() {
    try {
      const allObjects = await this.collection.find({});
      return allObjects;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async getOne(id) {
    try {
      const one = await this.collection.findById(id);
      return one;
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(obj) {
    try {
      const newObj = await this.collection.create(obj);
      return newObj;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id, obj) {
    try {
      const updatedObj = await this.collection.findByIdAndUpdate(id, obj);
      return updatedObj;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const deletedObj = await this.collection.findByIdAndDelete(id);
      return deletedObj;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default MongoClass;
