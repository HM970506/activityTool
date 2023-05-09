import { BackButton } from "../styles/commonStyle";

export default function Back({ onClick }: { onClick: Function }) {
  return (
    <BackButton
      onClick={() => {
        onClick();
      }}
    >
      백버튼
    </BackButton>
  );
}
