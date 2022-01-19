import database from '../database'
const dbClient = new database.ESClient()

const logisticsController = {}

logisticsController.createPage = (req, res) => {
  res.render('create')
}

logisticsController.get = async (req, res) => {
  const data = (await dbClient.get({ page: 0 }))
    .body.hits.hits.map(d => ({
      _id: d._id,
      product: d._source.product,
      quantity: d._source.quantity,
      origin: d._source.origin,
      destination: d._source.destination,
      timestamp: d._source.timestamp
    })
  )
  res.render('home', { data })
}

logisticsController.save = async (req, res) => {
  const { success } = await dbClient.save(req.body)
  if (success) {
    res.redirect('/')
  } else {
    res.render('error_page')
  }
}

logisticsController.delete = async (req, res) => {
  const { success } = await dbClient.delete(req.params._id)
  if (success) {
    res.redirect('/')
  } else {
    res.render('error_page')
  }
}

logisticsController.renderUpdatePage = async (req, res) => {
  res.render('update', {
    _id: req.params._id,
    product: req.body.product,
    quantity: req.body.quantity,
    origin: req.body.origin,
    destination: req.body.destination,
  })
}

logisticsController.update = async (req, res) => {
  const { success } = await dbClient.update({
    id: req.body.id,
    data: {
      product: req.body.product,
      quantity: req.body.quantity,
      origin:  req.body.origin,
      destination: req.body.destination
    }
  })
  if (success) {
    res.redirect('/')
  } else {
    res.render('error_page')
  }
}

export default logisticsController