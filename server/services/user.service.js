const userRepository = require('../repositories/user.repository');
const AuthToken = require('../common/auth-token');
const bcrypt = require('bcrypt');
const { Roles } = require('../common/const');

const login = async ( identifier, password, role ) => {
  const user = await userRepository.findUser(identifier);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');
  const result = {}
  if (role == Roles.BUYER) {
    const buyer = await userRepository.findBuyerByUserId(user.id);
     result.userId = buyer.id;
     result.token = AuthToken.generateAuthToken({
      id: buyer.id,
      role: Roles.BUYER,
      email: user.email,
      phone: user.phone,
     });
  }
  if (role == Roles.SELLER) { 
    const seller = await userRepository.findSellerByUserId(user.id);
    result.userId = seller.id;
     result.token = AuthToken.generateAuthToken({
      id: seller.id,
      role: Roles.SELLER,
      email: user.email,
      phone: user.phone,
     });
  }
  console.log("user", user);
  return result;
};

const registerBuyer = async ({ email, phone, password, firstName, lastName }) => {
  if (!email && !phone) {
    throw new Error('Email or phone number is required');
  }
  if (email) {
    const existingUserByEmail = await userRepository.findBuyerByEmail(email);
    if (existingUserByEmail) throw new Error('User with this email already exists');
  }
  if (phone) {
    const existingUserByPhone = await userRepository.findBuyerByPhone(phone);
    if (existingUserByPhone) throw new Error('User with this phone number already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser({
    email,
    phone,
    firstName,
    lastName,
    password: hashedPassword,
    role: 'buyer',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

const registerSeller = async ({ email, phone, password, firstName, lastName }) => {
  if (!email && !phone) {
    throw new Error('Email or phone number is required');
  }
  if (email) {
    const existingUserByEmail = await userRepository.findSellerByEmail(email);
    if (existingUserByEmail) throw new Error('User with this email already exists');
  }
  if (phone) {
    const existingUserByPhone = await userRepository.findSellerByPhone(phone);
    if (existingUserByPhone) throw new Error('User with this phone number already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser({
    email,
    phone,
    firstName,
    lastName,
    password: hashedPassword,
    role: 'seller',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

module.exports = {login, registerBuyer, registerSeller}