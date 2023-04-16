import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Configuration, OpenAIApi } from 'openai';
import supabase from '../../../supabase/client';
import { RelevantWebPages } from '../../../supabase/types';
import RelevantWebPageListItem from '../../common/components/relevant_web_page_list_item';
import Loading from '../../common/components/loading';

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

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [relevantWebPages, setRelevantWebPages] = React.useState<RelevantWebPages>([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { user_id: userId } = await chrome.storage.sync.get(['user_id']);

      if (!userId) {
        return;
      }

      const [{ url }] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!url) {
        return;
      }

      const relevantPages = await getRelevantWebPages(userId, url);

      if (relevantPages) {
        setRelevantWebPages(relevantPages);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex h-96 flex-row items-center justify-center py-2">
          <Loading />
        </div>
      ) : relevantWebPages.length ? (
        relevantWebPages.map((page, index) => <RelevantWebPageListItem page={page} key={index} />)
      ) : (
        <div className="flex flex-row items-center justify-center py-2">
          <div className="text-sm text-white">No relevant pages found</div>
        </div>
      )}
    </Layout>
  );
};

export default App;
