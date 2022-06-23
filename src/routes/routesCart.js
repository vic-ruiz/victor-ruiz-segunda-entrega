import { Router } from "express";
import { cartDao as api } from "../daos/index.js";
const routesCart = Router();

routesCart.get("/", async (req, res) => {
  try {
    const carts = await api.getAll();
    carts
      ? res.status(200).json(carts)
      : res.status(404).json({ message: "No carts available" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

routesCart.get("/:id", async (req, res) => {
  try {
    const cart = await api.getOne(req.params.id);
    cart
      ? res.status(200).json(cart)
      : res
          .status(404)
          .json({ message: "cart not found. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

routesCart.post("/", async (req, res) => {
  try {
    const newcart = await api.create(req.body);
    res.status(201).json({
      message: "cart created",
      cart: newcart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

routesCart.delete("/:id", async (req, res) => {
    try {
      const deletedCart = await api.delete(req.params.id);
      res.json({
        message: "Cart deleted",
        id: deletedCart._id,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

routesCart.get("/:id/productos", async (req, res) => {
  try {
    const cart = await api.getOne(req.params.id);
    cart
      ? res.status(200).json(cart.products)
      : res
          .status(404)
          .json({ message: "cart not found. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

routesCart.post("/:id/productos", async (req, res) => {
  try {
    const cart = await api.getOne(req.params.id);
    const products = req.body; 
    if (cart && products) {
      const cartUpdated = await api.addProductos(cart, products);
      const newcart = await api.getOne(cartUpdated._id);
      res.status(201).json({
        message: "Products added",
        cart: newcart,
      });
    }
    if (!cart) {
      res
        .status(404)
        .json({ message: "cart not found. id: " + req.params.id });
    }
    if (!products) {
      res.status(404).json({ message: "List is empty" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

routesCart.delete("/:id/productos/:productoId", async (req, res) => {
  try {
    const cart = await api.getOne(req.params.id);
    const productoId = req.params.productoId;
    if (cart && productoId) {
      const cartUpdated = await api.deleteProduct(cart, productoId);
      const newcart = await api.getOne(cartUpdated._id);
      res.status(200).json({
        message: "Product deleted from Cart",
        cart: newcart,
      });
    }
    if (!cart) {
      res
        .status(404)
        .json({ message: "cart not found. id: " + req.params.id });
    }
    if (!productoId) {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default routesCart;
