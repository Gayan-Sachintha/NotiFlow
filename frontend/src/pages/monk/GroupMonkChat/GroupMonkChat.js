import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/MonkNav/MonkNav';
import Swal from 'sweetalert2';
import axios from 'axios';

function ChatComponent() {
  const [username] = useState(localStorage.getItem('loginUsername'));
  const [apiKey] = useState('DwVyrbjw4TBZfryCaxYxW6F5stTYAlvVjciLYZnn');
  const [roomId] = useState(1);
  const [piesocket, setPiesocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loaded_name, setLoadedName] = useState('');
  const [temple_id, setTempleId] = useState(0);
  const [groups, setGroups] = useState([]);
  const [donors, setDonors] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllTempleIds();
        await getDonorsForTemple(temple_id);
        await load_groups();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [temple_id]);
  

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

    if (!messageInput.trim() || !selectedGroupId) {
      return;
    }

    piesocket.send(JSON.stringify({
      event: 'group',
      sender: username,
      text: messageInput,
      receiver : selectedGroupId
    }));

    setMessageInput('');
  }

  function loadName(group_data){
    
    setLoadedName(group_data.group_name);
    setSelectedGroupId(group_data.id);
  }

  async function load_groups(){
    try {
        const response = await fetch('http://localhost:3002/chat_group/getAllGroupsPerTemple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ temple: username }) 
        });

        if (!response.ok) {
            throw new Error('Failed to fetch groups');
        }

        const groupsData = await response.json();
        setGroups(groupsData);
    } catch (error) {
        console.error('Error loading groups:', error.message);
    }
}


  const handleNewGroup = () => {
    Swal.fire({
      title: 'Enter Group Name',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (groupName) => {
         return groupName;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const groupName = result.value;
         create_fun(groupName);
      }
    });
  };


  function create_fun(groupName){
    axios.post('http://localhost:3002/chat_group/createGroup', { 
      temple:username,
      group_name:groupName 
    })
    .then((response) => {
      load_groups();      
      console.log('Group created successfully:', response.data);
      Swal.fire('Success', 'Group created successfully', 'success');
    })
    .catch((error) => {
      // Handle error
      console.error('Error creating group:', error);
      // Display an error message to the user
      Swal.fire('Error', 'Failed to create group', 'error');
    });
  }

  function generateDonorList(donors) {
    return donors.map(donor => `${donor.DonorID} - ${donor.FirstName} ${donor.LastName}`);
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

  const getEmailById = (donors , donorId) => {
    for (let i = 0; i < donors.length; i++) {
      if (donors[i].DonorID == donorId) {
          return donors[i].Email;
      }
    }
    return '';
  };

  function add_new_member(){

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
        saveChatJoining(donorId , selectedGroupId);
      }
    });
  
  }

  async function saveChatJoining(donorId , group_id) {
    
    try {
        const response = await axios.post('http://localhost:3002/group_member/saveChatJoining', {
            group_id: group_id,
            member_name: getEmailById(donors , donorId)
        });
        
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Chat joining saved successfully!',
        });

        console.log('Chat joining saved successfully:', response.data);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to save chat joining. Please try again later.',
        });

        console.error('Error saving chat joining:', error.message);
        throw error;
    }
  }

  return (
    <div>
      <NavBar />
      <div className='container' style={{ paddingLeft: '17%' }}>
        <h3 className="text-decoration-underline">Temple Community</h3>
        <div className='row pb-5 pt-4'>
          <div className='col-4'>
            <div className='card' style={{ height: '100vh', overflowY: 'auto' }}>
              <div className='card-body'>
                <div className='pb-1'>
                  <button className='btn btn-outline-dark btn-sm' style={{width:'100%'}} onClick={handleNewGroup}>New Group </button>
                </div>
                <hr/>
                 {groups.map((group, index) => (
                  <div key={index} className='p-2 border mb-1' onClick={() => loadName(group)} style={{ cursor: 'pointer', backgroundColor: '#E7E7E7' }}>
                    <h6>{group.group_name}</h6>
                  </div>
                ))}
               
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='card' style={{ height: '100vh', overflowY: 'auto' }}>
              <div className='card-body'>
                <div className='p-2' >
                  <div className='row'>
                    <div className='col-md-6'>
                      <h6 className='fw-bold '>{loaded_name}</h6>
                    </div>
                    <div className='col-md-6 text-end'>                  
                      <button className="btn btn-primary btn-sm" style={{backgroundColor:'#869DA2'}} onClick={add_new_member}>Add Members</button>
                    </div>
                  </div>
                  
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
