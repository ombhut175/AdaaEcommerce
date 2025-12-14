const Orders = require('../models/Orders');
const Cart = require('../models/Cart');
const { giveUserIdFromCookies } = require('../services/auth');
const UserBehavior = require('../models/UserBehavior');
const Product = require('../models/Product');
const {updateProductsUsingSocketIo} = require("../services/socket");
const mongoose = require("mongoose");
const {ObjectId} = require("mongoose").Types;

// Create a new order
async function createOrder(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: Invalid auth token.' });
        }

        const { productId, addressId, quantity, paymentMethod, paymentStatus } = req.body;

        // Fetch the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if enough stock is available
        if (product.stock < quantity) {
            return res.status(400).json({ error: 'Not enough stock available' });
        }

        // Decrease stock quantity
        product.stock -= quantity;
        await product.save();

        // Create a new order
        const newOrder = new Orders({
            userId,
            productId,
            addressId,
            quantity,
            paymentMethod,
            paymentStatus,
        });

        updateProductsUsingSocketIo();
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Add all products from cart to an order
async function addAllProductsOfCart(req, res) {
    console.log("from addAllProductsOfCart");
    try {
        const userIdFromCookies = giveUserIdFromCookies(req.cookies.authToken);
        console.log(userIdFromCookies);
        if (!userIdFromCookies) {
            return res.status(401).json({ error: 'Unauthorized: Invalid auth token.' });
        }

        const cartItems = await Cart.find({ userId: new ObjectId(userIdFromCookies) }).populate('productId');
        console.log(cartItems)
        if (!cartItems.length) {
            return res.status(400).json({ error: 'Cart is empty.' });
        }
        const orders = cartItems.map(item => ({
            userId: userIdFromCookies,
            productId:new ObjectId(item.productId._id) ,
            price: item.productId.price,
            discount: item.productId.discount || 0,
            quantity: item.quantity,
            orderType: req.body.orderType || 'normal', // Required as per schema
            paymentMethod: req.body.paymentMethod || 'COD',
            paymentStatus: req.body.paymentStatus || 'pending',
            orderStatus: 'success',
            orderDate: new Date(),
        }));

        const ordersItems = await Orders.insertMany(orders);
        await Cart.deleteMany({ userId: new ObjectId(userIdFromCookies) });
        updateProductsUsingSocketIo();
        res.status(201).json({ message: 'Orders placed successfully.' , ordersItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Orders.find().populate('productId addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get orders by user ID
async function getOrdersByUserId(req, res) {
    try {
        
        const userId = new mongoose.Types.ObjectId(giveUserIdFromCookies(req.cookies.authToken));
        
        const orders = await Orders.find({ userId }).populate('productId addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getById(req, res) {
    const { id } = req.params;

    try {
        console.log("Received order ID:", id);

        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid order ID format" });
        }

        const objId = new mongoose.Types.ObjectId(id);

        // Fetch order (use `findOne` if fetching a single order)
        const data = await Orders.findById(objId);

        if (!data) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}


async function delivered(req, res) {
    const { id } = req.params;

    try {
        console.log("Received order ID:", id);

        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid order ID format" });
        }

        // Find order directly using ID (no need to convert manually)
        const order = await Orders.findById(id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check if already delivered
        if (order.orderStatus === "Delivered") {
            return res.status(200).json({ success: true, message: "Order is already delivered", order });
        }
        console.log(order);
        
        // Update order status
        order.orderStatus = "Delivered";
        await order.save();

        return res.status(200).json({ success: true, message: "Order marked as delivered", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

module.exports = { delivered };

async function cancelled(req, res) {
    const { id } = req.params;

    try {
        console.log("Received order ID:", id);

        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid order ID format" });
        }

        const objId = new mongoose.Types.ObjectId(id);

        // Fetch order (use `findOne` if fetching a single order)
        const data = await Orders.findById(objId);

        if (!data) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        data.orderStatus = "Cancelled"
        await data.save()
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}



// Update an order
async function updateOrder(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        const { orderId, ...updates } = req.body;

        const updatedOrder = await Orders.findOneAndUpdate(
            { userId, _id: orderId },
            { $set: updates },
            { new: true }
        ).populate('productId addressId');

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
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
        const orders = await Orders.find({ orderStatus: status }).populate('productId addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Request a return
async function requestReturn(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        const { orderId, reason } = req.body;

        const updatedOrder = await Orders.findOneAndUpdate(
            { userId, _id: orderId },
            {
                $set: {
                    orderStatus: 'return_requested',
                    returnReason: reason,
                },
            },
            { new: true }
        ).populate('productId addressId');

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Return request submitted.', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Request an exchange
async function requestExchange(req, res) {
    try {
        const userId = giveUserIdFromCookies(req.cookies.authToken);
        const { orderId, reason, exchangeProductId } = req.body;

        const updatedOrder = await Orders.findOneAndUpdate(
            { userId, _id: orderId },
            {
                $set: {
                    orderStatus: 'exchange_requested',
                    exchangeReason: reason,
                    exchangeProductId: exchangeProductId,
                },
            },
            { new: true }
        ).populate('productId addressId');

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Exchange request submitted.', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    addAllProductsOfCart,
    getAllOrders,
    getOrdersByUserId,
    updateOrder,
    getOrdersByStatus,
    requestReturn,
    requestExchange,
    getById,
    delivered,
    cancelled
};
