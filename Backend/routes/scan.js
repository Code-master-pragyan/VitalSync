import express from "express";
import multer from "multer";
import tesseract from "tesseract.js";
import fs from "fs";

const router = express.Router();

import fetchMedicineInfo from "../utils/fetchMedicineInfo.js";

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;

    // Perform OCR on the image
    const result = await tesseract.recognize(imagePath, 'eng');
    const extractedText = result.data.text;
    console.log('🔍 OCR Result:', extractedText);

    // Fetch medicine info using extracted name
    const medicineData = await fetchMedicineInfo(extractedText);

    // // Delete file after processing
    // fs.unlinkSync(imagePath);

    if (medicineData) {
      res.json({ success: true, medicine: medicineData });
    } else {
      res.json({ success: false, message: "Medicine info not found." });
    }
  } catch (err) {
    console.error('❌ OCR Error:', err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export default router;
