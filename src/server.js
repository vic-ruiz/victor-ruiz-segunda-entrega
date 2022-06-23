import express from 'express'
import routesProducts from './routes/routesProducts.js'

const app = express();
const PORT = 8080;
app.use(express.json());

app.use('/api/productos', routesProducts);



const server = app.listen(PORT, () => {
  console.log(` 🚀 Server started at http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(err));