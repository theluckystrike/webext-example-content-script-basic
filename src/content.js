// Content Script Basic - Injected into web pages

console.log('Content Script Basic: Script injected!');

/**
 * This content script adds a banner to every webpage
 * demonstrating how content scripts work in Chrome extensions
 */

// Create the injected banner element
function createBanner() {
  const banner = document.createElement('div');
  banner.id = 'hello-world-banner';
  banner.innerHTML = `
    <div class="banner-content">
      <span>👋 Hello from Chrome Extension!</span>
      <span class="banner-url">${window.location.hostname}</span>
    </div>
  `;
  return banner;
}

// Inject the banner into the page
function injectBanner() {
  // Check if banner already exists
  if (document.getElementById('hello-world-banner')) {
    return;
  }
  
  const banner = createBanner();
  document.body.appendChild(banner);
  
  console.log('Content Script Basic: Banner injected into', window.location.hostname);
}

// Run when DOM is ready
if (document.body) {
  injectBanner();
} else {
  document.addEventListener('DOMContentLoaded', injectBanner);
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getPageInfo') {
    sendResponse({
      url: window.location.href,
      title: document.title,
      hostname: window.location.hostname
    });
  }
  return true;
});

// Export for testing (optional)
if (typeof window !== 'undefined') {
  window.contentScriptBasic = {
    injectBanner,
    getPageInfo: () => ({
      url: window.location.href,
      title: document.title,
      hostname: window.location.hostname
    })
  };
}
