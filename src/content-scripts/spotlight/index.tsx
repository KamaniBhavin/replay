import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import '../index.css';
import supabase from '../../supabase/client';
import { Configuration, OpenAIApi } from 'openai';
import { RelevantWebPage } from '../../supabase/types';

const Spotlight = () => {
  const [showSpotlight, setShowSpotlight] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [relevantWebPages, setRelevantWebPages] = React.useState<RelevantWebPage[]>([]);

  chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    if (message.payload[0] === 'toggle_spotlight') {
      setShowSpotlight(!showSpotlight);
    }
  });

  useEffect(() => {
    const t = setTimeout(async () => {
      if (searchQuery.length > 5) {
        await getRelevantWebPages();
      }
    }, 500);

    return () => clearTimeout(t);
  }, [searchQuery]);

  async function getRelevantWebPages() {
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
      search_query_embedding: searchEmbeddings,
      similarity_threshold: 0.75,
      match_count: 5,
    });

    if (!data || error) {
      console.error(error);
      return;
    }

    setRelevantWebPages(data);
  }

  return showSpotlight ? (
    <div>
      <div className="fixed left-0 top-0 z-9998 h-full w-full bg-black/10 backdrop-blur-xl" />
      <div className="w-500 h-500 fixed left-1/2 top-1/2 z-9999 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white">
        <div className="flex flex-row">
          <input
            autoFocus={true}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-150 rounded-md bg-gray-700 px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="input"
            placeholder="Search here..."
          />
        </div>
      </div>
    </div>
  ) : null;
};

const replayRoot = document.createElement('div');
replayRoot.id = 'replay-root';
document.body.appendChild(replayRoot);
const root = ReactDOM.createRoot(document.getElementById('replay-root')!);
root.render(<Spotlight />);
