import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Uploader } from "../../styles/indexStyle";
import { ReducersType } from "../../types";
import { photoEditorActions } from "../../../../store/common/photoEditorSlice";
import { imageCheck } from "./photoChecker";
import { imageMake } from "./photoMaker";

export default function PhotoMenu() {
  const [photo, setPhoto] = useState<string>("");
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const test = async () => {
      if (canvas && photo !== "") {
        if (await imageCheck(photo)) imageMake(photo, canvas, setPhoto);
        else {
          alert("적합한 이미지가 아닙니다");
        }
      }
    };

    test();
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

      e.target.value = "";
    }
  }, []);

  const photoUpload = () => {
    if (inputRef.current !== null) inputRef.current?.click();
  };

  const dispatch = useDispatch();
  const photoEdit = () => {
    const photo = canvas.getActiveObject();
    if (photo) {
      dispatch(photoEditorActions.setPhoto(photo));
      dispatch(photoEditorActions.setIsEditing(true));
    }
  };

  return (
    <>
      <Uploader
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onUploadImage}
      />
      <button onClick={photoUpload}>사진 가져오기</button>
      <button onClick={photoEdit}>선택한 사진 편집하기</button>
    </>
  );
}
