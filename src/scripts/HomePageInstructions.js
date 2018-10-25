import React from 'react';
import '../style/homePageInstructionTable.css'

import ArrowUp from "../image/iconLetter/arrow-up-icon.png";
import ArrowDown from "../image/iconLetter/arrow-down-icon.png";
import ArrowLeft from "../image/iconLetter/arrow-left-icon.png";
import ArrowRight from "../image/iconLetter/arrow-right-icon.png";
import exclamPoint from "../image/iconLetter/exclamation-mark-icon.png";
import mKey from "../image/iconLetter/letter-m-icon.png";
import pKey from "../image/iconLetter/letter-p-icon.png";

import aKey from "../image/iconLetter/letter-a-icon.png";
import qKey from "../image/iconLetter/letter-q-icon.png";
import wKey from "../image/iconLetter/letter-w-icon.png";
import eKey from "../image/iconLetter/letter-e-icon.png";
import sKey from "../image/iconLetter/letter-s-icon.png";
import dKey from "../image/iconLetter/letter-d-icon.png";
import fKey from "../image/iconLetter/letter-f-icon.png";

export default class Instructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    close=()=>{
        this.props.toggleInstructions()
    }

    render() {
        return (
            <div id="instructionTable">
                <p onClick={this.close}>X</p>
                <table>
                    <tr>
                        <th width="30%"></th>
                        <th width="35%"> Player 1 </th>
                        <th width="35%"> Player 2 </th>
                    </tr>
                    <tr>
                        <td> Movement </td>
                        <td>
                            <div>
                                <div className="row">
                                    <img src={eKey} className="keyboardKey" alt="eKey" />
                                </div>
                                <div className="row">
                                    <img src={sKey} className="keyboardKey" alt="sKey" />
                                    <img src={dKey} className="keyboardKey" alt="dKey" />
                                    <img src={fKey} className="keyboardKey" alt="fKey" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div>
                                <div className="row">
                                    <img src={ArrowUp} className="keyboardKey" alt="ArrowUpKey" />
                                </div>
                                <div className="row">
                                    <img src={ArrowLeft} className="keyboardKey" alt="ArrowLeftKey" />
                                    <img src={ArrowDown} className="keyboardKey" alt="ArrowDownKey" />
                                    <img src={ArrowRight} className="keyboardKey" alt="ArrowRightKey" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td> Rotate </td>
                        <td>
                            <div className="row">
                                <img src={aKey} className="keyboardKey" alt="aKey" />
                            </div>
                        </td>
                        <td>
                            <div className="row">
                                <img src={pKey} className="keyboardKey" alt="pKey" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td> Attack </td>
                        <td>
                            <div className="row">
                                <img src={wKey} className="keyboardKey" alt="wKey" />
                            </div>
                        </td>
                        <td>
                            <div className="row">
                                <img src={exclamPoint} className="keyboardKey" alt="!Key" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td> Defend </td>
                        <td>
                            <div className="row">
                                <img src={qKey} className="keyboardKey" alt="qKey" />
                            </div>
                        </td>
                        <td>
                            <div className="row">
                                <img src={mKey} className="keyboardKey" alt="mKey" />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}