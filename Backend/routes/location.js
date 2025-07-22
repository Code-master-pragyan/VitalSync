// routes/location.js
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
};

router.post("/hospitals", async (req, res) => {
  try {
    let lat, lon;
    const input = req.body.placeName;

    if (!input) return res.status(400).json({ success: false, message: "Missing location." });

    if (typeof input === 'object' && input.lat && input.lon) {
      lat = input.lat;
      lon = input.lon;
    } else {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(input)}&countrycodes=in`);
      const geoData = await geoRes.json();

      if (!geoData.length) {
        return res.status(404).json({ success: false, message: "Location not found." });
      }

      lat = parseFloat(geoData[0].lat);
      lon = parseFloat(geoData[0].lon);
    }

    const radius = 50000;

    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lon});
        way["amenity"="hospital"](around:${radius},${lat},${lon});
        relation["amenity"="hospital"](around:${radius},${lat},${lon});
      );
      out center;
    `;

    const hospitalRes = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query
    });

    const hospitalData = await hospitalRes.json();

    const hospitals = (hospitalData.elements || [])
      .map((h) => {
        const hLat = h.lat ?? h.center?.lat;
        const hLon = h.lon ?? h.center?.lon;
        const name = h.tags?.name || "Unnamed Hospital";
        if (!hLat || !hLon) return null;

        const distance = calculateDistance(lat, lon, hLat, hLon);

        return { name, lat: hLat, lon: hLon, distance };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);

    return res.json({ success: true, hospitals });
  } catch (err) {
    console.error("❌ Hospital fetch failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
