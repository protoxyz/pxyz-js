module.exports = { 
    version: '1.0.0',
    name: "example-expo",
    slug: "example-expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        "supportsTablet": true
    },
    android: {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    extra: {
        pxyxPublicKey: process.env.PXYZ_PUBLIC_KEY,
        pxyzDomain: process.env.PXYZ_DOMAIN,
        protocolEnv: process.env.PROTOCOL_ENV
    },
};