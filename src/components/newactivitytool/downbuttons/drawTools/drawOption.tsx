import Colorbox from "../../bottomTools/colorbox";
import SizeBox from "../../bottomTools/sizebox";
import { OptionContainer } from "./style";

export default function DrawOption({ keyName }: { keyName: string }) {
  const sizeChange = () => {};
  const colorChange = () => {};

  return (
    <OptionContainer>
      <SizeBox sizeChange={sizeChange} keyName={keyName} />
      <Colorbox colorChange={colorChange} keyName={keyName} />
    </OptionContainer>
  );
}
