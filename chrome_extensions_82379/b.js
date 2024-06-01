chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: 'send',
		title: ' ',
		contexts: ['selection'],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === 'send' && info.selectionText) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: send,
			args: [info.selectionText],
		});
	}
});

const send = async (selectedText) => {
	const url = 'https://api.openai.com/v1/chat/completions';
	const apiKey = 'YOUR_API_KEY';

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [
				{
					role: 'system',
					content: [
						{
							type: 'text',
							text: 'I am going to give you multiple choice questions with possibly multiple answers. I need you to only give me the correct choice, no explanation, nothing else. If I do not give you multiple choices, just give me the answer to the question.',
						},
					],
				},
				{ role: 'user', content: selectedText },
			],
		}),
	});

	const result = (await response.json()).choices[0].message.content.trim();

	const resultDiv = document.createElement('div');
	resultDiv.innerText = result;
	Object.assign(resultDiv.style, {
		position: 'fixed',
		bottom: '10px',
		right: '10px',
		padding: '10px',
		backgroundColor: 'white',
		border: '1px solid #ccc',
		color: 'black',
		zIndex: 10000,
	});

	const closeButton = document.createElement('p');
	closeButton.innerText = 'X';
	Object.assign(closeButton.style, {
		color: 'black',
		position: 'absolute',
		top: '-12px',
		right: '-5px',
		cursor: 'pointer',
		fontSize: '16px',
	});
	closeButton.addEventListener('click', () => {
		document.body.removeChild(resultDiv);
	});

	resultDiv.appendChild(closeButton);
	document.body.appendChild(resultDiv);
};
