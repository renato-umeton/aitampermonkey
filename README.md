# AI Tampermonkey Bookmarklet Menu

This repository contains a series of Tampermonkey userscripts that display a floating bookmarklet menu.
Each version builds upon the previous one with additional utilities and styling tweaks.

## Script versions

Below is a summary of each numbered release.  File names use a
two‑digit prefix to keep them sorted.

| Version | File | Key additions |
| ------- | ---- | ------------- |
| 1.2 | `02 Universal Bookmarklet Menu-1.2.user.txt` | Initial menu with Kagi “Summarize”, ChatGPT and Gemini links |
| 1.3 | `03 Universal Bookmarklet Menu-1.3.user.txt` | Status message helper, Gemini Omnibox experiment, open actions in new tabs |
| 1.4 | `04 Universal Bookmarklet Menu-1.4.user.txt` | Restored simple ChatGPT URL handling, updated Gemini β prompt, improved menu positioning |
| 1.5 | `05 Universal Bookmarklet Menu-1.5.user.txt` | Draggable trigger, custom Gemini prompt copier with notification |
| 1.6 | `06 Universal Bookmarklet Menu-1.6.user.txt` | Mobile drag support for the trigger |
| 1.7 | `07 Universal Bookmarklet Menu-1.7.user.txt` | Trigger styling tweaks and default placement change |
| 1.8 | `bookmarklet-menu-v8.js.txt` | Added “ask Claude” bookmarklet |
| 1.9 | `09 Universal Bookmarklet Menu-1.9.user.txt` | Minor tweaks and new icon for Gemini prompt |
| 2.0 | `20 Universal Bookmarklet Menu-2.0.user.txt` | Added `mp4[0]` bookmarklet for embedded video links |
| 2.1 | `21 Universal Bookmarklet Menu-2.1.user.txt` | Adjusted mobile drag scale behaviour |
| 2.2 | `22 Universal Bookmarklet Menu-2.2.user.txt` | Gemini Code Generator with API key storage |
| 2.3 | `23 Universal Bookmarklet Menu-2.3.user.txt` | “Select All” helper buttons and menu refactor |
| 2.4 | `24 Universal Bookmarklet Menu-2.4.user.txt` | Flexbox layout for menu items (latest) |

## Installing

1. Install the Tampermonkey extension in your browser.
2. Open the script file you wish to use and copy its contents.
3. Create a new script in Tampermonkey and paste the code, then save.
4. Reload the page to see the menu trigger.

## Features

- Draggable menu trigger available on all pages.
- Quick access to AI tools like ChatGPT, Claude and Gemini.
- Helper functions for status messages and notifications.

Feel free to experiment with older versions to see how the menu evolved.
