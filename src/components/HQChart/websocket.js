var ws = new WebSocket("wss://xcxhq.upchinaproduct.com");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
    self.socket.send({
      data: `{"packet":{"iRequestId":89,"sFuncName":"stockHqSimple"},"stReq":{"stHeader":{"stClientInfo":{"vGuid":[0,0,0,3,0,16,83,57,0,37,89,77,60,9,85,64]}},"vStock":[{"shtSetcode":${self.properties.market},"sCode":"${self.properties.code}"}],"ePushFlag":1,"vBitmap":[254,1,238,137,128]}}`
    })
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};      

