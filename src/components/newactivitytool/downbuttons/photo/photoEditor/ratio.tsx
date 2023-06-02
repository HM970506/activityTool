import { ImageType, ReducersType, canvasType } from "../../../types";
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
import { useEffect, useState } from "react";
import { fabric } from "fabric-with-erasing";
import { useSelector } from "react-redux";

const RATIO_SVG = [<Ratio1 />, <Ratio2 />, <Ratio3 />, <Ratio4 />];
const RATIOS = [
  { widthR: 16, heightR: 9 },
  { widthR: 3, heightR: 2 },
  { widthR: 4, heightR: 3 },
  { widthR: 1, heightR: 1 },
];

interface ratioType {
  widthR: number;
  heightR: number;
}

export default function Ratio() {
  const photoCanvas = useSelector(
    (state: ReducersType) => state.photoEditorReducer.photoCanvas
  );
  const [select, setSelect] = useState<number>(-1);

  const reset = () => {
    setSelect(-1);
    if (photoCanvas.getObjects().length >= 2)
      photoCanvas.remove(photoCanvas.getObjects()[1]);
  };

  const ratioCalculator = (
    ratio: ratioType,
    image: { width: number; height: number }
  ) => {
    if (image.width > image.height)
      return {
        width: (image.height * ratio.widthR) / ratio.heightR,
        height: image.height,
      };
    else
      return {
        height: (image.width * ratio.heightR) / ratio.widthR,
        width: image.width,
      };
  };

  const ratioHandler = (ratio: ratioType) => {
    const image = photoCanvas.getObjects()[0];
    const cal = ratioCalculator(ratio, {
      width: image.width * image.scaleX,
      height: image.height * image.scaleY,
    });

    const crop = new fabric.Rect({
      objectType: "frame",
      top: image.top,
      left: image.left,
      width: cal.width,
      height: cal.height,
      fill: "black",
      selectable: true,
      globalCompositeOperation: "destination-atop",
    });

    crop.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      mtr: true,
    });

    if (photoCanvas.getObjects().length > 1)
      photoCanvas.remove(photoCanvas.getObjects()[1]);
    photoCanvas.add(crop);
    photoCanvas.renderAll();
  };

  return (
    <PhotoOption1
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <OptionComponent onClick={reset}>
        <Refrash />
      </OptionComponent>
      {RATIO_SVG.map((value: any, key: number) => {
        return (
          <OptionComponent
            key={`cutter_${key}`}
            onClick={() => {
              setSelect(key);
              ratioHandler(RATIOS[key]);
            }}
          >
            <OptionComponentSelectBox select={select === key ? 1 : 0}>
              {value}
            </OptionComponentSelectBox>
          </OptionComponent>
        );
      })}
    </PhotoOption1>
  );
}
