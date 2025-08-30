// src/components/TodoItem.jsx
import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="item">
      <label style={{ flex: 1 }}>
        <input
          type="checkbox"
          checked={!!todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span
          style={{
            marginLeft: 8,
            textDecoration: todo.done ? "line-through" : "none",
          }}
        >
          {todo.text || "(sem texto)"}
        </span>
      </label>
      {/* ✅ Botão de excluir */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          marginLeft: 12,
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        Excluir
      </button>
    </li>
  );
};

export default React.memo(TodoItem);
