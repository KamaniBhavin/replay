import React from 'react';
import Layout from '../components/Layout';

// Help component that displays how to use Replay
const Help = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
        How to Replay your browsing history
      </div>
      <div className="flex flex-col text-white">
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="text-sm text-white">
            <ol className="list-inside list-decimal">
              <li className="mb-2">🔐 Login to Replay using Login with Google</li>
              <li className="mb-2">
                🔑 Go to{' '}
                <a
                  href="https://beta.openai.com/account/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  OpenAI
                </a>{' '}
                and create an API key
              </li>
              <li className="mb-2">📋 Copy the API key and paste it in the Replay extension</li>
              <li className="mb-2">🌐 Browse the web as you normally would</li>
              <li className="mb-2">🔍 Use Ctrl+Space to open the Replay spotlight.</li>
              <li className="mb-2">
                🔎 Enter a search query with anything about a page you read recently, but don't
                remember
              </li>
              <li className="mb-2">
                📄 Replay will show you a list of pages that are similar to the one you're looking
                for
              </li>
              <li className="mb-2">
                👉 Click on the page you're looking for and you'll be taken back in time to that
                page
              </li>
            </ol>
            <div className="text-xs text-gray-400">
              <p className="mb-2">
                Tip: To toggle spotlight search, you can utilize the keyboard shortcut Ctrl+Space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
