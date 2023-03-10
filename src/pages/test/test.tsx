import { Background, StageArea } from "./style";

export default function Test() {
  return (
    <Background>
      <input
        type="range"
        value="0"
        min="-10"
        max="10"
        onChange={(e) => console.log(e.target.value)}
      />
    </Background>
  );
}
