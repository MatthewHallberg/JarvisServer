const https = require('https')

const data = JSON.stringify({
  head: 'yooo'
})

const options = {
  hostname: 'www.matthewhallberg.com',
  port: 12001,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()