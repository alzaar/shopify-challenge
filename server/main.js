import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import 'dotenv/config' 

import rootController from './controllers'

const { logisticsController } = rootController

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', logisticsController.get)
app.get('/logistics/create', logisticsController.createPage)
app.get('/logistics/:_id', logisticsController.renderUpdatePage)
app.post('/logistics/save', logisticsController.save)
app.delete('/logistics/:_id', logisticsController.delete)
app.put('/logistics/update', logisticsController.update)

app.listen(process.env.PORT, () => console.log(`Listening on port - ${process.env.PORT}`))