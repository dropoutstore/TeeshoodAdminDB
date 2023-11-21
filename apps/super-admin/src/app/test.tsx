import React from 'react';
import Mockup from '../assets/giri.png';
// import designFile from '../assets/design.png';

export default function Test() {
  return (
    <div className="relative ">
      {/* <div className="w-96 h-[400px] absolute left-[300px] top-64">
        <img src={designFile} className='w-48' alt="" />
      </div> */}
      <img className="bg-green-500 w-[800px] " src={Mockup} alt="" />
    </div>
  );
}
