import { useState } from "react";
import "./styles.css";

function App() {
    return (
        <div className="App">
            <TipCalculator />
        </div>
    );
}

function TipCalculator() {
    const [bill, setBill] = useState("");
    const [percent1, setPercent1] = useState("");
    const [percent2, setPercent2] = useState("");

    const tip = Math.round(bill * ((percent1 + percent2) / 2 / 100));

    function handleReset() {
        setBill("");
        setPercent1(0);
        setPercent2(0);
    }

    return (
        <>
            <Bill bill={bill} onSetBill={setBill} />

            <SelectPercentage percentage={percent1} onSelect={setPercent1}>
                How did you like the service?
            </SelectPercentage>
            <SelectPercentage percentage={percent2} onSelect={setPercent2}>
                How did your friend like the service?
            </SelectPercentage>

            <Output tip={tip} bill={bill} />
            <Reset onReset={handleReset} />
        </>
    );
}

function Bill({ bill, onSetBill }) {
    return (
        <div>
            <label>How much was the bill?</label>
            <input
                type="text"
                placeholder="Bill value"
                value={bill}
                onChange={(e) => onSetBill(Number(e.target.value))}
            />
        </div>
    );
}

function SelectPercentage({ percentage, onSelect, children }) {
    return (
        <div>
            <label>{children}</label>
            <select
                value={percentage}
                onChange={(e) => onSelect(Number(e.target.value))}
            >
                <option value="0">Dissatisfied (0%)</option>
                <option value="5">It was okay (5%)</option>
                <option value="10">It was good (10%)</option>
                <option value="20">Absolutely amazing! (20%)</option>
            </select>
        </div>
    );
}

function Output({ bill, tip }) {
    return (
        <h3>
            You pay ${bill + tip} (${bill} + ${tip} tip)
        </h3>
    );
}

function Reset({onReset}) {
    return <button onClick={onReset}>Reset</button>;
}

export default App;
