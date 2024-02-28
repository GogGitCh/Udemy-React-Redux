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
        setItems((items) => items.filter((i) => i.id !== itemId));
    }

    function handleTogglePacked(itemId) {
        setItems((items) =>
            items.map((i) =>
                i.id === itemId ? { ...i, packed: !i.packed } : i
            )
        );
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={hadleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onTogglePacking={handleTogglePacked}
            />
            <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onTogglePacking }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onTogglePacking={onTogglePacking}
                    />
                ))}
            </ul>
        </div>
    );
}

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

function Stats({ items }) {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start adding some items to your pacing list 🚀</em>
            </p>
        );

    const itemsCount = items.length;
    const packedItems = items.filter((i) => i.packed === true).length;
    const percentOfPackedItems = Math.round((packedItems / itemsCount) * 100);

    return (
        <footer className="stats">
            <em>
                {percentOfPackedItems === 100
                    ? "You got everything! Ready do go! ✈"
                    : `🎒 You have ${itemsCount} items on your list, and you already
                packed ${packedItems} (${percentOfPackedItems}%)`}
            </em>
        </footer>
    );
}

export default App;
