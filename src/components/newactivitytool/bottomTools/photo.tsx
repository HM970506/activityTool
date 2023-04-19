import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Uploader } from "../styles/indexStyle";
import { fabric } from "fabric-with-erasing";
import { ImageType, ReducersType } from "../types";

const defaultX = 500;
export default function PhotoMenu() {
  const [photo, setPhoto] = useState<string>("");
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (canvas && photo !== "") {
      new fabric.Image.fromURL(photo, (img: ImageType) => {
        img.hoverCursor = "auto";
        img.erasable = false;
        img.selectable = true;

        if (img.width !== undefined) {
          const scale = defaultX / img.width;
          img.scaleX = scale;
          img.scaleY = scale;
        }

        canvas.add(img);
        canvas.setActiveObject(img);
      });
      setPhoto("");
    }
  }, [photo, canvas]);

  const onUploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async (e: ProgressEvent<FileReader>) => {
        if (e.target !== null && typeof e.target.result === "string")
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

  const photoEdit = () => {};

  return (
    <>
      <Uploader
        ref={inputRef}
        type="file"
        accept="imgae/*"
        onChange={onUploadImage}
      />
      <button onClick={photoUpload}>사진 가져오기</button>
      <button onClick={photoEdit}>선택한 사진 편집하기</button>
    </>
  );
}
