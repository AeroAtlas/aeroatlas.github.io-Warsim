const electron = require("electron")
const url = require("url")
const path = require("path")

const {app, BrowserWindow, Menu} = electron

let mainWindow;
let addWindow;
//Listen for app to be ready
app.on('ready', () => {
  mainWindow = new BrowserWindow({})
  //load html file into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }))

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  //Insert menu
  Menu.setApplicationMenu(mainMenu);
})
//Quit app when closed
/*mainWindow.on('closed', function(){
    app.quit()
})*/

//Handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        title: "Add item"
    })
    //load html file into window
    addWindow.loadURL(url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true
    }))
}

const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "New Window",
                click(){ createAddWindow() }
            },
            {label: "Clear Items"},
            {
                label: "Quit", 
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click(){ app.quit() }
            }
        ]
    }
]