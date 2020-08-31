import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase, { db } from '../config/fbConfig';
import TodoList from './TodoList';
import { firestore } from 'firebase';

const StyledTodo = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 480px;
  min-height: 600px;
  position: relative;
`;
const StyledDay = styled.h1`
  color: #5a5ee8;
  margin: 0;
  font-weight: 500;
`;
const StyledDayNumber = styled.span`
  font-weight: 400;
`;
const StyledCount = styled.span`
  color: #999;
`;
const StyledFlex = styled.div`
  padding: 25px;
  background: #f7f9fe;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #e0e9f1;
`;
const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const StyledBottom = styled.div`
  margin-top: 10px;
`;
const StyledMonth = styled.span`
  color: #999;
  font-weight: 400;
  margin-top: 10px;
`;
const StyledInput = styled.input`
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  padding: 25px;
  border: none;

  &:focus {
    outline: none;
  }
`;
const StyledForm = styled.form`
  border-bottom: 1px solid #eef3f8;
`;
const StyledButton = styled.button`
  background: #fa6869;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: none;
  font-size: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
  position: absolute;
  top: 85px;
  right: 25px;

  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
`;
const StyledNumber = styled.span`
  font-weight: 500;
`;

export default function Todo() {
  const [content, setContent] = useState('');
  const [todo, setTodo] = useState([]);
  const month = new Date().toLocaleString('default', { month: 'long' });
  const day = new Date().getDate();
  const dayName = new Date().toLocaleString('default', { weekday: 'long' });
  const [show, setShow] = useState(false);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection('todos')
      .get()
      .then((snap) =>
        snap.forEach((doc) => {
          db.collection('todos')
            .doc(doc.id)
            .update({
              todo: firebase.firestore.FieldValue.arrayUnion(content),
            });
        })
      );
    document.getElementById('input-todo').value = '';
  };

  const removeTodo = (e) => {
    e.preventDefault();
    e.persist();
    db.collection('todos')
      .get()
      .then((snap) =>
        snap.forEach((doc) => {
          db.collection('todos')
            .doc(doc.id)
            .update({
              todo: firebase.firestore.FieldValue.arrayRemove(
                e.target.innerText
              ),
            });
        })
      );
  };

  useEffect(() => {
    db.collection('todos').onSnapshot((snap) => {
      let changes = snap.docChanges();
      changes.forEach((change) => {
        const { todo } = change.doc.data();
        setTodo(todo);
      });
    });
  }, []);

  return (
    <StyledTodo className="todo">
      <StyledFlex>
        <StyledTop>
          <StyledDay>
            {dayName}, <StyledDayNumber>{day}</StyledDayNumber>
          </StyledDay>
          {todo.length === 1 ? (
            <StyledCount>
              <StyledNumber>{todo.length}</StyledNumber> Task
            </StyledCount>
          ) : (
            <StyledCount>
              <StyledNumber>{todo.length}</StyledNumber> Tasks
            </StyledCount>
          )}
        </StyledTop>
        <StyledBottom>
          <StyledMonth>{month}</StyledMonth>
        </StyledBottom>
      </StyledFlex>
      <StyledButton onClick={() => setShow(!show)}>+</StyledButton>
      {show ? (
        <StyledForm onSubmit={addTodo}>
          <StyledInput
            id="input-todo"
            type="text"
            placeholder="Add a todo"
            className="input-aside input-todo"
            autoComplete="off"
            onChange={(e) => setContent(e.target.value)}
          />
        </StyledForm>
      ) : null}
      <TodoList todo={todo} removeTodo={removeTodo}></TodoList>
    </StyledTodo>
  );
}
