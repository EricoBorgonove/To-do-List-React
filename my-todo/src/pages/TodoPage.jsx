import { useCallback, useEffect, useMemo } from "react";
import {useTheme} from "../context/ThemeContext";
import Titulo from "../components/Titulo";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/todo.css"

const TodoPage = ()=> {
    const {theme, toggle} = useTheme()

    // elementos persistentes:
    const [todos, setTodos] = useLocalStorage ("todo: itens", [
        {id: 1, text: "Estudar Hooks", done: false},
        {id: 2, text: "Praticar React", done: true},
    ]);
    const [query, setQuery] = useLocalStorage("todo:query", "");
    const [sugestoes, setSugestoes] = useLocalStorage("todo:suggestions", [])

    // busca de sugestões com timer

    useEffect(()=> {
        let cancel = false;
        const timer = setTimeout (()=> {
            if(!cancel){
                const base = ["ler docs oficiais", "Refatorar componentes", "Escrever testes"];
                setSugestoes(base.filter((s)=> s.toLowerCase().includes(query.toLowerCase())));
            }
        }, 300)
        return ()=> {cancel = true; clearTimeout(timer)}
    },[query, setSugestoes])

    const addTodo = useCallback ((text)=>{
        setTodos ((ts)=> [...ts, {id:Date.now(), text, done: false}]);
    },[setTodos])

    const toggleTodo = useCallback((id)=>{
        setTodos((ts)=> ts.map((t)=> (t.id=== id ? {...t, done: !t.done}: t)));
    },[setTodos]);
    
    return (
        <div className="container">
            <header className="header">
                <Titulo texto="Todo List"/>
                <div className="spacer"/>
                <button onClick={toggle}>Tema: {theme}</button>
            </header>
            <TodoForm onAdd={addTodo}/>

            <input
                placeholder="Filtrar / buscar..."
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                style={{marginBottom: 8}}
            />
            {sugestoes.length > 0 && (
                <div className="hint">Sugestões: {sugestoes.join ("*")}</div>
            )}
            <div>
                Total: {totais.total} * Concluidas: {totais.done} * Pendentes: {totais.pending}
            </div>

            <TodoList todos={todos} query={query} onToggle={toggleTodo}/>

        </div>
    )
}
export default TodoPage
