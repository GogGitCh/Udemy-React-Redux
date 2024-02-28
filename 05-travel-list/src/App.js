import { useState, useEffect } from "react";

// const initialItems = [
//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 12, packed: false },
//     { id: 3, description: "Pants", quantity: 5, packed: true },
// ];

function App() {
    const [items, setItems] = useState([]);

    function hadleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(itemId) {
        setItems((items) => (items.filter((i) => i.id !== itemId)))
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={hadleAddItems} />
            <PackingList items={items}
            onDeleteItem={handleDeleteItem}
            />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("1");

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;
        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        onAddItem(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                value={quantity}
                onChange={(e) => {
                    setQuantity(Number(e.target.value));
                }}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option key={num}>{num}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></input>
            <button>Add</button>
        </form>
    );
}

function PackingList({ items , onDeleteItem }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItem }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.description} - {item.quantity}
            </span>
            <button 
            onClick={() => onDeleteItem(item.id)}
            >❌</button>
        </li>
    );
}

function Stats() {
    return (
        <em className="stats">
            <footer>
                🎒 You have X items on your list, and you already packed X (X%)
            </footer>
        </em>
    );
}

export default App;
