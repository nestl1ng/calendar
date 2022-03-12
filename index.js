const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow({
            width:800,
            height:650,
            icon: __dirname + "/img/kalendar.jpg"
        });

win.loadURL(url.format({
    pathname: path.join(__dirname, 'main.html'),
    protocol:'file',
    slashes:true
}));

// win.webContents.openDevTools();

win.on('closed', ()=>{
    win = null;
});
}

app.on('ready', createWindow);

app.on('window-all-closed',()=>{
    app.quit();
});
