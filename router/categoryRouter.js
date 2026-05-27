import express from 'express'
import { createCategory, updateCategory, deleteCategoryById, getAllCategory, getCurrentCategoryById } from '../controller/categoryController.js'

export const categoryRouter = express.Router()
categoryRouter.get('/all', getAllCategory)
categoryRouter.get('/current/:id', getCurrentCategoryById)
categoryRouter.delete('/delete/:id', deleteCategoryById)
categoryRouter.post('/create', createCategory)
categoryRouter.put('/update', updateCategory)