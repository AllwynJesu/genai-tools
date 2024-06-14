chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "get-selection") {
    const selectedText = window.getSelection().toString().trim();
    console.log(selectedText)
    sendResponse(selectedText);
  }
});
