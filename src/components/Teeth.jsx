import React from "react";
import ToothShape from "./ToothShape";
import { odontogramaConstants } from "../constants/odontograma";
import '../styles/Teeth.css'; // Import the CSS styles for the Teeth component

const {
    upperAdult,
    upperAdultRight,
    lowerAdult,
    lowerAdultRight,
    upperChild,
    upperChildRight,
    lowerChild,
    lowerChildRight
} = odontogramaConstants;

const Teeth = ({ isAdult, handleToothClick, diagnosisData }) => {

    const renderTooth = (toothId) => {
        const diagnosed = Boolean(diagnosisData[toothId])
        return (
            <div key={toothId} className="tooth-wrapper">
                <ToothShape
                    toothId={toothId}
                    size={48}
                    diagnosed={diagnosed}
                    onClick={() => handleToothClick(toothId)}
                />
                <span className="tooth-label">{toothId}</span>
            </div>
        )
    }
    return (
        <div className="teeth-group">
            <div className="teeth-scroll-wrapper">
                <div className="teeth-row">
                    {isAdult ? upperAdult.map(renderTooth) : upperChild.map(renderTooth)}
                    <div className="teeth-separator" />
                    {isAdult ? upperAdultRight.map(renderTooth) : upperChildRight.map(renderTooth)}
                </div>
                <div className="teeth-separator2" />
                <div className="teeth-row">
                    {isAdult ? lowerAdult.map(renderTooth) : lowerChild.map(renderTooth)}
                    <div className="teeth-separator" />
                    {isAdult ? lowerAdultRight.map(renderTooth) : lowerChildRight.map(renderTooth)}
                </div>
            </div>
        </div>
    );
};

export default Teeth;