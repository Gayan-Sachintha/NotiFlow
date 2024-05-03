const express = require('express');
const { ref, push, update, remove, onValue, orderByChild, equalTo, query} = require('firebase/database');
const { database } = require('../firebaseAdmin');
const ChatData = require('../model/ChatData');

const router = express.Router();

// Create a new chat data record
router.post('/createDataSave', async (req, res) => {
    try {
        const { sender, receiver, message, status } = req.body;
        const newChatData = new ChatData(sender, receiver, message, status);
        
        const dataRef = push(ref(database, 'chatData'));
        await update(dataRef, newChatData);

        return res.status(201).json({ message: 'Chat data created and saved successfully.', id: newChatData.id });
    } catch (error) {
        console.error('Error creating and saving chat data:', error);
        return res.status(500).json({ error: 'Failed to create and save chat data.' });
    }
});

// Read all chat data records
router.get('/getAllChatData', async (req, res) => {
    try {
        const dataSnapshot = await onValue(ref(database, 'chatData'));
        const chatData = [];
        dataSnapshot.forEach((childSnapshot) => {
            chatData.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        return res.status(200).json(chatData);
    } catch (error) {
        console.error('Error getting chat data:', error);
        return res.status(500).json({ error: 'Failed to get chat data.' });
    }
});

// Read a specific chat data record by ID
router.get('/getChatData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const snapshot = await onValue(ref(database, `chatData/${id}`));
        if (snapshot.exists()) {
            return res.status(200).json({ id: snapshot.key, ...snapshot.val() });
        } else {
            return res.status(404).json({ error: 'Chat data not found.' });
        }
    } catch (error) {
        console.error('Error getting chat data:', error);
        return res.status(500).json({ error: 'Failed to get chat data.' });
    }
});

// Update a chat data record by ID
router.put('/updateChatData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sender, receiver, message, status } = req.body;
        const updates = {
            sender,
            receiver,
            message,
            status
        };
        await update(ref(database, `chatData/${id}`), updates);
        return res.status(200).json({ message: 'Chat data updated successfully.' });
    } catch (error) {
        console.error('Error updating chat data:', error);
        return res.status(500).json({ error: 'Failed to update chat data.' });
    }
});

// Delete a chat data record by ID
router.delete('/deleteChatData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await remove(ref(database, `chatData/${id}`));
        return res.status(200).json({ message: 'Chat data deleted successfully.' });
    } catch (error) {
        console.error('Error deleting chat data:', error);
        return res.status(500).json({ error: 'Failed to delete chat data.' });
    }
});

module.exports = router;
