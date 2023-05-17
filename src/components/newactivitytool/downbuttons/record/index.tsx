import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { RECORD, ReducersType } from "../../types";
import { RecordContatiner, RecordInnerBox } from "./style";
import { useEffect, useState } from "react";
import Record from "./record";

export default function RecordButton() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<number>(0);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  useEffect(() => {
    if (category !== RECORD) setIsOpen(0);
    else setIsOpen(1);
  }, [category]);

  const recordButtonClick = () => {
    if (category !== RECORD) dispatch(categoryActions.categoryChange(RECORD));
    else dispatch(categoryActions.categoryChange(""));
  };

  return (
    <RecordContatiner state={isOpen}>
      <RecordInnerBox state={isOpen} onClick={recordButtonClick}>
        녹음
      </RecordInnerBox>
      {isOpen == 1 ? <Record /> : null}
    </RecordContatiner>
  );
}
