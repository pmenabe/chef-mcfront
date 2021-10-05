
const exec = require("child_process").exec

const execShellCommand = async function(cmd) {
  
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
        reject({ error: error })
      } else if (stdout) {
        console.log(stdout)
      } else {
        console.log(stderr)
      }
      resolve(stdout ? stdout : { error: stderr})
    })
  })
}

module.exports = {
  execShellCommand
}