import React from 'react';
import Layout from './Layout';

// Error component
const Error: React.FC = () => {
  return (
    <Layout>
      <div className="mt-8 text-2xl font-bold text-gray-300">Something went wrong</div>
      <div className="mt-4 text-sm text-gray-500">Please try again later</div>
    </Layout>
  );
};

export default Error;
