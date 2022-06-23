import "dotenv/config";

const MONGO_PASS = process.env.MONGO_PASS;

export default {
  mongoDB: {
    URL: `mongodb+srv://vicRuiz:${MONGO_PASS}@cluster0.lcwk4.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
