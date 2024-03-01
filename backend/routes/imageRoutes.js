const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Image = require("../models/image");
const AuthMiddleware = require("../middleware/jwtmiddleware");

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const storage = multer.memoryStorage();

const upload = multer({ storage: storage, limits: { files: 1 } });
const { v4: uuidv4 } = require("uuid");

const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

router.get("/get-images", AuthMiddleware, async (req, res) => {
  try {
    
  
    console.log(req.userId);
    const userImages = await Image.find({ creator: req.userId });

 
    res.status(200).json({ userImages });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Couldn't fetch, Try Again!" });
  }
});

router.post("/upload-image", AuthMiddleware, upload.single("image"), async (req, res, next) => {
  try {
    console.log("hi");

    const uploadedImageUrls = async (file) => {
      // Accept the file as input
      const imageName = req.body.Name + path.extname(file.originalname);
      console.log(req.body);

      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      const publicUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageName}`;
      return publicUrl;
    };

    const publicUrl = await uploadedImageUrls(req.file);

    const newImage = new Image({
      creator: req.userId,
      imageId: uuidv4(),
      imageName: req.body.Name,
      image: publicUrl,
    });

    await newImage.save();

    res.status(200).json({ message: "Image Uploaded successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Upload Unsuccessfull, Try Again!" });
  }
});

module.exports = router;
