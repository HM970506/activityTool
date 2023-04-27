import axios from "axios";

export default async function greenEye(url: string) {
  const response = await axios
    .post(
      `/custom/v1/48/dc97fd5000624c757f581ef217381c7c71647537b428a1ef27629e621fa2be94/predict`,
      {
        body: {
          version: "V1",
          requestId: "xxx",
          timestamp: 0,
          images: [
            {
              name: "demo",
              url: url,
              data: "base64",
            },
          ],
        },

        headers: {
          "Content-Type": "application/json",
          "X-GREEN-EYE-SECRET": `${process.env.REACT_GREENEYE_KEY}`,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
  // const json = JSON.stringify(response.data);
  //r console.log(json);
}
