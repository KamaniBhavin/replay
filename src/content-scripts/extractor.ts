import { Configuration, OpenAIApi } from 'openai';
import supabase from '../../supabase/client';

/**
 * Extracts text from the current page and sends it to the OpenAI API
 * to generate an embedding. The embedding is then sent to the Supabase
 * database.
 *
 * This script is injected into all pages that the user visits.
 * All human-readable text is extracted from the page and sent to the
 * OpenAI API. The API returns an embedding for the text. The embedding
 * is then sent to the Supabase database.
 *
 * The embedding is used to find similar pages to the current page.
 */
const text = Array.from(document.body.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6'))
  .map((e) => (e as HTMLElement).innerText)
  .filter((sentence) => sentence.split(' ').length > 10)
  .join(' ')
  .split('\n')
  .filter((sentence) => sentence.split(' ').length > 10)
  .join(' ');

(async (content: string) => {
  const text = content.replace(/\s+/g, ' ').replace(/\n/g, ' ');

  if (!text || text.length === 0 || text.length < 100) {
    console.info('Page is too short to be scraped');
    return;
  }

  if (text.length > 10000) {
    console.error('Page is too long to be scraped');
    return;
  }

  const { key: apiKey, user_id: userId } = await chrome.storage.sync.get(['key', 'user_id']);

  if (!apiKey) {
    console.error('No API key found');
    return;
  }

  const { data: page, error } = await supabase.rpc('is_already_scraped', {
    new_url: window.location.href,
  });

  if (error) {
    console.error(error);
    return;
  }

  if (page) {
    console.info('Embedding already exists for this page');
    await linkUserToEmbedding(userId, window.location.href);
    return;
  }

  const openAI = new OpenAIApi(new Configuration({ apiKey }));
  const {
    data: {
      data: [{ embedding }],
    },
  } = await openAI.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text,
  });

  await supabase.from('web_page_embeddings').insert({
    url: window.location.href,
    title: document.title,
    domain: window.location.hostname,
    content: text,
    embedding: embedding,
  });

  await linkUserToEmbedding(userId, window.location.href);
})(text);

/**
 * Links the user to the embedding in the database. This is used to
 * find similar pages to the current page. The user is linked to the
 * embedding so that the embedding can be used for personalized search.
 * @param userId
 * @param page_url
 */
async function linkUserToEmbedding(userId: string, page_url: string) {
  console.log('Linking user to embedding', userId, page_url);
  await supabase.rpc('link_user_to_web_page_embedding', {
    user_id: userId,
    page_url,
  });
}
