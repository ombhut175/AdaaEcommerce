const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { giveUserIdFromCookies } = require("../services/auth");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Get the whole cart of the user
async function handleGetCart(req, res) {
    console.log("from handleGetCart");
    try {
        const authToken = req.cookies.authToken;
        if (!authToken) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const userId = giveUserIdFromCookies(authToken);

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Convert userId to ObjectId in the query
        const cartItems = await Cart.find({ userId: new ObjectId(userId) })
            .populate({
                path: 'productId',
                model: 'Product',
                select: 'name price discountPercent colors images stock',
            })
            .lean();

        console.log(cartItems);

        const validItems = cartItems.filter(item => item.productId).map(item => {
            const product = item.productId;
            return {
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    discountPercent: product.discountPercent || 0,
                    availableColors: product.colors,
                    images: product.images,
                    stock: product.stock
                },
                quantity: item.quantity,
                selectedColor: item.selectedColor,
                itemAddedAt: item.createdAt
            };
        });

        if (validItems.length === 0) {
            return res.status(404).json({ message: "No valid products in cart" });
        }

        const totalAmount = validItems.reduce((total, item) => {
            const price = item.product.price;
            const discount = item.product.discountPercent;
            const quantity = item.quantity;
            return total + (quantity * (price - (price * discount / 100)));
        }, 0);

        res.status(200).json({
            count: validItems.length,
            items: validItems,
            totalAmount: parseFloat(totalAmount.toFixed(2)),
            currency: "INR"
        });

    } catch (error) {
        console.error("Cart Error:", error);
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: "Invalid data format" });
        }
        res.status(500).json({
            message: error.message || "Failed to retrieve cart items",
            errorCode: "CART_FETCH_ERROR"
        });
    }
}

// Add a product to cart with selected color
async function handleAddProductToCart(req, res) {
    try {
        const { productId } = req.params;
        const { selectedColor } = req.body;
        const userId = giveUserIdFromCookies(req.cookies.authToken);

        // Validate userId and productId are valid ObjectIds
        if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const existingCartItem = await Cart.findOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });

        if (existingCartItem) {
            existingCartItem.quantity += 1;
            existingCartItem.selectedColor = selectedColor;
            existingCartItem.updatedAt = Date.now();
            await existingCartItem.save();
            return res.status(200).json({ message: "Product quantity updated", cart: existingCartItem });
        } else {
            const newCartItem = await Cart.create({
                userId: new ObjectId(userId),
                productId: new ObjectId(productId),
                quantity: 1,
                selectedColor: selectedColor,
            });
            return res.status(200).json({ message: "Product added to cart", cart: newCartItem });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

// Delete a product from the cart
async function handleDeleteProductFromCart(req, res) {
    try {
        const { productId } = req.params;
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        const deletedCartItem = await Cart.findOneAndDelete({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
        });
        if (!deletedCartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        return res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

// Update product quantity and selected color in cart
async function handleUpdateProductQuantity(req, res) {
    try {
        const { productId } = req.params;
        const { quantity, selectedColor } = req.body;
        const userId = giveUserIdFromCookies(req.cookies.authToken);

        const updatedCartItem = await Cart.findOneAndUpdate(
            { userId: new ObjectId(userId), productId: new ObjectId(productId) },
            {
                $set: {
                    quantity: quantity,
                    selectedColor: selectedColor,
                    updatedAt: Date.now(),
                }
            },
            { new: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        return res.status(200).json({ message: "Product details updated", cart: updatedCartItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



// Get total amount from cart
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
};
