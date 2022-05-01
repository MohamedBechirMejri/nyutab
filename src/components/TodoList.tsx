import React from "react";

const TodoList = () => {
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      text: "Learn React",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Learn TypeScript",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Learn Angular",
      isCompleted: false,
    },
  ]);

  const [inputText, setInputText] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: inputText,
        isCompleted: false,
      },
    ]);
    setInputText("");
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggle(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
                color: todo.isCompleted ? "gray" : "black",
                cursor: "pointer",
              }}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>{" "}
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TodoList;
