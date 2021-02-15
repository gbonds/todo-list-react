import React, {useState} from "react";
import {nanoid} from "nanoid";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

// TODO further separate out components into header, form, and list

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = {
      id: "todo-" + nanoid(),
      name: name,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if task has same ID as edited task
      if (id===task.id) {
        // make new object with inverted completed prop
        return {...task, completed: !task.completed}
      }
      // if no match, return original task without edits
      return task;
    });
    setTasks(updatedTasks);
  };

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if task has same ID as edited task
      if (id===task.id) {
        // change task name to newName
        return {...task, name:newName}
      }
      // if not match, return original task without edits
      return task;
    });
    setTasks(editedTaskList);
  };

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  };

  const taskList = tasks.map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask = {editTask}
        deleteTask = {deleteTask}
      />
    )
  );

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const listHeadingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {listHeadingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
