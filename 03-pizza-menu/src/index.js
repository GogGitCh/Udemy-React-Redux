import React from "react";
import ReactDOM from "react-dom/client";

import styles from "./index.css";

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

const pizzaList = pizzaData.map((pizza) => (
    <Pizza pizza={pizza} key={pizza.name} />
));
// const pizzaList = []
function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <h1>Pizzaria "Brially" Co.</h1>;
        </header>
    );
}

function Menu() {
    return (
        <main className="menu">
            <h2>Our Menu</h2>
            {pizzaData.length > 0 ? (
                <ul className="pizzas">{pizzaList}</ul>
            ) : (
                <p>We are still preparing the pizza. Come back later :)</p>
            )}
        </main>
    );
}

function Footer() {
    const currenHour = new Date().toLocaleTimeString("it-IT");
    const Hour = new Date().getHours();
    const openHour = 8;
    const closeHour = 22;
    const isOpen = Hour >= openHour && Hour <= closeHour;

    return (
        <footer className="footer">
            {isOpen ? (
                <div className="order">
                    <p>
                        We are opern untill {closeHour}:00!. You can visit us or
                        order online
                    </p>
                    <button className="btn">Order</button>
                </div>
            ) : (
                <div className="order">
                    <p>
                        We are available for orders from {openHour}:00 to {closeHour}:00!
                    </p>
                </div>
            )}
        </footer>
    );
}

function Pizza(prop) {
    const { name, ingredients, price, photoName, soldOut } = prop.pizza;
    console.log(name);

    return (
        <li className="pizza">
            <img src={photoName} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{ingredients}</p>
                <p>Price:{price}</p>
                <p>soldOut:{soldOut}</p>
            </div>
        </li>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
