import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Uploader } from "../style";
import { fabric } from "fabric-with-erasing";

const defaultX = 500;
export default function PhotoMenu() {
  const shapeChange = (shape: string) => {
    const now = canvas.getActiveObject();

    if (!now) return;

    fabric.Image.fromURL(`/${shape}.png`, (frameImg: any) => {
      frameImg.erasable = false;
      frameImg.selectable = true;
      frameImg.crossOrigin = "Anonymous";
      fabric.Image.fromURL(
        now.type == "image" ? now.getSrc() : now.getObjects()[1].getSrc(),
        (innerImg: any) => {
          innerImg.globalCompositeOperation = "source-atop";
          innerImg.erasable = false;
          innerImg.selectable = true;
          innerImg.crossOrigin = "Anonymous";

          innerImg.scaleX =
            now.type == "image" ? now.scaleX : now.getObjects()[1].scaleX;
          innerImg.scaleY =
            now.type == "image" ? now.scaleY : now.getObjects()[1].scaleY;
          innerImg.width =
            now.type == "image" ? now.width : now.getObjects()[1].width;
          innerImg.height =
            now.type == "image" ? now.height : now.getObjects()[1].height;
          innerImg.rotate =
            now.type == "image" ? now.rotate : now.getObjects()[1].rotate;

          const group = new fabric.Group([frameImg, innerImg], {
            selectable: true,
            erasable: false,
            left: now.left,
            top: now.top,
          });

          canvas.add(group);
          canvas.remove(now);
          canvas.renderAll();
          canvas.setActiveObject(group);
        }
      );
    });
  };

  const [photo, setPhoto] = useState<string>("");
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (photo != "") {
      new fabric.Image.fromURL(photo, (img: any) => {
        img.viewportCenter();
        img.hoverCursor = "auto";
        img.erasable = false;
        img.selectable = true;

        const scale = defaultX / img.width;
        img.scaleX = scale;
        img.scaleY = scale;

        canvas.add(img);
        canvas.setActiveObject(img);
      });
      setPhoto("");
    }
  }, [photo]);

  const onUploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async (e: any) => {
        setPhoto(e.target.result);
      };

      //해당 이미지를 서버에 저장하는 로직
      //서버에 저장된 주소 가져옴
      //서버에 저장된 주소로 setPhoto

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
          const now = canvas.getActiveObject();
          if (!now) return;
          const target = now.getObjects()[1];
          const url = now.type == "image" ? now.getSrc() : target.getSrc();
          // console.log("0", now.getObjects()[0].left, now.getObjects()[0].top);
          // console.log("1", now.getObjects()[1].left, now.getObjects()[1].top);
          new fabric.Image.fromURL(url, (img: any) => {
            img.set({
              hoverCursor: "auto",
              erasable: false,
              selectable: true,
              scaleX: target.scaleX,
              scaleY: target.scaleY,
              width: target.width,
              height: target.height,
              top: now.top,
              left: now.left,
              angle: target.angle,
            });
            canvas.remove(now);
            canvas.add(img);
            canvas.renderAll();
          });
        }}
      >
        원래대로
      </button>
      <button
        onClick={() => {
          shapeChange("heart");
        }}
      >
        하트
      </button>
      <button
        onClick={() => {
          shapeChange("star");
        }}
      >
        별
      </button>
    </>
  );
}
