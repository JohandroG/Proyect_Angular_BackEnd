require('dotenv').config()
const fs = require('fs')
const S3 = require("aws-sdk/clients/s3")

const bucketname = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;


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