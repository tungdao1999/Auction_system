const userRepository = require('../repositories/auth.repository');
const AuthToken = require('../domain/AuthToken');
const bcrypt = require('bcrypt');

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  return AuthToken.generateToken(user);
};

const registerBuyer = async ({ email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, hashedPassword);
};

const registerSeller = async ({ email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, hashedPassword);
};

module.exports = {login, registerBuyer, registerSeller}