const express = require('express')
const app = express()
const dotenv = require('dotenv').config() //to use the stuff from .env file
const { MongoClient, ObjectId } = require('mongodb')
const upload = require('./uploadHandler')
const uri = process.env.CONNECTION_STRING
const port = process.env.PORT

//Listening to the Server
app.listen(port, () => {
  console.log('listening on this port ', port)
})
const client = new MongoClient(uri)
const dbName = 'interntasks'

//Connecting to DB
client.connect()
console.log('Mongo client connected successfully')
const db = client.db(dbName)
const collection = db.collection('intern')
console.log(`we are in the databse Name: ${dbName}`)

//Configuring Apis
//getting an event with the following queries: eventid,type,limit and page
app.get('/api/v3/app/events', async (req, res) => {
  const eventId = req.query.id
  const { type, limit, page } = req.query
  if (type && limit && page) {
    const limitInt = parseInt(limit, 10)
    const pageInt = parseInt(page, 10)
    const events = await collection.find({}).toArray()
    const sortedEvents = events.sort(
      (a, b) => new Date(b.schedule) - new Date(a.schedule) //sorting the events using dates
    )
    const startIndex = (pageInt - 1) * limitInt
    const endIndex = startIndex + limitInt
    const paginatedEvents = sortedEvents.slice(startIndex, endIndex)
    return res.status(200).json({
      page: pageInt,
      limit: limitInt,
      totalEvents: events.length,
      events: paginatedEvents
    })
  }
  const objId = new ObjectId(eventId)
  if (!eventId)
    return res.status(400).json({ message: 'no event id specified' })
  try {
    const findEvent = await collection.findOne(objId)
    return res.status(200).json(findEvent)
  } catch (err) {
    return res.status({
      message: `error occured while trying to fetch the data ${err}`
    })
  }
})

//creating an event
app.post('/api/v3/app/events', upload, async (req, res) => {
  const {
    type,
    uid,
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
    attendees
  } = req.body
  if (
    !type ||
    !uid ||
    !name ||
    !tagline ||
    !schedule ||
    !description ||
    !moderator ||
    !category ||
    !sub_category ||
    !rigor_rank ||
    !attendees ||
    typeof parseInt(rigor_rank) !== 'number'
  )
    return res.status(400).json({ message: 'values not specified' })

  if (!req.files || !req.files.Photo) {
    return res.status(400).json({ message: 'A Photo is required!' })
  }
  photoPath = req.files.Photo[0].path
  const newEvent = {
    Type: type,
    uid: uid,
    Name: name,
    tagline: tagline,
    schedule: schedule,
    description: description,
    Image: photoPath,
    moderator: moderator,
    category: category,
    sub_category: category,
    rigor_rank: rigor_rank,
    attendees: attendees
  }
  const insertEvent = await collection.insertOne(newEvent)
  return res.status(200).json(insertEvent)
})

//updating an event
app.put('/api/v3/app/events', upload, async (req, res) => {
  const eventId = req.query.id
  if (!eventId) return res.status(400).json({ message: 'no event specified' })
  const objId = new ObjectId(eventId)
  console.log(objId)
  try {
    const updatedDocument = await collection.updateOne(
      { _id: objId },
      { $set: req.body }
    )
    if (updatedDocument !== null || updatedDocument !== undefined)
      return res.status(200).json(updatedDocument)
    else
      return res
        .status(400)
        .json({ message: 'error occured while editing document' })
  } catch (err) {
    return res
      .status(400)
      .json({
        message: 'error occured while trying to retrive the document',
        err: err
      })
  }
})

//deleting an event
app.delete('/api/v3/app/events', async (req, res) => {
  const eventId = req.query.id
  if(!eventId)
    return res.status(400).json({message:"event not specified"})
  const objId=new ObjectId(eventId)
  try{
    const deletedDocument= await collection.deleteOne({_id:objId})
    return res.status(200).json(deletedDocument)
  }catch(err){
    return res.status(400).json({message:"error occured while trying to delete the document",err:err})
  }
})
