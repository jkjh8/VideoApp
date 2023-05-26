export const info = (msg) => {
  myAPI.writeLogs({ level: 'info', msg: msg })
}

export const warn = (msg) => {
  myAPI.writeLogs({ level: 'warn', msg: msg })
}

export const error = (msg) => {
  myAPI.writeLogs({ level: 'error', msg: msg })
}
