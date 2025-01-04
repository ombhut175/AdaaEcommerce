const Cart = require("../model/Cart");
const {giveUserIdFromCookies} = require("../services/auth");
const {ObjectId} = require("mongoose").Types;


// gives whole cart of that user
async function handleGetCart(req, res) {
    try {
        console.log("from handleGetCart");
        const userId = giveUserIdFromCookies(req.cookies.userId);
        console.log(userId);
        const cart = await Cart.find({userId :new ObjectId(userId)});
        console.log(cart);
        if (!cart) return res.status(404).json({message: "Cart not found"});
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

//created new cart
async function handleCreateNewCart(userId) {
    try {
        await Cart.create({userId,});
    } catch (error) {
        console.log(error);
    }
}

//delete a product from cart
async function handleDeleteProductFromCart(req, res) {
    try {
        const {productId} = req.params;
        const userId = giveUserIdFromCookies(req.cookies.token);
        const updatedCart = await Cart.findOneAndUpdate({userId,}, {
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
            {userId, "cartItems.productId": productId}, // Match userId and productId
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


module.exports = {
    handleGetCart,
    handleCreateNewCart,
    handleDeleteProductFromCart,
    handleUpdateProductQuantity,
}