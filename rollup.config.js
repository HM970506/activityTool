import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import svgr from "@svgr/rollup";
import image from "@rollup/plugin-image";
import url from "@rollup/plugin-url";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
      },
    ],
    external: [".js", ".jsx", ".ts", ".tsx", "canvas-prebuilt", "canvas"],
    plugins: [
      resolve({
        preferBuiltins: true, //내장 모듈 사용 할거라니까...
        jsnext: true,
        broswer: true,
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(), //node_modules에서 모듈을 불러올수 있도록 해줌, ts/tsx 파일도 불러올수 있음
      url(), //미디어 파일을 dataURI 형태로 불러와서 사용 할 수 있게 해줌
      svgr(), //svg를 컴포넌트로 사용 할 수 있게 해줌
      peerDepsExternal(), //peerDependencies에 설치된 라이브러리들을 external모듈로 설정하여 번들 결과물에서 제외
      typescript({ tsconfig: "./tsconfig.json" }), //typescript 플러그인
      image(),
      json({ compact: true }),
    ],
  },
];
