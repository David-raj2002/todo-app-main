const theme = document.getElementById('theme');
const newItemInput = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
const itemLeft = document.querySelector('.items-left span');

// Update the count of unchecked items dynamically
function updateItemsLeft() {
    const totalUnchecked = document.querySelectorAll('.list-item input[type="checkbox"]:not(:checked)').length;
    itemLeft.innerText = totalUnchecked;
}

// Theme toggle functionality
theme.addEventListener('click', () => {
    document.body.className = theme.checked ? 'theme-light' : 'theme-dark';
});

// Initialize the items left count
updateItemsLeft();

// Function to add a new to-do item
function addNewItem(text) {
    const newLi = document.createElement('li');
    newLi.className = 'flex-row';

    const label = document.createElement('label');
    label.className = 'list-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'todoItem';

    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';

    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.textContent = text;

    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove';

    label.appendChild(checkbox);
    label.appendChild(checkmark);
    label.appendChild(textSpan);

    newLi.appendChild(label);
    newLi.appendChild(removeBtn);

    todoList.appendChild(newLi);

    // Update the count after adding a new item
    updateItemsLeft();
}

// Event listener for the input field to add new items
newItemInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && newItemInput.value.trim() !== '') {
        addNewItem(newItemInput.value.trim());
        newItemInput.value = ''; // Clear the input field
    }
});

// Event listener for the to-do list container
todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        // Remove the item
        const listItem = event.target.closest('li');
        if (listItem) {
            listItem.remove();
            updateItemsLeft(); // Update count after removal
        }
    }

    if (event.target.type === 'checkbox') {
        // Update count on checkbox toggle
        updateItemsLeft();
    }
});
