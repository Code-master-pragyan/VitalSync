import express from "express";
import multer from "multer";
import tesseract from "tesseract.js";

const router = express.Router();

import fetchMedicineInfo from "../utils/fetchMedicineInfo.js";

// Setup multer with memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file uploaded." });
    }

    // Perform OCR directly from buffer
    const result = await tesseract.recognize(req.file.buffer, 'eng');
    const extractedText = result.data.text;
    console.log('🔍 OCR Result:', extractedText);

    // Use OCR result to find medicine info
    const medicineData = await fetchMedicineInfo(extractedText);

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

