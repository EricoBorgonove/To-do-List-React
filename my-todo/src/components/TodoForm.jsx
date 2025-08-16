import { useRef, useEffect } from "react";

const TodoForm = ({onAdd}) => {
    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current?.focus();
    },[]);

    function handleSubmit (e){
        e.preventDefault();
        const text = inputRef.current.value.trim();
        if(!text) return;
        onAdd(text)
        inputRef.current.value = "";
        inputRef.current.focus();
    }
    
    return (
        <form onSubmit={handleSubmit} className="form">
            <input ref={inputRef} placeholder="Nova Tarefa ..."/>
            <button type="submit">Adicionar</button>
        </form>
    )
}

export default TodoForm