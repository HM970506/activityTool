import axios from "axios";

export const setSaveRecoder = async (record: Blob) => {
  const formData = new FormData();
  formData.append("audio", record, "audio.wav");

  const response = await axios({
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    url: "http://localhost:3001/diary",
    data: formData,
  });
  console.log(response.data);
};

//blob을 express로 보내면
