import { useMemo, useCallback } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({todos, query, onToggle}) => {
    const filtrados = useMemo(()=>{
        const q = query.trim().toLowerCase();
        return q ? todos.filter((t)=> t.text.toLowerCase().includes(q)) : todos;
    },[todos, query]);

    const handleToggle = useCallback ((id)=> onToggle(id), [onToggle]);
    return (
        <ul className="list">
            {filtrados.map((t)=>(
                <TodoItem key={t.id} todo={t} onToggle={handleToggle}/>
            ))}
        </ul>
    );
}

export default TodoList;