import React from 'react';
import ReactDOM from 'react-dom/client';
import { createMemoryRouter, json, redirect, RouterProvider } from 'react-router-dom';
import Error from './components/Error';
import App from './pages/app';
import '../index.css';
import UseYourKey from './pages/use_your_key';
import OAuth from './pages/oauth';
import Help from './pages/help';

const router = createMemoryRouter([
  {
    path: '/',
    element: <OAuth />,
    loader: async () => {
      const { loggedIn } = await chrome.storage.sync.get(['loggedIn']);
      if (loggedIn) {
        return redirect('/key');
      }
      return json({});
    },
  },
  {
    path: '/key',
    element: <UseYourKey />,
    loader: async () => {
      const { key } = await chrome.storage.sync.get(['key']);
      if (key) {
        return redirect('/app');
      }
      return json({});
    },
    errorElement: <Error />,
  },
  {
    path: '/app',
    element: <App />,
    loader: async () => {
      const { key } = await chrome.storage.sync.get(['key']);
      if (!key) {
        return redirect('/key');
      }
      return json({ key });
    },
    errorElement: <Error />,
  },
  {
    path: '/help',
    element: <Help />,
    errorElement: <Error />,
  },
  {
    path: '/error',
    element: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router} />);
