import {makeAutoObservable} from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  socket: WebSocket | null = null;
  sessionID: string | null = null;
  undoList: Array<any> = [];
  redoList: Array<any> = [];
  username: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  setSessionID(sessionID: string) {
    this.sessionID = sessionID;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  setUsername(value: string) {
    this.username = value;
  }

  pushToUndo(data: any) {
    console.log('pushing to undo')
    this.undoList.push(data)
  }

  pushToRedo(data: any) {
    this.redoList.push(data)
  }

  undo() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d')
    if (!ctx) return;

    if (this.undoList.length < 1) {
      return;
    }
    const dataURL = this.undoList.pop();
    this.redoList.push(this.canvas.toDataURL());
    this.drawImage(ctx, dataURL);
  }

  redo() {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    if (this.redoList.length < 1) {
      return;
    }

    const dataURL = this.redoList.pop();
    this.undoList.push(this.canvas.toDataURL());
    this.drawImage(ctx, dataURL);
  }

  drawImage(ctx: CanvasRenderingContext2D, dataURL: any) {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
      ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
    }
  }
}

export default new CanvasState();
