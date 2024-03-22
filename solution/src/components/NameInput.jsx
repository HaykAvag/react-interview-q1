import { useState, useRef } from "react";
import { isNameValid } from "../mock-api/apis";
import "./NameInput.css";

const NameInput = ({ saveName, saveNameValidity }) => {
    const [isNameAvailable, setIsNameAvailable] = useState(true);
    const [isValidating, setIsValidating] = useState(false);
    const timeoutIdRef = useRef(null); // useRef to keep track of the latest timeout ID.

    const validateName = async (name) => {
        const oldTimeoutId = timeoutIdRef.current;
        const available = await isNameValid(name);

        // Cancel ongoing validation if a new validation started.
        if (timeoutIdRef.current !== oldTimeoutId) return;

        setIsNameAvailable(available);
        setIsValidating(false);

        saveNameValidity(available || false);
    };

    const updateName = ({ target }) => {
        const newName = target.value;
        // Pass name to parent (DataEntryForm).
        saveName(newName);

        // Debounce validation to avoid race conditions.
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        setIsValidating(true);
        saveNameValidity(false);

        timeoutIdRef.current = setTimeout(() => validateName(newName), 500);
    };

    return (
        <div className="nameInput">
            <div className="inputContainer">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={updateName} required />
            </div>

            <p className={isValidating ? "neutral" : "error"}>
                {isValidating
                    ? "Validating name..."
                    : !isNameAvailable && "Name is unavailable"}
            </p>
        </div>
    );
};

export default NameInput;
