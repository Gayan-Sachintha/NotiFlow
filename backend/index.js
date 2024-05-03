const express = require('express');
const { ref, push, onValue } = require('firebase/database');
const { app: firebaseApp, database } = require('./massege_backend/firebaseAdmin');

const bodyParser = require('body-parser');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const templeRoutes = require('./routes/templeRoutes');
const monkRoutes = require('./routes/monkRoutes');

const chatRoutes = require('./massege_backend/routes/chat-bot');
const chatGroupRoutes = require('./massege_backend/routes/chat_group');
const groupMemberRoutes = require('./massege_backend/routes/chat_group-joined');
const singleChatRoutes = require('./massege_backend/routes/single_chat_joined');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors()); 

// Routes
app.use('/user', userRoutes);
app.use('/temple', templeRoutes);
app.use('/monk', monkRoutes);

app.use('/chat', chatRoutes);
app.use('/chat_group', chatGroupRoutes);
app.use('/group_member', groupMemberRoutes);
app.use('/single_chat', singleChatRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
