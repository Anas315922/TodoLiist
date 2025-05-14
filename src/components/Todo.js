import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "../App.css";
import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useState } from "react";

// imports to delete modal
export default function Todo({ todo, showModalToDelete, showModalToUpdate }) {
  const { todos, setTodos } = useContext(TodoContext);

  function handleCkeckClick() {
    let currentTodo = todos.map((t) => {
      if (t.id === todo.id) t.isCompleted = !t.isCompleted;

      return t;
    });
    setTodos(currentTodo);
    localStorage.setItem("todos", JSON.stringify(currentTodo));
  }

  function handleUpdateCLick() {
    showModalToUpdate(todo);
  }

  function handleDeleteClick() {
    showModalToDelete(todo);
  }

  return (
    <>
      <Card
        style={{
          width: "100%",
          backgroundColor: "hsl(209.74deg 100% 22.94%)",
          color: "white",
          marginTop: "30px",
        }}
        className="cardClass"
      >
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={7} marginRight={"10px"}>
            <h3
              style={{
                margin: "10px",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}{" "}
            </h3>
            <p style={{ fontSize: "20px" }}>{todo.details} </p>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent=" space-between"
            alignItems="center"
          >
            <IconButton
              aria-label="ckeck"
              style={{
                color: todo.isCompleted ? "white" : "#8bc34a",
                backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                border: "solid #8bc34a 3px",
              }}
              className="classButton"
              onClick={handleCkeckClick}
            >
              <CheckIcon />
            </IconButton>

            <IconButton
              aria-label="edit
          "
              style={{
                color: "#242454",
                backgroundColor: "white",
                border: "solid #242454 3px",
              }}
              className="classButton"
              onClick={handleUpdateCLick}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              style={{
                color: "rgb(180 23 23)",
                backgroundColor: "white",
                border: "solid rgb(180 23 23) 3px",
              }}
              className="classButton"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
