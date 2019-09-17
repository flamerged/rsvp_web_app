/* eslint-disable no-tabs */
const form = document.getElementById('registrar');
const input = form.querySelector('input');
const list = document.getElementById('invitedList');

function createLi(text) {
	const listItem = document.createElement('Li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	const editButton = document.createElement('button');
	const removeButton = document.createElement('button');

	listItem.textContent = text;
	checkbox.type = 'checkbox';
	label.textContent = 'Confirmed';
	editButton.textContent = 'Edit';
	removeButton.textContent = 'Remove';

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

list.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		const button = event.target;
		const listParent = button.parentNode;

		if (button.textContent === 'Remove') {
			listParent.remove();
		} else if (button.textContent === 'Edit') {
			
		}
	}
});
