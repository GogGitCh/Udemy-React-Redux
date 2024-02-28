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

                    <p className="message">
                        Step {step} : {messages[step - 1]}
                    </p>

                    <div className="buttons">
                        {/* {inactivePrev && ( */}
                            <button
                                style={{
                                    backgroundColor: "#7950f2",
                                    color: "#fff",
                                }}
                                onClick={handlePrev}
                            >
                                Previous
                            </button>
                        {/* ) */}
                        
                        {/* {inactiveNext && ( */}
                            <button
                                style={{
                                    backgroundColor: "#7950f2",
                                    color: "#fff",
                                }}
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        {/* ) */}
                        
                    </div>
                </div>
            )}
        </>
    );
}

export default App;