/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Grid from "@mui/joy/Grid";
import { Input } from "@mui/joy";
import { useContext, useEffect } from "react";
import { TodoContext } from "../contexts/TodoContext";
export default function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  let [inputState, setInputState] = useState("");
  let [displayType, setDisplayType] = useState("all");
  function handelAddClick() {
    if (inputState) {
      let newTodo = {
        id: uuidv4(),
        title: inputState,
        details: "",
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      let currentTodos = [...todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(currentTodos));
      setInputState("");
    }
  }

  function handleInput(event) {
    setInputState(event.target.value);
  }

  //    filteritaion of todos by type of dispaly   //
  const compeltedTodos = todos.filter((t) => {
    return t.isCompleted === true;
  });
  const NotCompeltedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  let TodosToapper = todos;
  if (displayType === "completed") TodosToapper = compeltedTodos;
  else if (displayType === "notCompelted") TodosToapper = NotCompeltedTodos;
  let todosJSX = TodosToapper.map((t) => {
    return <Todo todo={t} key={t.id} />;
  });
  //    filteritaion of todos by type of dispaly   //

  useEffect(() => {
    let storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  function handleDisplayType(e) {
    setDisplayType(e.target.value);
  }
  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          minWidth: 275,
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" style={{ fontFamily: "A" }}>
            مهامي
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <ToggleButtonGroup
            exclusive
            style={{ direction: "ltr", marginTop: "20px" }}
            value={displayType}
            onChange={handleDisplayType}
          >
            <ToggleButton value="notCompelted">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {todosJSX}
        </CardContent>
        <Grid
          container
          spacing={2}
          sx={{ width: "100%", marginBottom: "10px" }}
        >
          <Grid xs={8}>
            <Input
              fullWidth
              value={inputState}
              onChange={(event) => {
                handleInput(event);
              }}
              style={{
                marginRight: "5px",
                padding: "8px",
              }}
            />
          </Grid>
          <Grid xs={4}>
            <Button
              onClick={handelAddClick}
              fullWidth
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px",
              }}
            >
              إضافة
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
