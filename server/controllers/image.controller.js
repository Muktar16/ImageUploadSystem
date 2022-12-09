const mongoose = require("mongoose")
const Minio = require("minio");
var image = require('../models/image.model');
const crypto = require('crypto');

const minioClient = new Minio.Client({
    endPoint: 'imageObjectDB',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});

module.exports.uploadImage = async (req, res, next) => {
    console.log("Upload image");
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if(user){
        var uuidName = crypto.randomUUID();
        const newImage = new image({
            fname:user.fname,
            phone: user.fname,
            imageUUID: uuidName
        });
       
        if(!bucketExist)
        {
            bucketExist = true;
            minioClient.makeBucket('photos', 'us-east-1', function(err) {
                if (err) return console.log(err)
            
                console.log('Bucket created successfully');
            });
        }
      
        minioClient.fPutObject('photos', uuidName, req.file.path, function (err, objInfo) {
            if(err) {return console.log(err)}
            else console.log("Object successfully saved");
        });

        try {
            const savedStory = await newStory.save();
            res.send({ ResponeseMessage: 'Image file Uploaded Successfully' });
        } catch (err) {
            res.status(400).send(err);
        }
        
    }
    else{
        return res.status(404).json({ status: false, message: 'User record not found.' });
    }
}



module.exports.getImages = (async (req,res) =>{
    const user = jwt.verify(token, process.env.JWT_SECRET);
    currentUser = user.phone;
    try{
        const Images = await image.find({phone: currentUser}).sort({$natural:-1}); 

        res.send(Images);
    } catch(err){
        res.status(400).send({ResponeseMessage: 'Missing Image File'});
    }
});


module.exports.getImage = ((req, res) =>{
    try {
        let data;

        minioClient.getObject('photos', req.params.id, (err, objStream) => {
            if(err) {
                return res.status(404).send({ message: "Image not found" });
            } 
            objStream.on('data', (chunk) => {
                data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);
            });
            objStream.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            });
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error at fetching image" });
    }
});