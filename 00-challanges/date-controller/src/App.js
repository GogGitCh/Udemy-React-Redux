import { useState } from "react";
import "./styles.css";

export default function App() {
    return (
        <div className="App">
            <Counter />
        </div>
    );
}

function Counter() {
    const [count, setCount] = useState("");
    const [step, setStep] = useState(1);

    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    return (
        <div>
            <div>
                <input
                    type="range"
                    min={1}
                    max={31}
                    value={step}
                    onChange={(e) => setStep(Number(e.target.value))}
                ></input>
            </div>
            <div>
                <span>Step: {step}</span>
            </div>

            <div>
                <span>Count: </span>
                <button onClick={() => setCount((c) => c - step)}>-</button>
                <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                ></input>
                <button onClick={() => setCount((c) => c + step)}>+</button>
            </div>

            <div>
                <button
                    style={{ margin: "1em" }}
                    onClick={() => {
                        setCount("");
                        setStep(1);
                    }}
                >
                    Reset
                </button>
            </div>

            <p>
                <span>
                    {count === 0
                        ? "Today is "
                        : count > 0
                        ? `${count} days from today is `
                        : `${Math.abs(count)} days ago was `}
                </span>
                <span>{date.toDateString()}</span>
            </p>
        </div>
    );
}
