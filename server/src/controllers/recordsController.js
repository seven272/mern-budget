import mongoose from 'mongoose'

import Record from '../models/Record.js'

const getRecordsUser = async (req, res) => {
  const userId = req.userId

  try {
    const records = await Record.find({ creator: userId })
    if (records.length === 0) {
      return res
        .status(404)
        .json({ message: 'Записей не существует или они не найдены' })
    }

    res.status(200).json(records)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Error in getRecordsUser controller' })
  }
}

const createRecord = async (req, res) => {
  const newRecord = {...req.body, creator: req.userId}
  try {
    //cпособ 1 создания нового документа 
    // const newRecord = new Record(newRecordBody)
    // const savedRecord = await Record.save()
    //способ 2
    const savedRecord = await Record.create(newRecord)
 
    return res.status(200).json(savedRecord)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Error in createRecord controller' })
  }
}

const updateRecord = async (req, res) => {
  const id = req.params.id
  const newRecordBody = req.body
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    )

    if (!updatedRecord) {
      return res
        .status(400)
        .json({ message: 'Ошибка при обновлении значения' })
    }

    return res.status(200).json(updatedRecord)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Error in updateRecord controller' })
  }
}

const deleteRecord = async (req, res) => {
  const id = req.params.id
  try {
    const deletedRecord = await Record.findByIdAndDelete(id)
    if (!deletedRecord) {
      return res
        .status(400)
        .json({ message: 'Ошибка при удалении значения' })
    }
    return res.status(200).json(deletedRecord)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Error in deleteRecord controller' })
  }
}

export { getRecordsUser, createRecord, updateRecord, deleteRecord }
