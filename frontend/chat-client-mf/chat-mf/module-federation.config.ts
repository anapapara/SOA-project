export const mfConfig = {
  name: "chat_mf",
  filename: "remoteEntry.js",
  exposes: {
    "./LoggedUserLabel": "./src/components/LoggedUserLabel",
  },
  shared: { react: { singleton: true }, "react-dom": { singleton: true } },
};
