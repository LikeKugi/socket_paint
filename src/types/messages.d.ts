interface IMessage {
  method: "connection" | "draw"
}

interface IConnectionMessage extends IMessage{
  method: "connection"
  id: number,
  username: string,
}
