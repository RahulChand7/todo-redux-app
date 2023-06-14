import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { modalSelectStyle, selectStyle } from "./style";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { addTodo } from "../Redux/actions/todo";
import { connect } from "react-redux";
import { v4 } from "uuid";

const TodoHead = ({ addTodo, setTodoStatusHandler }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddClose = () => setShowAddModal(false);
  const handleEditShow = () => setShowAddModal(true);

  const getCurrentDateTime = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    let hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    let amPm = hours >= 12 ? "PM" : "AM";

    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours %= 12;
    }

    const formattedDateTime = `${hours}:${minutes} ${amPm}, ${day}-${month}-${year}`;

    return formattedDateTime;
  };

  const [todo, setTodo] = useState({
    title: "",
    status: "",
    time: "",
    id: "",
  });

  const handleAddTodo = () => {
    let currentTime = getCurrentDateTime();
    const todoObj = { ...todo };
    todoObj.time = currentTime;
    todoObj.id = v4();

    setTodo(todoObj);

    //adding in store
    addTodo(todoObj);

    setTodo({
      title: "",
      status: "",
      time: "",
      id: "",
    });

    handleAddClose();
  };

  return (
    <div>
      <Row>
        <Col>
          <Button
            onClick={handleEditShow}
            style={{ backgroundColor: "#6171EB" }}
          >
            Add Todo
          </Button>{" "}
        </Col>
        <Col>
          <Form.Select
            style={selectStyle}
            onChange={(e) => setTodoStatusHandler(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="COMPLETE">Complete</option>
            <option value="INCOMPLETE">Incomplete</option>
          </Form.Select>
        </Col>
      </Row>

      <Modal
        // size="lg"
        style={{ color: "#4A658A" }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showAddModal}
        onHide={handleAddClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Label>Title</Form.Label>
            <InputGroup className="mb-3 mt-1">
              <Form.Control
                aria-label="Text input with checkbox"
                type="text"
                placeholder="Enter title here"
                value={todo.title}
                onChange={(event) =>
                  setTodo({ ...todo, title: event.target.value })
                }
              />
            </InputGroup>
          </div>
          <div>
            <Form.Label>Status</Form.Label>
            <br />
            <Form.Select
              style={modalSelectStyle}
              value={todo.status}
              onChange={(event) =>
                setTodo({ ...todo, status: event.target.value })
              }
            >
              <option>Select status</option>
              <option value="COMPLETE">Complete</option>
              <option value="INCOMPLETE">Incomplete</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button
            style={{ backgroundColor: "#6171EB" }}
            onClick={handleAddTodo}
          >
            Add Task
          </Button>
          <Button
            style={{
              backgroundColor: "#E2E5F0",
              color: "#5c5858",
              border: "0px",
            }}
            onClick={handleAddClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
});

export default connect(mapDispatchToProps, mapDispatchToProps)(TodoHead);
