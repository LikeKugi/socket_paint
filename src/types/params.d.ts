type TypeParams = {
  params?: string,
  id?: string,
}

interface ITool {
  fillColor: TypeColor;
  strokeColor: TypeColor;
  lineWidth: number;
  canvas: HTMLCanvasElement | null;
  socket: WebSocket | null;
  id: string | null;
  ctx: CanvasRenderingContext2D | null;
}
