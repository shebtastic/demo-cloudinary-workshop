import formidable from "formidable";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", ["POST"]).send();
  }

  const form = formidable({});
  form.parse(req, async (error, fields, files) => {
    if (error) {
      res.status(400).send("request body malformed");
    }

    const { filepath } = files.image;

    try {
      const fileUpload = await cloudinary.v2.uploader.upload(filepath);

      res.status(201).json({
        publicId: fileUpload.public_id,
        format: fileUpload.format,
        resourceType: fileUpload.resource_type,
        secureUrl: fileUpload.secure_url,
      });
    } catch (cloudinaryError) {
      res.status(400).send(cloudinaryError.message);
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
