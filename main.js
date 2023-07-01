const { app, BrowserWindow, Menu, MenuItem, shell } = require('electron');
// const tor = require('tor-request');
const path = require('path');



function createWindow() {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    title: "Night Wind Browser"
  });

  const { screen } = require('electron')
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win.setSize(width, height)

  win.loadFile(path.join(__dirname, 'Night Wind Home Page', 'index.html'));
  //← →
  const Back = new MenuItem({
    label: '←',
    click: () => {
      win.webContents.goBack();
    }
  });
  const Forward = new MenuItem({
    label: '→',
    click: () => {
      win.webContents.goForward();
    }
  });
  const Home = new MenuItem({
    label: '⌂',
    click: () => {
      win.loadFile(path.join(__dirname, 'Night Wind Home Page', 'index.html'));
    }
  });
  const reload = new MenuItem({
    label: '🗘',
    click: () => {
      win.webContents.reload();
    }
  });
  // const torConnect = new MenuItem({
  //   label: 'Connect to Tor',
  //   click: () => {
  //     tor.request('https://check.torproject.org/', (err, res, body) => {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       console.log(`statusCode: ${res.statusCode}`);
  //       console.log(body);

  //       
  //       // win.loadURL(`data:text/html,${encodeURIComponent(body)}`);
  //     });
  //   }
  // });

  const myMenu = new Menu();
  myMenu.append(Back);
  myMenu.append(Forward);
  myMenu.append(Home);
  myMenu.append(reload);
  // myMenu.append(torConnect);

  Menu.setApplicationMenu(myMenu);

}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});