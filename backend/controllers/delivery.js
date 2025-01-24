// deliveryBoyController.js
const Order = require('../models/Orders');
const Product = require('../models/Products');
const User = require('../models/User');

// Mark product as delivered
markProductDelivered = async (req, res) => {
    const { orderId, productId } = req.params;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        const product = order.items.find(item => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in order' });
        }

        product.orderStatus = 'delivered';
        product.deliveryDate = new Date();
        await order.save();

        res.status(200).json({ message: 'Product marked as delivered', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Mark product as picked up for return
markProductPickedUpForReturn = async (req, res) => {
    const { orderId, productId } = req.params;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const product = order.items.find(item => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in order' });
        }

        product.orderStatus = 'picked_up_for_return';
        await order.save();

        res.status(200).json({ message: 'Product marked as picked up for return', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Mark product as picked up for exchange
markProductPickedUpForExchange = async (req, res) => {
    const { orderId, productId } = req.params;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const product = order.items.find(item => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in order' });
        }

        product.orderStatus = 'picked_up_for_exchange';
        await order.save();

        res.status(200).json({ message: 'Product marked as picked up for exchange', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};


module.exports = {
    markProductDelivered,
    markProductPickedUpForReturn,
    markProductPickedUpForExchange,
}