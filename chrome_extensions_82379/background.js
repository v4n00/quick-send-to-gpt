const send = async (selectedText) => {
	const apiKey = 'YOUR_API_KEY';

	const existingResultDiv = document.getElementById('_resultDiv_');
	if (existingResultDiv) document.body.removeChild(existingResultDiv);

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
							text: 'I am going to give you multiple choice questions with possibly multiple answers. I need you to only give me the correct choice, no explanation, nothing else, not even the answer contents, just the correct variant (a, b, c, etc.). If I do not give you multiple choices, just give me the answer to the question. If there are multiple correct answers, give me them on the same line.',
						},
					],
				},
				{ role: 'user', content: selectedText },
			],
		}),
	});

	const result = (await response.json()).choices[0].message.content.trim();
	console.log(result);

	const resultDiv = document.createElement('div');
	resultDiv.id = '_resultDiv_';
	resultDiv.innerText = result;
	Object.assign(resultDiv.style, {
		position: 'fixed',
		top: '70px',
		left: '30px',
		color: 'black',
		zIndex: 10000,
	});

	const closeButton = document.createElement('p');
	closeButton.innerText = 'X';
	Object.assign(closeButton.style, {
		color: 'black',
		position: 'absolute',
		top: '0px',
		left: '-10px',
		cursor: 'pointer',
		fontSize: '9px',
	});
	closeButton.addEventListener('click', () => {
		document.body.removeChild(resultDiv);
	});

	resultDiv.appendChild(closeButton);
	document.body.appendChild(resultDiv);
};

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript(
		{
			target: { tabId: tab.id },
			func: () => {
				const selection = window.getSelection().toString().trim();
				window.getSelection().removeAllRanges();
				return selection;
			},
			args: [],
		},
		(result) => {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: send,
				args: [result[0].result],
			});
		}
	);
});
