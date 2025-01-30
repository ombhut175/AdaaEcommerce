const Cart = require("../models/Cart");
const {giveUserIdFromCookies} = require("../services/auth");
const {ObjectId} = require("mongoose").Types;


// gives whole cart of that user
async function handleGetCart(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.userId);
        const cart = await Cart.findOne({userId: new ObjectId(userId)});
        if (!cart) return res.status(404).json({message: "Cart not found"});

        const totalAmount = await getTotalAmountFromCart(userId);

        return res.status(200).json({
            products: cart.cartItems,
            totalAmount,
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

//created new cart
async function handleCreateNewCart(userId) {
    try {
        await Cart.create({userId:new ObjectId(userId),});
    } catch (error) {
        console.log(error);
    }
}

//delete a product from cart
async function handleDeleteProductFromCart(req, res) {
    try {
        const {productId} = req.params;
        const userId = giveUserIdFromCookies(req.cookies.token);
        const updatedCart = await Cart.findOneAndUpdate({userId: new ObjectId(userId),}, {
            $pull: {cartItems: {productId}},
            $set: {
                updatedAt: Date.now(),
            },
            new: true,
        });
        if (!updatedCart) return res.status(404).json({message: "Cart not found"});
        return res.status(200).json({message: "Product removed from cart", cart: updatedCart});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

//update product quantity from cart
async function handleUpdateProductQuantity(req, res) {
    try {
        const {productId, quantity} = req.params;
        const userId = giveUserIdFromCookies(req.cookies.token);

        const updatedCart = await Cart.findOneAndUpdate(
            {userId: new ObjectId(userId), "cartItems.productId": productId}, // Match userId and productId
            {
                $set: {
                    "cartItems.$.quantity": quantity, // Update the quantity of the matched product
                    updatedAt: Date.now(), // Update the updatedAt field
                },
            },
            {new: true} // Return the updated document
        );

        if (!updatedCart) {
            return res.status(404).json({message: "Cart or product not found"});
        }

        return res.status(200).json({message: "Product quantity updated", cart: updatedCart});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

//adds any product to cart
async function handleAddProductToCart(req, res) {
    try {
        const { productId } = req.params;
        const userId = giveUserIdFromCookies(req.cookies.token);

        console.log("UserId:", userId); // Debug: Log the userId

        // First, check if the cart already exists for the user
        let updatedCart = await Cart.findOne({ userId: new ObjectId(userId) });
        console.log("Existing Cart:", updatedCart); // Debug: Log existing cart

        if (!updatedCart) {
            // If no cart exists, create a new cart for the user
            console.log("Creating a new cart..."); // Debug: Log cart creation
            updatedCart = await Cart.create({ userId: new ObjectId(userId), cartItems: [] });

            console.log("New Cart Created:", updatedCart); // Debug: Log new cart creation
        }

        // Now, push the new product to the cartItems
        updatedCart = await Cart.findOneAndUpdate(
            { userId: new ObjectId(userId) }, // Match the user's cart
            {
                $push: {
                    cartItems: {
                        productId: new ObjectId(productId),
                        quantity: 1,
                    },
                },
                $set: { updatedAt: Date.now() }, // Update the timestamp
            },
            { new: true } // Return the updated document
        );

        console.log("Updated Cart:", updatedCart); // Debug: Log the updated cart after push

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart update failed" });
        }

        return res.status(200).json({ message: "Product added to cart", cart: updatedCart });
    } catch (error) {
        console.error("Error:", error); // Log error details
        return res.status(500).json({ message: error.message });
    }
}



async function getTotalAmountFromCart(userId) {
    try {
        const cart = await Cart.findOne({userId: new ObjectId(userId)})
            .populate('cartItems.productId');

        let totalAmount = 0;
        cart.cartItems.forEach(item => {
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
    }
}


module.exports = {
    handleGetCart,
    handleCreateNewCart,
    handleDeleteProductFromCart,
    handleUpdateProductQuantity,
    handleAddProductToCart,
    getTotalAmountFromCart
}