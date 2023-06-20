import Tool from "./Tool";
import {sendFigure} from "../services/connectionsWS";

export default class Brush extends Tool {
  mouseDown: boolean = false;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    if (this.canvas instanceof HTMLCanvasElement) {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
      this.canvas.onmousedown = this.mouseDownHandler.bind(this)
      this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
  }

  mouseUpHandler() {
    this.mouseDown = false;
    if (!this.ctx || !(this.socket instanceof WebSocket)) {
      return;
    }
    this.ctx.closePath();

    sendFigure(this.socket, {
      method: "draw",
      id: this.id!,
      figure: {
        type: 'finish',
      }})
  }

  mouseDownHandler(e: MouseEvent) {
    if (!this.ctx|| !(this.socket instanceof WebSocket)) {
      return;
    }
    sendFigure(this.socket, {
      method: "draw",
      id: this.id!,
      figure: {
        type: 'start',
      }})
    this.ctx.beginPath();
    this.mouseDown = true;
    this.ctx.moveTo(e.pageX - (e.target as HTMLElement).offsetLeft, e.pageY - (e.target as HTMLElement).offsetTop);
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.ctx || !(this.socket instanceof WebSocket)) {
      return;
    }
    if (this.mouseDown) {
      sendFigure(this.socket, {
        method: "draw",
        id: this.id!,
        figure: {
          type: 'brush',
          x: e.pageX - (e.target as HTMLElement).offsetLeft,
          y: e.pageY - (e.target as HTMLElement).offsetTop,
          fillColor: this.ctx.fillStyle,
          strokeColor: this.ctx.strokeStyle,
          lineWidth: this.ctx.lineWidth,
        }
      })
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: TypeColor, strokeColor: TypeColor, lineWidth: number) {
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
