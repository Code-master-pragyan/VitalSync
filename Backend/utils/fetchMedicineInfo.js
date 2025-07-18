// Later replace with real scraping/API logic
const medicineDB = {
  "Ibuprofen": {
    name: "Ibuprofen",
    type: "Pain Reliever",
    dosage: "200mg",
    instructions: "Take 1-2 tablets every 6-8 hours. Do not exceed 6 tablets in 24 hours.",
    sideEffects: ["Stomach upset", "Dizziness", "Nausea"],
    warnings: ["Take with food", "Avoid alcohol", "Do not use during pregnancy without doctor's advice"]
  },
  
  "Paracetamol": {
    name: "Paracetamol",
    type: "Fever & Pain Reducer",
    dosage: "500mg",
    instructions: "Take 1 tablet every 4–6 hours as needed. Do not exceed 4g/day.",
    sideEffects: ["Skin rash", "Liver issues (on overdose)"],
    warnings: ["Do not mix with alcohol", "Check liver function if used frequently"]
  }
};

export default function fetchMedicineInfo(ocrText) {
  const cleaned = ocrText
    .toLowerCase()
    .replace(/\n/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  console.log("🔍 Cleaned OCR Text:", cleaned);

  for (const key in medicineDB) {
    const lowerKey = key.toLowerCase();
    if (cleaned.includes(lowerKey)) {
      return medicineDB[key];
    }
  }

  return null;
}

