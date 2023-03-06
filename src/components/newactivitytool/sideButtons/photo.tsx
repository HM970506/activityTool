import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useImage } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { Button, Uploader } from "../style";

export default function PhotoButton() {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const addNodes = (img: any) => {
    dispatch(
      nodeActions.addNodes({
        type: "PHOTO",
        shapeProps: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          frame: "RECT",
          fillPatternOffsetX: 0,
          fillPatternOffsetY: 0,
        },
      })
    );
  };

  useEffect(() => {
    if (photo !== "") addNodes(photo);
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
      };
      setPhoto(file.name);
    }
  }, []);

  const photoUpload = () => {
    if (inputRef.current !== null) {
      inputRef.current?.click();
    }
  };

  return (
    <Button
      onClick={() => {
        dispatch(categoryActions.categoryChange("PHOTO"));
        //이거 왜 2번 실행되지..?
        photoUpload();
      }}
    >
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
