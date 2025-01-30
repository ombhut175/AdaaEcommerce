const Cart = require("../models/Cart");
const {giveUserIdFromCookies} = require("../services/auth");
const {ObjectId} = require("mongoose").Types;


// gives whole cart of that user
async function handleGetCart(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.userId);
        const cartItems = await Cart.find({ userId: new ObjectId(userId) }).populate('productId');
        if (!cartItems.length) return res.status(404).json({ message: "Cart is empty" });

        const totalAmount = cartItems.reduce((total, item) => {
            const product = item.productId;
            const price = product.price || 0;
            const quantity = item.quantity || 1;
            const discount = product.discountPercent || 0;
            return total + (quantity * (price - (price * discount / 100)));
        }, 0);

        return res.status(200).json({
            products: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            totalAmount,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//delete a product from cart
async function handleDeleteProductFromCart(req, res) {
    try {
        const { productId } = req.params;
        const userId = giveUserIdFromCookies(req.cookies.token);

        const deletedCartItem = await Cart.findOneAndDelete({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });

        if (!deletedCartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        return res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//update product quantity from cart
async function handleUpdateProductQuantity(req, res) {
    try {
        const { productId, quantity } = req.params;
        const userId = giveUserIdFromCookies(req.cookies.token);

        const updatedCartItem = await Cart.findOneAndUpdate(
            { userId: new ObjectId(userId), productId: new ObjectId(productId) },
            {
                $set: {
                    quantity: quantity,
                    updatedAt: Date.now(),
                }
            },
            { new: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        return res.status(200).json({ message: "Product quantity updated", cart: updatedCartItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//adds any product to cart
async function handleAddProductToCart(req, res) {
    try {
        const { productId } = req.params;
        const userId = giveUserIdFromCookies(req.cookies.authToken);

        const existingCartItem = await Cart.findOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });

        if (existingCartItem) {
            existingCartItem.quantity += 1;
            existingCartItem.updatedAt = Date.now();
            await existingCartItem.save();
            return res.status(200).json({ message: "Product quantity updated", cart: existingCartItem });
        } else {
            const newCartItem = await Cart.create({
                userId: new ObjectId(userId),
                productId: new ObjectId(productId),
                quantity: 1,
            });
            return res.status(200).json({ message: "Product added to cart", cart: newCartItem });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

//get total amount from cart
async function getTotalAmountFromCart(userId) {
    try {
        const cartItems = await Cart.find({ userId: new ObjectId(userId) }).populate('productId');

        let totalAmount = 0;
        cartItems.forEach(item => {
            const product = item.productId;
            const price = product.price || 0;
            const quantity = item.quantity || 1;
            const discount = product.discountPercent || 0;

            const itemTotal = quantity * (price - (price * discount / 100));
            totalAmount += itemTotal;
        });

        return totalAmount;
    } catch (err) {
        console.error(err);
        return 0;
    }
}


module.exports = {
    handleGetCart,
    handleDeleteProductFromCart,
    handleUpdateProductQuantity,
    handleAddProductToCart,
    getTotalAmountFromCart
}