# Learning: Content Scripts

## What are Content Scripts?

Content scripts are JavaScript files that Chrome extensions can run in the context of web pages. They can interact with and modify the page's DOM, read page data, and communicate with the extension.

## Key Concept: Isolated Worlds

Content scripts run in an **isolated world** - they have their own JavaScript environment that:
- ✅ Can access the DOM
- ✅ Can use many Chrome APIs (via messaging)
- ❌ Cannot access variables defined by the page
- ❌ Cannot access variables defined by other content scripts
- ❌ Cannot access iframe content (cross-origin)

## Manifest Configuration

```json
{
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_end"
    }
  ]
}
```

### Run At Options

| Value | Description |
|-------|-------------|
| `document_start` | Before any DOM is created |
| `document_end` | After DOM is complete (default) |
| `document_idle` | After DOM and synchronous scripts |

### Match Patterns

| Pattern | Matches |
|---------|---------|
| `<all_urls>` | All URLs |
| `https://*/*` | All HTTPS pages |
| `https://*.google.com/*` | All Google subdomains |
| `https://example.com/page*` | Specific paths |

## Creating a Content Script

### 1. Read the Page

```javascript
// content.js
const title = document.title;
const headings = document.querySelectorAll('h1');
const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
```

### 2. Modify the Page

```javascript
const banner = document.createElement('div');
banner.textContent = 'Hello from extension!';
document.body.appendChild(banner);
```

### 3. Use Page APIs

```javascript
// These work in content scripts:
document.querySelector()
window.getComputedStyle()
localStorage  // (limited)
```

## Communicating with the Extension

### Send Message to Background

```javascript
chrome.runtime.sendMessage(
  { action: 'log', data: 'Hello!' },
  (response) => console.log(response)
);
```

### Receive Messages

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'doSomething') {
    sendResponse({ result: 'Done!' });
  }
  return true; // Keep channel open for async response
});
```

## Best Practices

1. **Use CSS selectors carefully**: Page changes can break your selectors
2. **Handle SPA navigation**: Single-page apps may need MutationObservers
3. **Avoid conflicts**: Use unique IDs and prefixes
4. **Use Shadow DOM**: Isolate your UI from page styles
5. **Check permissions**: Only request what you need

## Common Patterns

### Conditional Injection

```javascript
// Only run on specific pages
if (window.location.hostname.includes('github.com')) {
  // GitHub-specific code
}
```

### Waiting for Element

```javascript
function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });
    observer.observe(document.body, { childList: true });
  });
}
```

### Communicating with Popup

```javascript
// From content script to popup
chrome.runtime.sendMessage({ type: 'PAGE_INFO', url: location.href });

// In popup.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'PAGE_INFO') {
    console.log('Current page:', message.url);
  }
});
```

## Next Steps

Now that you understand content scripts, learn about:
- **Shadow DOM**: Isolating your UI from page styles
- **React in Content Scripts**: Using React with content scripts
- **Background Workers**: Running background tasks

## Resources

- [Content Scripts Documentation](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [Match Patterns](https://developer.chrome.com/docs/extensions/mv3/match_patterns/)
