import path from 'node:path'
import { app, Menu, BrowserWindow as bw } from 'electron'
import { getFileDialog } from '../functions/files'
import { getMetaData } from '../functions/ffmpeg'

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CommandOrControl+o',
        click: async () => {
          // open file dialog
          const file = await getFileDialog()
          // 파일이름 추출
          const parsedFile = path.parse(file[0])
          playerValues.file_name = parsedFile.name + parsedFile.ext
          // metadata 확인
          getMetaData(file[0])
          // 비디오 파일 로딩
          bw.fromId(1).webContents.send('open', {
            type: 'video',
            value: encodeURIComponent(file[0])
          })
        }
      },
      { type: 'separator' },
      { role: 'quit', accelerator: 'CommandOrControl+f4' }
    ]
  },
  // { role: 'editMenu' }
  // {
  //   label: 'Edit',
  //   submenu: [
  //     { role: 'undo' },
  //     { role: 'redo' },
  //     { type: 'separator' },
  //     { role: 'cut' },
  //     { role: 'copy' },
  //     { role: 'paste' },
  //     ...(isMac
  //       ? [
  //           { role: 'pasteAndMatchStyle' },
  //           { role: 'delete' },
  //           { role: 'selectAll' },
  //           { type: 'separator' },
  //           {
  //             label: 'Speech',
  //             submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
  //           }
  //         ]
  //       : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
  //   ]
  // },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [{ role: 'close' }])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
