// Import Firebase modules
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Get Firestore instance
const db = getFirestore();

// Элементы списка задач
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-button');

// Элементы гифок
const gifDefault = document.getElementById('gif-default');
const gifAlternate = document.getElementById('gif-alternate');
const showGifButton = document.getElementById('show-gif-button');

// Function to display tasks
async function displayTasks() {
    taskList.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        const task = doc.data();
        const li = document.createElement('li');
        li.textContent = task.text;
        taskList.appendChild(li);
    });
}

// Add a new task
addButton.addEventListener('click', async () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        await addDoc(collection(db, "tasks"), { text: taskText });
        newTaskInput.value = '';
        displayTasks();
    }
});

// Initial task display
displayTasks();

// Гифки
showGifButton.addEventListener('click', () => {
    gifDefault.style.display = 'none';
    gifAlternate.style.display = 'inline';

    setTimeout(() => {
        gifDefault.style.display = 'inline';
        gifAlternate.style.display = 'none';
    }, 2000);
});