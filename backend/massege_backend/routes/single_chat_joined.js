const express = require('express');
const {get ,  ref, push, update, remove, onValue } = require('firebase/database');
const { database } = require('../firebaseAdmin');
const SingleChatJoin = require('../model/SingleChatJoin');

const router = express.Router();

// Create a new chat join record
router.post('/chatJoins', async (req, res) => {
    try {
        const { temple, donor , donorName} = req.body;
        const newChatJoin = new SingleChatJoin(temple, donor , donorName);
        const sanitizedTemple = temple.replace(/[.#$[\]]/g, ''); 

        // Push the new chat join data to Firebase
        const chatJoinRef = push(ref(database, `singlechatJoins/${sanitizedTemple}`));
        await update(chatJoinRef, newChatJoin);

        return res.status(201).json({ message: 'Chat join record created successfully.', id: newChatJoin.id });
    } catch (error) {
        console.error('Error creating chat join record:', error);
        return res.status(500).json({ error: 'Failed to create chat join record.' });
    }
});

router.post('/getSingleChatPerMonk', async (req, res) => {
    try {
        const { monk_uname } = req.body;
        const sanitizedTemple = monk_uname.replace(/[.#$[\]]/g, ''); 

        // Reference the chat groups for the specified temple in Firebase
        const groupsRef = ref(database, `singlechatJoins/${sanitizedTemple}`);
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
        console.error('Error getting single chat records per monk:', error);
        return res.status(500).json({ error: 'Failed to get single chat records per monk.' });
    }
});

module.exports = router;
