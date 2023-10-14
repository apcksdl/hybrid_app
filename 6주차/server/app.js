const express = require('express');
const app = express();
const port = 8005;


// CORS 설정
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 모든 도메인에서 요청 허용
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/hi', (req, res) => {
    // 클라이언트로 'hi' 문자열을 응답으로 보냅니다.
    res.send('안녕하세요! 이것은 서버에서 받아온 문자열입니다!.');
});


app.listen(port, () => {
  console.log('서버 시작( http://localhost:${port}/hi )');
});
