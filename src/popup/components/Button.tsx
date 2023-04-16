import React, { FC } from 'react';

// A component that displays a button.
const Button: FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
    >
      {text}
    </button>
  );
};

export default Button;
