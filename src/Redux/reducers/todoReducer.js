/* eslint-disable import/no-anonymous-default-export */
import { Tooltip } from "bootstrap";
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case DELETE_TODO:
      const newState = state.filter((todo) => todo.id !== action.payload);
      return newState;

    case UPDATE_TODO:
      const updatedState = state.map((todo) => {
        if (todo.id === action.payload.todo.id) {
          todo.title = action.payload.todo.title;
          todo.status = action.payload.todo.status;
          return todo;
        }
        return todo;
      });

      return updatedState;
    default:
      return state;
  }
};
