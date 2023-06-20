import axios, {AxiosError} from "axios";
import canvasState from "../store/canvasState";

export const getImage = async (sessionID:string) => {
  try {
    const res = await axios.get(`http://localhost:5000/image?id=${sessionID}`);
    return await res.data
  } catch (e: unknown) {
    const err = e as AxiosError;
    console.log(err.message)
  }
}

export const postImage = async (sessionID: string, data: any) => {
  try {
    const res = await axios.post(`http://localhost:5000/image?id=${sessionID}`, {img: data})
    const answer = await res.data;
    console.log(answer);
  } catch (e: unknown) {
    const err = e as AxiosError;
    console.log(err.message)
  }
}

export const sendFigure = (socket: WebSocket, msg: IToolSend) => {

  const sendingObj: IToolMsg = {...msg, username: canvasState.username}
  socket.send(JSON.stringify(sendingObj))
}
