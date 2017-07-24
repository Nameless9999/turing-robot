const colors = require('./color'),
      readline = require('readline'),
      http = require('http'),
      appKey = '6824998c8b574bd1bba7ba5363a341ab',
      RESPONSE_TYPE = {
          TEXT: 100000,
          LINK: 200000,
          NEWS: 302000,
          RECIPE: 308000
      };

function chat() {
    Array.prototype.forEach.call('请开始你的表演', (it) => {
        console.log(colors.colorify(`----------------`, it, `----------------`));
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let name = '';

    rl.question(colors.colorify('> 阁下尊姓大名: '), (answer) => {
        name = answer;
        colors.colorLog('客官请提问!');
        chat();
    });

    function chat() {
        rl.question(colors.colorify('> 请输入你的问题: '), (query) => {
            if(!query) {
                colors.colorLog('客官请慢走!');
                rl.close();
                process.exit(0);
            }
        
            const req = http.request({
                method: 'POST',
                host: 'openapi.tuling123.com',
                path: '/openapi/api',
                headers: {
                    'Content-Type': 'application/json'
                }  
            }, (res) => {
                let result = '';
                res.on('data', (chunk) => {
                    result += chunk;
                });
                res.on('end', () => {
                    colors.colorLog(handleResponse(result));
                    chat();
                });
            }).on('error', (err) => {
                console.log(err);
            });

            req.write(JSON.stringify({
                key: appKey,
                info: query
            }));

            req.end();
        });
    }

    function handleResponse(response) {
        response = JSON.parse(response);
        switch (response.code) {
            case RESPONSE_TYPE.TEXT:
                return response.text;
            case RESPONSE_TYPE.LINK:
                return `${response.text} : ${response.url}`;
            case RESPONSE_TYPE.NEWS:
                return response.text + response.list.reduce(function(pre, current) {
                    let recipes = [
                        `文章：${current.article}`,
                        `来源：${current.source}`,
                        `链接：${current.detailurl}`,
                    ]
                    return pre + recipes.join('\n');
                }, '');
            default:
                return responseText.text;
        }
    }
}

module.exports = chat;