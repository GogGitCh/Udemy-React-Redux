import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import Status from './Status'
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

    function clearList() {
        const confirmed = window.confirm(
            "Are you shure you want to delete all items"
        );

        if (confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={hadleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onTogglePacking={handleTogglePacked}
                onClearList={clearList}
            />
            <Status items={items} />
        </div>
    );
}

export default App;
