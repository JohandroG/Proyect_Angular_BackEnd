require('dotenv').config()
const fs = require('fs')
const S3 = require("aws-sdk/clients/s3")

const bucketname = "noticeboard-proyect-files"
const region = "us-east-1"
const accessKeyId = "AKIAQWBTEVFO4NQP2MCP"
const secretAccessKey = "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"


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

//upload a file to s3
function uploadFile(file){
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketname,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}



// download a file from s3

function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketname
    }
    return s3.getObject(downloadParams).createReadStream()
}

function deleteFile(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketname
    }
    return s3.deleteObject(downloadParams).createReadStream()
}


exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
exports.deleteFile = deleteFile;