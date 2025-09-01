import React, { useState, useRef, useEffect } from 'react';

function Home() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]');
    if (saved) {
      setTodos(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!inputRef.current) return;
    const txt = inputRef.current.value.trim();
    if (txt === '') return;
    setTodos([...todos, { txt, completed: false }]);
    inputRef.current.value = '';
  };

  const toggleTodos = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <input type="text" ref={inputRef} placeholder="Add a todo" />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} onClick={() => toggleTodos(index)}>
            {todo.txt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home; 