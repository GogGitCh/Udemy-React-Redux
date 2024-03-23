import { useState } from "react";
import uuid from "react-uuid";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

function Button({ onClick, children }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

export default function App() {
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friends, setFriends] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowAddFriend() {
        setShowAddFriend((show) => !show);
    }

    function handleAddFriend(newFriend) {
        setFriends((friends) => [...friends, newFriend]);
        setShowAddFriend(false);
    }

    function handleSelection(friend) {
        // setSelectedFriend(friend);
        setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
        setShowAddFriend(false);
    }

    function handleSplitBill(value) {
        setFriends((friends) =>
            friends.map((friend) =>
                friend.id === selectedFriend.id
                    ? { ...friend, balance: friend.balance + value }
                    : friend
            )
        );

        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendList
                    friends={friends}
                    onSelection={handleSelection}
                    selectedFriend={selectedFriend}
                />
                {showAddFriend && (
                    <FormAddFriend onAddFriend={handleAddFriend} />
                )}
                <Button onClick={handleShowAddFriend}>
                    {showAddFriend ? "Close" : "Add Friend"}
                </Button>
            </div>
            {selectedFriend && (
                <FormSplitBill
                key={selectedFriend.id}
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                />
            )}
        </div>
    );
}

function FriendList({ friends, onSelection, selectedFriend }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend
                    key={friend.id}
                    friend={friend}
                    onSelection={onSelection}
                    selectedFriend={selectedFriend}
                />
            ))}
        </ul>
    );
}

function Friend({ friend, onSelection, selectedFriend }) {
    const isSelected = friend.id === selectedFriend?.id;

    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    {`You owe ${friend.name} ${Math.abs(friend.balance)}$`}
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {`${friend.name} owes you ${friend.balance}$`}
                </p>
            )}
            {friend.balance === 0 && <p>{`You and ${friend.name} are even`}</p>}
            <Button onClick={() => onSelection(friend)}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !image) return;

        const id = uuid();

        const newFriend = {
            id,
            name,
            image: `${image}?=${id}`,
            balance: 0,
        };

        onAddFriend(newFriend);

        setName("");
        setImage("https://i.pravatar.cc/48");
    }

    return (
        <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
            <label>👫Friend</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            ></input>

            <label>📷 Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            ></input>

            <Button>Add Friend</Button>
        </form>
    );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState("");
    const [payedByUser, setPayedByUser] = useState("");
    const [payee, setPayee] = useState("user");
    const payedByFriend = bill ? bill - payedByUser : "";

    function handleSubmit(e) {
        e.preventDefault();
        if (!bill || !payedByUser) return;
        onSplitBill(payee === "user" ? payedByFriend : -payedByUser);
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split bill with {selectedFriend.name}</h2>

            <label>🧾 Bill value</label>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>🍽 Your expense</label>
            <input
                type="text"
                value={payedByUser}
                onChange={(e) =>
                    setPayedByUser(
                        Number(e.target.value) > bill
                            ? payedByUser
                            : Number(e.target.value)
                    )
                }
            />

            <label>👫 {selectedFriend.name}'s expense</label>
            <input type="text" disabled value={payedByFriend} />

            <label>🤑 Who is paying the bill 💲❓</label>
            <select value={payee} onChange={(e) => setPayee(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
