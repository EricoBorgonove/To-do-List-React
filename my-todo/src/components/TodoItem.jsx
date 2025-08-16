import React from "react";

const TodoItem = ({todo, onToggle}) => {
    return  (
        <li className="item">
            <label>
                <input
                type="checkbox"
                checked={todo.done}
                onChange={()=> onToggle(todo.id)}
                />
            </label>
        </li>
    )

}
export default React.memo(TodoItem);