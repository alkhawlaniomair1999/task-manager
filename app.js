// عناصر DOM
const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('task-category');
const taskDate = document.getElementById('task-date');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// تحميل المهام المحفوظة عند فتح الصفحة
window.onload = loadTasks;

// إضافة مهمة جديدة
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const category = taskCategory.value;
    const dueDate = taskDate.value;

    if (taskText !== '' && dueDate !== '') {
        addTask(taskText, category, dueDate);
        saveTasks();
        taskInput.value = '';
        taskDate.value = '';
    }
});

// إضافة المهمة إلى القائمة
function addTask(taskText, category, dueDate, completed = false) {
    const task = document.createElement('div');
    task.className = `task ${completed ? 'completed' : ''}`;
    task.innerHTML = `
        <div class="task-details">
            <span class="task-name">${taskText}</span>
            <span class="task-category">Category: ${category}</span>
            <span class="task-date">Due: ${dueDate}</span>
        </div>
        <div class="task-buttons">
            <button class="complete-btn">✔</button>
            <button class="delete-btn">❌</button>
        </div>
    `;

    // زر إكمال المهمة
    task.querySelector('.complete-btn').addEventListener('click', () => {
        task.classList.toggle('completed');
        saveTasks();
    });

    // زر حذف المهمة
    task.querySelector('.delete-btn').addEventListener('click', () => {
        taskList.removeChild(task);
        saveTasks();
    });

    taskList.appendChild(task);
}

// حفظ المهام في Local Storage
function saveTasks() {
    const tasks = [...taskList.children].map(task => ({
        text: task.querySelector('.task-name').textContent,
        category: task.querySelector('.task-category').textContent.replace('Category: ', ''),
        dueDate: task.querySelector('.task-date').textContent.replace('Due: ', ''),
        completed: task.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// تحميل المهام من Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTask(task.text, task.category, task.dueDate, task.completed));
}
