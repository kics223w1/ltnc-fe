### How to run

```
npm i
```

- You need to mock api to see the UI
- Install [Proxyman](https://proxyman.io/)
- Open Map Local Tool (Ctrl + Shift + L)
- Right click table -> Import settings -> Select file proxyman_map_local_tree_rules.config in this repository
- Go to `src/main/service/network-service`
- Change the host and port following the image
  ![alt text](image.png)
- Start Proxyman -> The run `npm start` -> You will see the requests in Proxyman

### How to build

```
npm i
npm run build
```
