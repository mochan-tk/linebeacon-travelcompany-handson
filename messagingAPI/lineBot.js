'use strict';

const line = require('@line/bot-sdk');
const jsonData = require('../data.json');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

module.exports = async( req, res ) => {
  Promise
    .all(req.body.events.map(await handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(200).end();
    });
};

// event handler
async function handleEvent(event, session) {
  console.log(event);
  let echo = [];
  if (event.type === 'beacon') {
    if (event.beacon.type === 'enter') {
      let personData = jsonData.person.filter(item => item.id == event.source.userId)[0];
      if(personData){
        echo = { 'type': 'text', 'text': personData.name + '様がご来店しました。' }; 
        console.log('お得意様ユーザーID：' + event.source.userId);
      } else {
        echo = { 'type': 'text', 'text': 'ご新規のお客様がご来店しました。'};
        console.log('ご新規様ユーザーID：' + event.source.userId);
      }
      // 管理者へメッセージ送信
      await client.pushMessage(process.env.USER_ID, [ echo ])
      .then(() => {
        console.log('メッセージを送信しました。')
      })
      .catch((err) => {
        console.log(err);
      });
      return;
    }
  } else if (event.type === 'follow') {
    return;
  } else {
    echo = { 'type': 'text', 'text': 'LINE BOT 成功です！\n下記URLからLINE Beaconの設定を行いましょう。\nline://nv/settings/privacy/provideUsageData/beacon/' }; 
  }

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}
