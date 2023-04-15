import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const UseYourKey: React.FC = () => {
  const [key, setKey] = React.useState<string>('');

  async function saveKey() {
    await chrome.storage.sync.set({ key });
  }

  return (
    <Layout>
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-5xl font-bold text-transparent">
        Get back in time with Replay!
      </h1>

      <div className="flex flex-col items-center justify-center pt-8">
        <div className="flex h-fit flex-row items-center justify-center gap-4">
          <input
            className="w-52 rounded-md bg-gray-700 px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={(e) => setKey(e.target.value)}
            type="text"
            placeholder="OpenAI Key"
          />
          <Button text="Save" onClick={saveKey} />
        </div>
        <div className="mt-8 text-gray-300">
          We will need your OpenAI key to get started. You can get your key from{' '}
          <a href="https://beta.openai.com/account/api-keys" className="text-purple-500">
            here
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default UseYourKey;
