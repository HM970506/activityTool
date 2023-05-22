import greenEye from "../../../api/greenEye";

export const imageCheck = async (photo: string) => {
  const response = await greenEye(photo);

  if (response) {
    const result = response.data.images[0].result;

    if (
      result.adult.confidence > 0.7 ||
      result.porn.confidence > 0.7 ||
      result.sexy.confidence > 0.7
    )
      return false;
    else return true;
  }
};
