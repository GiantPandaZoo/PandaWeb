const path = require('path');
const express = require('express');
const useragent = require('express-useragent');
const compression = require('compression');
const bodyParser = require('body-parser');

const app = express();

app.use(useragent.express());

app.get('/*', (req, res, next) => {
    // console.log(req.useragent);
    const {browser, version} = req.useragent;
    if (browser === 'IE' && Number(version) <= 11) {
        res.sendFile(path.join(__dirname, 'build', 'ie.html'));
    } else {
        next();
    }
});

const {createProxyMiddleware} = require('http-proxy-middleware');

const context = ['/api'];
const options = {
    target: 'http://gank.io/api',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
};
const apiProxy = createProxyMiddleware(options);
app.use(context, apiProxy);

app.use(compression());

app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: '30000kb',
    })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
    console.log('Running at http://localhost:3001');
});
