import Colorbox from "../../bottomTools/colorbox";
import SizeBox from "../../bottomTools/sizebox";
import { OptionContainer } from "./style";

export default function DrawOption() {
  const sizeChange = () => {};
  const colorChange = () => {};

  return (
    <OptionContainer>
      <SizeBox sizeChange={sizeChange} />
      <Colorbox colorChange={colorChange} />
    </OptionContainer>
  );
}
