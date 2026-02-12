import foodModel from '../models/foodModel.js'
import fs from 'fs'
import path from 'path'

// ✅ FIXED: Add food item with proper validation
const addFood = async (req, res) => {
    try {
        // ✅ Validate file upload
        if (!req.file) {
            return res.json({success: false, message: "Image is required"})
        }

        // ✅ Validate required fields
        const {name, description, price, category} = req.body;
        
        if (!name || !description || !price || !category) {
            // Clean up uploaded file
            fs.unlink(`uploads/${req.file.filename}`, () => {})
            return res.json({success: false, message: "All fields are required"})
        }

        // ✅ Validate price is positive number
        const priceNum = Number(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            fs.unlink(`uploads/${req.file.filename}`, () => {})
            return res.json({success: false, message: "Price must be a positive number"})
        }

        // ✅ Validate category
        const validCategories = ["Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"];
        if (!validCategories.includes(category)) {
            fs.unlink(`uploads/${req.file.filename}`, () => {})
            return res.json({success: false, message: "Invalid category"})
        }

        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: name.trim(),
            description: description.trim(),
            price: priceNum,
            category: category.trim(),
            image: image_filename
        })

        await food.save();
        res.json({success: true, message: "Food Added Successfully"})
        
    } catch (error) {
        console.error("Error adding food:", error);
        
        // ✅ Clean up uploaded file if save fails
        if (req.file) {
            fs.unlink(`uploads/${req.file.filename}`, () => {})
        }
        
        res.json({success: false, message: "Error adding food item"})
    }
}

// ✅ FIXED: All food list with error handling
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}).sort({createdAt: -1}); // ✅ Sort by newest
        res.json({success: true, data: foods})
    } catch (error) {
        console.error("Error listing food:", error);
        res.json({success: false, message: "Error fetching food list"})
    }
}

// ✅ FIXED: Remove food item with validation
const removeFood = async (req, res) => {
    try {
        // ✅ Validate ID
        if (!req.body.id) {
            return res.json({success: false, message: "Food ID is required"})
        }

        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({success: false, message: "Food item not found"})
        }

        // ✅ Delete image file
        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting image:", err);
            })
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed Successfully"})
        
    } catch (error) {
        console.error("Error removing food:", error);
        res.json({success: false, message: "Error removing food item"})
    }
}

export {addFood, listFood, removeFood}