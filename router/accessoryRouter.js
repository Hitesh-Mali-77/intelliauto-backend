import express from 'express'
import { createAccessory, deleteAccessoryById, getAllAccessory, getAllActiveAccessory, getCurrentAccessoryById, updateAccessory } from '../controller/accessoryController.js'

export const accessoryRouter = express.Router()
accessoryRouter.get('/all', getAllAccessory)

accessoryRouter.get('/current/:id', getCurrentAccessoryById)

accessoryRouter.delete('/delete/:id', deleteAccessoryById)

accessoryRouter.post('/create', createAccessory)

accessoryRouter.put('/update', updateAccessory)

accessoryRouter.get('/active/all', getAllActiveAccessory)