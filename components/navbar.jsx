import React from 'react';

const Navbar = ({ name, image }) => {
  return (
    <nav className='w-full flex justify-between items-center py-5 text-3xl px-5 text-gray-100 bg-gray-800 font-medium'>
      <div>Hi {name.split(' ')[0]},</div>
      <img
        src={image}
        alt='user image'
        width='50px'
        height='50px'
        className='rounded-full'
      />
    </nav>
  );
};

export default Navbar;
