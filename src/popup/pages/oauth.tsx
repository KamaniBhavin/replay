import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { AiFillGoogleCircle } from 'react-icons/ai';
import Loading from '../../common/components/loading';

// OAuth component that handles the OAuth flow with Google
const OAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleLogin() {
    setLoading(true);
    const response = await chrome.runtime.sendMessage<Message, Message>({ payload: ['login', {}] });
    if (response.payload[0] === 'error') {
      setLoading(false);
      console.error(response.payload[1]);
      navigate('/error');
    } else {
      setLoading(false);
      await chrome.storage.sync.set({ loggedIn: true });
      navigate('/app');
    }
  }

  return (
    <Layout>
      <div className="flex h-full flex-col items-center gap-16">
        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-5xl font-bold text-transparent">
          Get back in time with Replay!
        </h1>
        <div className="flex flex-col items-center justify-center pt-4">
          <button
            onClick={handleLogin}
            className="flex flex-row items-center justify-center gap-4 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white hover:opacity-75"
          >
            <AiFillGoogleCircle className="text-4xl text-gray-800" />
            <div className="text-lg font-bold">Login with Google</div>
          </button>
          {loading ? (
            <div className="mt-4">
              <Loading />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default OAuth;
