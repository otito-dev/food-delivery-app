import orderModel from "../models/orderModel.js";
import userModels from "../models/userModels.js";

const placeOrder = async (req,res) => {

    const frontend_url = "https://localhost:5174";

    try {
        const { userId, items, address } = req.body

        const subtotal = items.reduce((s, it) => s + (it.price * it.quantity), 0)
        const deliveryFee = Math.round(subtotal * 0.2)
        const totalAmount = subtotal + deliveryFee

        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            status: 'Order Received'
        })
        await newOrder.save();

        await userModels.findByIdAndUpdate(req.body.userId,{cartData: {} });

        return res.json({ success: true, message: 'Order placed successfully', orderId: newOrder._id, total: totalAmount })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

const verifyOrder = async (req, res) => {
    const {orderId,success}= req.body;
    try {
        await orderModel.findByIdAndUpdate(orderId,{payment:false});
        res.json({success:true,message:"Order placed. Awaiting payment verification."})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while processing the order. Please try again later."})
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while fetching orders. Please try again later."})
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while fetching orders. Please try again later."})
    }
}

const updateOrderStatus = async (req, res) => {
    const {orderId, status} = req.body;
    try {
        await orderModel.findByIdAndUpdate(orderId, {status:status});
        res.json({success:true,message:"Order status updated successfully."})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while updating order status."})
    }
}

const confirmPayment = async (req, res) => {
    const {orderId} = req.body;
    try {
        await orderModel.findByIdAndUpdate(orderId, {payment:true, status:"Confirmed"});
        res.json({success:true,message:"Payment confirmed successfully."})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"An error occurred while confirming payment."})
    }
}

export { placeOrder,verifyOrder, userOrders, listOrders, updateOrderStatus, confirmPayment };