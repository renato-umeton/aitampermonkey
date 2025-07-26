# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains Tampermonkey userscripts that create a floating bookmarklet menu on web pages. The scripts provide quick access to AI tools (ChatGPT, Claude, Gemini) and various utilities like summarization, markdown saving, and code generation.

## Script Architecture

### Core Components

**Menu System**: Each script implements a floating draggable trigger (📟 emoji) that shows/hides a contextual menu.

**Bookmarklet Framework**: Scripts define bookmarklets as objects with `name` and `code` properties. The `code` function executes when the bookmarklet is selected.

**Status Messaging**: Two notification systems:
- Generic status messages (green/red, bottom-center) via `showStatusMessage()`
- Custom Gemini notifications (blue gradient, bottom-right) via `showCustomGeminiNotification()`

**Drag System**: Dual implementation for desktop (mouse events) and mobile (touch events with long-press activation).

### Key Features by Version

- **Versions 1.2-1.7**: Basic menu evolution with AI integration and drag functionality
- **Version 1.8**: Added Claude integration
- **Version 2.0**: Video link extraction (`mp4[0]` bookmarklet)
- **Version 2.2**: Gemini API integration with local API key storage
- **Version 2.3**: "Select All" helper buttons for selection-aware bookmarklets
- **Version 2.4**: Flexbox menu layout (latest)

### Selection-Aware Bookmarklets

Scripts in `selectionEnabledBookmarklets` set can work with selected text or full page content:
- ✨ SUMMARIZE
- 💬 Talk to ChatGPT  
- 🍊 ask Claude
- 🔷 Copy Gemini Prompt

These automatically get "(selectAll)" helper buttons that select all page text before execution.

### API Integration

**Gemini API**: Version 2.2+ includes full Gemini API integration:
- API key management via `GM_setValue/GM_getValue`
- Code generation and execution with safety prompts
- Error handling for various API failure modes (403, 429, 400, network errors)

## File Structure

Scripts use a two-digit prefix naming convention for chronological ordering. The latest version is always `24 Universal Bookmarklet Menu-2.4.user.txt`.

## Development Notes

**No Build Process**: These are standalone Tampermonkey userscripts - no package.json, build tools, or dependencies beyond Tampermonkey grants and external CDN libraries (TurndownService).

**External Dependencies**: 
- TurndownService (CDN) for HTML-to-Markdown conversion
- Tampermonkey grants: `GM_addStyle`, `GM_setValue`, `GM_getValue`, `GM_xmlhttpRequest`

**Testing**: Manual testing in browser with Tampermonkey extension. Test drag functionality on both desktop and mobile devices.

**Code Style**: ES6+ JavaScript with async/await for API calls. Uses modern DOM methods and CSS-in-JS styling via `GM_addStyle`.