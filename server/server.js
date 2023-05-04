const express = require("express");
const admin = require("firebase-admin");
const storage = require("firebase-admin/storage");
const ffmpeg = require("fluent-ffmpeg");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

//왜 키를 json으로 넣어야하지...
const serviceAccount = require(`./${process.env.APIKEY}`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGEBUCKET,
});
const bucket = admin.storage().bucket();

const uploadBlobToStorage = (blob) => {
  return new Promise((resolve, reject) => {
    const filename = "test.mp3";
    const tempFilePath = `/tmp/${filename}`;
    const tempFile = bucket.file(tempFilePath);

    const writeStream = tempFile.createWriteStream();

    ffmpeg(blob)
      .toFormat("mp3")
      .on("error", (error) => {
        console.error(error);
        reject("Error converting file");
      })
      .on("end", () => {
        console.log(`File converted to ${filename}`);

        const options = {
          destination: `${filename}`,
        };
        ㄴㄴ;
        bucket.upload(tempFilePath, options, (err, file) => {
          if (err) {
            console.error(err);
            reject("Error uploading file");
          } else {
            console.log(`File uploaded to ${file.name}`);
            resolve(file);
          }
        });
      })
      .pipe(writeStream);
  });
};

app.post("/diary", (req) => {
  console.log(req.body);
  uploadBlobToStorage(req.body.blob);
});

app.listen(3001, () => {
  console.log("3001 server open");
});

// const FormData = require("form-data");
// const fs = require("fs");
// let data = new FormData();
// data.append("dir", "/src/testing");
// data.append(
//   "file",
//   fs.createReadStream("///thinkbig.co/Dfs/Users/19001590/Pictures/B.jpg")
// );

// let config = {
//   method: "post",
//   maxBodyLength: Infinity,
//   url: "https://any-web-api.wjthinkbig.com/qpi/upload",
//   headers: {
//     "Content-Type": "application/json",
//     ...data.getHeaders(),
//   },
//   data: data,
// };

// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
