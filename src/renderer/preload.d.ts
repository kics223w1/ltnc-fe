import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(
          channel: Channels,
          args: unknown[] | { [key: string]: any }
        ): any;
        on(
          channel: string,
          func: (...args: unknown[] | any) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
        invoke(channel: Channels, args: any): any;
        removeAllListener(): void;
      };
    };
  }
}

export {};
