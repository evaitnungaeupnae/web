const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '/')));

// 모든 경로에 대해 path3.html 파일 제공
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'path3.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://192.168.1.15:${PORT}`);
});
