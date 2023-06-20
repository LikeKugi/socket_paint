import React, {JSX, useRef, useState} from "react";

import styles from './ToolBar.module.css';
import toolState from "../../store/toolState";

import brush from '../../assets/img/toolbar/brush.svg'
import circle from '../../assets/img/toolbar/circle.svg'
import eraser from '../../assets/img/toolbar/eraser.svg'
import line from '../../assets/img/toolbar/line.svg'
import rect from '../../assets/img/toolbar/rect.svg'
import redo from '../../assets/img/toolbar/redo.svg'
import save from '../../assets/img/toolbar/save.svg'
import undo from '../../assets/img/toolbar/undo.svg'
import canvasState from "../../store/canvasState";

import Brush from "../../tools/Brush";
import Rect from "../../tools/Rect";
import Eraser from "../../tools/Eraser";
import Circle from "../../tools/Circle";
import Line from "../../tools/Line";
import {sendFigure} from "../../services/connectionsWS";

const ToolBar = (): JSX.Element => {
  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const fillRef = useRef<HTMLInputElement>(null);
  const strokeRef = useRef<HTMLInputElement>(null);

  const changeColorHandler = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLInputElement)) return;
    if (e.target === fillRef.current) {
      setFillColor(e.target.value);
      toolState.setFillColor(fillColor);
    } else if (e.target === strokeRef.current) {
      setStrokeColor(e.target.value);
      toolState.setStrokeColor(strokeColor);
    }
  }

  const brushHandler = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    toolState.setStrokeColor(strokeColor);
    toolState.setFillColor(fillColor);
    toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionID))
  }
  const rectHandler = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    toolState.setStrokeColor(strokeColor);
    toolState.setFillColor(fillColor);
    toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionID))
  }

  const eraserHandler = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    toolState.setStrokeColor("#ffffff");
    toolState.setFillColor("#ffffff");
    toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionID))
  }

  const circleHandler = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    toolState.setStrokeColor(strokeColor);
    toolState.setFillColor(fillColor);
    toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionID))
  }

  const lineHandler = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    toolState.setStrokeColor(strokeColor);
    toolState.setFillColor(fillColor);
    toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionID))
  }

  const undoHandler = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    sendFigure(canvasState.socket, {
      method: "draw",
      id: canvasState.sessionID,
      figure: {
        type: 'undo',
      }
    })
  }

  const redoHandler = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    sendFigure(canvasState.socket, {
      method: "draw",
      id: canvasState.sessionID,
      figure: {
        type: 'redo',
      }
    })
  }

  const download = () => {
    if (!canvasState.canvas || !canvasState.socket || !canvasState.sessionID) return;
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.sessionID + 'jpg';
    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__controls}>
        <button className={styles.toolbar__btn}
                onClick={brushHandler}><img src={brush}
                                            alt="brush"/></button>
        <button className={styles.toolbar__btn}
                onClick={rectHandler}><img src={rect}
                                           alt="rect"/></button>
        <button className={styles.toolbar__btn}
                onClick={circleHandler}><img src={circle}
                                             alt="circle"/></button>
        <button className={styles.toolbar__btn}
                onClick={eraserHandler}><img src={eraser}
                                             alt="eraser"/></button>
        <button className={styles.toolbar__btn}
                onClick={lineHandler}><img src={line}
                                           alt="line"/></button>
        <label htmlFor="fillColor">Fill color: </label>
        <input ref={fillRef}
               className={styles.toolbar__btn}
               onChange={changeColorHandler}
               type="color"
               name="color"
               value={fillColor}
               id="fillColor"/>
        <label htmlFor="strokeColor">Stroke color: </label>
        <input ref={strokeRef}
               onChange={changeColorHandler}
               className={styles.toolbar__btn}
               type="color"
               name="strokeColor"
               id="strokeColor"/>
      </div>
      <div className={styles.toolbar__controls}>
        <button onClick={undoHandler}
                className={styles.toolbar__btn}><img src={undo}
                                                     alt="undo"/></button>
        <button onClick={redoHandler}
                className={styles.toolbar__btn}><img src={redo}
                                                     alt="redo"/></button>
        <button onClick={download}
                className={styles.toolbar__btn}><img src={save}
                                                     alt="save"/></button>
      </div>


    </div>
  );
}
export default ToolBar;
