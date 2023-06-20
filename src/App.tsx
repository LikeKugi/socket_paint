import React, {useEffect, useState} from 'react';
import './App.css';
import canvasState from "./store/canvasState";
import Modal from "./components/Modal/Modal";
import NewUser from "./components/NewUser/NewUser";
import StateBlock from "./components/StateBlock/StateBlock";
import Brush from "./tools/Brush";
import Rect from "./tools/Rect";
import Circle from "./tools/Circle";
import Line from "./tools/Line";
import toolState from "./store/toolState";
import userState from "./store/userState";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import RootPage from "./pages/RootPage/RootPage";

function App() {
  const data = `f${(+new Date()).toString(16)}`

  const [showModal, setShowModal] = useState(true);
  const [nickname, setNickname] = useState('');

  const [showLast, setShowLast] = useState(false);
  const [lastUser, setLastUser] = useState('');

  const paramIDHandler = (value: TypeParams) => {
    if ('id' in value && value.id) {
      canvasState.setSessionID(value.id);
    }

  }

  const closeModalHandler = () => {
    setShowModal(false);
  }

  const openModalHandler = () => {
    setShowModal(true);
  }

  const submitNicknameHandler = (nickname: string) => {
    canvasState.setUsername(nickname)
    setNickname(nickname);
  }

  useEffect(() => {
    setShowLast(true);
    setTimeout(() => setShowLast(false), 10000);
  }, [lastUser])

  const drawHandler = (msg: IToolMsg) => {
    const figure = msg.figure;
    const sender = msg.username;
    if (!canvasState.canvas) return;
    const ctx = canvasState.canvas.getContext('2d');
    if (!(ctx instanceof CanvasRenderingContext2D)) return;
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.fillColor, figure.strokeColor, figure.lineWidth)
        break;
      case "rect":
        if (sender !== canvasState.username) {
          canvasState.pushToUndo(canvasState.canvas.toDataURL())
        }
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillColor, figure.strokeColor, figure.lineWidth);
        break;
      case "circle":
        if (sender !== canvasState.username) {
          canvasState.pushToUndo(canvasState.canvas.toDataURL())
        }
        Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.fillColor, figure.strokeColor, figure.lineWidth);
        break;
      case "line":
        if (sender !== canvasState.username) {
          canvasState.pushToUndo(canvasState.canvas.toDataURL())
        }
        Line.staticDraw(ctx, figure.startX, figure.startY, figure.endX, figure.endY, figure.fillColor, figure.strokeColor, figure.lineWidth)
        break;
      case "undo":
        canvasState.undo();
        break;
      case "redo":
        canvasState.redo();
        break;
      case "start":
        if (sender !== canvasState.username) {
          canvasState.pushToUndo(canvasState.canvas.toDataURL())
        }
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  }

  useEffect(() => {
    if (nickname.trim().length > 0) {
      const socket = new WebSocket('ws://localhost:5000');
      canvasState.setSocket(socket);
      toolState.setTool(new Brush(canvasState.canvas!, socket, canvasState.sessionID!))
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: canvasState.sessionID,
          username: nickname,
          method: "connection",
        }))
      };
      socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data)

        switch (msg.method) {
          case "connection":
            userState.addUser(msg);
            setLastUser(msg.username);
            break;
          case "draw":
            drawHandler(msg);
            break;

        }
      }
    }

  }, [nickname])

  return (
    <BrowserRouter>
      <div className="app">

        <StateBlock openModal={openModalHandler}
                    store={toolState}/>

        <Routes>
          <Route path="/"
                 element={<Navigate to={`/${data}`}/>}/>
          <Route path="/:id"
                 element={<RootPage setID={paramIDHandler}/>}/>
        </Routes>

        {showModal && <Modal closeModal={closeModalHandler}
                             submitModal={submitNicknameHandler}/>}
        {showLast && <NewUser newUser={lastUser}/>}
      </div>
    </BrowserRouter>
  );
}

export default App;
