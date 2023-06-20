import Tool from "./Tool";
import {sendFigure} from "../services/connectionsWS";

export default class Circle extends Tool {
  mouseDown: boolean = false;
  startX: number = 0;
  startY: number = 0;
  radius: number = 0;
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
        type: 'circle',
        x: this.startX,
        y: this.startY,
        radius: this.radius,
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
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.radius = Math.sqrt(width ** 2 + height ** 2)
      this.draw(this.startX, this.startY, this.radius);
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      if (!this.ctx || !(this.canvas instanceof HTMLCanvasElement)) {
        return;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fillColor: TypeColor, strokeColor: TypeColor, lineWidth: number) {
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
  }
}
