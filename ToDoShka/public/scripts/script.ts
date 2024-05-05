function completeTask(button: HTMLElement) {
    const task = button.closest('.task') as HTMLElement;
    const completedList = document.getElementById('completed-list') as HTMLElement;
    completedList.appendChild(task);
}

function deleteTask(button: HTMLElement) {
    const task = button.closest('.task') as HTMLElement;
    const deletedList = document.getElementById('deleted-list') as HTMLElement;
    deletedList.appendChild(task);
}

function removeTaskPermanently(button: HTMLElement) {
    const task = button.closest('.task') as HTMLElement;
    if (task) {
        task.remove();
    }
}

document.getElementById('deleted-list')!.addEventListener('click', function(event: MouseEvent) {
    const targetButton = (event.target as HTMLElement).closest('.task-actions button.delete') as HTMLElement;
    if (targetButton) {
        removeTaskPermanently(targetButton);
    }
});

function activateTask(button: HTMLElement) {
    const task = button.closest('.task') as HTMLElement;
    const activeList = document.getElementById('active-list') as HTMLElement;
    activeList.appendChild(task);
}

function showTab(tabName: string) {
    const tabs: string[] = ['active', 'completed', 'deleted'];

    tabs.forEach(tab => {
        const tabList = document.getElementById(`${tab}-list`) as HTMLElement;
        const header = document.getElementById('header') as HTMLElement;

        if (tab === tabName) {
            tabList.style.display = 'block';
            header.style.backgroundColor = getTabColor(tab);
        } else {
            tabList.style.display = 'none';
        }
    });

    if (tabName === 'deleted') {
        const deleteButtons = document.querySelectorAll('.task-actions button.delete') as NodeListOf<HTMLElement>;
        deleteButtons.forEach(button => {
            button.onclick = () => {
                removeTaskPermanently(button);
            };
        });
    }
    
}

document.querySelectorAll('.tabs button').forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.textContent.toLowerCase();
        showTab(tabName);
    });
});

function getTabColor(tab: string): string {
    switch (tab) {
        case 'active':
            return 'yellow';
        case 'completed':
            return 'green';
        case 'deleted':
            return 'red';
        default:
            return '#ddd';
    }
}

function openAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup') as HTMLElement;
    addTaskPopup.style.display = 'flex';
}

function closeAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup') as HTMLElement;
    addTaskPopup.style.display = 'none';
}

function addTaskFromPopup() {
    const newTaskInput = document.getElementById('new-task-popup') as HTMLInputElement;
    const taskDescriptionInput = document.getElementById('task-description-popup') as HTMLInputElement;
    const taskDueDateInput = document.getElementById('task-due-date-popup') as HTMLInputElement;
    const activeList = document.getElementById('active-list') as HTMLElement;

    if (newTaskInput.value.trim() !== '') {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.innerHTML = `
            <div class="task-name">
                <span><strong>${newTaskInput.value}</strong></span>
            </div>
            <div class="task-desc">
                <span>${taskDescriptionInput.value}</span>
            </div>
            <div class="task-time">
                <span>${taskDueDateInput.value}</span>
            </div>
            <div class="task-actions">
                <button class="complete" onclick="completeTask(this)">
                    <img src="images/Checkmark.png" alt="В завершенные">
                </button>
                <button class="delete" onclick="deleteTask(this)">
                    <img src="images/Trash.png" alt="В удаленные">
                </button>
                <button class="active" onclick="activateTask(this)">
                <img src="images/Clock.png" alt="В активные">
            </button>
            </div>
        `;
        activeList.appendChild(newTask);

        newTaskInput.value = '';
        taskDescriptionInput.value = '';
        taskDueDateInput.value = '';

        closeAddTaskPopup();
    }
}

function sortByName() {
    const tasks = Array.from(document.querySelectorAll('.task')) as HTMLElement[];
    tasks.sort((a, b) => {
        const aName = (a.querySelector('.task-name') as HTMLElement).innerText;
        const bName = (b.querySelector('.task-name') as HTMLElement).innerText;
        return aName.localeCompare(bName);
    });

    const activeList = document.getElementById('active-list') as HTMLElement;
    activeList.innerHTML = '';
    tasks.forEach(task => {
        activeList.appendChild(task);
    });
}

document.getElementById('sort-by-name')!.addEventListener('click', sortByName);

function sortByDueDate() {
    const tasks = Array.from(document.querySelectorAll('.task')) as HTMLElement[];
    tasks.sort((a, b) => {
        const aDate = new Date((a.querySelector('.task-time') as HTMLElement).innerText);
        const bDate = new Date((b.querySelector('.task-time') as HTMLElement).innerText);
        return aDate.getTime() - bDate.getTime();
    });

    const activeList = document.getElementById('active-list') as HTMLElement;
    activeList.innerHTML = '';
    tasks.forEach(task => {
        activeList.appendChild(task);
    });
}

document.getElementById('sort-by-due-date')!.addEventListener('click', sortByDueDate);

function searchByName() {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchText = searchInput.value.toLowerCase();
    const tasks = Array.from(document.querySelectorAll('.task')) as HTMLElement[];

    tasks.forEach(task => {
        const taskName = (task.querySelector('.task-name') as HTMLElement).innerText.toLowerCase();
        if (taskName.includes(searchText)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

document.getElementById('search-button')!.addEventListener('click', searchByName);


showTab('active');
