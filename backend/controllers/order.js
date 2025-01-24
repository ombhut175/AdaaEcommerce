// Import necessary modules
require('dotenv').config();
const Orders = require('../models/Orders');
const Cart = require('../models/Cart');
const { giveUserIdFromCookies } = require("../services/auth");
const UserBehavior = require("../models/UserBehavior")

// Create a new order
async function createOrder(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid auth token." });
        }

        const { productId, addressId, quantity, paymentMethod, paymentStatus } = req.body;

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

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Add all products from cart to an order
async function addAllProductsOfCart(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid auth token." });
        }

        const cart = await Cart.findOne({ userId }).populate('cartItems.productId');
        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty." });
        }

        const orderItems = cart.cartItems.map(item => ({
            productId: item.productId._id,
            price: item.productId.price,
            discount: item.productId.discount || 0,
            quantity: item.quantity,
        }));

        const newOrder = new Orders({
            userId,
            items: orderItems,
            paymentMethod: req.body.paymentMethod || "COD",
            paymentStatus: req.body.paymentStatus || "pending",
        });

        const savedOrder = await newOrder.save();
        await Cart.findOneAndUpdate(
            { userId },
            { cartItems: [] },
            { new: true }
        );

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
        res.status(500).json({ error: error.message });
    }
}

// Get orders by user ID
async function getOrdersByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const orders = await Orders.findOne({ userId }).populate('items.productId items.addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an order
async function updateOrder(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        const { productId, ...updates } = req.body;

        const updateFields = {};
        if (updates.quantity !== undefined) {
            updateFields['items.$.quantity'] = updates.quantity;
        }
        if (updates.paymentStatus !== undefined) {
            updateFields['items.$.paymentStatus'] = updates.paymentStatus;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No update fields provided' });
        }

        const updatedOrder = await Orders.findOneAndUpdate(
            {
                userId,
                'items.productId': productId
            },
            { $set: updateFields },
            { new: true }
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
        const orders = await Orders.find({ "items.orderStatus": status }).populate('items.productId items.addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Request an return 

async function requestReturn(req, res) {
    try {
        const userId = '6782acdb04fd7d79e0000c3d';
        const { productId, reason } = req.body;

        const updatedOrder = await Orders.findOneAndUpdate(
            {
                userId,
                'items.productId': productId,
            },
            {
                $set: {
                    'items.$.orderStatus': 'return_requested',
                    'items.$.returnReason': reason,
                },
            },
            { new: true }
        ).populate('items.productId items.addressId');

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order or Product not found' });
        }

        // Find the specific order item
        console.log(updatedOrder.items[0]);

        const orderItem = updatedOrder.items.find(
            (item) => item.productId._id.toString() == productId
        );
        console.log(orderItem);

        if (!orderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        const isCOD = orderItem.paymentMethod === 'COD';

        // Find or create user behavior
        let userBehavior = await UserBehavior.findOne({ userId });
        if (!userBehavior) {
            userBehavior = new UserBehavior({ userId });
        }

        // Update user behavior based on payment method
        if (isCOD) {
            userBehavior.cod_returns_count += 1;
        } else {
            userBehavior.successful_prepaid_count += 1;
        }

        // Restrict COD if returns exceed successful prepaid orders
        if (userBehavior.cod_returns_count > userBehavior.successful_prepaid_count) {
            userBehavior.cod_restricted = true;
            userBehavior.restriction_reason =
                'COD returns exceed successful prepaid orders.';
        }

        userBehavior.last_updated = new Date();
        await userBehavior.save();

        res.status(200).json({
            message: 'Return request submitted.',
            order: updatedOrder,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Request an exchange
async function requestExchange(req, res) {
    try {
        const userId = '6782acdb04fd7d79e0000c3d';
        const { productId, reason} = req.body;
        exchangeProductId= productId
        const updatedOrder = await Orders.findOneAndUpdate(
            {
                userId,
                'items.productId': productId
            },
            {
                $set: {
                    'items.$.orderStatus': 'exchange_requested',
                    'items.$.exchangeReason': reason,
                    'items.$.exchangeProductId': exchangeProductId
                }
            },
            { new: true }
        ).populate('items.productId items.addressId');

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order or Product not found' });
        }

        const orderItem = updatedOrder.items.find(item => item.productId._id.toString() === productId);
        const isCOD = orderItem.paymentMethod === 'COD';

        const userBehavior = await UserBehavior.findOne({ userId });
        if (isCOD) {
            userBehavior.cod_returns_count += 1;
        } else {
            userBehavior.successful_prepaid_count += 1;
        }

        if (userBehavior.cod_returns_count > userBehavior.successful_prepaid_count) {
            userBehavior.cod_restricted = true;
            userBehavior.restriction_reason = 'COD returns exceed successful prepaid orders.';
        }

        userBehavior.last_updated = new Date();
        await userBehavior.save();

        res.status(200).json({ message: 'Exchange request submitted.', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByStatus,
    updateOrder,
    getOrdersByUserId,
    addAllProductsOfCart,
    requestReturn,
    requestExchange
};

