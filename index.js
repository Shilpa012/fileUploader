const express = require("express");
const path = require('path');
const app = express();
const fileUpload = require("express-fileupload");
const port = 9000;
app.use(fileUpload());

app.use(express.static('public'));

const uploadFileToFolder = async(reqFile, filepath) => {
    try {
        const fileUrl = await new Promise((resolve, reject) => {
            const fileName = Date.now() + path.extname(reqFile.name);
            reqFile.mv(`./public/`+ filepath + fileName, (error) => {
                if (error) {
                    reject(error);
                }
                resolve(fileName);
            })
        })
        return fileUrl ? filepath + fileUrl : "";

    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.post('/upload-file', async (req, res) => {
    console.log(req.files, "sdfghj")
    try {
        if (req.files) {
            if (req.files.profilePic) {
                req.files.profilePic = await uploadFileToFolder(req.files.profilePic, "/myFiles/");
            }
        }

        res.status(200).send({
            status: "Successfull",
            message: "file uploaded"
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "server error"
        })
    }
})

app.get('/upload-file', async (req, res) => {
    console.log("sdfghj")

    res.status(200).send({
        status: "Successfull",
        message: "file uploaded"
    })

})

app.listen(port, () => {
    console.log(`Server listen on ${port}`)
})