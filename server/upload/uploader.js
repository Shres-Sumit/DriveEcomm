const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image type')
        console.log(`1 ${file}`)
        console.log(`2 ${file.mimetype}`)
        console.log(`3 ${isValid}`)
        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.split(" ").join
            ("-")
        console.log(filename)
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${filename}-${Date.now()}.${extension}`)
    }

})


const uploadOptions = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Corrected validation logic
        const isValid = !!FILE_TYPE_MAP[file.mimetype]
        if (isValid) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type'), false)
        }
    }
})

module.exports = uploadOptions

