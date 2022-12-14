import express from 'express';
import mongoose from 'mongoos';
import cors from 'cors'



const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    currencyCode: String,
    numberOfSale: Number,
    rating: Number,
    isFreeShipping: Boolean,
    shopName: String,
    createdOn: { type: Date, default: Data.now },
});
const productModel = mongoose.model('Product', productSchema);


let app = express();
app.use(express.json());
app.use(cors());


app.post("/products", async (req, res) => {

    let result = await productModel
    .find({})
    .exec()
    .catch(e=> {
        console.log("error in db ", e);
        res.status(500).send({message: "error in getting all products"});
        return
    })

    res.send({ 
        message: "all products success ",
        data: result 
    });
});
    
    app.post("/products", async (req, res) => {
    });

    let body = req.boby;
    if (
        !body.productName
        || !body.productPrice
        || !body.currencyCode
        || !body.numberOfSale
        || !body.rating
        || !body.isFreeShipping
        || !body.shopName
    ) {

        res.status(400).send({
            message: `required field missing, all field are required:
            productName
            productPrice
            currencyCode
            numberOfSale
            rating
            isFreeShipping
            shopName`
        })
        return;
    }

    let result = await productModel.create({

        productName: body.productName,
        productPrice: body.productPrice,
        currencyCode: body.currencyCode,
        numberOfSale: body.numberOfSale,
        rating: body.rating,
        isFreeShipping: body.isFreeShipping,
        shopName: body.shopName,

    }).catch(e => {
        console.log("error in db: ", e);
        res.status(500).send("db error in saving product");
    })

        console.log("result: ", result);
        res.send({ message: "product is added in database" }); 
    });

let PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`app is running on ${PORT}`);
});



///// Boiler Plate /////
let dbURL = 'mongodb+srv://abc:abc@cluster0.xbbtxux.mongodb.net/ecommerceDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURL);

///// mongodb connected disconnected event /////
mongoose.connection.on('connected', function() {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function() {//disconnected
    console.log("Mongoose is disconnected");
});

mongoose.connection.on('error', function(err) {//any error
    console.log('Mongoose connection error: ',err);
    process.exit(1);
});

process.on('SIGINT', function() {////this funtion will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
});

});
///// mongodb connected disconnected event /////
