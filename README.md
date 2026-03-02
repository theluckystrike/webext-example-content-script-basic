# Content Script Basic Chrome Extension

A Chrome extension demonstrating content script injection - adds a banner to every webpage.

## What It Does

This extension injects a content script into every webpage that:
- Displays a purple banner at the top of the page
- Shows "Hello from Chrome Extension!" with the current hostname
- Animates in smoothly from the top
- Supports dark mode

## How to Install

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `src` folder of this extension

## How to Use

Simply browse any website - you'll see the extension's banner at the top of the page.

## Project Structure

```
webext-example-content-script-basic/
├── src/
│   ├── manifest.json     # Extension configuration
│   ├── content.js        # Injected JavaScript
│   ├── content.css       # Injected styles
│   └── icons/            # Extension icons
├── README.md             # This file
├── LEARN.md              # Learning guide
└── package.json          # Package config
```

## Key Concepts

### Content Scripts

Content scripts are JavaScript files that run in the context of web pages. They can:
- Read and modify the page's DOM
- Read and modify page's localStorage/sessionStorage
- Communicate with the extension via messaging

### Manifest Configuration

```json
{
  "content_scripts": [
    {
      "matches": ["<all_urls>"],  // Which pages to inject into
      "js": ["content.js"],       // Scripts to run
      "css": ["content.css"],     // Styles to inject
      "run_at": "document_end"    // When to run
    }
  ]
}
```

### Match Patterns

- `<all_urls>` - All URLs
- `https://*.example.com/*` - All HTTPS pages on example.com
- `https://example.com/*` - All pages on example.com
- `file:///path/*` - Local files

## Learning Path

1. [Hello World](../webext-example-hello-world) - Minimal extension
2. [Popup Basic](../webext-example-popup-basic) - Add a popup UI
3. **Content Script Basic** (you are here) - Interact with web pages
4. [Background Service Worker](../webext-example-background-basic) - Background processing
5. [Options Page](../webext-example-options-page) - Add settings

## Related Examples

- [webext-content-bridge](https://github.com/zovo/webext-content-bridge) - Safe messaging
- [webext-element-picker](https://github.com/zovo/webext-element-picker) - Element selection

## License

MIT
