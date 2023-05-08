import axios from "axios";

export default async function greenEye(url: string) {
  // console.log(process.env.REACT_APP_GREENEYE_KEY);
  const response = await axios
    .post(
      `https://clovagreeneye.apigw.ntruss.com/custom/v1/48/dc97fd5000624c757f581ef217381c7c71647537b428a1ef27629e621fa2be94/predict`,
      {
        body: {
          version: "V1",
          requestId: "xxx",
          timestamp: 0,
          images: [
            {
              name: "demo",
              url: "https://i.pinimg.com/564x/8e/9f/8f/8e9f8facb2cd8692f0c28e3314f6cd50.jpg",
              data: "base64",
            },
          ],
        },

        headers: {
          "Content-Type": "application/json",
          "X-GREEN-EYE-SECRET": `${process.env.REACT_APP_GREENEYE_KEY}`,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
  // const json = JSON.stringify(response.data);
  //r console.log(json);
}
