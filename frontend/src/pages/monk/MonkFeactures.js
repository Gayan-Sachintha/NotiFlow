import React from 'react';
import MonkBoxItemProfile from '../../components/AdminBoxItemProfile2/AdminBoxItemProfile2';

export default function MonkFeatures() {
  return (

    <div className='container-fluid text-center '>
      <div className='row'>

        <div className='col-12 mt-4'>
          <div className='row'>
            <div className='col-12 col-md-4'>
              <MonkBoxItemProfile title="Dayaka Sabawa" />
            </div>
            <div className='col-12 col-md-4'>
              <MonkBoxItemProfile title="Donor Chat" />
            </div>
            <div className='col-12 col-md-4'>
              <MonkBoxItemProfile title="Change Donor Date" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
