import React, { FC } from 'react';
import { RelevantWebPages } from '../../../supabase/types';
import RelevantWebPageListItem from '../../common/components/relevant_web_page_list_item';

// A component that displays relevant pages in the spotlight search.
const RelevantPages: FC<{
  hasSearch: boolean;
  pages: RelevantWebPages;
}> = ({ hasSearch, pages }) => {
  return (
    <div className="w-500 h-500 -translate-y-1/5 fixed left-1/2 top-1/3 z-9999 -translate-x-1/2 transform rounded-md">
      <div>
        {pages.length > 0 ? (
          <div className="w-250 rounded-md bg-gray-700 px-4 py-2 text-white">
            {pages.map((page, index) => {
              return <RelevantWebPageListItem page={page} key={index} />;
            })}
          </div>
        ) : hasSearch ? (
          <div className="w-250 rounded-md px-4 py-2 text-white">
            <div className="flex flex-row items-center justify-center">
              <div className="text-purple-500">
                No relevant pages found! Try searching for something else.
              </div>
            </div>
          </div>
        ) : (
          <div className="w-250 rounded-md px-4 py-2 text-white">
            <div className="flex flex-row items-center justify-center">
              <div className="text-purple-500">Search for something to get relevant pages!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelevantPages;
