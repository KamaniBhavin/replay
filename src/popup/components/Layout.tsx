import React, { FC, ReactNode, useEffect, useState } from 'react';
import Button from './Button';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A component that displays the layout of the popup.
 * This component is used to display the header and footer of the popup.
 * Used throughout the popup.
 *
 * @param children - The children of the component.
 */

const Layout: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { key } = await chrome.storage.sync.get(['key']);
      if (key) {
        setHasKey(true);
      }
    })();
  }, []);

  async function resetKey() {
    await chrome.storage.sync.remove(['key']);
    setHasKey(false);
    navigate('/key', { replace: true });
  }

  async function help() {
    if (location.pathname === '/help' && hasKey) {
      navigate('/app', { replace: true });
    } else if (location.pathname === '/help' && !hasKey) {
      navigate('/key', { replace: true });
    } else {
      navigate('/help', { replace: true });
    }
  }

  return (
    <div className="bg-gray-800">
      <div className="min-h-150 w-96 p-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <img width="56" height="56" className="mr-2" src="./icons/icon-512.png" alt="Logo" />
            <div className="text-2xl font-bold text-white">Replay</div>
          </div>
          <div className="flex flex-row gap-2">
            {hasKey ? <Button text="Reset Key" onClick={resetKey} /> : null}
            <Button text={location.pathname === '/help' ? 'Back' : 'Help'} onClick={help} />
          </div>
        </div>
        <hr className="my-4 border-gray-700" />
        <div className="container mx-auto my-4 h-5/6">{children}</div>
        <div className="absolute bottom-0 left-0 flex w-full flex-col items-center p-4">
          <div className="text-sm text-white">Made with OpenAI, Supabase, and React</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
