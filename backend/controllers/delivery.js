const Order = require('../models/Orders');

// Mark product as delivered
markProductDelivered = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = 'delivered';
        order.deliveryDate = new Date();
        await order.save();

        res.status(200).json({ message: 'Order marked as delivered', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Mark product as picked up for return
markProductPickedUpForReturn = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = 'picked_up_for_return';
        await order.save();

        res.status(200).json({ message: 'Order marked as picked up for return', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Mark product as picked up for exchange
markProductPickedUpForExchange = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = 'picked_up_for_exchange';
        await order.save();

        res.status(200).json({ message: 'Order marked as picked up for exchange', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    markProductDelivered,
    markProductPickedUpForReturn,
    markProductPickedUpForExchange,
};
