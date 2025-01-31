const Cart = require("../models/Cart");
const { giveUserIdFromCookies } = require("../services/auth");
const { ObjectId } = require("mongoose").Types;

// Get the whole cart of the user
async function handleGetCart(req, res) {
    try {
        console.log(req.cookies.authToken);
        
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        console.log(userId);
        
        
        const cartItems = await Cart.find({ userId: new ObjectId(userId) }).populate('productId');
        console.log(cartItems);
        
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
                quantity: item.quantity,
                selectedColor: item.selectedColor
            })),
            totalAmount,
        });
    } catch (error) {
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

// Add a product to cart with selected color
async function handleAddProductToCart(req, res) {
    try {
        const { productId } = req.params;
        const { selectedColor } = req.body;
        const userId = giveUserIdFromCookies(req.cookies.authToken);

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
