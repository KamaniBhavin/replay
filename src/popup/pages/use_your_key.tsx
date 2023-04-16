import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Configuration, OpenAIApi } from 'openai';
import Loading from '../../common/components/loading';

// A page that allows the user to enter their API key. This page is only shown if the user has not
// entered their API key yet.
const UseYourKey: React.FC = () => {
  const navigate = useNavigate();
  const [key, setKey] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  async function saveKey() {
    setLoading(true);
    try {
      const a = new OpenAIApi(new Configuration({ apiKey: key }));
      await a.listModels(); // This will throw an error if the key is invalid
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
      return;
    }

    await chrome.storage.sync.set({ key });
    navigate('/app', { replace: true });
  }

  function handleKeyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(false);
    setKey(e.target.value);
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
            onChange={handleKeyChange}
            type="text"
            placeholder="OpenAI Key"
          />
          <Button text="Save" onClick={saveKey} />
        </div>
        <div className="flex flex-col items-center justify-center pt-4">
          <div className="text-sm text-white">
            Don't have an OpenAI key?{' '}
            <a
              className="text-purple-500 hover:text-purple-400"
              href="https://beta.openai.com/account/api-keys"
              target="_blank"
              rel="noreferrer"
            >
              Get one here
            </a>
          </div>
        </div>
        {error ? (
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="text-sm text-red-500">Invalid key</div>
          </div>
        ) : null}
        {loading ? (
          <div className="mt-4">
            <Loading />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default UseYourKey;
