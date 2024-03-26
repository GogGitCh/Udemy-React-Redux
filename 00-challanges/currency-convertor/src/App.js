import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
    const [from, setFrom] = useState("EUR");
    const [to, setTo] = useState("USD");
    const [amount, setAmount] = useState(1);
    const [output, setOutput] = useState("");
    const [isLoadnig, setIsLoading] = useState(false);

    const amountHandler = (e) => {
        setAmount((amount) => (amount = e.target.value));
    };

    const fromSelectHandler = (e) => {
        // console.log(e.target.value);
        // console.log(from);

        setFrom((from) => (from = e.target.value));
    };

    const toSelectHandler = (e) => {
        // console.log(e.target.value);
        // console.log(to);

        setTo((to) => (to = e.target.value));
    };

    useEffect(() => {
        if (from !== to) {
            async function frankfurterFetch() {
                setIsLoading(true);
                const res = await fetch(
                    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
                );

                const data = await res.json();
                // console.log(data.rates[to]);
                setOutput(data.rates[to]);
                setIsLoading(false);
            }

            frankfurterFetch();
        }
    }, [output, amount, from, to]);

    return (
        <div>
            <input
                type="text"
                value={amount}
                onChange={(e) => amountHandler(e)}
                disabled={isLoadnig}
            />
            <select value={from} onChange={(e) => fromSelectHandler(e)} disabled={isLoadnig}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select value={to} onChange={(e) => toSelectHandler(e)} disabled={isLoadnig}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>{isLoadnig ? "Loading..." : to === from ? 'The currencyes are the same!' : `${output} ${to}`}</p>
        </div>
    );
}
