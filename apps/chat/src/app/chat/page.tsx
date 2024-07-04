"use client";

import { store } from "./store/store";
import { Provider } from "react-redux";
import ChatComponent from "./chat";

export default function Web() {
  return (
    <Provider store={store}>
      <div>
        <ChatComponent />
      </div>
    </Provider>
  );
}
