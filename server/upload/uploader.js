const express = require('express')
const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destinaion: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image type')
        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public')
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.split(" ").join("-")
        console.log(filename)
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${filename}-${Date.now()}.${extension}`)
    }

})

const uploadOptions = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const isValid = !FILE_TYPE_MAP[file.mimetype]
        if (isValid) {
            cb(new Error('Invalid file type'), false)
        }
        cb(null, isValid)
    }
})

module.exports = uploadOptions

