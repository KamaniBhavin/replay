import React, { FC } from 'react';

// A component that displays a search bar. Used in the spotlight search.
const Search: FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  return (
    <input
      autoFocus={true}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-226 rounded-md bg-gray-700 px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
      type="input"
      placeholder="Search here... add at least 5 characters"
    />
  );
};

export default Search;
