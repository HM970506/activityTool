import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import { Uploader } from "../style";
import { fabric } from "fabric";
export default function PhotoMenu() {
  const dispatch = useDispatch();
  const select = useSelector((state: any) => state.selectReducer.select);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes);

  const shapeChange = (shape: string) => {
    const now = canvas.getActiveObject();

    if (!now) return;

    const url = now.getSrc();
    const { x, y } = now.aCoords.tl;

    new fabric.Image.fromURL(url, (img: any) => {
      canvas.add(
        img.set({
          left: x,
          top: y,
          clipPath: new fabric.Circle({
            radius: 100,
            originX: "center",
            originY: "center",
          }),
        })
      );
    });
    canvas.remove(now);
    canvas.requestRenderAll();
  };

  /*
  const offsetArray = [
    { x: 5, y: 0 },
    { x: -5, y: 0 },
    { x: 0, y: 5 },
    { x: 0, y: -5 },
  ];

  const offsetChange = (offset: number | null) => {
    if (select != null || select != undefined) {
      dispatch(
        nodeActions.modifyNodes({
          index: select,
          modifyProps: {
            fillPatternOffsetX:
              offset === null
                ? 0
                : nodes[select].shapeProps.fillPatternOffsetX +
                  offsetArray[offset].x,
            fillPatternOffsetY:
              offset === null
                ? 0
                : nodes[select].shapeProps.fillPatternOffsetY +
                  offsetArray[offset].y,
          },
        })
      );
    }
  };
  */
  const [photo, setPhoto] = useState<string>("");
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (photo != "") {
      new fabric.Image.fromURL(photo, (img: any) => {
        canvas.add(img);
      });
      setPhoto("");
    }
  }, [photo]);

  const onUploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        //해당 이미지를 서버에 저장하는 로직
        //서버에 저장된 주소 가져옴
        //서버에 저장된 주소로 setPhoto
        setPhoto(
          "https://i.pinimg.com/564x/df/af/1a/dfaf1ab08c6f30cfe18a14e3fdd815ad.jpg"
        );
      };

      e.target.value = ""; //같은 이름 파일을 넣어도 반응하도록 값 리셋해주기
    }
  }, []);

  const photoUpload = () => {
    if (inputRef.current !== null) inputRef.current?.click();
  };

  return (
    <>
      <Uploader
        ref={inputRef}
        type="file"
        accept="imgae/*"
        onChange={onUploadImage}
      />
      <button onClick={photoUpload}>사진 가져오기</button>
      <button
        onClick={() => {
          shapeChange("RECT");
        }}
      >
        사각형
      </button>
      <button
        onClick={() => {
          shapeChange("HEART");
        }}
      >
        하트
      </button>
      <button
        onClick={() => {
          shapeChange("APPLE");
        }}
      >
        사과
      </button>
      <div>
        <button>원래대로</button>
      </div>
    </>
  );
}
