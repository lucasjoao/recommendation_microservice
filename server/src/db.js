import mongoose from 'mongoose'

const MONGODB = process.env.MONGODB;

if (MONGODB === undefined) {
  console.log('**WARNING: MONGODB is not defined!');
  process.exit(1);
}

const recommendationSchema = new mongoose.Schema({
  id: String,
  ids: [String],
  date: { type: Date, default: Date.now }
})

const Recommendation = mongoose.model('Recommendation', recommendationSchema)

function connect(res) {
  mongoose.connect(MONGODB, {keepAlive: 200}).then(
    () => res.json({hasConnection: true}),
    () => res.json({hasConnection: false})
  )
}

function save(res, id, ids) {
  const recommendation = new Recommendation({id: id, ids: ids})
  recommendation.save().then(
    (saved) => res.json({saved: true}),
    () => res.json({saved: false})
  )
}

function searchAll(res) {
  Recommendation.find().then(
    (recommendations) => res.json(recommendations),
    () => res.json([])
  )
}

export {connect, save, searchAll}
