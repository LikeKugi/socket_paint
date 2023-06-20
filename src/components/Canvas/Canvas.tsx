import styles from './Canvas.module.css'
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import canvasState from "../../store/canvasState";
import {getImage, postImage} from "../../services/connectionsWS";

const Canvas = observer((): JSX.Element => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!(canvasRef.current instanceof HTMLCanvasElement)) {
      return;
    }
    if (!canvasState.sessionID) {
      return;
    }

    canvasState.setCanvas(canvasRef.current)

    const img = new Image();
    getImage(canvasState.sessionID).then(res => {
      img.src = res
      img.onload = () => {
        if (!canvasState.canvas) {
          return;
        }
        const ctx = canvasState.canvas.getContext('2d')
        if(!(ctx instanceof CanvasRenderingContext2D)) {
          return;
        }
        ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
        ctx.drawImage(img, 0, 0, canvasState.canvas.width, canvasState.canvas.height)
        ctx.stroke()
      }
    }).catch(() => {})
  }, [])

  const mouseDownHandler = () => {
    if (canvasRef.current instanceof HTMLCanvasElement) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }

  const mouseUpHandler = () => {
    if (!canvasState.sessionID || !(canvasRef.current instanceof HTMLCanvasElement)) {
      return;
    }
    postImage(canvasState.sessionID, canvasRef.current.toDataURL())
  }

  return (
    <div className={styles.canvas}>
      <div className="container">
        <canvas onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} ref={canvasRef} className={styles.canvas__field}  width={800} height={600}></canvas>
      </div>
    </div>
  );
})
export default Canvas;
