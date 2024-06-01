// 입력 칸의 힌트 텍스트를 처리하는 함수
function handleInputHint() {
    var genreInput = document.getElementById("genreInput");

    genreInput.addEventListener("focus", function() {
        if (genreInput.value === "장르 입력") {
            genreInput.value = "";
        }
    });

    genreInput.addEventListener("blur", function() {
        if (genreInput.value === "") {
            genreInput.value = "장르 입력";
        }
    });
}
function genreButton() {
    const genreList = document.getElementById("genreList");
    genreList.classList.toggle("show");
}


// 장르명 코드로 변환
function convertGenreCode(input) {
    const genreCodes = {
        '연극': '005',
        '무용': '007',
        '뮤지컬': '008',
        '콘서트': '017',
        '클래식': '018',
        '재즈': '019',
        '크로스오버': '020',
        '복합장르': '021',
        '오페라': '001'
    };
    return genreCodes[input];
}




// API 요청 함수
function fetchPerformances() {
    var genreInput = document.getElementById("genreInput").value;
    console.log('Genre Input:', genreInput); // 디버깅용 로그

    var genre = convertGenreCode(genreInput);
    console.log('Converted Genre Code:', genre); // 디버깅용 로그

    if (!genre) {
        console.error('Invalid genre input');
        return;
    }

    var xhr = new XMLHttpRequest();
    var url = 'https://cors-anywhere.herokuapp.com/http://api.kcisa.kr/openapi/API_CCA_142/request';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '445e9106-4dd0-4795-8b9f-feb576f973e2';
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('4');
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('infoTp') + '=' + encodeURIComponent(genre);

    console.log('Request URL:', url + queryParams); // 디버깅용 로그

    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log('API Response Status:', this.status); // 디버깅용 로그

            if (this.status === 200) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(this.responseText, 'text/xml');
                var items = xmlDoc.getElementsByTagName('item');

                // 각 카드 정보 설정
                if (items.length > 0) {
                    var firstItem = items[0];
                    document.querySelector('.card-title1').textContent = firstItem.getElementsByTagName('title')[0].textContent;
                    document.querySelector('.card-date1').textContent = firstItem.getElementsByTagName('regDate')[0].textContent.substring(0, 10);
                    document.querySelector('.card-detail1').textContent = firstItem.getElementsByTagName('description')[0].textContent +'\n' +  firstItem.getElementsByTagName('rights')[0].textContent;
                }
                if (items.length > 1) {
                    var secondItem = items[1];
                    document.querySelector('.card-title2').textContent = secondItem.getElementsByTagName('title')[0].textContent;
                    document.querySelector('.card-date2').textContent = secondItem.getElementsByTagName('regDate')[0].textContent.substring(0, 10);
                    document.querySelector('.card-detail2').textContent = secondItem.getElementsByTagName('description')[0].textContent;
                }
                if (items.length > 2) {
                    var thirdItem = items[2];
                    document.querySelector('.card-title3').textContent = thirdItem.getElementsByTagName('title')[0].textContent;
                    document.querySelector('.card-date3').textContent = thirdItem.getElementsByTagName('regDate')[0].textContent.substring(0, 10);
                    document.querySelector('.card-detail3').textContent = thirdItem.getElementsByTagName('description')[0].textContent;
                }
                if (items.length > 3) {
                    var fourthItem = items[3];
                    document.querySelector('.card-title4').textContent = fourthItem.getElementsByTagName('title')[0].textContent;
                    document.querySelector('.card-date4').textContent = fourthItem.getElementsByTagName('regDate')[0].textContent.substring(0, 10);
                    document.querySelector('.card-detail4').textContent = fourthItem.getElementsByTagName('description')[0].textContent;
                }
            } else {
                console.error('Failed to fetch performances:', this.statusText);
            }
        }
    };

    xhr.send('');
}

Kakao.init('e767bd60f87ef47a0588ed8dfc5fb558'); // 사용하려는 앱의 JavaScript 키 입력
function shareMessage(cardIndex) {
    // 공유할 내용을 여기에 추가
    var cardTitle = document.querySelector('.card-title' + cardIndex).textContent;
    var cardDate = document.querySelector('.card-date'+ cardIndex).textContent;
    var cardDetail = document.querySelector('.card-detail'+ cardIndex).textContent;

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '예술의 전당 공연 정보',
            description: cardTitle + ' ' + cardDate + ' ' + cardDetail, // 카드의 제목, 날짜, 상세 정보를 함께 보여줌
            imageUrl: 'https://www.sac.or.kr/design/theme/sac/images/sub/perform_slide1.jpg',//'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            link: {
                mobileWebUrl: 'http://192.168.1.15:8080/path3.html',
                webUrl: 'http://192.168.1.15:8080/path3.html'
            },
        },
        social: {
            likeCount: 286,
            commentCount: 45,
            sharedCount: 845,
        }
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: 'http://192.168.1.15:8080/path3.html',
                    webUrl: 'http://192.168.1.15:8080/path3.html'
                }
            }, 
            {
                title: '앱으로 보기',
                link: {
                    mobileWebUrl: 'http://192.168.1.15:8080/path3.html',
                    webUrl: 'http://192.168.1.15:8080/path3.html'
                }
            }
        ]
        
    });
}
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
        });
    } else if (req.url.match('\.css$')) {
        const cssPath = path.join(__dirname, req.url);
        const fileStream = fs.createReadStream(cssPath, 'UTF-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fileStream.pipe(res);
    } else if (req.url.match('\.js$')) {
        const jsPath = path.join(__dirname, req.url);
        const fileStream = fs.createReadStream(jsPath, 'UTF-8');
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        fileStream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));







