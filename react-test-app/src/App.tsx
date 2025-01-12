import React, { useEffect, useState } from 'react';
import './App.css';
import { Task } from './Task';
import { addTask, deleteTask, fetchTasks, toggleTask } from './api';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);
  
  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    addTask(newTask).then((task) => {
      const taskAdd: Task = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
  
      setTasks([...tasks, taskAdd]);
      setNewTask('');
    });
    
  };

  // Toggle task completion
  // const toggleTask = (id: number) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };

  const handleToggleTask = (id: number, completed: boolean) => {
    toggleTask(id, !completed).then(() => {
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !completed } : task)));
    });
  };

  // Remove a task
  const removeTask = (id: number) => {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };
  
  if (loading) return <p>Loading tasks...</p>;

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
        <button onClick={handleAddTask}>Add Task</button>
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
            <span 
            onClick={() => handleToggleTask(task.id, task.completed)} 
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}>
              {task.title}
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
