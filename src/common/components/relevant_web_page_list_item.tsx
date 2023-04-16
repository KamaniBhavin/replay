import React, { FC } from 'react';
import { RelevantWebPage } from '../../../supabase/types';

/**
 * A tile for a relevant web page list item.
 * Used in the popup and the spotlight search.
 *
 * @param page: RelevantWebPage - The relevant web page to display.
 * @returns JSX.Element
 */
const RelevantWebPageListItem: FC<{ page: RelevantWebPage }> = ({ page }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4 p-2">
        <img src={`https://www.google.com/s2/favicons?domain=${page.domain}`} alt="favicon" />
        <div className="flex w-60 flex-col md:w-226">
          <a
            href={page.url}
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden overflow-ellipsis text-purple-500 hover:text-purple-400"
          >
            {page.title}
          </a>
          <div className="text-gray-300">{page.domain}</div>
        </div>
        <div className="flex-grow" />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-2xs text-white">
          {Math.round(page.similarity * 100)}%
        </div>
      </div>
      <div className="my-2 h-0.25 w-full bg-white opacity-10" />
    </div>
  );
};

export default RelevantWebPageListItem;
