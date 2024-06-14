import showContentInSideBar from './common.js';

let toolsMenuItem = {
  "id": "genai-tools",
  "title": "GenAI Tools",
  "contexts": ["all"]
};

let summaryItem = {
  "id": "genai-tools-summary",
  "title": "Quick Summarization",
  "contexts": ["all"],
  "parentId": "genai-tools"
};

let rewriteItem = {
  "id": "genai-tools-rewrite",
  "title": "Rewrite",
  "contexts": ["all"],
  "parentId": "genai-tools"
};

chrome.contextMenus.create(toolsMenuItem);
chrome.contextMenus.create(summaryItem);
chrome.contextMenus.create(rewriteItem);

function generateSummary(tab_id, selectedText, pageUrl) {
  chrome.scripting.executeScript({
    target: { tabId: tab_id },
    function: showContentInSideBar,
    args: ["Summarization", selectedText]
  });
}

function rewriteContent(tab_id, selectedText, pageUrl) {
  chrome.scripting.executeScript({
    target: { tabId: tab_id },
    function: showContentInSideBar,
    args: ["Rewrite", selectedText]
  });
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "genai-tools-summary") {
    generateSummary(tab.id, info.selectionText, info.pageUrl);
  } else if (info.menuItemId === "genai-tools-rewrite") {
    rewriteContent(tab.id, info.selectionText, info.pageUrl);
  }
});

