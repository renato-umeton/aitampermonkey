# AI Tampermonkey Bookmarklet Menu

_All AIs in your corner, wherever you are._

![](docs/screenshots/iphone.gif)


## Functionalities (v3.1)

- **Floating Menu:** A draggable trigger icon (📟) provides access to all features.
- **AI Integration:**
    - **ChatGPT, Claude, Gemini:** Send the current page, selected text, or URL basket to various AI chatbots.
    - **Kagi Summarizer:** Summarize the current page, selected text, or all pages in the basket.
- **Gemini Code Generation:**
    - Describe a desired webpage change in plain English (e.g., "highlight all links in red").
    - The script uses the Gemini API to generate JavaScript code to accomplish the task.
    - Review the code and choose to execute it, copy it, or cancel. Requires a free Google AI Studio API key.
- **Page Utilities:**
    - **Save as Markdown:** Converts the main content of a page to Markdown and downloads it.
    - **sortScholar:** Re-sorts Google Scholar results by citation count.
    - **Get it at Harvard!:** Accesses the current page through Harvard's library proxy.
    - **View Source:** Quick access to view the HTML source code of the current page.
- **UI/UX Features:**
    - `(selectAll)` buttons for easily using full page content as context.
    - Status messages and custom notifications for actions.
    - Automatic dark/light theme based on your browser or OS settings.
    - Option to permanently hide the trigger icon.
 - **URL Basket:**
    - Collect multiple pages into a "basket".
    - View, clear, or send the entire basket to AI services for analysis.
      
Feel free to experiment with older versions to see how the menu evolved.

<img width="200" alt="image" src="https://github.com/user-attachments/assets/7ec47418-6326-4806-8b36-3bab4cb9d195" /> &nbsp;
<img width="200" alt="image" src="https://github.com/user-attachments/assets/796cbbd8-7480-489d-9b58-7ec9206d8ca6" />


## Requirements

-   **Android, Linux, macOS, Windows:** Firefox or a Chromium-based browser with the [Tampermonkey](https://www.tampermonkey.net/) extension, plus the script.
-   **iPhone, iPad:** The [Tampermonkey app](https://www.tampermonkey.net/), plus the script.
-   **Optional:**
    - A free [Google AI Studio API key](https://aistudio.google.com/app/apikey) for the "🤖 Generate & Run Code" feature.
    - A free [Kagi]([url](https://kagi.com/signup)) account to use the "✨ SUMMARIZE" feature 

## Installing

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension in your browser.
2. Open the script file you wish to use and copy its contents.
3. Create a new script in Tampermonkey and paste the code, then save.
4. Reload the page to see the menu trigger.

---

## Change log

| Version | File | Key additions | Details |
| ------- | ---- | ------------- | ------- |
| 3.1 | `31 Universal Bookmarklet Menu-3.1.user.txt` | View Source button | - Added "🖥️ View Source" button to quickly view the HTML source code of the current page |
| 3.0 | `30 Universal Bookmarklet Menu-3.0.user.txt` | Gemini API update | - Updated Gemini API to use gemini-3-flash-preview model |
| 2.9 | `29 Universal Bookmarklet Menu-2.9.user.txt` | Gemini API, submenu UX | - Updated Gemini API to use gemini-2.5-flash model (gemini-1.5-flash deprecated)<br>- Improved submenu UX: left-half activation with visual safe corridor on right<br>- Arrow icon repositioned to beginning of "multi-page & more" menu item<br>- Safe corridor prevents accidental submenu activation when moving mouse vertically |
| 2.8 | `28 Universal Bookmarklet Menu-2.8.user.txt` | Dark mode, Hide Menu | - Added automatic dark mode based on system preference<br>- Added a "Hide Menu App" option to the submenu<br>- Improved submenu positioning and styling |
| 2.7 | `27 Universal Bookmarklet Menu-2.7.user.txt` | Submenu | - Refactored menu to move basket actions into a collapsible submenu |
| 2.6 | `26 Universal Bookmarklet Menu-2.6.user.txt` | URL Basket | - Introduced URL Basket for collecting multiple pages<br>- Added basket actions: Summarize, send to ChatGPT, Claude, and Gemini |
| 2.4 | `24 Universal Bookmarklet Menu-2.4.user.txt` | Flexbox layout | - Menu items arranged using flexbox |
| 2.3 | `23 Universal Bookmarklet Menu-2.3.user.txt` | Select All buttons | - "Select All" helper buttons<br>- Refactored menu creation logic |
| 2.2 | `22 Universal Bookmarklet Menu-2.2.user.txt` | Gemini Code Generator | - Gemini Code Generator with local API key storage<br>- Optional execution of generated code |
| 2.1 | `21 Universal Bookmarklet Menu-2.1.user.txt` | Mobile drag fix | - Adjusted scaling behaviour for mobile dragging |
| 2.0 | `20 Universal Bookmarklet Menu-2.0.user.txt` | mp4[0] bookmarklet | - New `mp4[0]` bookmarklet for embedded video links |
| 1.9 | `09 Universal Bookmarklet Menu-1.9.user.txt` | Minor tweaks | - Minor tweaks and a new icon for Gemini link |
| 1.8 | `bookmarklet-menu-v8.js.txt` | Claude integration | - Added "ask Claude" bookmarklet |
| 1.7 | `07 Universal Bookmarklet Menu-1.7.user.txt` | Trigger styling | - Trigger style tweaks and new default placement |
| 1.6 | `06 Universal Bookmarklet Menu-1.6.user.txt` | Mobile drag | - Mobile drag support using long press |
| 1.5 | `05 Universal Bookmarklet Menu-1.5.user.txt` | Draggable trigger | - Added draggable trigger button<br>- Gemini prompt copier with notification overlay |
| 1.4 | `04 Universal Bookmarklet Menu-1.4.user.txt` | ChatGPT, Gemini, positioning | - Restored simpler ChatGPT URL handling<br>- Updated Gemini β prompt text<br>- Improved menu positioning logic |
| 1.3 | `03 Universal Bookmarklet Menu-1.3.user.txt` | Status messages | - Helper to show temporary status messages<br>- Experimental Gemini Omnibox approach<br>- Opens bookmarklet actions in new tabs |
| 1.2 | `02 Universal Bookmarklet Menu-1.2.user.txt` | Initial release | - Basic menu with Kagi "Summarize" bookmarklet<br>- Quick links for ChatGPT and Gemini |

