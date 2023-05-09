import { useSelector } from "react-redux";
import Colorbox from "../../bottomTools/colorbox";
import { OptionContainer } from "./style";
import { ReducersType } from "../../types";

export default function DrawOption({
  colorChange,
  sizeChange,
}: {
  colorChange: Function;
  sizeChange: Function;
}) {
  const SizeBox = ({ sizeChange }: { sizeChange: Function }) => {
    return <div> test</div>;
  };

  return (
    <OptionContainer>
      <SizeBox sizeChange={sizeChange} />
      <Colorbox colorChange={colorChange} />
    </OptionContainer>
  );
}
