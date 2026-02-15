import foodModel from '../models/foodModel.js'
import fs from 'fs'

const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({success: false, message: "Image is required"})
        }

        const {name, description, price, category} = req.body;
        
        if (!name || !description || !price || !category) {
            fs.unlink(`uploads/${req.file.filename}`, () => {})
            return res.json({success: false, message: "All fields are required"})
        }

        const priceNum = Number(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            fs.unlink(`uploads/${req.file.filename}`, () => {})
            return res.json({success: false, message: "Price must be a positive number"})
        }

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
        
        if (req.file) {
            fs.unlink(`uploads/${req.file.filename}`, () => {})
        }
        
        res.json({success: false, message: "Error adding food item"})
    }
}

const updateFood = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.json({success: false, message: "Food ID is required"})
        }

        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({success: false, message: "Food item not found"})
        }

        const {name, description, price, category} = req.body;
        
        if (!name || !description || !price || !category) {
            return res.json({success: false, message: "All fields are required"})
        }

        const priceNum = Number(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            return res.json({success: false, message: "Price must be a positive number"})
        }

        const validCategories = ["Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"];
        if (!validCategories.includes(category)) {
            return res.json({success: false, message: "Invalid category"})
        }

        if (req.file) {
            const imagePath = `uploads/${food.image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error("Error deleting old image:", err);
                })
            }
            food.image = req.file.filename;
        }

        food.name = name.trim();
        food.description = description.trim();
        food.price = priceNum;
        food.category = category.trim();

        await food.save();
        res.json({success: true, message: "Food Updated Successfully"})
        
    } catch (error) {
        console.error("Error updating food:", error);
        
        if (req.file) {
            fs.unlink(`uploads/${req.file.filename}`, () => {})
        }
        
        res.json({success: false, message: "Error updating food item"})
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    } catch (error) {
        console.error("Error listing food:", error);
        res.json({success: false, message: "Error fetching food list"})
    }
}

const removeFood = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.json({success: false, message: "Food ID is required"})
        }

        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({success: false, message: "Food item not found"})
        }

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

const getFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        
        if (!food) {
            return res.json({success: false, message: "Food item not found"})
        }
        
        res.json({success: true, food: food})
    } catch (error) {
        console.error("Error getting food:", error);
        res.json({success: false, message: "Error fetching food item"})
    }
}

export {addFood, listFood, removeFood, updateFood, getFood}