import React from 'react';
import '../style/homePageInstructionTable.css';

import ArrowUp from '../image/iconLetter/arrow-up-icon.png';
import ArrowDown from '../image/iconLetter/arrow-down-icon.png';
import ArrowLeft from '../image/iconLetter/arrow-left-icon.png';
import ArrowRight from '../image/iconLetter/arrow-right-icon.png';
import exclamPoint from '../image/iconLetter/exclamation-mark-icon.png';
import mKey from '../image/iconLetter/letter-m-icon.png';
import pKey from '../image/iconLetter/letter-p-icon.png';

import aKey from '../image/iconLetter/letter-a-icon.png';
import qKey from '../image/iconLetter/letter-q-icon.png';
import wKey from '../image/iconLetter/letter-w-icon.png';
import eKey from '../image/iconLetter/letter-e-icon.png';
import sKey from '../image/iconLetter/letter-s-icon.png';
import dKey from '../image/iconLetter/letter-d-icon.png';
import fKey from '../image/iconLetter/letter-f-icon.png';

import bonus from '../image/gift.png';
import malus from '../image/malus.png';

export default class Instructions extends React.Component {
  close = () => {
    if (this.props.homepage) this.props.toggleInstructions();
    else this.props.toggleFightInstructions();
  }

  render() {
    return (
      <div id="instructionTable">
        <p onClick={this.close}>X</p>
        <table>
          <tbody>
            <tr>
              <th width="30%" />
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
          </tbody>
        </table>

        <div id="gameIndications">
          <span>You need to reload between attacks ; watch for your attack bar !</span>
          <br />
          <span>You start with 3 shields that can protect you from enemy spell ; each of them lasts 3 seconds.</span>
          <br />
          <span>Try to catch the bonuses</span>
          <img src={bonus} className="bonus" alt="Bonus" />
          <span>and take care of the dementors !</span>
          <img src={malus} className="bonus" alt="Malus" />
          <br />
          <span>In tournament mode, you score the life points you have left at the end of the fight ; try to save them as much as possible.</span>
        </div>
      </div>
    );
  }
}