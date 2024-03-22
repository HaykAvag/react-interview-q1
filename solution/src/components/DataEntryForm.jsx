import "./DataEntryForm.css";
import { useState } from "react";
import NameInput from "./NameInput";
import DataEntries from "./DataEntries";
import LocationPicker from "./LocationPicker";

const DataEntryForm = () => {
    const [name, setName] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");

    const [entries, setEntries] = useState([]);
    const [isNameValid, setIsNameValid] = useState(true);

    const clear = () => setEntries([]);

    const add = (event) => {
        event.preventDefault();
        // Add new entry to entries array.
        setEntries([...entries, { location: currentLocation, name }]);
    };

    return (
        <form method="post" onSubmit={add}>
            <div className="content">
                <NameInput
                    saveName={setName}
                    saveNameValidity={setIsNameValid}
                />

                <LocationPicker saveLocation={setCurrentLocation} />

                <div className="buttons">
                    <button type="button" onClick={clear}>
                        Clear
                    </button>

                    <button type="submit" disabled={!isNameValid}>
                        Add
                    </button>
                </div>

                <DataEntries entries={entries} />
            </div>
        </form>
    );
};

export default DataEntryForm;
