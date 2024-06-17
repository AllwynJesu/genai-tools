import showContentInSideBar from './sidebar.js';
import updateSidebarContent from './sidebar.js';
import showChatSidebar from './chatsidebar.js';

const SUMMARY_URL = "https://allwynjesu-genai-tools-backend.hf.space/tools/summary";
const REWRITE_URL = "https://allwynjesu-genai-tools-backend.hf.space/tools/rewrite";
const CHAT_WITH_AI_URL = "https://allwynjesu-genai-tools-backend.hf.space/tools/chat-ai";
const EXTRACT_TECH_DETAILS_URL = "https://allwynjesu-genai-tools-backend.hf.space/tools/extract-details";


let toolsMenuItem = {
  "id": "genai-tools",
  "title": "GenAI Tools",
  "contexts": ["all"]
};

let summaryItem = {
  "id": "genai-tools-summary",
  "title": "Short Summary",
  "contexts": ["all"],
  "parentId": "genai-tools"
};

let extractImportantDetailsItem = {
  "id": "genai-tools-extract-tech",
  "title": "Show important details",
  "contexts": ["all"],
  "parentId": "genai-tools"
};

let rewriteItem = {
  "id": "genai-tools-rewrite",
  "title": "Rewrite",
  "contexts": ["all"],
  "parentId": "genai-tools"
};


let chatWithAIItem = {
  "id": "genai-tools-chat",
  "title": "Chat with AI",
  "contexts": ["all"],
  "parentId": "genai-tools"
};

let chatWithDocItem = {
  "id": "genai-tools-doc-chat",
  "title": "Chat about Webpage",
  "contexts": ["all"],
  "parentId": "genai-tools"
};

chrome.contextMenus.create(toolsMenuItem);
chrome.contextMenus.create(summaryItem);
chrome.contextMenus.create(extractImportantDetailsItem);
chrome.contextMenus.create(rewriteItem);
chrome.contextMenus.create(chatWithAIItem);
chrome.contextMenus.create(chatWithDocItem);


function generateSummary(tab_id, pageUrl) {
  let request = JSON.stringify({
    "action": "SUMMARIZE",
    "page_url": pageUrl

  });
  chrome.scripting.executeScript({
    target: {
      tabId: tab_id
    },
    function: showContentInSideBar,
    args: ["Short Summary", "Fetching summary... please wait"]
  }, () => {
    fetchData(SUMMARY_URL, request).then(result => {
      chrome.scripting.executeScript({
        target: {
          tabId: tab_id
        },
        function: updateSidebarContent,
        args: ["Short Summary", result['summary']]
      });
    });
  });
}

function extractImportantDetails(tab_id, pageUrl) {
  let request = JSON.stringify({
    "action": "EXTRACT_IMPORTANT_DETAILS",
    "page_url": pageUrl

  });
  chrome.scripting.executeScript({
    target: {
      tabId: tab_id
    },
    function: showContentInSideBar,
    args: ["Important details in this page", "Fetching details... please wait"]
  }, () => {
    fetchData(EXTRACT_TECH_DETAILS_URL, request).then(result => {
      chrome.scripting.executeScript({
        target: {
          tabId: tab_id
        },
        function: updateSidebarContent,
        args: ["Important details in this page", result['tech_details']]
      });
    });
  });
}

function rewriteContent(tab_id, selectedText, pageUrl) {
  if (selectedText.trim() === "" || selectedText === "N/A") {
    selectedText = "If you want to rewrite, please select some text first. ";
    chrome.scripting.executeScript({
      target: {
        tabId: tab_id
      },
      function: showContentInSideBar,
      args: ["Rewritten Text", result['rewrite']]
    });
  } else {
    let request = JSON.stringify({
      "action": "REWRITE",
      "page_url": pageUrl,
      "input_text": selectedText

    });
    chrome.scripting.executeScript({
      target: {
        tabId: tab_id
      },
      function: showContentInSideBar,
      args: ["Rewritten Text", "Fetching rewritten content... please wait"]
    }, () => {
      fetchData(REWRITE_URL, request).then(result => {
        chrome.scripting.executeScript({
          target: {
            tabId: tab_id
          },
          function: showContentInSideBar,
          args: ["Rewritten Text", result['rewrite']]
        });
      });
    });
  }
}

function startChat(tab_id, selectedText, pageUrl) {
  chrome.scripting.executeScript({
    target: {
      tabId: tab_id
    },
    function: showChatSidebar
  });
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  const selectedText = info.selectionText !== undefined ? info.selectionText : 'N/A';
  if (info.menuItemId === "genai-tools-summary") {
    generateSummary(tab.id, info.pageUrl);
  } else if (info.menuItemId === "genai-tools-rewrite") {
    rewriteContent(tab.id, selectedText, info.pageUrl);
  } else if (info.menuItemId === "genai-tools-extract-tech") {
    extractImportantDetails(tab.id, info.pageUrl);
  } else if (info.menuItemId === "genai-tools-chat") {
    startChat(tab.id, info.pageUrl);
  }
});


async function fetchData(apiUrl, request) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: request //JSON.stringify({ url: pageUrl })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return 'Failed to fetch summary. Please try again later.';
  }
}