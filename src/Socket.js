import { w3cwebsocket as W3CWebSocket } from "websocket";
import {wsUri} from "./constants/wsUri.js"
export const token = localStorage.getItem('GoGameToken')

console.log(token)

export const client = new W3CWebSocket(wsUri);

client.onerror = function() {
  console.log('Connection Error');
};

client.onopen = function() {};

client.onclose = function() {
  console.log('echo-protocol Client Closed');
};
