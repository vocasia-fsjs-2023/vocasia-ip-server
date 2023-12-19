const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const npmlog = require('npmlog');
// const authMiddleware = require('../middlewares/authMiddleware');

const userController = {
    register: async (req, res) => {
        try {
          const { name, email, password } = req.body;
          console.log(req.body.email)
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser) {
            npmlog.info('Register,', `Failed registration attempt for ${email}, email already exists`);
            return res.status(400).json({ message: 'Email already exists' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          console.log('Hashed Password:', hashedPassword);
    
          await User.create({
            name, 
            email,
            password: hashedPassword
          });
          npmlog.info('Register', `Successfully registered ${email}`);
    
          res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
          npmlog.error('Register', `Error during user registration: ${error.message}`);
          res.status(500).json({ message: 'server error' });
        }
      },
    login: [ async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                npmlog.info('Login', `Failed login attempt for ${email}, email does not exist`);
                return res.status(400).json({ message: 'Email does not exist' });
            }

            const passwordMatch= bcrypt.compare(password, user.password);

            console.log('Password Input:', password);
            console.log('Hashed Password in Database:', user.password);
            if (!passwordMatch) {
                npmlog.info('Login', `Failed login attempt for ${email}, wrong password`);
                return res.status(400).json({ message: 'Wrong password' });
            }

            npmlog.info('Login', `Successfully logged in ${email}`);
            const token = jwt.sign({ userId: user.id ,role:true}, 'secretkey');
            res.status(200).json({ token });
        } catch (error) {
            npmlog.error('Login', `Error during user login: ${error.message}`);
            console.error(error);
            res.status(500).json({ message: 'server error' });

        }
      }]
}
module.exports = userController