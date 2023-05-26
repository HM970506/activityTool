import { ReactComponent as Line1 } from "./svg/line/line1.svg";
import { ReactComponent as Line2 } from "./svg/line/line2.svg";
import { ReactComponent as Line3 } from "./svg/line/line3.svg";
import { ReactComponent as Line4 } from "./svg/line/line4.svg";
import { ReactComponent as Line5 } from "./svg/line/line5.svg";
import { ReactComponent as Spray1 } from "./svg/spray/spray1.svg";
import { ReactComponent as Spray2 } from "./svg/spray/spray2.svg";
import { ReactComponent as Spray3 } from "./svg/spray/spray3.svg";
import { ReactComponent as Spray4 } from "./svg/spray/spray4.svg";
import { ReactComponent as Spray5 } from "./svg/spray/spray5.svg";

export const getPath = (name: string) => {
  return `/diary/drawtools/${name}.png`;
};

export const SIZES = [1, 10, 20, 30, 50];

export const LineSize = [<Line1 />, <Line2 />, <Line3 />, <Line4 />, <Line5 />];
export const SpraySize = [
  <Spray1 />,
  <Spray2 />,
  <Spray3 />,
  <Spray4 />,
  <Spray5 />,
];
