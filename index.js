const line = require('@line/bot-sdk');
const express = require('express');

// ファイル読み込み
require('dotenv').config();
const lineBot = require('./messagingAPI/lineBot');

// LINE BOTの設定
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const app = new express();
const port = 3000;

// LINE BOT
app.post('/webhook', line.middleware(config), lineBot);

app.listen(port, () => console.log(`Server running on ${port}`));
