import { canvasType } from "../../../types";
import {
  OptionComponent,
  OptionComponentSelectBox,
  PhotoOption1,
} from "./style";
import { ReactComponent as Refrash } from "./svg/refrash.svg";
import { ReactComponent as Ratio1 } from "./svg/ratio1.svg";
import { ReactComponent as Ratio2 } from "./svg/ratio2.svg";
import { ReactComponent as Ratio3 } from "./svg/ratio3.svg";
import { ReactComponent as Ratio4 } from "./svg/ratio4.svg";
import { ReactComponent as Ratio5 } from "./svg/ratio5.svg";
import { useEffect, useState } from "react";

const RATIOS = [<Ratio1 />, <Ratio2 />, <Ratio3 />, <Ratio4 />, <Ratio5 />];
export default function Ratio({ photoCanvas }: { photoCanvas: canvasType }) {
  const [select, setSelect] = useState<number>(-1);

  useEffect(() => {}, [select]);

  return (
    <PhotoOption1>
      <OptionComponent>
        <Refrash />
      </OptionComponent>
      {RATIOS.map((value: any, key: number) => {
        return (
          <OptionComponent
            key={`cutter_${key}`}
            onClick={() => {
              setSelect(key);
            }}
          >
            <OptionComponentSelectBox select={select === key ? 1 : 0}>
              {RATIOS[key]}
            </OptionComponentSelectBox>
          </OptionComponent>
        );
      })}
    </PhotoOption1>
  );
}
