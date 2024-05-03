const express = require('express');
const { ref, push, update, remove, onValue, orderByChild, equalTo, query} = require('firebase/database');
const { database } = require('../firebaseAdmin');
const ChatJoin = require('../model/ChatGroupJoined');

const router = express.Router();

// Create a new chat group joining record
router.post('/saveChatJoining', async (req, res) => {
    try {
        const { group_id, member_name } = req.body;
        const newChatJoin = new ChatJoin(group_id, member_name);
        
        // Push the new chat group joining data to Firebase
        const joinRef = push(ref(database, `groupchatJoins/${group_id}`));
        await update(joinRef, newChatJoin);

        return res.status(201).json({ message: 'Chat group joining record saved successfully.', id: newChatJoin.id });
    } catch (error) {
        console.error('Error saving chat group joining record:', error);
        return res.status(500).json({ error: 'Failed to save chat group joining record.' });
    }
});

// Get all chat group joining records
router.get('/chatJoins', async (req, res) => {
    try {
        const joinsSnapshot = await get(ref(database, 'groupchatJoins'));
        const joinsData = [];
        if (exists(joinsSnapshot)) {
            forEach(joinsSnapshot, (joinSnapshot) => {
                joinsData.push({ id: joinSnapshot.key, ...joinSnapshot.val() });
            });
        }
        return res.status(200).json(joinsData);
    } catch (error) {
        console.error('Error getting chat group joining records:', error);
        return res.status(500).json({ error: 'Failed to get chat group joining records.' });
    }
});

// Get a specific chat group joining record by ID
router.get('/chatJoins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const joinSnapshot = await get(ref(database, `groupchatJoins/${id}`));
        if (exists(joinSnapshot)) {
            const joinData = { id: joinSnapshot.key, ...joinSnapshot.val() };
            return res.status(200).json(joinData);
        } else {
            return res.status(404).json({ error: 'Chat group joining record not found.' });
        }
    } catch (error) {
        console.error('Error getting chat group joining record:', error);
        return res.status(500).json({ error: 'Failed to get chat group joining record.' });
    }
});

// Update a chat group joining record by ID
router.put('/chatJoins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { group_id, member_name } = req.body;
        const joinRef = ref(database, `groupchatJoins/${id}`);
        const updates = {
            group_id,
            member_name
        };
        await update(joinRef, updates);
        return res.status(200).json({ message: 'Chat group joining record updated successfully.' });
    } catch (error) {
        console.error('Error updating chat group joining record:', error);
        return res.status(500).json({ error: 'Failed to update chat group joining record.' });
    }
});

// Delete a chat group joining record by ID
router.delete('/chatJoins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const joinRef = ref(database, `groupchatJoins/${id}`);
        await remove(joinRef);
        return res.status(200).json({ message: 'Chat group joining record deleted successfully.' });
    } catch (error) {
        console.error('Error deleting chat group joining record:', error);
        return res.status(500).json({ error: 'Failed to delete chat group joining record.' });
    }
});

module.exports = router;
