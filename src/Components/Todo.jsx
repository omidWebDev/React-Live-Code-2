import { useState, useEffect } from 'react';
import todo_icon from '../Icon/todo_icon.png';
import TodoItems from './TodoItems';

function Todo() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTasks = () => {
    if (inputText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputText.trim(),
        isComplate: false,
      };
      setTasks([...tasks, newTask]);
      setInputText("");
    }
  };

  const handleOnChange = (e) => setInputText(e.target.value);
  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') addTasks();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplate = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isComplate: !task.isComplate } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='bg-white w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-md'>
      <div className='flex bg-sky-400 p-2 rounded-xl items-center'>
        <img className='w-10 h-10' src={todo_icon} alt="Todo Icon" />
        <h1 className='font-semibold p-2 text-2xl text-white'>To Do List</h1>
      </div>

      <div className="flex p-0 my-4 bg-sky-100 rounded-full overflow-hidden">
        <input
          className="bg-transparent flex-1 border-0 outline-none px-4 py-2 placeholder:text-slate-600 text-slate-700"
          type="text"
          placeholder="Add your task"
          value={inputText}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
        <button
          className="border-0 bg-indigo-500 hover:bg-indigo-600 px-4 text-white font-medium transition-colors"
          onClick={addTasks}
        >
          ADD
        </button>
      </div>

      <div>
        {tasks.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplate={item.isComplate}
            onDelete={deleteTask}
            onToggle={toggleComplate}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;
