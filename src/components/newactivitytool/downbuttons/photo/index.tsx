import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { PHOTO, ReducersType } from "../../types";
import { Button } from "../../style";
import { useEffect, useState } from "react";
import PhotoMenu from "./photo";
import { Icon, PhotoContatiner, PhotoInnerBox } from "./style";

export default function PhotoButton() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<number>(0);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  const photoButtonClick = () => {
    if (category !== PHOTO) dispatch(categoryActions.categoryChange(PHOTO));
    else dispatch(categoryActions.categoryChange(""));
  };

  useEffect(() => {
    if (category !== PHOTO) setIsOpen(0);
    else setIsOpen(1);
  }, [category]);

  return (
    <>
      <PhotoContatiner state={isOpen}>
        <PhotoInnerBox onClick={photoButtonClick} state={isOpen}>
          <Icon src={"/diary/photo/photo.png"} />
        </PhotoInnerBox>
        {category === PHOTO && <PhotoMenu />}
      </PhotoContatiner>
    </>
  );
}
