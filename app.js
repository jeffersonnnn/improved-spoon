import express from 'express'
import routes from './routes'


const app = express()
const port = process.env.PORT || 4077

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    return res.send('Welcome HOME')
})

app.use('/', routes)

app.all('*', (req, res) => {
    return res.status(404).json({
        message: 'Not found',
        success: false
    })
})

app.listen(port, () => {
    console.log('Server started at port ', port)
})
