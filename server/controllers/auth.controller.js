const { Roles } = require('../common/const');
const authService = require('../services/user.service');

// Login buyer controller
const loginBuyer = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const result = await authService.login(identifier, password, Roles.BUYER);
        res.status(200).json(result);
    } catch (err) {
        console.error(`Login failed for buyer: ${err.message}`);
        res.status(400).json({ message: err.message });
    }
};

// Login seller controller
const loginSeller = async (req, res) => { 
    try {
        const { identifier, password } = req.body;
        const result = await authService.login(identifier, password, Roles.SELLER);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

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

const testAuth = (req, res) => {
    res.status(200).json({ message: 'Authentication successful', user: req.user });
};

module.exports = { loginBuyer, loginSeller, registerBuyer, registerSeller, testAuth }