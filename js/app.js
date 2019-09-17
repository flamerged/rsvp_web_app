/* eslint-disable no-tabs */
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('registrar');
	const input = form.querySelector('input');
	const list = document.getElementById('invitedList');
	const mainDiv = list.parentNode;

	const div = document.createElement('div');
	const filterLabel = document.createElement('label');
	const filterCheckbox = document.createElement('input');

	filterLabel.textContent = 'Hide those who haven\'t resonded';
	filterCheckbox.type = 'checkbox';
	div.appendChild(filterLabel);
	div.appendChild(filterCheckbox);
	mainDiv.insertBefore(div, list);

	function createLi(text) {
		function createElement(elemntName, property, value) {
			const element = document.createElement(elemntName);
			element[property] = value;
			return element;
		}
		const listItem = createElement('Li');

		function appendToLi(elemntName, property, value) {
			const element = createElement(elemntName, property, value);
			listItem.appendChild(element);
			return element;
		}

		appendToLi('span', 'textContent', text);
		appendToLi('label', 'textContent', 'confirmed')
			.appendChild(createElement('input', 'type', 'checkbox'));
		appendToLi('button', 'textContent', 'Edit');
		appendToLi('button', 'textContent', 'Remove');

		return listItem;
	}

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const text = input.value;
		input.value = '';

		list.appendChild(createLi(text));
	});

	list.addEventListener('change', (event) => {
		const checkbox = event.target;
		const { checked } = checkbox;
		const listParent = checkbox.parentNode.parentNode;
		if (checked) {
			listParent.className = 'responded';
		} else {
			listParent.className = '';
		}
	});

	filterCheckbox.addEventListener('change', (event) => {
		const isChecked = event.target.checked;
		const listChildren = list.children;

		if (isChecked) {
			for (let i = 0; i < listChildren.length; i += 1) {
				if (listChildren[i].className !== 'responded') {
					listChildren[i].style.display = 'none';
				} else {
					listChildren[i].style.display = '';
				}
			}
		} else {
			for (let i = 0; i < listChildren.length; i += 1) {
				listChildren[i].style.display = '';
			}
		}
	});

	list.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			const button = event.target;
			const listParent = button.parentNode;
			const span = listParent.querySelector('span');
			const inputInList = listParent.querySelector('input');
			const action = button.textContent.toLowerCase();
			const nameActions = {
				remove: () => listParent.remove(),
				edit: () => {
					const newInput = document.createElement('input');
					button.textContent = 'Save';
					newInput.type = 'text';
					newInput.value = span.textContent;
					listParent.replaceChild(newInput, span);
				},
				save: () => {
					const newSpan = document.createElement('span');

					button.textContent = 'Edit';
					newSpan.textContent = inputInList.value;

					listParent.replaceChild(newSpan, inputInList);
				},
			};

			nameActions[action]();
		}
	});
});
