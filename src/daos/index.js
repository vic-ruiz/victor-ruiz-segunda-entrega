import dotenv from "dotenv";
dotenv.config();

let productsDao;
let cartDao;

switch (process.env.DB_NAME) {
  case "mongoDB":
    import("./products/productsMongo.js").then(({ MongoProducts }) => {
      productsDao = new MongoProducts();
    });
    import("./cart/cartMongo.js").then(({ MongoCart }) => {
      cartDao = new MongoCart();
    });
    break;

  default:
    console.log("Esta en default");
    break;
}

export { productsDao, cartDao };
