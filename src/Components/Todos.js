import React, { useCallback, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import TodoHead from "./TodoHead";
import TodoItem from "./TodoItem";
import { cardStyle, containerStyle } from "./style";
import { connect } from "react-redux";
import { updateTodo } from "../Redux/actions/todo";

const Todos = ({ todos }) => {
  const [todoStatus, setTodoStatus] = useState("ALL");
  //   const [filteredTodos, setFilteredTodos] = useState([]);

  const setTodoStatusHandler = (status) => {
    setTodoStatus(status);
  };

  const filteredTodos = todos.filter((obj) =>
    todoStatus === "ALL" ? true : obj.status === todoStatus
  );

  return (
    <Container>
      <div style={{ marginTop: "30px" }}>
        <h3 className="text-center" style={{ color: "#616263" }}>
          TODO LIST
        </h3>
      </div>
      <Container style={containerStyle}>
        <TodoHead setTodoStatusHandler={setTodoStatusHandler} />
        <Card style={cardStyle}>
          <Card.Body>
            {filteredTodos?.map((todo, index) => {
              return <TodoItem item={todo} index={index} />;
            })}
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { todos: state.todos };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
