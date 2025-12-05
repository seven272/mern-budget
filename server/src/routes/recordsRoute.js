import express from 'express'
import {
    getRecordsUser,
    createRecord,
    updateRecord, 
    deleteRecord
} from '../controllers/recordsController.js'

import { checkAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/records', checkAuth, getRecordsUser)

router.post('/', checkAuth, createRecord)

router.route('/:id').put(checkAuth, updateRecord).delete(checkAuth, deleteRecord)

export default router
