function Item({ item, onDeleteItem, onTogglePacking }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onTogglePacking(item.id)}
            ></input>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.description} - {item.quantity}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

export { Item }