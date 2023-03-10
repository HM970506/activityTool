import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { PHOTO } from "../types";
import { Button, Uploader } from "../style";

export default function PhotoButton() {
  const dispatch = useDispatch();
  const nodes = useSelector((state: any) => state.nodeReducer.nodes);
  const [photo, setPhoto] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const addPhotoNode = (img: any) => {
    console.log("되는거야 마는거야");
    dispatch(
      nodeActions.addNodes({
        type: PHOTO,
        shapeProps: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          scaleX: 1,
          scaleY: 1,
          frame: "RECT",
          fillPatternOffsetX: 1,
          fillPatternOffsetY: 1,
        },
      })
    );
  };

  const onUploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log("value: ", e.target.value);
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        //해당 이미지를 서버에 저장하는 로직
        //서버에 저장된 주소 가져옴
        //서버에 저장된 주소로 setPhoto
      };

      addPhotoNode(photo);
      e.target.value = ""; //같은 이름 파일을 넣어도 반응하도록 값 리셋해주기
      console.log("value: ", e.target.value);
    }
  }, []);

  const photoUpload = () => {
    if (inputRef.current !== null) inputRef.current?.click();
  };

  const photoButtonClick = () => {
    dispatch(categoryActions.categoryChange(PHOTO));
    photoUpload();
  };

  return (
    <Button onClick={photoButtonClick}>
      <Uploader
        ref={inputRef}
        type="file"
        accept="imgae/*"
        onChange={onUploadImage}
      />
      사진
    </Button>
  );
}
