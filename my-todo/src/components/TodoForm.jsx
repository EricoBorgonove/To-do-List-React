import { useRef, useEffect } from "react";

const TodoForm = () => {
    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current?.fucus();
    },[]);
    
    return (
        <form onSubmit={handleSubmit} className="form">
            <input ref={inputRef} placeholder="Nova Tarefa ..."/>
            <button type="submit">Adicionar</button>
        </form>
    )
}

export default TodoForm