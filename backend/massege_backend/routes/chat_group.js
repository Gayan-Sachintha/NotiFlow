const express = require('express');
const { get, ref, push, update, remove } = require('firebase/database');
const { database } = require('../firebaseAdmin');
const ChatGroup = require('../model/ChatGroup');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Create a new chat group
router.post('/createGroup', async (req, res) => {
    try {
        const { temple, group_name } = req.body;
        const groupId = uuidv4();

        const newChatGroup = {
            groupId: groupId,
            temple: temple,
            group_name: group_name
        };
        const sanitizedTemple = temple.replace(/[.#$[\]]/g, ''); 
        await push(ref(database, `chatGroups/${sanitizedTemple}`), newChatGroup);

        return res.status(201).json({ message: 'Chat group created successfully.', temple: temple, group_name: group_name });
    } catch (error) {
        console.error('Error creating chat group:', error);
        return res.status(500).json({ error: 'Failed to create chat group.' });
    }
});



// Get all chat groups
router.post('/getAllGroupsPerTemple', async (req, res) => {
    try {
        const temple = req.body.temple;
        const sanitizedTemple = temple.replace(/[.#$[\]]/g, ''); 

        // Reference the chat groups for the specified temple in Firebase
        const groupsRef = ref(database, `chatGroups/${sanitizedTemple}`);
        const groupsSnapshot = await get(groupsRef);

        const groupsData = [];

        if (groupsSnapshot.exists()) { // Check if the snapshot contains data
            groupsSnapshot.forEach((groupSnapshot) => {
                // Extract the group data
                const groupData = groupSnapshot.val();
                groupsData.push({ id: groupSnapshot.key, ...groupData });
            });
        }

        // Return the chat groups data
        return res.status(200).json(groupsData);
    } catch (error) {
        console.error('Error getting chat groups:', error);
        return res.status(500).json({ error: 'Failed to get chat groups.' });
    }
});


// Get a specific chat group by ID
router.get('/getOneGroup/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const groupSnapshot = await get(ref(database, `chatGroups/${id}`));
        if (groupSnapshot.exists()) { 
            const groupData = { id: groupSnapshot.key, ...groupSnapshot.val() };
            return res.status(200).json(groupData);
        } else {
            return res.status(404).json({ error: 'Chat group not found.' });
        }
    } catch (error) {
        console.error('Error getting chat group:', error);
        return res.status(500).json({ error: 'Failed to get chat group.' });
    }
});

// Update a chat group by ID
router.put('/updateGroup/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { temple, group_name } = req.body;
        const groupRef = ref(database, `chatGroups/${id}`);
        const updates = {
            temple,
            group_name
        };
        await update(groupRef, updates);
        return res.status(200).json({ message: 'Chat group updated successfully.' });
    } catch (error) {
        console.error('Error updating chat group:', error);
        return res.status(500).json({ error: 'Failed to update chat group.' });
    }
});

// Delete a chat group by ID
router.delete('/deleteGroup/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const groupRef = ref(database, `chatGroups/${id}`);
        await remove(groupRef);
        return res.status(200).json({ message: 'Chat group deleted successfully.' });
    } catch (error) {
        console.error('Error deleting chat group:', error);
        return res.status(500).json({ error: 'Failed to delete chat group.' });
    }
});

module.exports = router;
