import express from 'express'
import mongoose from 'mongoose'

const app = express();
import Product from './models/product.model.js';
import productRoute from './routes/product.route.js';

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/api/products", productRoute);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send("Hola from Node API");
});

app.post('/api/products', (req, res) => {
    console.log(req.body);
    res.send(req.body);
    res.send("Data Recieved Succesfully");

});





//mongoose.connect("mongodb://127.0.0.1:27017/test")
mongoose.connect(
    "mongodb://bassam1901:nS6M878ulVH0G2fE@ac-sfbwljw-shard-00-00.dvpvxov.mongodb.net:27017,ac-sfbwljw-shard-00-01.dvpvxov.mongodb.net:27017,ac-sfbwljw-shard-00-02.dvpvxov.mongodb.net:27017/?ssl=true&replicaSet=atlas-xlbcxu-shard-0&authSource=admin&appName=Cluster")
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("Connection failed!", err);
    });