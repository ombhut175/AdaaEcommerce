const {instance} = require('../index');

const checkout = async (req,res)=>{
    options = {
        amount: 50000,  
        currency: "INR"
      };
      const order = await instance.orders.create(options);

      res.status(200).json({
        success: true,
        order,
      });
}

module.exports = {
    checkout
}