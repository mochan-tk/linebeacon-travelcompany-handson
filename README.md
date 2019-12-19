# 作成手順

1. ngrokをインストールする  
npm i -g ngrok


2. ngrokを実行する  
ngrok http 3000


3. Messaging APIを設定する  
・Webhook送信  
する  
・Webhook URL  
https://xxx.ngrok.io/webhook  
・自動応答メッセージ  
利用しない


4. git cloneする  
git clone https://github.com/mochan-tk/linebeacon-travelcompany-handson.git

5. npmをインストールする  
npm i


6. 「.env」ファイルを設定する   
・「CHANNEL_ACCESS_TOKEN」、「CHANNEL_SECRET」、「USER_ID」  
「3」で生成した「アクセストークン」と「Channel Secret」と「ユーザーID」  

7. 実行する  
node index.js  


8. LINE Simple BeaconのハードウェアIDを発行  

9. micro:bitをLINE Beacon化する  

10. 動作確認をする
