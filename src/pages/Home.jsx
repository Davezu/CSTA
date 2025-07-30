import React, {useState, useRef, useEffect} from 'react';

const Home = () => {
    const [todos,setTodos] = useState([]);
    const inputRef = useRef();

    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem('todos'));
        if(saved) {
            setTodos(saved);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));   
    }, [todos]);

    const addTodo = () => {
        const txt = inputRef.current.value.trim();
        if(txt === '') return;
        setTodos([...todos, {txt, completed: false}]);
        inputRef.current.value = '';
    };
    const toggleTodos = (index) =>{
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index.completed];
        setTodos(newTodos);
    }

    return(
        <div>
            <h1>Home Page</h1>
            <input type="text" ref={inputRef} placeholder="Add a todo" />
            <button onClick={addTodo}>Add Todo</button>

            <ul>
                {todos.map((todos,index) => (
                    <li key={index} onClick={() => toggleTodos(index)}>
                        {todos.txt}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Home;