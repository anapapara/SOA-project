export const mfConfig = {
  name: "login_mf",
  remotes: {
    chat_mf: "chat_mf@http://localhost:3001/remoteEntry.js",
  },
  exposes: {},
  shared: { react: { singleton: true }, "react-dom": { singleton: true } },
};
