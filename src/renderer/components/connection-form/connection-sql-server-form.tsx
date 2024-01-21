// import { Button } from '@blueprintjs/core';
// import { Input } from '/~/components/ui/input';
// import React from 'react';
// import { ConnectionSQLServerForm } from '/main/types';
// import { SQL_SERVER_CONNECTOR_SERVICE } from '/main/models/constant';

// const ConnectionSQLServerForm = () => {
//   const [username, setUsername] = React.useState<string>('');
//   const [password, setPassword] = React.useState<string>('');
//   const [server, setServer] = React.useState<string>('');
//   const [database, setDatabase] = React.useState<string>('');
//   const [isConnecting, setIsConnecting] = React.useState<boolean>(false);

//   const handleClear = () => {
//     setUsername('');
//     setPassword('');
//     setServer('');
//     setDatabase('');
//   };

//   const handleConnect = async () => {
//     const obj: ConnectionSQLServerForm = {
//       username,
//       password,
//       server,
//       database,
//     };

//     setIsConnecting(true);

//     const result = await window.electron.ipcRenderer.invoke(
//       SQL_SERVER_CONNECTOR_SERVICE.ON_CONNECT_DATABASE,
//       obj
//     );

//     setIsConnecting(false);
//   };

//   return (
//     <div className="flex flex-col gap-4 w-full h-full mt-5">
//       <div className="flex items-center w-full gap-2">
//         <span
//           className="text-sm w-16"
//           style={{
//             fontFamily: 'SF-Pro-Medium',
//           }}
//         >
//           Username:
//         </span>
//         <Input
//           value={username}
//           className="h-6 w-[calc(100%-64px)]"
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//         />
//       </div>

//       <div className="flex items-center w-full gap-2">
//         <span
//           className="text-sm w-16"
//           style={{
//             fontFamily: 'SF-Pro-Medium',
//           }}
//         >
//           Password:
//         </span>
//         <Input
//           value={password}
//           className="h-6 w-[calc(100%-64px)]"
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//       </div>

//       <div className="flex items-center w-full gap-2">
//         <span
//           className="text-sm w-16"
//           style={{
//             fontFamily: 'SF-Pro-Medium',
//           }}
//         >
//           Server:
//         </span>
//         <Input
//           value={server}
//           className="h-6 w-[calc(100%-64px)]"
//           onChange={(e) => {
//             setServer(e.target.value);
//           }}
//         />
//       </div>

//       <div className="flex items-center w-full gap-2">
//         <span
//           className="text-sm w-16"
//           style={{
//             fontFamily: 'SF-Pro-Medium',
//           }}
//         >
//           Database:
//         </span>
//         <Input
//           value={database}
//           className="h-6 w-[calc(100%-64px)]"
//           onChange={(e) => {
//             setDatabase(e.target.value);
//           }}
//         />
//       </div>

//       <div className="flex items-center gap-4 justify-end w-full">
//         <Button intent="none" className="" onClick={handleClear}>
//           Clear
//         </Button>
//         <Button
//           intent="primary"
//           loading={isConnecting}
//           className=""
//           onClick={handleConnect}
//         >
//           Connect
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ConnectionSQLServerForm;
