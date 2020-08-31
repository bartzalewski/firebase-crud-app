import React from 'react';
import styled from 'styled-components';

const StyledTodoItem = styled.div`
  padding: 25px;
  border-bottom: 1px solid #eef3f8;
`;

const StyledTodoName = styled.span`
  font-weight: 400;
  color: #555;
  transition: 0.2s;
  &:hover {
    text-decoration: line-through;
    transition: 0.2s;
    cursor: pointer;
  }
`;

const TodoList = ({ todo, removeTodo }) => {
  const todoList = todo.length ? (
    todo.map((todo) => {
      return (
        <StyledTodoItem key={todo} onClick={removeTodo}>
          <StyledTodoName>{todo}</StyledTodoName>
        </StyledTodoItem>
      );
    })
  ) : (
    <StyledTodoItem>You have no todo</StyledTodoItem>
  );
  return todoList;
};

export default TodoList;
