import React from 'react';

export default function HeroImage() {
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className='p-5 text-center bg-image'
        // style={{ backgroundImage: "url('https://media.nomadicmatt.com/2022/halongbaycheap.jpeg')", height: 400 }}
        style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/001/370/764/original/abstract-flat-background-free-vector.jpg')", height: 400 }}
>
        {/* <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}> */}
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-black'>
              <h1 className='mb-3'>Welcome to Wanderlust!</h1>
              <h4 className='mb-3'>Your one-stop-shop for trip planning</h4>
              <a className='btn btn-outline-light btn-lg' href='/trips/new' role='button'>
                Plan a trip!
              </a>
            </div>
          </div>
        </div>
      {/* </div> */}
    </header>
  );
}
