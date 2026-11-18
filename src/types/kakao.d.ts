export {};

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (payload: {
          objectType: "text";
          text: string;
          link: { webUrl: string; mobileWebUrl: string };
        }) => void;
      };
    };
  }
}

