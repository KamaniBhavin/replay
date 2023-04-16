import React from 'react';

// Loading component
const Loading = () => {
  return (
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-purple-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
  );
};

export default Loading;
