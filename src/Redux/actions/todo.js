import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./actionTypes";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const updateTodo = (todo, id) => {
  return {
    type: UPDATE_TODO,
    payload: { todo: todo, todoId: id },
  };
};
