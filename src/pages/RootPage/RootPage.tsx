import {FC, JSX, useEffect} from "react";
import {useParams} from "react-router-dom";
import Canvas from "../../components/Canvas/Canvas";
import SettingsBar from "../../components/SettingsBar/SettingsBar";
import ToolBar from "../../components/ToolBar/ToolBar";

interface IRootPageParams {
  setID: (p: TypeParams) => void;
}


const RootPage: FC<IRootPageParams> = ({setID}): JSX.Element => {
  const params = useParams<TypeParams>();
  useEffect(() => {
    setID(params)
  }, [])
  return (
    <>
      <ToolBar />
      <SettingsBar />
      <Canvas />
    </>
  );
}
export default RootPage;
