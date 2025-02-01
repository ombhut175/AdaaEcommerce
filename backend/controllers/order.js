const Orders = require('../models/Orders');
const Cart = require('../models/Cart');
const { giveUserIdFromCookies } = require('../services/auth');
const UserBehavior = require('../models/UserBehavior');
const Product = require('../models/Product');

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
            return res.status(401).json({ error: 'Unauthorized: Invalid auth token.' });
        }

        const cart = await Cart.findOne({ userId }).populate('cartItems.productId');
        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty.' });
        }

        const orders = cart.cartItems.map(item => ({
            userId,
            productId: item.productId._id,
            price: item.productId.price,
            discount: item.productId.discount || 0,
            quantity: item.quantity,
            paymentMethod: req.body.paymentMethod || 'COD',
            paymentStatus: req.body.paymentStatus || 'pending',
        }));

        await Orders.insertMany(orders);
        await Cart.findOneAndUpdate({ userId }, { cartItems: [] }, { new: true });

        res.status(201).json({ message: 'Orders placed successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
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
        const userId = req.params.userId;
        const orders = await Orders.find({ userId }).populate('productId addressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
};
