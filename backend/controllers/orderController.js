import orderModel from "../models/orderModel.js";
import userModels from "../models/userModels.js";

// place user order
const placeOrder = async (req,res) => {
    try {
        const { userId, items, address } = req.body

        // compute subtotal and delivery fee (20%)
        const subtotal = items.reduce((s, it) => s + (it.price * it.quantity), 0)
        const deliveryFee = Math.round(subtotal * 0.2)
        const totalAmount = subtotal + deliveryFee

        // create order in DB
        const newOrder = new orderModel({
            userId,
            items,
            amount: totalAmount,
            address,
            status: 'Order Received'
        })
        await newOrder.save()

        // clear user's cart
        await userModels.findByIdAndUpdate(userId, { cartData: {} })

        return res.json({ success: true, message: 'Order placed successfully', orderId: newOrder._id, total: totalAmount })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

export { placeOrder }