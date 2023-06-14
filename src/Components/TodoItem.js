import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import {
  UnCheckButtonStyle,
  cardStyling,
  checkButtonStyle,
  iconColor,
  modalSelectStyle,
  seletedTitle,
  unSeletedTitle,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteTodo, updateTodo } from "../Redux/actions/todo";
import { connect } from "react-redux";

const TodoItem = ({ item, index, deleteTodo, updateTodo }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  const [todo, setTodo] = useState({
    title: item.title,
    status: item.status,
    time: item.time,
    id: item.id,
  });

  useEffect(() => {
    setTodo({
      title: item.title,
      status: item.status,
      time: item.time,
      id: item.id,
    });
    if (item.status === "COMPLETE") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [item.id, item.title, item.status, item.time]);

  const handleStatusClick = () => {
    if (!isChecked) {
      handleUpdateItem({ ...todo, status: "COMPLETE" });
    } else {
      handleUpdateItem({ ...todo, status: "INCOMPLETE" });
    }

    setIsChecked(!isChecked);
  };

  const handleDeleteItem = () => {
    deleteTodo(todo.id);
  };

  const handleUpdateItem = (todo) => {
    updateTodo(todo, todo.id);
    handleEditClose();
  };
  const buttonText = isChecked ? (
    <FontAwesomeIcon
      icon={faCheck}
      style={{ color: "white", fontSize: "20px" }}
    />
  ) : null;

  useEffect(() => {
    if (item.status === "COMPLETE") {
      setIsChecked(true);
    }
    if (item.status === "INCOMPLETE") {
      setIsChecked(false);
    }
  }, [todo.status]);

  return (
    <div>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Body style={cardStyling}>
          <Row pr={10}>
            <Col md={1}>
              <Button
                style={isChecked ? checkButtonStyle : UnCheckButtonStyle}
                onClick={handleStatusClick}
                aria-pressed={isChecked}
                variant={isChecked ? "primary" : "outline-primary"}
              >
                {buttonText}
              </Button>
            </Col>
            <Col md={8} xs={6}>
              <Row>
                <Card.Title
                  style={{
                    ...(isChecked ? seletedTitle : unSeletedTitle),
                    fontSize: "2vw", // Adjust the font size for larger screens
                  }}
                >
                  {todo.title}
                </Card.Title>
              </Row>
              <Row>
                <Card.Subtitle
                  style={{
                    fontSize: "1vw", // Adjust the font size for larger screens
                  }}
                  className="mb-2 text-muted"
                >
                  {todo.time}
                </Card.Subtitle>
              </Row>
            </Col>
            <Col md={1} xs={3}>
              <Button onClick={handleDeleteItem} style={UnCheckButtonStyle}>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ color: "black", fontSize: "20px" }}
                />
              </Button>
            </Col>
            <Col md={1} xs={3}>
              <Button onClick={handleEditShow} style={UnCheckButtonStyle}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ color: "black", fontSize: "20px" }}
                />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal
        style={{ color: "#4A658A" }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showEditModal}
        onHide={handleEditClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Label>Title</Form.Label>
            <InputGroup className="mb-3 mt-1">
              <Form.Control
                aria-label="Text input with checkbox"
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
            onClick={() => handleUpdateItem(todo)}
          >
            Update Task
          </Button>
          <Button
            style={{
              backgroundColor: "#E2E5F0",
              color: "#5c5858",
              border: "0px",
            }}
            onClick={handleEditClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  updateTodo: (todo, id) => dispatch(updateTodo(todo, id)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
