document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.sendMessage({ action: "getSummaryData" }, function(response) {
    if (response) {
      const content = document.getElementById("summaryText");
      content.innerText = `${response.selectedText}\n\n ${response.pageUrl}`;
    }
  });
});
