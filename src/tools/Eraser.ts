import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas:HTMLCanvasElement, socket:WebSocket, id:string) {
    super(canvas, socket, id);
  }
}
