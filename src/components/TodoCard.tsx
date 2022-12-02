import React, { FC, useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit, AiOutlineFileDone } from 'react-icons/ai';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  element: Todo;
  todos: Todo[];
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const TodoCard: FC<Props> = ({ element, todos, setTodos, index }) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(element.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  // * Function to mark done todo * //
  const handleDone = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };
  // * Function to delet todo * //
  const handleDelet = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // * Function to submit the edited todo * //
  const handleEdiit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: editTodo } : todo
    );
    setTodos(updatedTodos);
    setEdit(false);
  };

  // * focus the edit input when user clicks on edit * //
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={element.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdiit(e, element.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <>
            {(() => {
              if (edit) {
                return (
                  <input
                    ref={inputRef}
                    value={editTodo}
                    type="input"
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todos__single--text"
                  />
                );
              }

              if (element.isDone) {
                return <s className="todos__single--text">{element.todo}</s>;
              }

              return (
                <span className="todos__single--text">{element.todo}</span>
              );
            })()}
            <div>
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !element.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelet(element.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(element.id)}>
                <AiOutlineFileDone />
              </span>
            </div>
          </>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
