export default function showContentInSideBar(title, content) {
	// Check if the sidebar already exists; if yes, refresh the content.
	const sidebarExists = document.getElementById('sideBar');

	if (sidebarExists) {
		refreshContent(title, content);
	} else {
		// Create sidebar div element and set its styles.
		const sidebar = document.createElement('div');
		sidebar.id = 'sideBar';
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

		// Insert content into the sidebar.
		sidebar.innerHTML = `
	      <div style="display: flex; justify-content: space-between; align-items: center;">
	        <h2 id="sidebarTitle">${title}</h2>
	        <button id="copyContent" title="Copy Content" style="background: none; border: none; cursor: pointer;">📋</button>
	        <button id="closeSidebar" title="Close Sidebar" style="background: none; border: none; cursor: pointer;">✖️</button>
	      </div>
	      <hr style="margin: 10px 0;">
	      <div id="sidebarContent" style="padding: 10px;">
	        <p>${content}</p>
	      </div>
	    `;

		// Append the sidebar div to the body of the document.
		document.body.appendChild(sidebar);

		// Add event listener to the close button to remove the sidebar when clicked.
		document.getElementById('closeSidebar').addEventListener('click', () => {
			sidebar.remove();
		});

		// Add event listener to the copy button to copy the content to clipboard.
		document.getElementById('copyContent').addEventListener('click', () => {
			const content = document.getElementById('sidebarContent').innerText;
			navigator.clipboard.writeText(content).then(() => {
				alert('Content copied to clipboard!');
			}).catch(err => {
				alert('Failed to copy content: ', err);
			});
		});
	}

	function refreshContent(title, content) {
		const sidebarTitleElement = document.getElementById('sidebarTitle');
		const sidebarContentElement = document.getElementById('sidebarContent');

		if (sidebarTitleElement && sidebarContentElement) {
			sidebarTitleElement.innerHTML = title; // Update the title.
			sidebarContentElement.innerHTML = `<p>${content}</p>`; // Update the content.
		}
	}
}