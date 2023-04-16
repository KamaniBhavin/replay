import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import '../../index.css';
import supabase from '../../../supabase/client';
import { Configuration, OpenAIApi } from 'openai';
import { RelevantWebPages } from '../../../supabase/types';
import SpotlightSearch from './search';
import Loading from '../../common/components/loading';
import RelevantPages from './relevant_pages';

/**
 * Get relevant web pages for a given search query and user, using the OpenAI API and Supabase.
 * This works by first creating an embedding for the search query using the OpenAI API, then
 * using the Supabase RPC function `find_similar_web_pages` to find relevant web pages for the
 * given user.
 *
 * @param userId - The user's ID.
 * @param searchQuery - The search query.
 */
async function getRelevantWebPages(
  userId: string,
  searchQuery: string,
): Promise<RelevantWebPages | null> {
  const { key: apiKey } = await chrome.storage.sync.get('key');

  const openAI = new OpenAIApi(new Configuration({ apiKey }));
  const {
    data: {
      data: [{ embedding: searchEmbeddings }],
    },
  } = await openAI.createEmbedding({
    model: 'text-embedding-ada-002',
    input: searchQuery,
  });

  const { data, error } = await supabase.rpc('find_similar_web_pages', {
    current_user_id: userId,
    search_query_embedding: searchEmbeddings,
    similarity_threshold: 0.7,
    match_count: 5,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

// This is the main component for the Spotlight search feature.
const Index = () => {
  const [hasApiKey, setHasApiKey] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showSpotlight, setShowSpotlight] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [relevantWebPages, setRelevantWebPages] = React.useState<RelevantWebPages>([]);

  chrome.runtime.onMessage.addListener((message: Message) => {
    if (message.payload[0] === 'toggle_spotlight') {
      setShowSpotlight(!showSpotlight);
    }
  });

  useEffect(() => {
    const t = setTimeout(async () => {
      if (searchQuery.length > 5) {
        setLoading(true);
        const { user_id: userId } = await chrome.storage.sync.get(['user_id']);
        const relevantPages = await getRelevantWebPages(userId, searchQuery);

        if (relevantPages) {
          console.log('Relevant pages: ', relevantPages);
          setRelevantWebPages(relevantPages);
          setLoading(false);
        }
      }
    }, 500);

    return () => clearTimeout(t);
  }, [searchQuery]);

  (async () => {
    const { key } = await chrome.storage.sync.get('key');
    if (key) {
      setHasApiKey(true);
    }
  })();

  return (
    <>
      {showSpotlight ? (
        hasApiKey ? (
          <div className="fixed left-0 top-0 z-9998 h-full w-full bg-black/10 backdrop-blur-xl">
            <div className="flex flex-row">
              <div className="w-500 h-500 fixed left-1/2 top-1/4 z-9999 -translate-x-1/2 -translate-y-1/2 transform rounded-md">
                <div className="mx-auto flex flex-row items-center justify-center gap-4">
                  <img
                    width="48"
                    height="48"
                    src={chrome.runtime.getURL('icons/icon-512.png')}
                    alt="Logo"
                  />
                  <SpotlightSearch onChange={(value) => setSearchQuery(value)} />
                  {loading ? <Loading /> : <div className="w-8" />}
                </div>
                <div className="m-2 text-center text-xs text-gray-400">
                  Tip: To toggle spotlight search, you can utilize the keyboard shortcut Ctrl+Space.
                </div>
              </div>
            </div>
            <RelevantPages hasSearch={searchQuery.length !== 0} pages={relevantWebPages} />
          </div>
        ) : (
          <div className="fixed left-0 top-0 z-9998 h-full w-full bg-black/10 backdrop-blur-xl">
            <div className="flex flex-row">
              <div className="w-500 h-500 fixed left-1/2 top-1/4 z-9999 -translate-x-1/2 -translate-y-1/2 transform rounded-md">
                <div className="flex flex-row items-center justify-center gap-4">
                  <div className="text-2xl text-red-500">
                    Please set your OpenAI API key in the extension popup.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
    </>
  );
};

// This is done in a separate div so that the Spotlight search feature can be toggled on and off.
const replayRoot = document.createElement('div');
replayRoot.id = 'replay-root';
document.body.appendChild(replayRoot);

// Render the main component.
const root = ReactDOM.createRoot(document.getElementById('replay-root')!);
root.render(<Index />);
