"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({ port: 8080 });
wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.send("Connected");
    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Server received your message: ${message}`);
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
