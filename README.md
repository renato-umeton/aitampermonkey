# AI Tampermonkey Bookmarklet Menu



This repository contains a series of Tampermonkey userscripts that display a floating bookmarklet menu.
Each version builds upon the previous one with additional utilities and styling tweaks.

## Requirements

-   **Android, Linux, macOS, Windows:** Firefox or a Chromium-based browser with the Tampermonkey extension, plus the script.
-   **iPhone, iPad:** The Tampermonkey app, plus the script.
-   **Optional:** A [Google AI Studio API key](https://aistudio.google.com/app/apikey) for the "Generate & Run Code" feature.

## Installing

1. Install the Tampermonkey extension in your browser.
2. Open the script file you wish to use and copy its contents.
3. Create a new script in Tampermonkey and paste the code, then save.
4. Reload the page to see the menu trigger.

## Functionalities (v2.8)

- **Floating Menu:** A draggable trigger icon (📟) provides access to all features.
- **URL Basket:**
    - Collect multiple pages into a "basket".
    - View, clear, or send the entire basket to AI services for analysis.
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
- **UI/UX Features:**
    - `(selectAll)` buttons for easily using full page content as context.
    - Status messages and custom notifications for actions.
    - Automatic dark/light theme based on your browser or OS settings.
    - Option to permanently hide the trigger icon.

Feel free to experiment with older versions to see how the menu evolved.

## Script versions

Below is a summary of each numbered release, with the latest version first. File names use a two‑digit prefix to keep them sorted.

| Version | File | Key additions |
| ------- | ---- | ------------- |
| 2.8 | `28 Universal Bookmarklet Menu-2.8.user(2).txt` | Dark mode, "Hide Menu" option, submenu styling (latest) |
| 2.7 | `27 Universal Bookmarklet Menu-2.7.user.txt` | Submenu for basket actions |
| 2.6 | `26 Universal Bookmarklet Menu-2.6.user.txt` | URL Basket for multi-page actions |
| 2.4 | `24 Universal Bookmarklet Menu-2.4.user.txt` | Flexbox layout for menu items |
| 2.3 | `23 Universal Bookmarklet Menu-2.3.user.txt` | “Select All” helper buttons and menu refactor |
| 2.2 | `22 Universal Bookmarklet Menu-2.2.user.txt` | Gemini Code Generator with API key storage |
| 2.1 | `21 Universal Bookmarklet Menu-2.1.user.txt` | Adjusted mobile drag scale behaviour |
| 2.0 | `20 Universal Bookmarklet Menu-2.0.user.txt` | Added `mp4[0]` bookmarklet for embedded video links |
| 1.9 | `09 Universal Bookmarklet Menu-1.9.user.txt` | Minor tweaks and new icon for Gemini prompt |
| 1.8 | `bookmarklet-menu-v8.js.txt` | Added “ask Claude” bookmarklet |
| 1.7 | `07 Universal Bookmarklet Menu-1.7.user.txt` | Trigger styling tweaks and default placement change |
| 1.6 | `06 Universal Bookmarklet Menu-1.6.user.txt` | Mobile drag support for the trigger |
| 1.5 | `05 Universal Bookmarklet Menu-1.5.user.txt` | Draggable trigger, custom Gemini prompt copier with notification |
| 1.4 | `04 Universal Bookmarklet Menu-1.4.user.txt` | Restored simple ChatGPT URL handling, updated Gemini β prompt, improved menu positioning |
| 1.3 | `03 Universal Bookmarklet Menu-1.3.user.txt` | Status message helper, Gemini Omnibox experiment, open actions in new tabs |
| 1.2 | `02 Universal Bookmarklet Menu-1.2.user.txt` | Initial menu with Kagi “Summarize”, ChatGPT and Gemini links |

### Detailed changelog

**2.8**
- Added automatic dark mode based on system preference
- Added a "Hide Menu App" option to the submenu
- Improved submenu positioning and styling

**2.7**
- Refactored menu to move basket actions into a collapsible submenu

**2.6**
- Introduced URL Basket for collecting multiple pages
- Added basket actions: Summarize, send to ChatGPT, Claude, and Gemini

**2.4**
- Menu items arranged using flexbox

**2.3**
- "Select All" helper buttons
- Refactored menu creation logic

**2.2**
- Gemini Code Generator with local API key storage
- Optional execution of generated code

**2.1**
- Adjusted scaling behaviour for mobile dragging

**2.0**
- New `mp4[0]` bookmarklet for embedded video links

**1.9**
- Minor tweaks and a new icon for Gemini link

**1.8**
- Added "ask Claude" bookmarklet

**1.7**
- Trigger style tweaks and new default placement

**1.6**
- Mobile drag support using long press

**1.5**
- Added draggable trigger button
- Gemini prompt copier with notification overlay

**1.4**
- Restored simpler ChatGPT URL handling
- Updated Gemini β prompt text
- Improved menu positioning logic

**1.3**
- Helper to show temporary status messages
- Experimental Gemini Omnibox approach
- Opens bookmarklet actions in new tabs

**1.2**
- Basic menu with Kagi "Summarize" bookmarklet
- Quick links for ChatGPT and Gemini

