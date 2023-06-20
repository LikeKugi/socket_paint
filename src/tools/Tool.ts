export default class Tool implements ITool{
  canvas: HTMLCanvasElement | null = null;
  socket: WebSocket | null = null;
  id: string | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  constructor(canvas:HTMLCanvasElement, socket:WebSocket, id:string) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.ctx = canvas.getContext('2d');
    this.destroyEvents();
  }

  set fillColor(color: TypeColor) {
    if (this.ctx instanceof CanvasRenderingContext2D) {
      this.ctx.fillStyle = color;
    }
  }

  set strokeColor(color: TypeColor) {
    if (this.ctx instanceof CanvasRenderingContext2D) {
      this.ctx.strokeStyle = color;
    }
  }

  set lineWidth(width: number) {
    if (this.ctx instanceof CanvasRenderingContext2D) {
      this.ctx.lineWidth = width;
    }

  }

  destroyEvents() {
    if (this.canvas) {
      this.canvas.onmousemove = null
      this.canvas.onmousedown = null
      this.canvas.onmouseup = null
    }
  }
}
