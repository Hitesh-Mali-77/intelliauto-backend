import { connection } from '../config/db.js'

export const getAllCategory = (req, res) => {
    connection.query('SELECT * FROM CATEGORY', (error, result) => {
        res.status(200).send(result)
    })
}

export const getCurrentCategoryById = (req, res) => {
    connection.query('SELECT * FROM CATEGORY WHERE ID = ?',
        req.params.id,
        (error, result) => {
            res.status(200).send(result[0])
        })
}

export const deleteCategoryById = (req, res) => {
    connection.query('DELETE FROM CATEGORY WHERE ID = ?',
        req.params.id,
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(200).send('category deleted successfully')
            }
        })
}


export const createCategory = (req, res) => {
    const { id, name } = req.body
    connection.query('INSERT INTO  CATEGORY SET  NAME = ?',
        [name],
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(201).send('Category Created Successfully')
            }
        })
}


export const updateCategory = (req, res) => {
    const { id, name } = req.body
    connection.query('UPDATE  CATEGORY SET  NAME = ? WHERE ID = ?',
        [name, id],
        (error, result) => {
            if (result.affectedRows === 1) {
                res.status(200).send('Category Update Successfully')
            }
        })
}