import { CheckButton } from "../styles/commonStyle";

export default function Check({ onClick }: { onClick: Function }) {
  return (
    <CheckButton
      onClick={() => {
        onClick();
      }}
    >
      체크
    </CheckButton>
  );
}
