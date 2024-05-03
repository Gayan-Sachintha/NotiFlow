import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/MonkNav/MonkNav';
import Swal from 'sweetalert2';
import axios from 'axios';
import { set } from 'date-fns';

function ChatComponent() {
  const [username] = useState( localStorage.getItem('loginUsername'));
  const [apiKey] = useState('DwVyrbjw4TBZfryCaxYxW6F5stTYAlvVjciLYZnn');
  const [roomId] = useState(1);
  const [piesocket, setPiesocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loaded_name, setLoadedName] = useState('');
  const [donors, setDonors] = useState([]);
  const [donorsListForChat, setDonorsListForChat] = useState([]);
  const [temple_id, setTempleId] = useState(0);
  const [loaded_user_email, setLoadedUserEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllTempleIds();
        await getDonorsForTemple(temple_id);
        await getAllChats(username);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [temple_id, username]);
  

  useEffect(() => {
    const piesocketInstance = new WebSocket(`wss://free.blr2.piesocket.com/v3/${roomId}?api_key=${apiKey}&notify_self`);

    piesocketInstance.onopen = function () {
      console.log(`Websocket connected`);
      piesocketInstance.send(JSON.stringify({
        event: 'new_joining',
        sender: username,
      }));
    }

    piesocketInstance.onmessage = function (message) {
      const payload = JSON.parse(message.data);
      console.log(payload);

      if (payload.sender === username) {
        payload.sender = "You";
      }

      if (payload.event === "new_message") {
        setMessages(prevMessages => [...prevMessages, { sender: payload.sender, text: payload.text }]);
      } else if (payload.event === 'new_joining') {
        setMessages(prevMessages => [...prevMessages, { sender: 'System', text: `${payload.sender} joined the chat` }]);
      }
    }

    setPiesocket(piesocketInstance);

    return () => {
      if (piesocketInstance) {
        piesocketInstance.close();
      }
    };
  }, [username, apiKey, roomId]);


  const sendMessage = (e) => {
    e.preventDefault();

    if (!messageInput.trim()) return;  

    piesocket.send(JSON.stringify({
      type: 'single',
      sender: username,
      text: messageInput,
      receiver : loaded_user_email
    }));

    setMessageInput('');
  }

  function loadName(member){
    setLoadedName(member._donorname);
    setLoadedUserEmail(member._donor);
    
  }

  async function getAllTempleIds() {
    try {
        const response = await axios.post('http://localhost:3002/temple/getAllTemplesId',{
          templeMonk: username
        });
        const templeIds = response.data;
        setTempleId(20);
        console.log(templeIds[0].templeId);
    } catch (error) {
        console.error('Error fetching temple IDs:', error);
        
    }
  }

  async function getAllChats(monk_uname) {
    try {
        const response = await axios.post('http://localhost:3002/single_chat/getSingleChatPerMonk',
        {
          monk_uname
        });
        const donor_for_chat = response.data;
        setDonorsListForChat(donor_for_chat);
        
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
  } 

  async function getDonorsForTemple(templeId) {
    try {
        const response = await axios.get(`http://localhost:3002/monk/getDonorsForTemple/${templeId}`);
        const donors = response.data;
        setDonors(donors);
        return donors;
    } catch (error) {
        console.error('Error fetching donors:', error);
        throw error;
    }
  }

  function generateDonorList(donors) {
    return donors.map(donor => `${donor.DonorID} - ${donor.FirstName} ${donor.LastName}`);
  }



  const handleNewChat = () => {

    const members = generateDonorList(donors); 

    Swal.fire({
      title: 'Add New Member',
      input: 'select',
      inputOptions: {
        '': 'Select a member',
        ...members.reduce((options, member) => {
          options[member] = member;
          return options;
        }, {})
      },
      inputPlaceholder: 'Select a member',
      showCancelButton: true,
      confirmButtonText: 'Add Member',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to select a member';
        }
      },
      preConfirm: (selectedMember) => {
        const splittedData = selectedMember.split(" - ");
        const donorId = splittedData[0];
        const donorName = splittedData[1];
        save_donor(donorId , username , donorName);
      }
    });
  };

  const getEmailById = (donors , donorId) => {
    for (let i = 0; i < donors.length; i++) {
      if (donors[i].DonorID == donorId) {
          return donors[i].Email;
      }
    }
    return '';
  };

  function save_donor(donorId, username , donorName){
  
    axios.post('http://localhost:3002/single_chat/chatJoins',{
      temple: username,
      donor:  getEmailById(donors , donorId),
      donorName:donorName
    }).then((response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Donor saved successfully.'
      });
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save donor.'
      });
      console.error('Error saving chat group joining record:', error);
    });
  }

 

  return (
    <div>
      <NavBar />
      <div className='container' style={{ paddingLeft: '17%' }}>
        <h3 className="text-decoration-underline">Single Chats</h3>
        <div className='row pb-5 pt-4'>
          <div className='col-4'>
            <div className='card' style={{ height: '100vh', overflowY: 'auto' }}>
              <div className='card-body'>
                <div className='pb-1'>
                  <button className='btn btn-outline-dark btn-sm' style={{width:'100%'}} onClick={handleNewChat}>New Chat</button>
                </div>
                <hr/>

                {donorsListForChat.map((member, index) => (
                  <div key={index} className='p-2 border mb-1' onClick={() => loadName(member)} style={{ cursor: 'pointer', backgroundColor: '#E7E7E7' }}>
                    <h6>{member._donorname}</h6>
                  </div>
                ))}
              
                
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='card' style={{ height: '100vh', overflowY: 'auto' }}>
              <div className='card-body'>
                <div className='p-2' >
                  <h6 className='fw-bold '>{loaded_name}</h6>
                  <hr />
                  <div>
                    {messages.map((message, index) => (
                        <div key={index} style={{ 
                          textAlign: message.sender === 'You' ? 'right' : 'left',
                          color: message.sender === 'You' ? 'green' : 'blue',
                          padding: '8px',
                          borderRadius: '8px',
                          marginTop: '8px',
                        }}>
                          <strong>{message.sender}: </strong>{message.text}
                        </div>
                    ))}
                  </div>
                </div>
                <div className='fixed-bottom bg-light p-3'>
                  <form onSubmit={sendMessage}>
                    <div className='input-group' style={{ paddingLeft: '22%' }}>
                      <input type='text' className='form-control' placeholder='Type your message...' value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                      <button type="submit" className='btn btn-primary'>Send</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
