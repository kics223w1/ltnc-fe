import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = string;

// keep track all active channels
var activeChannels: string[] = [];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
      activeChannels.push(channel);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
        console.log(`Listener removed from ipcRenderer channel: ${channel}`);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async invoke(channel: Channels, args: any) {
      return await ipcRenderer.invoke(channel, args);
    },
    removeAllListener() {
      // remove to avoid observing the same network too many time
      activeChannels.forEach((channel) => {
        ipcRenderer.removeAllListeners(channel);
      });
      activeChannels = [];
    },
  },
});
