// src/pages/TodoPage.jsx
import { useCallback, useEffect, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import Titulo from "../components/Titulo";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/todo.css";

const TodoPage = () => {
  const { theme, toggle } = useTheme();

  // elementos persistentes (sem espaço no nome da chave)
  const [todos, setTodos] = useLocalStorage("todo:items", [
    { id: 1, text: "Estudar Hooks", done: false },
    { id: 2, text: "Praticar React", done: true },
  ]);
  const [query, setQuery] = useLocalStorage("todo:query", "");
  const [sugestoes, setSugestoes] = useLocalStorage("todo:suggestions", []);

  // ✅ Normaliza itens que já estavam no localStorage sem 'text'
  useEffect(() => {
    setTodos((ts) =>
      Array.isArray(ts)
        ? ts.map((t) => {
            if (!t || typeof t !== "object") return t;
            if (typeof t.text === "string" && t.text.trim() !== "") return t;
            const text =
              (typeof t.text === "string" && t.text) ||
              (typeof t.title === "string" && t.title) ||
              (typeof t.name === "string" && t.name) ||
              (typeof t.descricao === "string" && t.descricao) ||
              (typeof t.description === "string" && t.description) ||
              "";
            return { ...t, text };
          })
        : ts
    );
    // roda apenas uma vez ao montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // remover tarefa
  const deleteTodo = useCallback(
    (id) => {
      setTodos((ts) => ts.filter((t) => t.id !== id));
    },
    [setTodos]
  );

  // busca de sugestões com timer
  useEffect(() => {
    let cancel = false;
    const timer = setTimeout(() => {
      if (!cancel) {
        const base = ["Ler docs oficiais", "Refatorar componentes", "Escrever testes"];
        const q = (query ?? "").toString().toLowerCase().trim();
        setSugestoes(base.filter((s) => s.toLowerCase().includes(q)));
      }
    }, 300);
    return () => {
      cancel = true;
      clearTimeout(timer);
    };
  }, [query, setSugestoes]);

  const addTodo = useCallback(
    (text) => {
      const t = text.trim();
      if (!t) return;
      setTodos((ts) => [...ts, { id: Date.now(), text: t, done: false }]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id) => {
      setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    },
    [setTodos]
  );

  // totais
  const totais = useMemo(() => {
    const total = Array.isArray(todos) ? todos.length : 0;
    const done = Array.isArray(todos) ? todos.filter((t) => t?.done).length : 0; // ✅ faltava ": 0"
    const pending = total - done;
    return { total, done, pending };
  }, [todos]);

  return (
    <div className="container">
      <header className="header">
        <Titulo texto="Todo List" />
        <div className="spacer" />
        <button onClick={toggle}>Tema: {theme}</button>
      </header>

      <TodoForm onAdd={addTodo} />

      <input
        placeholder="Filtrar / buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 8 }}
      />

      {sugestoes.length > 0 && (
        <div className="hint">Sugestões: {sugestoes.join(" • ")}</div>
      )}

      <div style={{ marginTop: 8 }}>
        Total: {totais.total} • Concluídas: {totais.done} • Pendentes: {totais.pending}
      </div>

      <TodoList
        todos={todos}
        query={query}
        onToggle={toggleTodo}
        onDelete={deleteTodo}   // ✅ passa a função de excluir
      />
    </div>
  );
};

export default TodoPage;
