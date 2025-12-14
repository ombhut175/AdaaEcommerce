const Address = require('../models/Address');
const Orders = require('../models/Orders');
const Order = require('../models/Orders');
const User = require('../models/User');
const geolib = require('geolib');
const mongoose  = require('mongoose')
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

findDeliveryBoy = async (req, res) => {
    try {
      console.log("Enter findDeliveryBoy function");
  
      const { userId } = req.params;
      const { orders } = req.body; // Expecting an array of order IDs
      const objId = new mongoose.Types.ObjectId(userId);
  
      console.log('userId:', userId);
      console.log('orders:', orders);
  
      // Validate that orders is provided and is an array
      if (!orders || !Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ message: 'No orders provided or orders is not an array' });
      }
  
      // Fetch the customer's address
      const customerAddress = await Address.findOne({ userId: objId });
      if (!customerAddress) {
        console.log('Customer address not found for userId:', userId);
        return res.status(404).json({ message: 'Customer address not found' });
      }
      console.log('Customer Address:', customerAddress);
  
      const customerPincode = customerAddress.pincode; // Ensure 'pincode' is the correct field
  
      // Fetch all delivery boys
      const deliveryBoys = await User.find({ role: { $in: ["delivery"] } });
      console.log('Total delivery boys:', deliveryBoys.length);
  
      // Fetch addresses for delivery boys with matching pincode
      const deliveryBoyAddresses = await Promise.all(
        deliveryBoys.map(async (boy) => {
          const address = await Address.findOne({
            userId: boy._id,
            pincode: customerPincode,
          });
          return {
            boy,
            address,
          };
        })
      );
  
      // Filter out delivery boys without addresses or pincode mismatch
      const availableDeliveryBoys = deliveryBoyAddresses.filter((item) => item.address);
      console.log('Available delivery boys in pincode', customerPincode, ':', availableDeliveryBoys.length);
  
      if (availableDeliveryBoys.length === 0) {
        console.log("No delivery boys available in the customer's pincode area");
        return res.status(404).json({
          message: "No delivery boys available in the customer's pincode area",
        });
      }
  
      // Assign a delivery boy (e.g., first available)
      const assignedDeliveryBoy = availableDeliveryBoys[0].boy;
      console.log('Assigned Delivery Boy:', assignedDeliveryBoy);
  
      // Process each order
      const updatedOrders = [];
  
      for (const orderId of orders) {
        console.log('Processing orderId:', orderId);
  
        const order = await Order.findById(orderId);
        if (!order) {
          console.log('Order not found with orderId:', orderId);
          // You might choose to skip this order or return an error
          continue; // Skipping this order
        }
  
        // Assign the delivery boy to the order
        order.deliveryBoyId = assignedDeliveryBoy._id;
        order.orderStatus = 'assigned_to_delivery_boy';
        await order.save();
  
        console.log('Assigned delivery boy to order:', orderId);
  
        updatedOrders.push(order);
      }
  
      // Return the assigned delivery boy and updated orders
      return res.json({
        message: 'Delivery boy assigned to the orders',
        deliveryBoy: assignedDeliveryBoy,
        orders: updatedOrders,
      });
    } catch (error) {
      console.error('Error in findDeliveryBoy:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  };
  
giveOrders = async (req,res)=>{
    const {userId} = req.params;
    const objId = new mongoose.Types.ObjectId(userId)
    try {
        
        const orders = await Orders.find({deliveryBoyId:objId})
        return res.json({orders})
        
    } catch (err) {
        console.log(err);
        
    }
}  
  

module.exports = {
    markProductDelivered,
    markProductPickedUpForReturn,
    markProductPickedUpForExchange,
    findDeliveryBoy,
    giveOrders
};
