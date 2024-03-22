import { useEffect, useRef } from "react";
import "./DataEntries.css";

const DataEntries = ({ entries }) => {
    const reference = useRef();

    useEffect(() => {
        // Scroll to the bottom every time entries gets updated.
        reference.current.scrollIntoView();
    }, [entries]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                </tr>
            </thead>

            <tbody>
                {/* Show each entry in a row with their name and location */}
                {entries.map(({ name, location }, index) => (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{location}</td>
                    </tr>
                ))}

                <tr ref={reference} style={{ border: "none" }}></tr>
            </tbody>
        </table>
    );
};

export default DataEntries;
