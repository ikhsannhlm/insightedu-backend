const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, personality: null });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// Read all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Read a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Update user personality by ID
router.put('/updateUserPersonality/:id', async (req, res) => {
    try {
        const { personality } = req.body;
        const userId = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { personality },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User personality updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
