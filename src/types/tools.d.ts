interface IToolMsg extends IMessage {
  method: "draw",
  id: string,
  username: string,
  figure: TypeFigureMessage;
}

interface IToolSend extends IMessage {
  method: "draw",
  id: string,
  figure: TypeFigureMessage;
}

type TypeFigureMessage =
  IBrushFigure
  | ICircleFigure
  | ILineFigure
  | IRectFigure
  | IFinishFigure
  | IStartFigure
  | IUndoFigure
  | IRedoFigure;

interface IFigure {
  type: string
}

interface ICanvasStates {
  fillColor: TypeColor,
  strokeColor: TypeColor,
  lineWidth: number,
}

interface IBrushFigure extends IFigure, ICanvasStates {
  type: "brush",
  x: number,
  y: number,
  fillColor: TypeColor,
  strokeColor: TypeColor,
  lineWidth: number,
}

interface ICircleFigure extends IFigure, ICanvasStates {
  type: 'circle',
  x: number,
  y: number,
  radius: number,
  fillColor: TypeColor,
  strokeColor: TypeColor,
  lineWidth: number,
}

interface ILineFigure extends IFigure, ICanvasStates {
  type: 'line',
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  fillColor: TypeColor,
  strokeColor: TypeColor,
  lineWidth: number,
}

interface IRectFigure extends IFigure, ICanvasStates {
  type: 'rect',
  x: number,
  y: number,
  width: number,
  height: number,
  fillColor: TypeColor,
  strokeColor: TypeColor,
  lineWidth: number,
}

interface IFinishFigure {
  type: 'finish'
}

interface IStartFigure {
  type: 'start'
}

interface IUndoFigure {
  type: 'undo'
}

interface IRedoFigure {
  type: 'redo';
}
