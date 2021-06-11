import React from 'react';

const Navbar = ({ name, image }) => {
  return (
    <head className='w-full flex justify-between items-center py-5 text-2xl px-5'>
      <div>Hi {name.split(' ')[0]}</div>
      <img
        src={image}
        alt='user image'
        width='50px'
        height='50px'
        className='rounded-full'
      />
    </head>
  );
};

export default Navbar;
