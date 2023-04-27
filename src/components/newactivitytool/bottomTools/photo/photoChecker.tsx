import greenEye from "../../../api/greenEye";

export const imageCheck = async (photo: string) => {
  await greenEye(photo);
  return true;
};
