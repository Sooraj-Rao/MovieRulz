import { Store } from "react-notifications-component";

export const animate='bg-slate-500 animate-pulse opacity-70 rounded-md'

export const failMessage = (message,type) => {
  return Store.addNotification({
    message: message,
    type: type,
    container: "top-center",
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};


