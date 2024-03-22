import { useState, useEffect } from "react";
import { getLocations } from "../mock-api/apis";
import "./LocationPicker.css";

const LocationPicker = ({ saveLocation }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const locationsData = await getLocations();
            setLocations(locationsData);
            saveLocation(locationsData[0]);
        };

        // Fetch and set locations on start.
        fetchLocations();
    }, [saveLocation]);

    const updateLocation = ({ target }) => saveLocation(target.value);

    return (
        <div className="locationPicker">
            <label htmlFor="select">Location</label>

            <select id="select" onChange={updateLocation}>
                {locations.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocationPicker;
