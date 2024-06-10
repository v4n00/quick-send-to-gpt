# Highlight to ChatGPT Quiz

Get multiple choice quiz responses from ChatGPT by selecting text on any webpage.

## Requirements

The computer you are using this on must have installed the following (only if you plan on using the `run.bat` file):

- Google Chrome (at C:\Program Files\Google\Chrome\Application\chrome.exe)
- 7-Zip (at C:\Program Files\7-Zip\7z.exe)

You must get your own ChatGPT API key from [OpenAI](https://platform.openai.com/api-keys).

## Setting up

1. Go to `chrome_extensions_82379/background.js` and replace `YOUR_API_KEY` with your own ChatGPT API key
2. Archive the folder `chrome_extensions_82379` to `.zip`
3. Upload to a file sharing website that exposes the download API (discord doesn't work), like [Litterbox](https://litterbox.catbox.moe/) (for temporary uploads)
4. Get the link and inside `run.bat` set the `URL` variable to the link
5. Upload the `run.bat` file to any file sharing website (discord is ok for this), preferably also use a link shortener on it to make it easy to remember

## Usage

1. Download the `run.bat` file from the link you uploaded it to, allow the download
2. Open the `run.bat` file, allow the file to run
3. (Optional) Pin the extension to the chrome toolbar
4. Select anything on any webpage
5. Click the extension icon

The `run.bat` file will self-destruct after running.  
The extension only works in the opened chrome window, if you close it, the extension will be gone.

## Want to run statically?

If you want to run the extension without using the `run.bat` file, you can do so by following these steps:

1. Go to `chrome_extensions_82379/background.js` and replace `YOUR_API_KEY` with your own ChatGPT API key
2. Open Chrome, go to `chrome://extensions/`
3. Enable Developer Mode (top right corner)
4. Click on `Load unpacked` (top left corner)
5. Select the `chrome_extensions_82379` folder
