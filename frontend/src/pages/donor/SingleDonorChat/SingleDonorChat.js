import React, { useState }  from 'react'
import NavBar from '../../../components/donorNav/DonorNav';

export default function SingleDonorChat() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  function send_message(){
   
  }
  return (
    <div>
      <NavBar/>
      <div className='container' style={{paddingLeft:'10%'}}>
        <h3 className="text-decoration-underline">Single Chats</h3>
        <div className='row pb-5 pt-4'>
          <div className='col-4'>
            <div className='card' style={{ height: '100vh', overflowY: 'auto' }}>
              <div className='card-body'>
               <div className='p-2' style={{backgroundColor:'#E7E7E7'}}>
                  <h6>Nadun Sandeepa</h6>
               </div>
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='card' style={{ height: '100vh', overflowY: 'auto' }}>
              <div className='card-body'>
               <div className='p-2' >
                  <h6 className='fw-bold '>Nadun Sandeepa</h6>
                  <hr/>
               </div>
               <div className='fixed-bottom bg-light p-3'>
                <div className='input-group'  style={{paddingLeft:'16%'}}>
                  <input type='text' className='form-control' placeholder='Type your message...'   value={message} onChange={handleMessageChange} />
                  <button className='btn btn-primary' onClick={send_message}>Send</button>
                </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
