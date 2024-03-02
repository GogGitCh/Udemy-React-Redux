import { useState, useEffect } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

function App() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    // const [inactivePrev, setInactivePrev] = useState(true);
    // const [inactiveNext, setInactiveNext] = useState(true);

    // useEffect(() => {
    //     if (step === 3) {
    //         setInactiveNext(false);
    //     } else {
    //         setInactiveNext(true);
    //     }
    //     if (step === 1) {
    //         setInactivePrev(false);
    //     } else {
    //         setInactivePrev(true);
    //     }
    // }, [step]);

    const handlePrev = () => {
        if (step > 1) {
            setStep((step) => step - 1);
        }
    };

    const handleNext = () => {
        if (step < 3) {
            setStep((step) => step + 1);
        }
    };

    return (
        <>
            <button className="close" onClick={() => setIsOpen(!isOpen)}>
                &times;
            </button>

            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step >= 3 ? "active" : ""}>3</div>
                    </div>

                    <StepMessage key={step} step={step}>
                        {messages[step - 1]}
                    </StepMessage>

                    <div className="buttons">
                        {/* {inactivePrev && ( */}
                        <Button
                            textColor={"#fff"}
                            bgColor={"#7950f2"}
                            onClick={handlePrev}
                        >
                            <span>👈 Previous </span>
                        </Button>
                        {/* ) */}

                        {/* {inactiveNext && ( */}
                        <Button
                            textColor={"#fff"}
                            bgColor={"#7950f2"}
                            onClick={handleNext}
                        >
                            <span>Next 👉</span>
                        </Button>
                        {/* ) */}
                    </div>
                </div>
            )}
        </>
    );
}

function StepMessage({ step, children }) {
    return (
        <div className="message">
            <h3>Step {step}:</h3> {children}
        </div>
    );
}

function Button({ textColor, bgColor, onClick, children }) {
    return (
        <button
            style={{
                backgroundColor: bgColor,
                color: textColor,
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default App;
