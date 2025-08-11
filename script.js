// script.js

// Import Firebase modules from CDN links
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


// Get Firestore instance
const db = getFirestore();

const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-button');

// Function to display tasks
async function displayTasks() {
    taskList.innerHTML = ''; // Clear existing list
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
        newTaskInput.value = ''; // Clear input
        displayTasks(); // Refresh the task list
    }
});

// Initial task display
displayTasks();