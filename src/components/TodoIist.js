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
import { useState, useMemo } from "react";
import Grid from "@mui/joy/Grid";
import { Input } from "@mui/joy";
import { useContext, useEffect } from "react";
import { TodoContext } from "../contexts/TodoContext";

// imports to delete modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
// imports to delete modal
export default function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  let [inputState, setInputState] = useState("");
  let [displayType, setDisplayType] = useState("all");
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [modalTodo, setModalTodo] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
  const compeltedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted === true;
    });
  }, [todos]);

  const NotCompeltedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted === false;
    });
  }, [todos]);

  //  End of filteritaion of todos by type of dispaly   //

  //first Time to get the todos from local storage
  useEffect(() => {
    let storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  //first Time to get the todos from local storage
  function handleDisplayType(e) {
    setDisplayType(e.target.value);
  }
  function handleDeleteClick(todo) {
    setModalTodo(todo);
    setshowDeleteModal(true);
  }
  function handleDeleteModalOnClose() {
    setshowDeleteModal(false);
  }
  function handleDeleteConfirm() {
    let currentTodo = todos.filter((t) => {
      if (t.id === modalTodo.id) return false;
      else return true;
    });
    setTodos(currentTodo);
    localStorage.setItem("todos", JSON.stringify(currentTodo));
    handleDeleteModalOnClose();
  }
  function handleUpdateOnClose() {
    setShowUpdateModal(false);
  }

  function handleUpdatedConfirm() {
    let currentTodo = todos.map((t) => {
      if (t.id === modalTodo.id) {
        return {
          ...t,
          title: modalTodo.title,
          details: modalTodo.details,
        };
      } else return t;
    });
    setTodos(currentTodo);
    localStorage.setItem("todos", JSON.stringify(currentTodo));
    handleUpdateOnClose();
  }
  let TodosToapper = todos;
  if (displayType === "completed") TodosToapper = compeltedTodos;
  else if (displayType === "notCompelted") TodosToapper = NotCompeltedTodos;
  let todosJSX = TodosToapper.map((t) => {
    return (
      <Todo
        todo={t}
        key={t.id}
        showModalToDelete={handleDeleteClick}
        showModalToUpdate={handleUpdateCLick}
      />
    );
  });
  function handleUpdateCLick(todo) {
    setModalTodo(todo);
    setShowUpdateModal(true);
  }
  return (
    <Container maxWidth="sm">
      {/* Delete Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteModalOnClose}
        open={showDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ width: "400px" }}>
          هل أنت متاكد من قرار حذفك للمهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن استرجاع المهمة بعد الحذف{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm}>موافق</Button>
          <Button autoFocus onClick={handleDeleteModalOnClose}>
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
      {/*End Of Delete Modal */}

      {/* Update Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateOnClose}
        open={showUpdateModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ width: "400px" }}>
          تعديل المهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            value={modalTodo.title}
            autoFocus
            required
            margin="dense"
            id="name"
            label="العنوان"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalTodo({ ...modalTodo, title: e.target.value });
            }}
          />
          <TextField
            value={modalTodo.details}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalTodo({ ...modalTodo, details: e.target.value });
            }}
          />
          <DialogActions>
            <Button onClick={handleUpdatedConfirm}>تحديث</Button>
            <Button autoFocus onClick={handleUpdateOnClose}>
              إغلاق
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/*End Of Update Modal */}
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
