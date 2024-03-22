import { useState } from "react";
import "./styles.css";

export default function App() {
    return (
        <div>
            <TextExpander
                collapsedNumWords={150}
                expandButtonText="Show more"
                collapseButtonText="Collapse more"
                buttonColor="blue"
            >
                Space travel is the ultimate adventure! Imagine soaring past the
                stars and exploring new worlds. It's the stuff of dreams and
                science fiction, but believe it or not, space travel is a real
                thing. Humans and robots are constantly venturing out into the
                cosmos to uncover its secrets and push the boundaries of what's
                possible.
            </TextExpander>

            <TextExpander
                collapsedNumWords={200}
                expandButtonText="Show text"
                collapseButtonText="Collapse text"
                buttonColor="#ff6622"
            >
                Space travel requires some seriously amazing technology and
                collaboration between countries, private companies, and
                international space organizations. And while it's not always
                easy (or cheap), the results are out of this world. Think about
                the first time humans stepped foot on the moon or when rovers
                were sent to roam around on Mars.
            </TextExpander>

            <TextExpander
                expanded={true}
                className="box"
                collapsedNumWords={150}
                expandButtonText="Show more"
                collapseButtonText="Collapse more"
                buttonColor="blue"
            >
                Space missions have given us incredible insights into our
                universe and have inspired future generations to keep reaching
                for the stars. Space travel is a pretty cool thing to think
                about. Who knows what we'll discover next!
            </TextExpander>
        </div>
    );
}

function TextExpander({
    children,
    collapsedNumWords,
    expandButtonText,
    collapseButtonText,
    buttonColor,
    className,
}) {
    let [isOpen, setIsOpen] = useState(false);

    const button = {
        border: "none",
        backgroundColor: "transparent",
        fontSize: "1em",
        color: buttonColor,
    };

    function toggleButton() {
        setIsOpen((isOpen = !isOpen));
    }

    return (
        <div className={className}>
            {isOpen ? children : `${children.slice(0, collapsedNumWords)}... `}
            <button onClick={toggleButton} style={button}>
                {isOpen ? collapseButtonText : expandButtonText}
            </button>
        </div>
    );
}

// function Button({children}) {
//   return (
//     <button>{children}</button>
//   )
// }
