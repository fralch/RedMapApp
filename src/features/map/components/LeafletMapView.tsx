import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';

// Web-specific imports
let MapContainer: any, TileLayer: any, Marker: any, Popup: any, useMap: any, Circle: any;
let HeatmapLayer: any;
let WebView: any;

// Dynamically import based on platform
if (Platform.OS === 'web') {
  const ReactLeaflet = require('react-leaflet');
  MapContainer = ReactLeaflet.MapContainer;
  TileLayer = ReactLeaflet.TileLayer;
  Marker = ReactLeaflet.Marker;
  Popup = ReactLeaflet.Popup;
  useMap = ReactLeaflet.useMap;
  Circle = ReactLeaflet.Circle;
  
  // Dynamically load Leaflet CSS and heatmap plugin for web
  if (typeof document !== 'undefined') {
    const existingLink = document.querySelector('link[href*="leaflet.css"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }
    
    // Load heatmap plugin
    const existingHeatmapScript = document.querySelector('script[src*="leaflet-heat"]');
    if (!existingHeatmapScript && typeof window !== 'undefined' && !(window as any).L?.heatLayer) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }
  
  // Try to get heatmap layer from react-leaflet-heatmap-layer or create custom component
  try {
    const HeatmapLayerPackage = require('react-leaflet-heatmap-layer');
    HeatmapLayer = HeatmapLayerPackage.HeatmapLayer || HeatmapLayerPackage.default;
  } catch (e) {
    // Fallback to custom heatmap implementation
    HeatmapLayer = null;
  }
} else {
  WebView = require('react-native-webview').WebView;
}

interface LeafletMapViewProps {
  center: { latitude: number; longitude: number };
  zoom?: number;
  isDarkMode: boolean;
  markers?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  }>;
  heatmapPoints?: Array<{
    latitude: number;
    longitude: number;
    weight?: number;
  }>;
  onMapPress?: (coordinate: { latitude: number; longitude: number }) => void;
  onLongPress?: (coordinate: { latitude: number; longitude: number }) => void;
  style?: any;
  heatmapOptions?: {
    radius?: number;
    maxOpacity?: number;
    scaleRadius?: boolean;
    useLocalExtrema?: boolean;
    latField?: string;
    lngField?: string;
    valueField?: string;
  };
}

// Custom Heatmap Component for React Leaflet
const CustomHeatmapLayer: React.FC<{ points: any[]; options: any }> = ({ points, options }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!(window as any).L?.heatLayer || !points || points.length === 0) return;
    
    const heatmapData = points.map(point => [
      point.latitude || point[0], 
      point.longitude || point[1], 
      point.weight || point[2] || 1
    ]);
    
    const heatLayer = (window as any).L.heatLayer(heatmapData, {
      radius: options.radius || 25,
      blur: options.blur || 15,
      maxZoom: options.maxZoom || 17,
      max: options.max || 1.0,
      ...options
    }).addTo(map);
    
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, options]);
  
  return null;
};

const LeafletMapView: React.FC<LeafletMapViewProps> = ({
  center,
  zoom = 13,
  isDarkMode,
  markers = [],
  heatmapPoints = [],
  onMapPress,
  onLongPress,
  style,
  heatmapOptions = {},
}) => {
  const mapRef = useRef<any>(null);

  // Web implementation using React Leaflet
  if (Platform.OS === 'web') {
    const defaultHeatmapOptions = {
      radius: isDarkMode ? 30 : 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: isDarkMode 
        ? {
            0.0: '#000428',
            0.2: '#004e92', 
            0.4: '#009ffd',
            0.6: '#00d2ff',
            0.8: '#ff6b6b',
            1.0: '#ff3838'
          }
        : {
            0.0: '#313695',
            0.25: '#4575b4', 
            0.5: '#74add1',
            0.75: '#abd9e9',
            1.0: '#e0f3f8'
          },
      ...heatmapOptions
    };

    return (
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={zoom}
        style={style}
        ref={mapRef}
        eventHandlers={{
          click: (e) => {
            if (onMapPress) {
              onMapPress({ latitude: e.latlng.lat, longitude: e.latlng.lng });
            }
          },
          contextmenu: (e) => {
            if (onLongPress) {
              onLongPress({ latitude: e.latlng.lat, longitude: e.latlng.lng });
            }
          }
        }}
      >
        <TileLayer
          url={isDarkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution={isDarkMode 
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        />
        
        {/* Render heatmap layer */}
        {heatmapPoints.length > 0 && (
          <CustomHeatmapLayer 
            points={heatmapPoints} 
            options={defaultHeatmapOptions}
          />
        )}
        
        {/* Render markers */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
            {(marker.title || marker.description) && (
              <Popup>
                {marker.title && <div><strong>{marker.title}</strong></div>}
                {marker.description && <div>{marker.description}</div>}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    );
  }

  // Mobile implementation using WebView with Leaflet HTML
  const createLeafletHTML = () => {
    const markersJS = markers.map(marker => 
      `L.marker([${marker.latitude}, ${marker.longitude}]).addTo(map)
        ${marker.title || marker.description ? 
          `.bindPopup('${marker.title ? `<strong>${marker.title}</strong>` : ''}${marker.description ? `<div>${marker.description}</div>` : ''}')` 
          : ''};`
    ).join('\n');

    const defaultHeatmapOptions = {
      radius: isDarkMode ? 30 : 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      ...heatmapOptions
    };

    const heatmapJS = heatmapPoints.length > 0 ? `
      // Prepare heatmap data
      var heatmapData = [
        ${heatmapPoints.map(p => `[${p.latitude}, ${p.longitude}, ${p.weight || 1}]`).join(',\n        ')}
      ];
      
      // Create heatmap layer with better styling
      var heatLayer = L.heatLayer(heatmapData, {
        radius: ${defaultHeatmapOptions.radius},
        blur: ${defaultHeatmapOptions.blur},
        maxZoom: ${defaultHeatmapOptions.maxZoom},
        max: ${defaultHeatmapOptions.max},
        gradient: ${isDarkMode 
          ? `{
              0.0: '#000428',
              0.2: '#004e92', 
              0.4: '#009ffd',
              0.6: '#00d2ff',
              0.8: '#ff6b6b',
              1.0: '#ff3838'
            }`
          : `{
              0.0: '#313695',
              0.25: '#4575b4', 
              0.5: '#74add1',
              0.75: '#abd9e9',
              1.0: '#e0f3f8'
            }`
        }
      }).addTo(map);
    ` : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
        <style>
          html, body { 
            height: 100%; 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          #map { 
            height: 100vh; 
            width: 100vw; 
            transition: filter 0.3s ease;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 8px;
            box-shadow: 0 3px 14px rgba(0,0,0,0.4);
          }
          .leaflet-popup-content {
            margin: 12px 16px;
            line-height: 1.4;
            font-size: 14px;
          }
          ${isDarkMode ? `
            .leaflet-popup-content-wrapper {
              background-color: #2a2a2a;
              color: #ffffff;
            }
            .leaflet-popup-tip {
              background-color: #2a2a2a;
            }
          ` : ''}
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', {
            zoomControl: true,
            attributionControl: true,
            fadeAnimation: true,
            zoomAnimation: true,
            markerZoomAnimation: true
          }).setView([${center.latitude}, ${center.longitude}], ${zoom});
          
          L.tileLayer('${isDarkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }', {
            attribution: '${isDarkMode 
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }',
            maxZoom: 18,
          }).addTo(map);

          ${heatmapJS}
          ${markersJS}

          // Enhanced event handlers with haptic feedback simulation
          map.on('click', function(e) {
            window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'mapPress',
              latitude: e.latlng.lat,
              longitude: e.latlng.lng
            }));
          });

          map.on('contextmenu', function(e) {
            // Prevent default context menu
            e.originalEvent.preventDefault();
            
            // Visual feedback for long press
            var circle = L.circle(e.latlng, {
              color: '#ff3838',
              fillColor: '#ff3838',
              fillOpacity: 0.3,
              radius: 50
            }).addTo(map);
            
            setTimeout(function() {
              map.removeLayer(circle);
            }, 200);
            
            window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'longPress',
              latitude: e.latlng.lat,
              longitude: e.latlng.lng
            }));
          });

          // Add smooth zoom animations
          map.on('zoomstart', function() {
            document.getElementById('map').style.filter = 'brightness(0.9)';
          });
          
          map.on('zoomend', function() {
            document.getElementById('map').style.filter = 'brightness(1)';
          });
        </script>
      </body>
      </html>
    `;
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'mapPress' && onMapPress) {
        onMapPress({ latitude: data.latitude, longitude: data.longitude });
      } else if (data.type === 'longPress' && onLongPress) {
        onLongPress({ latitude: data.latitude, longitude: data.longitude });
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View style={style}>
      <WebView
        source={{ html: createLeafletHTML() }}
        style={{ flex: 1 }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

export default LeafletMapView;