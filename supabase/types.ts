import { Database } from './database';

export type RelevantWebPage =
  Database['public']['Functions']['find_similar_web_pages']['Returns'][0];

export type RelevantWebPages = RelevantWebPage[];
