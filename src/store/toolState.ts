import {makeAutoObservable} from "mobx";

class ToolState {
  tool: ITool | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: ITool) {
    this.tool = tool
  }
  setFillColor(color: string) {
    if (!this.tool) return;
    this.tool.fillColor = color;
  }
  setStrokeColor(color: string) {
    if (!this.tool) return;
    this.tool.strokeColor = color;
  }
  setLineWidth(width: number) {
    if (!this.tool) return;
    this.tool.lineWidth = width;
  }

  get lineWidth () {
    return this.tool?.ctx?.lineWidth || 1;
  }
}

export default new ToolState();
