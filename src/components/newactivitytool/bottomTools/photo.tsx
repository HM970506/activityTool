import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Uploader } from "../style";
import { fabric } from "fabric-with-erasing";
export default function PhotoMenu() {
  const shapeChange = (shape: string) => {
    const now = canvas.getActiveObject();

    if (!now) return;

    const url =
      now.type == "image" ? now.getSrc() : now.getObjects()[1].getSrc();
    const { x, y } = now.aCoords.tl;
    const width = now.width;
    const height = now.height;

    fabric.Image.fromURL(`/${shape}.png`, (img: any) => {
      let frameImg = img;
      frameImg.height = height + 10;
      frameImg.width = width + 10;
      frameImg.erasable = false;
      frameImg.hoverCursor = "auto";

      fabric.Image.fromURL(url, (img: any) => {
        let innerImg = img;
        innerImg.globalCompositeOperation = "source-atop";
        innerImg.erasable = false;
        innerImg.hoverCursor = "auto";

        const group = new fabric.Group([frameImg, innerImg], {
          left: x,
          top: y,
        });
        group.selectable = true;
        console.log(group);

        canvas.add(group);
      });
      canvas.remove(now);
      canvas.renderAll();
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
          // shapeChange("RECT");
        }}
      >
        사각형
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
