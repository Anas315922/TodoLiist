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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// imports to delete modal
export default function Todo({ todo, ckeckClick }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  function handleCkeckClick() {
    let currentTodo = todos.map((t) => {
      if (t.id === todo.id) t.isCompleted = !t.isCompleted;

      return t;
    });
    setTodos(currentTodo);
    localStorage.setItem("todos", JSON.stringify(currentTodo));
  }
  function handleDeleteClick() {
    setshowDeleteModal(true);
  }
  function handleDeleteModalOnClose() {
    setshowDeleteModal(false);
  }
  function handleUpdateOnClose() {
    setShowUpdateModal(false);
  }

  function handleDelteConfirm() {
    let currentTodo = todos.filter((t) => {
      if (t.id === todo.id) return false;
      else return true;
    });
    setTodos(currentTodo);
    localStorage.setItem("todos", JSON.stringify(currentTodo));
    handleDeleteModalOnClose();
  }
  function handleUpdatedConfirm() {
    let currentTodo = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else return t;
    });
    setTodos(currentTodo);
    localStorage.setItem("todos", JSON.stringify(currentTodo));
    handleUpdateOnClose();
  }

  return (
    <>
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
          <Button onClick={handleDelteConfirm}>موافق</Button>
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
            value={updatedTodo.title}
            autoFocus
            required
            margin="dense"
            id="name"
            label="العنوان"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            value={updatedTodo.details}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
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
              aria-label="delete"
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
              onClick={() => {
                setShowUpdateModal(true);
              }}
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
