import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bot, BookOpen, Scan, MessageSquare, Search, Camera, MapPin, Clock, AlertTriangle, Pill, CheckCircle } from 'lucide-react';

// Type definitions
interface Disease {
  name: string;
  category: string;
  symptoms: string[];
  progression: string[];
  severity: 'Mild' | 'Moderate' | 'Serious';
}

interface Medicine {
  name: string;
  type: string;
  dosage: string;
  instructions: string;
  sideEffects: string[];
  warnings: string[];
}

interface NearbyHospital {
  name: string;
  lat: number;
  lon: number;
  distance: number;
}

// Predefined color classes (Tailwind-safe)
const COLOR_CLASSES = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    darkText: 'dark:text-blue-400'
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-teal-600',
    darkText: 'dark:text-teal-400'
  },
  green: {
    bg: 'bg-green-600',
    text: 'text-green-600',
    darkText: 'dark:text-green-400'
  }
};

const Features: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  const getFeatureIndex = () => {
    if (tab === 'disease') return 1;
    if (tab === 'scan') return 2;
    return 0; // default to chat
  };

  const [activeFeature, setActiveFeature] = useState(getFeatureIndex());

  useEffect(() => {
    setActiveFeature(getFeatureIndex());
  }, [tab]);

  // Auto scroll to #features section when tab changes
  useEffect(() => {
    if (hasInteracted) {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [tab]);


  const features = [
    {
      id: 0,
      title: "AI Symptom Checker",
      description: "Get instant medical insights with our advanced AI-powered symptom analysis",
      icon: Bot,
      color: "blue",
      component: <AISymptomChecker />
    },
    {
      id: 1,
      title: "Disease Encyclopedia",
      description: "Comprehensive medical database with detailed information about conditions",
      icon: BookOpen,
      color: "teal",
      component: <DiseaseEncyclopedia />
    },
    {
      id: 2,
      title: "Medicine Scanner",
      description: "Scan and identify medications with detailed information and instructions",
      icon: Scan,
      color: "green",
      component: <MedicineScanner />
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Healthcare
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Features</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience the future of healthcare with our AI-powered tools designed to give you instant medical insights and support.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center mb-12 space-y-4 lg:space-y-0 lg:space-x-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeFeature === feature.id;
            const colors = COLOR_CLASSES[feature.color as keyof typeof COLOR_CLASSES];

            return (
              <button
                key={feature.id}
                onClick={() => {
                  const selectedTab = feature.id === 0 ? 'chat' : feature.id === 1 ? 'disease' : 'scan';
                  setSearchParams({ tab: selectedTab });
                  setHasInteracted(true);
                }}
                className={`flex items-center px-6 py-4 rounded-xl transition-all duration-300 ${isActive
                  ? `${colors.bg} text-white shadow-lg`
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700'
                  }`}
              >
                <Icon className={`h-6 w-6 mr-3 ${isActive ? 'text-white' : `${colors.text} ${colors.darkText}`}`} />
                <div className="text-left">
                  <div className="font-semibold">{feature.title}</div>
                  <div className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {feature.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {features.map((feature) => (
            <div key={feature.id} className={activeFeature === feature.id ? 'block' : 'hidden'}>
              {feature.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AISymptomChecker: React.FC = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! I\'m your AI health assistant. Tell me about any symptoms you\'re experiencing, and I\'ll help analyze them.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lon: number } | null>(null);
  const [hospitals, setHospitals] = useState<NearbyHospital[]>([]);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const chatContainer = document.getElementById('chat-scroll');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);


  const checkForEmergency = (reply: string) => {
    const emergencyKeywords = [
      'seek immediate medical',
      'call emergency',
      'severe symptoms',
      'life-threatening',
      'serious condition',
      'hospital right away',
      'emergency services',
    ];
    return emergencyKeywords.some(keyword => reply.toLowerCase().includes(keyword));
  };

  const fetchHospitalsFromBackend = async (placeName: string | { lat: number, lon: number }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/location/hospitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeName })
      });

      const data = await response.json();

      if (data.success) {
        setHospitals(data.hospitals);
        setIsEmergency(true);
      } else {
        alert(data.message || "No hospitals found.");
      }
    } catch (error) {
      console.error("❌ Hospital fetch failed:", error);
      alert("Error getting hospital data.");
    }
  };


  const requestUserLocation = () => {
    if (isMobile && navigator.geolocation) {
      // 📱 Mobile: use device GPS
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("📍 Mobile Location:", lat, lon);
          setUserLocation({ lat, lon });
          fetchHospitalsFromBackend({ lat, lon });
        },
        (error) => {
          console.error("❌ Mobile Geolocation failed:", error);
        }
      );
    } else {
      // 🖥️ Desktop: Ask for location name instead of lat/lon
      const placeName = prompt("⚠️ Please enter your location name (e.g., Guwahati):");
      if (placeName) {
        fetchHospitalsFromBackend(placeName.trim());
      } else {
        console.error("No location name provided.");
      }
    }
  };


  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = inputValue;
      setMessages((prev) => [...prev, { type: 'user', content: userMessage }]);
      setInputValue('');
      setIsBotTyping(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ai/symptom-checker`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ symptomText: userMessage })
        });
        const data = await response.json();

        if (data.success) {
          const botReply = data.aiReply;

          setTimeout(() => {
            setIsBotTyping(false);
            if (checkForEmergency(botReply)) {
              setIsEmergency(true);
              requestUserLocation();
            }
            setMessages(prev => [...prev, { type: 'bot', content: botReply }]);
          }, 5000);
        } else {
          setIsBotTyping(false);
          setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I could not process that.' }]);
        }
      } catch (err) {
        setIsBotTyping(false);
        console.error('Error:', err);
        setMessages(prev => [...prev, { type: 'bot', content: 'Server error occurred.' }]);
      }
    }
  };


  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AI Symptom Analysis</h3>
          <div
            id="chat-scroll"
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 min-h-[300px] sm:h-[400px] overflow-y-auto mb-4 border border-gray-200 dark:border-gray-700 scroll-smooth"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl break-words whitespace-pre-wrap leading-relaxed text-sm sm:text-base
      ${message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'}
      max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[75%]`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isBotTyping && (
              <div className="mb-4 flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 text-sm sm:text-base animate-pulse">
                  Thinking<span className="animate-bounce inline-block ml-1">...</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your symptoms..."
              className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mt-14">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <span className="font-semibold text-red-800 dark:text-red-400">Emergency Warning</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">For severe symptoms like chest pain, difficulty breathing, or loss of consciousness, call emergency services immediately.</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Nearby Healthcare</h4>
            <div className="max-h-[250px] overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
              {isEmergency && hospitals.length > 0 ? (
                hospitals.map((hospital, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <a
                          href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {hospital.name}
                        </a>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {hospital.distance.toFixed(2)} km away
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium ${hospital.distance < 10
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                        }`}
                    >
                      {hospital.distance < 10 ? 'Live Nearby' : 'Far'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  No hospital data found or not an emergency.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiseaseEncyclopedia: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  const [diseases, setDiseases] = useState<Disease[]>([]);

  const getRecommendation = (severity: Disease['severity']) => {
    switch (severity) {
      case 'Mild':
        return "This condition is usually mild. You can often manage it at home, but consult a doctor if symptoms worsen.";
      case 'Moderate':
        return "This condition may require medical attention. Please consult a healthcare professional for proper guidance.";
      case 'Serious':
        return "This condition is serious. Seek immediate medical attention or contact a healthcare provider right away.";
      default:
        return "";
    }
  };

  // Fetch diseases from backend on searchTerm change
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/diseases?search=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        if (data.success) {
          setDiseases(data.diseases);
        }
      } catch (error) {
        console.error("Failed to fetch diseases:", error);
      }
    };

    fetchDiseases();
  }, [searchTerm]);


  const filteredDiseases = diseases.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Disease Database</h3>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search diseases..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div
            className={`space-y-3 ${searchTerm && filteredDiseases.length > 3 ? 'overflow-y-auto max-h-96 pr-2' : ''}`}
          >
            {(searchTerm ? filteredDiseases : [
              diseases.find(d => d.severity === 'Mild'),
              diseases.find(d => d.severity === 'Moderate'),
              diseases.find(d => d.severity === 'Serious')
            ]).filter((disease): disease is Disease => Boolean(disease)).map((disease, index) => (
              <button
                key={index}
                onClick={() => setSelectedDisease(disease)}
                className="w-full text-left p-4 bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="font-medium text-gray-900 dark:text-white">{disease.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{disease.category}</div>
                <div className={`text-xs font-medium mt-1 ${disease.severity === 'Mild'
                  ? 'text-green-600 dark:text-green-400'
                  : disease.severity === 'Moderate'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-red-600 dark:text-red-400'
                  }`}>
                  {disease.severity}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedDisease ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedDisease.name}</h4>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedDisease.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedDisease.severity === 'Mild' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    selectedDisease.severity === 'Moderate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                    {selectedDisease.severity}
                  </span>
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${selectedDisease.severity === 'Mild'
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                : selectedDisease.severity === 'Moderate'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                }`}>
                <strong>Recommendation:</strong> {getRecommendation(selectedDisease.severity)}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Common Symptoms</h5>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDisease.symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Progression Timeline</h5>
                <div className="space-y-2">
                  {selectedDisease.progression.map((stage, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p>Select a disease to view detailed information</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MedicineScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedMedicine, setScannedMedicine] = useState<Medicine | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedMedicine({
        name: "Ibuprofen 200mg",
        type: "Pain Relief",
        dosage: "200mg tablets",
        instructions: "Take 1-2 tablets every 6-8 hours as needed",
        sideEffects: ["Stomach upset", "Dizziness", "Headache"],
        warnings: ["Do not exceed 6 tablets in 24 hours", "Take with food"]
      });
    }, 3000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedImage(file);
    setIsScanning(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/scan`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setScannedMedicine(result.medicine);
      } else {
        setScannedMedicine(null);            // Clear previous result
        alert(result.message || "No matching medicine found.");
      }
    } catch (error) {
      console.error("Scan failed:", error);
      alert("Error scanning the image.");
    } finally {
      setIsScanning(false);
    }
  };


  return (
    <div className="p-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Medicine Scanner</h3>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center mb-6 border border-gray-200 dark:border-gray-700">
            {isScanning ? (
              <div className="space-y-4">
                <div className="animate-spin mx-auto">
                  <Camera className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">Analyzing medication...</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto" />
                <p className="text-gray-600 dark:text-gray-400">Upload or scan a medicine strip</p>

                <div className="flex justify-center">
                  <label className="cursor-pointer inline-block bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {isMobile && (
                  <button
                    onClick={handleScan}
                    className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium w-full"
                  >
                    Start Live Scan
                  </button>
                )}

                {uploadedImage && (
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded"
                    className="mt-4 mx-auto h-28 rounded-lg border border-gray-300 dark:border-gray-600 object-contain"
                  />
                )}
              </div>
            )}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <span className="font-semibold text-yellow-800 dark:text-yellow-400">Important</span>
            </div>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Always consult with a healthcare professional before taking any medication.
            </p>
          </div>
        </div>

        <div>
          {scannedMedicine ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{scannedMedicine.name}</h4>
                <p className="text-green-600 dark:text-green-400 font-medium">{scannedMedicine.type}</p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Pill className="h-5 w-5 mr-2" />
                  Dosage Information
                </h5>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{scannedMedicine.dosage}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{scannedMedicine.instructions}</p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Side Effects</h5>
                <ul className="space-y-1">
                  {scannedMedicine.sideEffects.map((effect, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300">• {effect}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Warnings</h5>
                <ul className="space-y-1">
                  {scannedMedicine.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300">• {warning}</li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center">
                <Clock className="h-5 w-5 mr-2" />
                Set Reminder
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Scan className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p>Scan a medication to view detailed information</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Features;
