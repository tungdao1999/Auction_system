const userRepository = require('../repositories/auth.repository');
const AuthToken = require('../common/auth-token');
const bcrypt = require('bcrypt');

const login = async ( identifier, password, role ) => {
  const user = await userRepository.findUser(identifier, role);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  return AuthToken.generateAuthToken(user);
};

const registerBuyer = async ({ email, phone, password, firstName, lastName }) => {
  if (!email && !phone) {
    throw new Error('Email or phone number is required');
  }
  if (email) {
    const existingUserByEmail = await userRepository.findByEmail(email);
    if (existingUserByEmail) throw new Error('User with this email already exists');
  }
  if (phone) {
    const existingUserByPhone = await userRepository.findByPhone(phone);
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
    const existingUserByEmail = await userRepository.findByEmail(email);
    if (existingUserByEmail) throw new Error('User with this email already exists');
  }
  if (phone) {
    const existingUserByPhone = await userRepository.findByPhone(phone);
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