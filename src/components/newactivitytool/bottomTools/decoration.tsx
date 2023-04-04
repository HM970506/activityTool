import { fabric } from "fabric-with-erasing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import {
  BackgroundContainer,
  ListContainer,
  SubButtons,
  SubCategoryContainer,
} from "./style";
import { categoryActions } from "../../../store/common/categorySlice";
import { STAMP } from "./decorationSample";
import { nodeActions } from "../../../store/common/nodeSlice";

const array = Array.from(Array(20).keys());

export default function DecorationMenu() {
  const [tapeOpacity, setTapeOpacity] = useState<number>(50);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const subcateogory = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );
  const { template, stamp, tape } = subcateogory;
  const dispatch = useDispatch();

  const templating = (templateId: number) => {
    const url = `/test${templateId + 1}.PNG`;

    fabric.Image.fromURL(url, (img: any) => {
      const scale = canvas.width / img.width;

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: scale,
        scaleY: scale,
      });

      canvas.setHeight(img.height * scale);
      canvas.renderAll();
    });
  };

  useEffect(() => {
    if (tape.state) {
      canvas.taping = 1;
      dispatch(nodeActions.setDraw(false));
    } else canvas.taping = 0;
  }, [tape]);

  useEffect(() => {
    if (stamp.state) {
      canvas.stamping = stamp.index;
      dispatch(nodeActions.setDraw(false));
    } else canvas.stamping = -1;
  }, [stamp]);

  return (
    <BackgroundContainer>
      <SubCategoryContainer>
        <button
          onClick={() => {
            dispatch(categoryActions.templateOn());
          }}
        >
          템플릿
        </button>
        <button
          onClick={() => {
            dispatch(categoryActions.stampOn());
          }}
        >
          도장
        </button>
        <button
          onClick={() => {
            dispatch(categoryActions.tapeOn());
          }}
        >
          마스킹테이프
        </button>
      </SubCategoryContainer>
      <ListContainer>
        {template.state &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={template.index == key ? 1 : 0}
                key={key}
                onClick={() => {
                  templating(value);
                  dispatch(categoryActions.templateChange(key));
                }}
              >
                {value}
              </SubButtons>
            );
          })}
        {stamp.state &&
          STAMP.map((value, key) => {
            return (
              <SubButtons
                select={stamp.index == key ? 1 : 0}
                key={key}
                onClick={() => {
                  canvas.stamping = stamp.key;
                  dispatch(categoryActions.stampChange(key));
                }}
              >
                {value.name}
              </SubButtons>
            );
          })}
        {tape.state && (
          <>
            투명도
            <input
              type="range"
              min="0"
              max="100"
              defaultValue={(tape.opacity * 100).toString()}
              onChange={(e: any) =>
                (canvas.tapeState = {
                  ...canvas.tapeState,
                  opacity:
                    e.target.value == "0" ? 0 : parseInt(e.target.value) / 100,
                })
              }
            />
            크기
            <button
              onClick={() =>
                (canvas.tapeState = {
                  ...canvas.tapeState,
                  size: 30,
                })
              }
            >
              30
            </button>
            <button
              onClick={() =>
                (canvas.tapeState = {
                  ...canvas.tapeState,
                  size: 20,
                })
              }
            >
              20
            </button>
            <button
              onClick={() =>
                (canvas.tapeState = {
                  ...canvas.tapeState,
                  size: 10,
                })
              }
            >
              10
            </button>
          </>
        )}
      </ListContainer>
    </BackgroundContainer>
  );
}
