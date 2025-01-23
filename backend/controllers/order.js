require('dotenv').config();
const Orders = require('../models/Orders');
const Cart = require('../models/Cart');
const {giveUserIdFromCookies} = require("../services/auth");


// Create a new order
async function createOrder(req, res) {
    try {
        // Extract userId from cookies
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid auth token." });
        }

        // Extract order details from request body
        const { productId, addressId, quantity, paymentMethod, paymentStatus } = req.body;

        // Create a new order instance
        const newOrder = new Orders({
            userId,
            items: [
                {
                    productId,
                    addressId,
                    quantity,
                    paymentMethod,
                    paymentStatus,
                },
            ],
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Respond with the saved order
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//add whole cart
async function addAllProductsOfCart(req, res) {
    try {
        // Extract userId from the auth token in cookies
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid auth token." });
        }

        // Find the user's cart and populate product details
        const cart = await Cart.findOne({ userId })
            .populate('cartItems.productId'); // Populate product details for better insights

        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty." });
        }

        // Map cart items to order items
        const orderItems = cart.cartItems.map(item => ({
            productId: item.productId._id,
            price: item.productId.price,
            discount: item.productId.discount || 0,
            quantity: item.quantity,
        }));

        // Create a new order with the cart items
        const newOrder = new Orders({
            userId,
            items: orderItems,
            paymentMethod: req.body.paymentMethod || "COD", // Default to COD if not provided
            paymentStatus: req.body.paymentStatus || "pending", // Default to pending if not provided
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Clear the user's cart after saving the order
        await Cart.findOneAndUpdate(
            { userId },
            { cartItems: [] },
            { new: true } // Return the updated document (cart should be empty now)
        );

        // Respond with the saved order
        res.status(201).json({ message: "Order placed successfully.", order: savedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Orders.find().populate('items.productId items.addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get orders by user ID
async function  getOrdersByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const orders = await Orders.findOne({userId}).populate('items.productId items.addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Update an order
async function updateOrder(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        const { productId, ...updates } = req.body;

        // Create an update object that only includes defined values
        const updateFields = {};

        // Only add fields to update if they are not undefined
        if (updates.quantity !== undefined) {
            updateFields['items.$.quantity'] = updates.quantity;
        }

        if (updates.paymentStatus !== undefined) {
            updateFields['items.$.paymentStatus'] = updates.paymentStatus;
        }

        // Add more fields as needed, checking for undefined
        // if (updates.someOtherField !== undefined) {
        //     updateFields['items.$.someOtherField'] = updates.someOtherField;
        // }

        // Only perform update if there are fields to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No update fields provided' });
        }

        const updatedOrder = await Orders.findOneAndUpdate(
            {
                userId,
                'items.productId': productId
            },
            { $set: updateFields },
            {
                new: true
            }
        ).populate('items.productId items.addressId');

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order or Product not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



// Filter orders by status
async function getOrdersByStatus(req, res) {
    try {
        const status = req.params.status;
        const orders = await Orders.find({"items.orderStatus": status}).populate('items.productId items.addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByStatus,
    updateOrder,
    getOrdersByUserId,
    addAllProductsOfCart
}
