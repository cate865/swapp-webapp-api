import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

export function populateImages(files){
        let filePathArray = []
        files.forEach(file => {
            filePathArray.push(file.path)
        });
        return filePathArray

    }

export default upload

