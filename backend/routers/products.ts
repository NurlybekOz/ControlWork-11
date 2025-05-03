import express from 'express';
import {ProductWithoutId} from "../types";
import {imagesUpload} from "../middleware/multer";
import {Error} from "mongoose";
import Product from "../modules/Product";
import User from "../modules/User";

const productRouter = express.Router();


productRouter.get('/', async (req, res, next) => {
    try {
        const category_id = req.query.category as string;
        let products = await Product.find(category_id ? { category: category_id } : {}).populate("category", "title");
        res.send(products);
    } catch (e) {
        next(e);
    }
});

productRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id).populate("user", "username phone").populate("category", "title");

        if (!product) {
            res.status(404).send({message: 'Product not found'});
            return;
        }

        res.send(product);
    } catch (e) {
        next(e);
    }
});

productRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            res.status(401).send({error: 'No token provided'});
            return;
        }

        const user = await User.findOne({token});

        if (!user) {
            res.status(401).send({error: 'Wrong token'});
            return;
        }

        const newProduct: ProductWithoutId = {
            user: user._id,
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? 'images/' + req.file.filename : null,
        };

        const product = new Product(newProduct);
        await product.save();
        res.send(product);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});
productRouter.delete('/:id', async (req, res, next) => {

    try {
        const token = req.get('Authorization');

        if (!token) {
            res.status(401).send({error: 'No token provided'});
            return;
        }

        const user = await User.findOne({token});

        if (!user) {
            res.status(401).send({error: 'Wrong token'});
            return;
        }

        const productId = req.params.id;
        const product = await Product.findOne({_id: productId, user: user.id})

        if (!product) {
            res.status(403).send({error: 'You are not allowed to delete this product'})
            return
        }

        await Product.deleteOne(product._id);
        res.send('product deleted successfully')
    } catch (e) {
        next(e)
    }

})

export default productRouter;