const express = require('express')

const app = express()
const cors = require('cors')

const files = ['sample.pdf', 'sample2.pdf', 'sample3.pdf', 'sample4.pdf', 'image1.png', 'image2.jpg']

app.use(cors())



app.get('/download', (req, res) => {
    const latency = parseInt(req.query.maxDelay)
    setTimeout(() => {
        const file = files[(Math.floor(Math.random() * files.length))]
        res.download(`files/${file}`)
    }, latency)
})

app.listen(3000, () => {
    console.log("server running");
});

