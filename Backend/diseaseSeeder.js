import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Disease from './models/Disease.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/healthcare');

const diseases = [
  // --- MILD ---
  {
    name: "Common Cold",
    category: "Respiratory",
    symptoms: ["Runny nose", "Sneezing", "Cough"],
    progression: ["Day 1-2: Throat irritation", "Day 3-5: Peak symptoms", "Day 6-7: Recovery"],
    severity: "Mild"
  },
  {
    name: "Seasonal Allergies",
    category: "Allergic",
    symptoms: ["Itchy eyes", "Sneezing", "Runny nose"],
    progression: ["Exposure", "Reaction", "Relief with meds"],
    severity: "Mild"
  },
  {
    name: "Mild Acne",
    category: "Skin",
    symptoms: ["Pimples", "Blackheads", "Redness"],
    progression: ["Clogged pores", "Inflammation", "Healing"],
    severity: "Mild"
  },
  {
    name: "Tension Headache",
    category: "Neurological",
    symptoms: ["Mild pain", "Neck tension"],
    progression: ["Start slowly", "Increase slightly", "Resolved"],
    severity: "Mild"
  },
  {
    name: "Mild Dehydration",
    category: "General",
    symptoms: ["Thirst", "Dry mouth", "Fatigue"],
    progression: ["Mild discomfort", "Increased thirst", "Relief after fluid"],
    severity: "Mild"
  },
  {
    name: "Minor Sprain",
    category: "Musculoskeletal",
    symptoms: ["Swelling", "Pain on movement"],
    progression: ["Initial pain", "Swelling", "Recovery in days"],
    severity: "Mild"
  },
  {
    name: "Mild Indigestion",
    category: "Digestive",
    symptoms: ["Bloating", "Heartburn"],
    progression: ["Post eating", "Discomfort", "Relief with antacid"],
    severity: "Mild"
  },

  // --- MODERATE ---
  {
    name: "Migraine",
    category: "Neurological",
    symptoms: ["Severe headache", "Nausea", "Light sensitivity"],
    progression: ["Prodrome", "Aura", "Pain", "Postdrome"],
    severity: "Moderate"
  },
  {
    name: "Asthma",
    category: "Respiratory",
    symptoms: ["Wheezing", "Shortness of breath", "Chest tightness"],
    progression: ["Trigger exposure", "Attack", "Inhaler recovery"],
    severity: "Moderate"
  },
  {
    name: "Gastritis",
    category: "Digestive",
    symptoms: ["Stomach pain", "Nausea", "Indigestion"],
    progression: ["Irritation", "Discomfort", "Healing with treatment"],
    severity: "Moderate"
  },
  {
    name: "UTI",
    category: "Urinary",
    symptoms: ["Burning urination", "Frequent urge"],
    progression: ["Discomfort", "Antibiotics", "Recovery"],
    severity: "Moderate"
  },
  {
    name: "Pneumonia",
    category: "Respiratory",
    symptoms: ["Cough with phlegm", "Fever", "Chest pain"],
    progression: ["Infection", "Lung inflammation", "Treatment"],
    severity: "Moderate"
  },
  {
    name: "Moderate COVID-19",
    category: "Infectious",
    symptoms: ["Fever", "Cough", "Fatigue"],
    progression: ["Day 1-3: Mild", "Day 4-6: Moderate", "Recovery"],
    severity: "Moderate"
  },
  {
    name: "Viral Fever",
    category: "Infectious",
    symptoms: ["High temp", "Body aches"],
    progression: ["Start suddenly", "Peak in 2-3 days", "Recovery in a week"],
    severity: "Moderate"
  },

  // --- SERIOUS ---
  {
    name: "Hypertension",
    category: "Cardiovascular",
    symptoms: ["Headache", "Dizziness", "Chest pain"],
    progression: ["Stage 1", "Stage 2", "Crisis"],
    severity: "Serious"
  },
  {
    name: "Diabetes Type 2",
    category: "Metabolic",
    symptoms: ["Frequent urination", "Fatigue", "Blurred vision"],
    progression: ["Early warning signs", "Chronic stage", "Complications"],
    severity: "Serious"
  },
  {
    name: "Tuberculosis",
    category: "Infectious",
    symptoms: ["Chronic cough", "Weight loss", "Night sweats"],
    progression: ["Initial infection", "Active TB", "Long-term treatment"],
    severity: "Serious"
  },
  {
    name: "Chronic Kidney Disease",
    category: "Renal",
    symptoms: ["Swelling", "Fatigue", "Decreased urination"],
    progression: ["Stage 1-5", "Dialysis", "Transplant"],
    severity: "Serious"
  },
  {
    name: "Liver Cirrhosis",
    category: "Hepatic",
    symptoms: ["Jaundice", "Fatigue", "Abdominal swelling"],
    progression: ["Fibrosis", "Cirrhosis", "Liver failure"],
    severity: "Serious"
  },
  {
    name: "Heart Attack",
    category: "Cardiovascular",
    symptoms: ["Chest pain", "Shortness of breath", "Sweating"],
    progression: ["Blockage", "Heart tissue damage", "Emergency care"],
    severity: "Serious"
  }
];

await Disease.insertMany(diseases);
console.log("✅ 20 diseases inserted to MongoDB");
process.exit();
