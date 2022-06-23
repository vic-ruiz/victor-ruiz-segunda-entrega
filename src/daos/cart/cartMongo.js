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
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
    });
  }

  async addProductos(cart, products) {
    products.forEach((product) => {
      const productInCart = cart.products.find((p) => p._id == product._id);
      if (productInCart) {
        productInCart.quantity++;
      } else {
        cart.products.push(product);
      }
    });
    const cartUpdated = await this.collection.findByIdAndUpdate(cart._id, {
      products: cart.products,
    });
    return cartUpdated;
  }

  async deleteProduct(cart, productId) {
    const productInCart = cart.products.find((p) => p._id == productId);
    if (productInCart) {
      productInCart.quantity > 1
        ? productInCart.quantity--
        : (cart.products = cart.products.filter((p) => p._id != productId));
    } else {
      throw new Error("Product was not found in cart");
    }
    const cartUpdated = await this.collection.findByIdAndUpdate(cart._id, {
      products: cart.products,
    });
    return cartUpdated;
  }
}
