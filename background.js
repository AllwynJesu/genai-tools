let toolsMenuItem = {
  "id": "genai-tools",
  "title": "GenAI Tools",
  "contexts": ["selection"]
};

let summaryItem = {
  "id": "genai-tools-summary",
  "title": "Quick Summarization",
  "contexts": ["selection"],
  "parentId": "genai-tools"
};

let rewriteItem = {
  "id": "genai-tools-rewrite",
  "title": "Rewrite",
  "contexts": ["selection"],
  "parentId": "genai-tools"
};

chrome.contextMenus.create(toolsMenuItem);
chrome.contextMenus.create(summaryItem);
chrome.contextMenus.create(rewriteItem);



function generate_summary(selected_text, page_url) {
  
}

function rewrite_context(selected_text) {
  
}


let latestSelectedText = "";
let latestPageUrl = "";

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "summary") {
    latestSelectedText = info.selectionText;
    latestPageUrl = info.pageUrl;

    chrome.windows.create({
      url: "popup.html",
      focused: true,
      type: "popup",
      width: 400,
      height: 200
    });
  }

});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "getSummaryData") {
    sendResponse({ selectedText: latestSelectedText, pageUrl: latestPageUrl });
  }
});
