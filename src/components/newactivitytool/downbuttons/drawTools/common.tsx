import { CRAYON, HIGHLIGHTER, SPRAY } from "../../types";
import { ReactComponent as CRAYON_COLOR } from "./svg/crayon_color.svg";
import { ReactComponent as HIGHLIGHTER_COLOR } from "./svg/highlighter_color.svg";
import { ReactComponent as SPRAY_COLOR } from "./svg/spray_color.svg";

export const Color = (nowTool: string) => {
  if (nowTool === CRAYON) return <CRAYON_COLOR />;
  else if (nowTool === HIGHLIGHTER) return <HIGHLIGHTER_COLOR />;
  else if (nowTool === SPRAY) return <SPRAY_COLOR />;
  else <></>;
};

export const getPath = (name: string) => {
  return `/drawtools/${name}.png`;
};
