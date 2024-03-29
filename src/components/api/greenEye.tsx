import axios from "axios";

export default async function greenEye(url: string) {
  const distributeUrl = `${process.env.REACT_APP_GREENEYE_URL}`;

  const data = {
    version: "V1",
    requestId: "requestId",
    timestamp: new Date().getTime(),
    images: [
      {
        name: "demo",
        data: url.split(",")[1],
      },
    ],
  };
  return await axios
    .post(distributeUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "X-GREEN-EYE-SECRET": `${process.env.REACT_APP_GREENEYE_KEY}`,
      },
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
