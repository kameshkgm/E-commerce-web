const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a User model
const User = mongoose.model('user', {
  fullName: String,
  email: String,
  password: String,
  address: String, // User's address
  orders: [Object] // Array to store orders
});

app.use(bodyParser.json());
app.use(cors());
// Function to hash password
async function hashPassword(password) {
  return await bcrypt.hash(password, 10); // 10 is the saltRounds
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user with fullName included
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return user details in the response
    res.json({ 
      message: 'Login successful', 
      user: {
        fullName: user.fullName,
        email: user.email,
        address: user.address,
        orders: user.orders,
      } 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Add order endpoint
app.put('/api/add-order/:email', async (req, res) => {
  const { fullName, email, address, items, payment } = req.body;

  try {
    // Validate incoming data
    if (!fullName || !email || !address || !items || !payment) {
      return res.status(400).json({ message: 'Invalid data. Please provide all required fields.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine the order number
    const orderNumber = user.orders.length + 1;

    // Create a new order object with the order number
    const newOrder = {
      orderNumber: `order${orderNumber}`, // Construct the order number
      fullName,
      address,
      items,
      payment,
      // Optionally, you can add order date, order total, etc.
    };

    // Update user's orders
    user.orders.push(newOrder);

    await user.save();

    res.json({ message: 'Order added successfully' });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Error adding order' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
