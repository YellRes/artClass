const currentEnv = process.env.currentEnv;

const plugins = {
  tailwindcss: {},
  autoprefixer: {},
  // TODO: web的环境不需要将rem转换成rpx 需要优化
  "postcss-rem-to-responsive-pixel": {
    // 32 意味着 1rem = 32rpx
    rootValue: 32,
    // 默认所有属性都转化
    propList: ["*"],
    // 转化的单位,可以变成 px / rpx
    transformUnit: "rpx",
  },
};

currentEnv === "web" && delete plugins["postcss-rem-to-responsive-pixel"];

module.exports = {
  plugins,
};
