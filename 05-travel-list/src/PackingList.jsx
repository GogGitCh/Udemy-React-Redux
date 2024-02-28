import { useState } from 'react'
import {Item} from './Item'

function PackingList({ items, onDeleteItem, onTogglePacking, onClearList }) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") {
        sortedItems = items;
    }
    if (sortBy === "desc") {
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));
    }
    if (sortBy === "packed") {
        // sortedItems = items.slice().filter((i) => i.packed !== false);
        // or
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onTogglePacking={onTogglePacking}
                    />
                ))}
            </ul>

            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input"> Sort by input order</option>
                    <option value="desc"> Sort by description order</option>
                    <option value="packed"> Sort by packed stats</option>
                </select>
                <button onClick={() => onClearList()}>Clear List</button>
            </div>
        </div>
    );
}

export { PackingList }