import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: false,
      title: 'zhongtai',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  "proxy": {
    "/api": {
      "target": "http://101.132.27.104:7077/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
}

export default config;
