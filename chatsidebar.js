export default function showChatSidebar() {
  const sidebarExists = document.getElementById('chatSidebar');

  if (sidebarExists) {
    sidebarExists.remove();
  } else {
    const sidebar = document.createElement('div');
    sidebar.id = 'chatSidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '300px';
    sidebar.style.height = '100%';
    sidebar.style.backgroundColor = 'white';
    sidebar.style.borderLeft = '1px solid gray';
    sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    sidebar.style.zIndex = '1000';
    sidebar.style.padding = '20px';
    sidebar.style.overflowY = 'auto';
    sidebar.style.boxSizing = 'border-box';

    sidebar.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2 id="chatSidebarTitle">Chat with AI</h2>
        <button id="closeChatSidebar" title="Close Sidebar" style="background: none; border: none; cursor: pointer;">✖️</button>
      </div>
      <hr style="margin: 10px 0;">
      <div id="chatContent" style="padding: 10px; height: calc(100% - 100px); overflow-y: auto;">
      </div>
      <div style="position: absolute; bottom: 20px; width: calc(100% - 40px);">
        <input id="chatInput" type="text" placeholder="Type your message..." style="width: 100%; padding: 10px; box-sizing: border-box;" />
      </div>
    `;

    document.body.appendChild(sidebar);

    document.getElementById('closeChatSidebar').addEventListener('click', () => {
      sidebar.remove();
    });

    document.getElementById('chatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const input = document.getElementById('chatInput');
        const message = input.value;
        if (message.trim() !== '') {
          addChatMessage('You', message);
          input.value = '';
          callServer(message).then(response => {
            addChatMessage('AI', response);
          });
        }
      }
    });
  }

  function addChatMessage(sender, message) {
    const chatContent = document.getElementById('chatContent');
    if (chatContent) {
      const messageElement = document.createElement('div');
      messageElement.style.marginBottom = '10px';
      messageElement.style.display = 'flex';
      messageElement.style.alignItems = 'center';

      let icon = '';
      if (sender === 'AI') {
        const aiIconUrl = chrome.runtime.getURL('images/ai-chat.ico');
        icon = `<img src="${aiIconUrl}" alt="AI Icon" style="width: 20px; height: 20px; margin-right: 5px;">`;
        messageElement.innerHTML = `${icon} ${message}`;
      } else {
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
      }

      chatContent.appendChild(messageElement);
      chatContent.scrollTop = chatContent.scrollHeight; // Scroll to the bottom
    }
  }


  function callServer(message) {
    // Mock server response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Server response to: "${message}"`);
      }, 1000);
    });
  }
}