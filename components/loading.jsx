const Loading = () => {
  return (
    <div className='space-y-8 animate-pulse min-h-screen sm:border-8 border-gray-800 bg-gray-800'>
      <div className='h-28 bg-gray-800 flex justify-between items-center px-5 py-5'>
        <div className='bg-gray-300 h-10 w-32'></div>
        <div className='bg-gray-300 rounded-full w-12 h-12'></div>
      </div>
      <div className='h-16 bg-gray-200'></div>
      <div className='bg-gray-800 p-5 space-y-5'>
        <div className='pb-5 border-b-2 border-gray-200'>
          <div className='bg-gray-200 w-2/5 h-12'></div>
        </div>
        <div className='flex gap-1'>
          <div className='bg-gray-300 h-10 flex-1'></div>
          <div className='bg-gray-300 h-10 w-20'></div>
        </div>
        <div className='flex gap-1'>
          <div className='bg-gray-300 h-10 flex-1'></div>
          <div className='bg-gray-300 h-10 w-20'></div>
        </div>
        <div className='flex gap-1'>
          <div className='bg-gray-300 h-10 flex-1'></div>
          <div className='bg-gray-300 h-10 w-20'></div>
        </div>
      </div>
      <div className='bg-gray-800 p-5 space-y-5'>
        <div className='pb-5 border-b-2 border-gray-200'>
          <div className='bg-gray-200 w-2/5 h-12'></div>
        </div>
        <div className='flex gap-1'>
          <div className='bg-gray-300 h-10 flex-1'></div>
          <div className='bg-gray-300 h-10 w-20'></div>
        </div>
        <div className='flex gap-1'>
          <div className='bg-gray-300 h-10 flex-1'></div>
          <div className='bg-gray-300 h-10 w-20'></div>
        </div>
        <div className='flex gap-1'>
          <div className='bg-gray-300 h-10 flex-1'></div>
          <div className='bg-gray-300 h-10 w-20'></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
