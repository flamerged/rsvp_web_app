/* eslint-disable no-tabs */
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
	const name = document.createElement('span');
	const listItem = document.createElement('Li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	const editButton = document.createElement('button');
	const removeButton = document.createElement('button');

	name.textContent = text;
	checkbox.type = 'checkbox';
	label.textContent = 'Confirmed';
	editButton.textContent = 'Edit';
	removeButton.textContent = 'Remove';

	listItem.appendChild(name);
	label.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editButton);
	listItem.appendChild(removeButton);
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
		const input = listParent.querySelector('input');


		if (button.textContent === 'Remove') {
			listParent.remove();
		} else if (button.textContent === 'Edit') {
			const newInput = document.createElement('input');
			button.textContent = 'Save';
			newInput.type = 'text';
			newInput.value = span.textContent;

			listParent.replaceChild(newInput, span);
		} else if (button.textContent === 'Save') {
			const newSpan = document.createElement('span');

			button.textContent = 'Edit';
			newSpan.textContent = input.value;

			listParent.replaceChild(newSpan, input);
		}
	}
});
