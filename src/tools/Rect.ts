import Tool from "./Tool";
import {sendFigure} from "../services/connectionsWS";

export default class Rect extends Tool {
  mouseDown: boolean = false;
  startX: number = 0;
  startY: number = 0;
  width: number = 0;
  height: number = 0;
  saved: any;
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
    sendFigure(this.socket, {
      method: "draw",
      id: this.id!,
      figure: {
        type: 'rect',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        fillColor: this.ctx.fillStyle,
        strokeColor: this.ctx.strokeStyle,
        lineWidth: this.ctx.lineWidth,
      }
    })
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
    if (!this.ctx) {
      return;
    }
    this.ctx.beginPath()
    this.startX = e.pageX - (e.target as HTMLElement).offsetLeft;
    this.startY = e.pageY - (e.target as HTMLElement).offsetTop;
    this.saved = this.canvas!.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
      const currentY = e.pageY - (e.target as HTMLElement).offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      if (!this.ctx || !(this.canvas instanceof HTMLCanvasElement)) {
        return;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fillColor: TypeColor, strokeColor: TypeColor, lineWidth: number) {
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
  }

}
