import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  Background,
  Template,
  DialogMain,
  TemplatesContainer,
} from "./style";

const dummy = [1, 2, 3, 4, 5, 6, 7];

export default function TemplatesIndex() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [nowTemplate, setNowTemplate] = useState<null | number>(null);

  const templateClick = (value: number) => {
    setNowTemplate(value);
    dialog.current?.showModal();
  };

  //오버레이 클릭시 닫는 기능을 추가하기 위해 이벤트 캡쳐링 이용
  const overlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLDialogElement) closeModal();
  };

  const closeModal = () => {
    dialog.current?.close();
  };

  return (
    <Background>
      <Dialog ref={dialog} onClick={overlayClick}>
        <DialogMain>
          <p>{nowTemplate}</p>
          <div>
            <button onClick={closeModal}>취소</button>
            <Link to={`/${nowTemplate}`}>확인</Link>
          </div>
        </DialogMain>
      </Dialog>
      <TemplatesContainer>
        {dummy.map((value, key) => (
          <Template key={key} onClick={() => templateClick(value)}>
            {value} 템플릿 목록
          </Template>
        ))}
      </TemplatesContainer>
    </Background>
  );
}
