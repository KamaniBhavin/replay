import supabase from '../../supabase/client';

// Handle all the keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'spotlight') {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.length === 0 || !tab[0].id) {
      console.error('No active tab found');
      return;
    }

    await chrome.tabs.sendMessage(tab[0].id, <Message>{
      payload: ['toggle_spotlight', {}],
    });
  }
});

// Handle all the messages from the content script, popup, and options page
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  console.log('Message received', message);
  (async () => {
    if (message.payload[0] === 'login') {
      const response = await OAuthLogin();
      sendResponse(response);
    }
  })();

  return true;
});

// OAuth login flow with Google
async function OAuthLogin(): Promise<Message> {
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({ provider: 'google' });

  if (error) {
    return sendError(error.message);
  }

  if (!url) {
    return sendError('Cannot connect to Google at the moment. Try again later!');
  }

  const redirectUrl = await chrome.identity.launchWebAuthFlow({ url, interactive: true });

  if (!redirectUrl) {
    return sendError('No response from provider. Try again later!');
  }

  const params = new URLSearchParams(redirectUrl.split('#')[1]);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (!accessToken || !refreshToken) {
    return sendError('Cannot verify identity. Try again later!');
  }

  const {
    data: { user },
    error: err,
  } = await supabase.auth.getUser(accessToken);

  if (err || !user) {
    return sendError('Cannot retrieve user at the moment. Try again later!');
  }

  await chrome.storage.sync.set({ user_id: user.id });

  return { payload: ['success', { message: 'Logged in successfully!' }] };
}

function sendError(message: string): Message {
  return { payload: ['error', { message }] };
}
