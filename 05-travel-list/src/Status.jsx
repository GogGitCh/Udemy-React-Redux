export default function Status({ items }) {
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