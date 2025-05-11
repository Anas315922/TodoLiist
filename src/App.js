import "./App.css";
import { TodoContext } from "./contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TodoList from "./components/TodoIist";
let initialTodos = [
  {
    id: uuidv4(),
    title: "المهمة الاولى",
    details: "1تفاصيل",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثانية",
    details: "2تفاصيل",
    isCompleted: false,
  },
];
function App() {
  let [todos, setTodos] = useState(initialTodos);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        direction: "rtl",
        backgroundColor: "rgb(0 0 0 / 87%)",
      }}
    >
      <TodoContext.Provider value={{ todos, setTodos }}>
        <TodoList></TodoList>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
