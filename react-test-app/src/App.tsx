import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === '') return;

    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  // Toggle task completion
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove a task
  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              marginBottom: '8px',
            }}
          >
            <span onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer' }}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
