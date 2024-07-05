const aws = require('aws-sdk');
require('dotenv').config();

const {
    BUCKET_USER_ID,
    BUCKET_USER_SECRET,
    BUCKET_NAME,
    BUCKET_REGION
} = process.env;

const uploadFile = async (req, res) => {
    const { path, imagen} = req.body;
    // 062620241234012340.jpg
    const buffer = new Buffer.from(path, 'base64');
    aws.config.update({
        accessKeyId: BUCKET_USER_ID,
        secretAccessKey: BUCKET_USER_SECRET,
        region: BUCKET_REGION
    });

    const s3 = new aws.S3();

    const params = {
        Bucket: BUCKET_NAME,
        Key: imagen,
        Body: buffer,
        ACL: 'public-read'
    };

    s3.putObject(params, (err, data) => {
        if(err) {
            console.error(err);
            return res.status(500
            ).send('Error al subir la imagen');
        }
        console.log(data);
        return res.status(200).send('Imagen subida correctamente');
    });
};


const uploadFile2 = async (path, imagen) => {
    // 062620241234012340.jpg
    const buffer = new Buffer.from(imagen, 'base64');
    console.log('Bucket: ', BUCKET_USER_ID)
    const s3 = new aws.S3({
        accessKeyId: BUCKET_USER_ID,
        secretAccessKey: BUCKET_USER_SECRET,
        ContentType: 'image/jpeg/png',
        ACL: 'public-read',
    });

    const params = {
        Bucket: BUCKET_NAME,
        Key: path,
        Body: buffer,
    };

    await s3.upload(params, function sync(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log('Ubicacion de la imagen: ', data.Location);  
            return data.Location;
        }});  
};


module.exports = {
    uploadFile,
    uploadFile2
};