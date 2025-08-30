// src/components/TodoList.jsx
import { useMemo, useCallback } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos = [], query = "", onToggle, onDelete }) => {
  const filtrados = useMemo(() => {
    const q = (query ?? "").toString().toLowerCase().trim();
    if (!q) return todos;
    return todos.filter((t) => t.text?.toString().toLowerCase().includes(q));
  }, [todos, query]);

  const handleToggle = useCallback((id) => onToggle?.(id), [onToggle]);
  const handleDelete = useCallback((id) => onDelete?.(id), [onDelete]);

  if (!filtrados.length) {
    return <p style={{ marginTop: 8 }}>Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="list">
      {filtrados.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
