const authService = require('../services/auth.service');

// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Register Buyer controller
const registerBuyer = async (req, res) => {
    try {
        const buyerData = req.body;
        const result = await authService.registerBuyer(buyerData);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Register Seller controller
const registerSeller = async (req, res) => {
    try {
        const sellerData = req.body;
        const result = await authService.registerSeller(sellerData);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { login, registerBuyer, registerSeller }