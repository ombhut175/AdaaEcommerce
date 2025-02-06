const Address = require('../models/Address');
const Order = require('../models/Orders');
const User = require('../models/User');

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

const findDeliveryBoy = async (req,res) => {
    try{
        console.log("Enter ");
        // const {userId} = req.params
        // const objId = new mongoose.Types.ObjectId(userId)
        
        // const deliveryBoy = await User.find({ role: { $in: ["delivery"] } });
        // const addressOfCustomer = await Address.find({ _id:objId });
        // console.log(deliveryBoy,addressOfCustomer);
    }
    catch(err){
        console.log(err);
        
    }
}

module.exports = {
    markProductDelivered,
    markProductPickedUpForReturn,
    markProductPickedUpForExchange,
    findDeliveryBoy
};
