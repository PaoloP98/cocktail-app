import PropTypes from "prop-types";
import React, { useState } from "react";
import style from "./Instruction.module.css";


function Instruction(props) {
    const { strInstructions, strInstructionsIT } = props;
    Instruction.propTypes = {
        strInstructions: PropTypes.string,
        strInstructionsIT: PropTypes.string,
    };

    const [instructionLang, setInstructionLang] = useState("it");

    let instr = "";
    if (instructionLang == "it") {
        instr = strInstructionsIT;
    }
    else if (instructionLang == "en") {
        instr = strInstructions;   
    }

    return (
        <div className="mt-5">
            <h2>Procedimento</h2>
            <div className="w-100 d-flex justify-content-start mt-2 mb-4">
                <button
                    className={`btn ${style.flagButton} ${instructionLang == "it" ? style.flagButtonActive: ""}`}
                    onClick={() => {
                        setInstructionLang("it");
                    }}
                >
                    {/* <img src={Italy} height="30" alt="Italy" /> */}
                Italiano
                </button>
                <div className="mx-1"></div>
                <button
                    className={`btn ${style.flagButton} ${instructionLang == "en" ? style.flagButtonActive: ""}`}
                    onClick={() => {
                        setInstructionLang("en");
                    }}>
                    {/* <img src={England} height="30" alt="England" /> */}
                    Inglese
                    </button>
            </div>
            <p>
                {instr}
            </p>

        </div>
    );
}
export default Instruction;
