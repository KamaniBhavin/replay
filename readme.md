# 🎬 Replay - Chrome Extension

Replay is a chrome extension that lets you search through all the pages in your browsing history to find the one you can't remember. It uses cosine similarity search to find the page based on the content of the page and the search query provided by the user. Replay is built using Supabase DB and Supabase Auth, and OpenAI APIs to create embeddings for webpages, store them to Supabase, and find the page by computing cosine similarity between content of page and query.

## 🚀 Installation

To install Replay, you will need to follow these steps:

1. Clone the repository from Github using the following command:

```bash
git clone https://github.com/KamaniBhavin/replay.git
```

2. Install dependencies using npm:

```bash
npm install
```

3. Run the build script to create a `dist` folder for the extension:

```bash
npm run build
```

4. Open Google Chrome and navigate to the Extensions page. You can do this by typing `chrome://extensions` in the URL bar.

5. Enable Developer Mode by toggling the switch in the top right corner of the page.

6. Click on `Load unpacked` and select the `dist` folder created in step 3.

7. The Replay extension should now be installed and ready to use.

## 💡 How to Use

To use Replay, you can follow these steps:

1. Login with Google via the extension popup.
2. Add your OpenAI API key to the extension popup.
3. Start browsing the web.
4. Use Ctrl+Space to toggle between spotlight search on any webpage.
5. Add your query in the spotlight search field.
6. A list of relevant web pages to your query appears below.
7. Pick the webpage you've been searching for hours by clicking on it.
8. The page will open in a new tab.

## 🌟 Credits

Replay is built using the following technologies:

- Supabase DB
- Supabase Auth
- OpenAI APIs

The project was developed by Bhavin Kamani. If you have any questions or comments, please feel free to contact me at 13havinkamani@gmail.com.
