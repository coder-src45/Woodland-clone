import React from 'react';

interface IllustrationProps {
  type: string;
  colorHex?: string;
  className?: string;
}

export const ProductIllustration: React.FC<IllustrationProps> = ({
  type,
  colorHex = '#C49756',
  className = 'w-full h-full',
}) => {
  switch (type) {
    case 'camel_boot':
      return (
        <svg
          viewBox="0 0 400 320"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorHex} />
              <stop offset="60%" stopColor={colorHex} />
              <stop offset="100%" stopColor="#8A5A20" />
            </linearGradient>
            <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2B2118" />
              <stop offset="100%" stopColor="#1A130C" />
            </linearGradient>
            <linearGradient id="soleLugGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A3B2C" />
              <stop offset="35%" stopColor="#2D2319" />
              <stop offset="100%" stopColor="#14100C" />
            </linearGradient>
            <filter id="bootShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0F3822" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Background Ambient Glow */}
          <ellipse cx="200" cy="275" rx="140" ry="18" fill="#000000" fillOpacity="0.12" />
          
          {/* Main Boot Group */}
          <g filter="url(#bootShadow)">
            {/* Padded Collar / Ankle Rim */}
            <path
              d="M130 92 C145 80, 205 80, 235 88 C242 90, 246 100, 243 112 C239 122, 230 128, 220 128 C195 128, 140 125, 126 112 C120 106, 122 96, 130 92 Z"
              fill="url(#collarGrad)"
            />
            {/* Collar texture stitch lines */}
            <path d="M140 98 C165 92, 205 92, 226 98" stroke="#5C4532" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Boot Upper Main Nubuck Leather */}
            <path
              d="M125 108 
                 C115 135, 110 170, 112 210 
                 C113 235, 118 245, 125 248 
                 L295 248 
                 C330 248, 355 240, 360 220 
                 C363 205, 345 195, 305 188 
                 C270 182, 235 175, 215 145 
                 C202 128, 195 110, 190 98 
                 C175 96, 145 98, 125 108 Z"
              fill="url(#leatherGrad)"
            />

            {/* Nubuck Leather Shading Overlays */}
            <path
              d="M112 210 C113 235, 118 245, 125 248 L180 248 C165 220, 155 180, 145 140 L125 108 C115 135, 110 170, 112 210 Z"
              fill="#000000"
              fillOpacity="0.08"
            />
            <path
              d="M270 182 C235 175, 215 145, 210 128 L230 130 C245 155, 270 172, 305 188 Z"
              fill="#FFFFFF"
              fillOpacity="0.15"
            />

            {/* Reinforced Heel Counter */}
            <path
              d="M112 185 C112 225, 118 248, 175 248 C165 215, 155 185, 142 175 C132 168, 115 172, 112 185 Z"
              fill="#000000"
              fillOpacity="0.12"
            />
            {/* Heel Counter Stitching */}
            <path
              d="M116 188 C116 220, 122 244, 170 244"
              stroke="#F4E0A5"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              fill="none"
            />
            <path
              d="M119 191 C119 221, 125 241, 166 241"
              stroke="#F4E0A5"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              fill="none"
            />

            {/* Toe Bumper Overlay */}
            <path
              d="M280 248 C310 248, 345 242, 360 220 C350 205, 320 200, 290 205 C275 220, 275 240, 280 248 Z"
              fill="#000000"
              fillOpacity="0.1"
            />
            {/* Toe Double Stitch Line */}
            <path
              d="M278 245 C305 245, 335 238, 352 218"
              stroke="#F4E0A5"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <path
              d="M275 241 C300 241, 328 235, 345 215"
              stroke="#F4E0A5"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Heavy-Duty Rugged Lug Sole Base */}
            <path
              d="M115 248 L355 248 C365 248, 370 255, 362 262 L350 268 C345 270, 330 270, 325 268 L115 268 C108 268, 105 260, 110 252 Z"
              fill="#261E16"
            />
            {/* Midsole Stitch welt weltline */}
            <line x1="115" y1="250" x2="355" y2="250" stroke="#D4A373" strokeWidth="2" strokeDasharray="3 3" />

            {/* Cleated Lug Sole Teeth */}
            <path
              d="M110 268 
                 L125 268 L122 284 L138 284 L142 268 
                 L155 268 L152 284 L168 284 L172 268 
                 L185 268 L183 284 L198 284 L202 268 
                 L215 268 L218 284 L235 284 L238 268 
                 L252 268 L255 284 L272 284 L274 268 
                 L288 268 L291 284 L308 284 L310 268 
                 L325 268 L328 282 L342 282 L345 268 
                 C355 268, 365 265, 360 258 L110 258 Z"
              fill="url(#soleLugGrad)"
            />

            {/* Brass Hexagonal Eyelets */}
            {[
              { cx: 182, cy: 118 },
              { cx: 194, cy: 136 },
              { cx: 206, cy: 154 },
              { cx: 220, cy: 170 },
              { cx: 236, cy: 182 },
            ].map((eyelet, i) => (
              <g key={i}>
                <polygon
                  points={`${eyelet.cx},${eyelet.cy - 5} ${eyelet.cx + 4.5},${eyelet.cy - 2.5} ${eyelet.cx + 4.5},${eyelet.cy + 2.5} ${eyelet.cx},${eyelet.cy + 5} ${eyelet.cx - 4.5},${eyelet.cy + 2.5} ${eyelet.cx - 4.5},${eyelet.cy - 2.5}`}
                  fill="#D4AF37"
                  stroke="#8B7500"
                  strokeWidth="1"
                />
                <circle cx={eyelet.cx} cy={eyelet.cy} r="2.2" fill="#2B2118" />
              </g>
            ))}

            {/* Braided Yellow/Black Outdoor Laces */}
            <path
              d="M178 118 Q188 126 194 136 Q200 144 206 154 Q212 162 220 170 Q228 176 236 182"
              stroke="#F5A623"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="4 2"
            />
            <path
              d="M182 118 Q190 128 196 138 Q202 146 208 156 Q214 164 222 172"
              stroke="#1F1A14"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Woodland Tree Brand Stamp on Ankle */}
            <g transform="translate(136, 142) scale(0.65)" opacity="0.45">
              <circle cx="20" cy="20" r="18" stroke="#3D2914" strokeWidth="2.5" fill="none" />
              {/* Tree silhouette */}
              <polygon points="20,4 27,15 23,15 29,24 23,24 31,33 9,33 17,24 11,24 17,15 13,15" fill="#3D2914" />
              <rect x="18" y="32" width="4" height="4" fill="#3D2914" />
            </g>
          </g>
        </svg>
      );

    case 'combat_boot':
      return (
        <svg viewBox="0 0 400 320" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="278" rx="140" ry="16" fill="#000000" fillOpacity="0.14" />
          {/* High Top Dark Nubuck Combat Boot */}
          <g>
            {/* High Shaft */}
            <path
              d="M125 55 C140 45, 195 45, 215 52 C222 55, 226 65, 222 80 L210 135 C230 160, 270 178, 305 188 C345 195, 365 210, 360 225 C355 242, 325 248, 290 248 L125 248 C115 242, 110 210, 112 170 C114 120, 118 70, 125 55 Z"
              fill="#24211D"
            />
            {/* Speed Hooks & Laces */}
            <path
              d="M165 70 L205 85 M160 95 L200 110 M158 120 L195 135 M162 145 L210 162 M170 170 L230 180"
              stroke="#8B5A2B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Combat Lug Sole */}
            <path
              d="M110 248 L355 248 C365 248, 370 256, 362 265 L350 272 L115 272 C106 272, 102 260, 110 248 Z"
              fill="#12100E"
            />
            {/* Deep cleated lugs */}
            <path
              d="M112 272 L125 288 L145 272 L160 288 L180 272 L195 288 L215 272 L230 288 L250 272 L265 288 L285 272 L300 288 L320 272 L340 286 L350 272 Z"
              fill="#0A0908"
            />
            {/* Brand Tree */}
            <circle cx="140" cy="110" r="14" stroke="#4A453F" strokeWidth="1.5" />
            <polygon points="140,100 145,108 142,108 147,115 133,115 138,108 135,108" fill="#4A453F" />
          </g>
        </svg>
      );

    case 'hiking_shoe':
    case 'trail_sneaker':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="205" cy="255" rx="145" ry="16" fill="#000000" fillOpacity="0.12" />
          <g>
            {/* Padded Ankle Collar */}
            <path
              d="M140 145 C155 135, 195 135, 215 142 C222 145, 224 155, 220 165 C210 168, 175 168, 142 160 Z"
              fill="#2B362F"
            />
            {/* Low-cut Hiking Upper */}
            <path
              d="M125 165 
                 C118 190, 116 215, 122 232 
                 L300 232 
                 C335 232, 365 224, 368 208 
                 C370 195, 350 182, 310 178 
                 C275 174, 240 168, 220 152 
                 C200 142, 165 145, 140 152 
                 C130 156, 126 160, 125 165 Z"
              fill={type === 'hiking_shoe' ? '#1D3B2B' : colorHex}
            />
            {/* Technical Mesh Breathable Panel */}
            <path
              d="M170 185 C190 180, 240 180, 265 192 L260 215 C230 212, 185 210, 165 212 Z"
              fill="#18241D"
              opacity="0.85"
            />
            {/* Cross Webbing Straps */}
            <path d="M190 175 L225 218 M215 172 L250 215" stroke="#C49756" strokeWidth="2.5" />
            
            {/* Protective Rubber Toe Bumper */}
            <path
              d="M295 232 C325 232, 355 226, 368 208 C365 198, 340 195, 315 200 C300 212, 296 225, 295 232 Z"
              fill="#1F2321"
            />
            {/* Cushioned Phylon Midsole */}
            <path
              d="M118 232 L362 232 C368 232, 372 238, 365 246 L355 252 L115 252 C108 252, 105 242, 112 235 Z"
              fill="#E5DDD0"
            />
            {/* High Traction Multi-Directional Cleated Outsole */}
            <path
              d="M115 252 
                 L130 252 L128 266 L145 266 L148 252 
                 L165 252 L163 266 L180 266 L182 252 
                 L200 252 L198 266 L215 266 L218 252 
                 L235 252 L234 266 L252 266 L254 252 
                 L272 252 L270 266 L288 266 L290 252 
                 L308 252 L306 266 L324 266 L326 252 
                 L342 252 L345 264 L360 252 Z"
              fill="#111814"
            />
            {/* Round Adventure Trail Laces */}
            <path d="M185 158 Q205 168 230 178" stroke="#F5A623" strokeWidth="3" strokeDasharray="3 2" />
          </g>
        </svg>
      );

    case 'weather_jacket':
      return (
        <svg viewBox="0 0 400 340" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="305" rx="120" ry="14" fill="#000000" fillOpacity="0.1" />
          <g>
            {/* High-Neck Protective Storm Hood */}
            <path
              d="M160 55 C160 40, 240 40, 240 55 C245 75, 235 95, 200 95 C165 95, 155 75, 160 55 Z"
              fill="#0F3822"
            />
            {/* Main Weather Jacket Body */}
            <path
              d="M150 90 
                 L110 135 L60 215 C55 225, 65 235, 78 230 L115 190 L115 285 C115 292, 122 298, 130 298 L270 298 C278 298, 285 292, 285 285 L285 190 L322 230 C335 235, 345 225, 340 215 L290 135 L250 90 
                 C235 98, 165 98, 150 90 Z"
              fill={colorHex || '#164E2E'}
            />
            {/* Black Ripstop Shoulder Yoke & Reinforcements */}
            <path
              d="M150 90 L110 135 L140 160 C175 145, 225 145, 260 160 L290 135 L250 90 Z"
              fill="#0D2418"
            />
            {/* Sealed Storm Flap & Center Waterproof Zipper */}
            <line x1="200" y1="95" x2="200" y2="298" stroke="#111814" strokeWidth="6" />
            <line x1="200" y1="95" x2="200" y2="298" stroke="#E5C158" strokeWidth="1.5" strokeDasharray="6 8" />

            {/* Left & Right Tactical Chest Pockets */}
            <rect x="140" y="165" width="40" height="35" rx="3" fill="#0D2418" />
            <line x1="145" y1="170" x2="175" y2="170" stroke="#000" strokeWidth="2" />
            
            <rect x="220" y="165" width="40" height="35" rx="3" fill="#0D2418" />
            <line x1="225" y1="170" x2="255" y2="170" stroke="#000" strokeWidth="2" />

            {/* Woodland Heritage Embroidered Patch */}
            <g transform="translate(148, 120) scale(0.7)">
              <rect width="36" height="18" rx="2" fill="#D4AF37" />
              <text x="4" y="13" fill="#0B2516" fontSize="9" fontWeight="bold" fontFamily="sans-serif">WOODLAND</text>
            </g>
          </g>
        </svg>
      );

    case 'fleece_hoodie':
      return (
        <svg viewBox="0 0 400 340" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="305" rx="115" ry="12" fill="#000000" fillOpacity="0.1" />
          <g>
            {/* Hood Back */}
            <path d="M165 60 C170 45, 230 45, 235 60 C240 75, 230 92, 200 92 C170 92, 160 75, 165 60 Z" fill="#2E2B27" />
            {/* Heavy Cotton Body */}
            <path
              d="M155 90 L115 130 L75 205 C70 215, 80 225, 92 220 L125 185 L125 285 L275 285 L275 185 L308 220 C320 225, 330 215, 325 205 L285 130 L245 90 Z"
              fill={colorHex || '#3D3833'}
            />
            {/* Kangaroo Pouch */}
            <path d="M150 220 L250 220 L240 270 L160 270 Z" fill="#292622" />
            {/* Woodland Chest Heritage Badge */}
            <g transform="translate(160, 135)">
              <text x="0" y="20" fill="#E8DFD3" fontSize="18" fontWeight="800" letterSpacing="2">WOODLAND</text>
              <text x="15" y="32" fill="#A89F95" fontSize="8" letterSpacing="4">EXPLORE MORE</text>
            </g>
            {/* Drawstrings */}
            <path d="M185 95 L182 145 M215 95 L218 145" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'expedition_pack':
      return (
        <svg viewBox="0 0 400 340" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="310" rx="90" ry="12" fill="#000000" fillOpacity="0.12" />
          <g>
            {/* Main Rucksack Body */}
            <rect x="140" y="80" width="120" height="210" rx="16" fill={colorHex || '#2E3D2F'} />
            {/* Top Storm Lid */}
            <path d="M130 80 C130 65, 270 65, 270 80 L265 115 L135 115 Z" fill="#1C281D" />
            {/* Webbing Straps & Compression Buckles */}
            <line x1="165" y1="80" x2="165" y2="280" stroke="#C49756" strokeWidth="4" />
            <line x1="235" y1="80" x2="235" y2="280" stroke="#C49756" strokeWidth="4" />
            {/* Front Gusset Pocket */}
            <rect x="155" y="145" width="90" height="90" rx="8" fill="#1C281D" />
            {/* Molle Attachment Loops */}
            <line x1="165" y1="165" x2="235" y2="165" stroke="#3E4C3F" strokeWidth="3" strokeDasharray="8 6" />
            <line x1="165" y1="185" x2="235" y2="185" stroke="#3E4C3F" strokeWidth="3" strokeDasharray="8 6" />
            <line x1="165" y1="205" x2="235" y2="205" stroke="#3E4C3F" strokeWidth="3" strokeDasharray="8 6" />
            {/* Tree Logo Emblem */}
            <circle cx="200" cy="100" r="10" fill="#0B2516" />
            <polygon points="200,93 205,101 202,101 206,105 194,105 198,101 195,101" fill="#D4AF37" />
            {/* Dual Bottle Mesh Pockets */}
            <path d="M135 180 L135 250 L140 250 L140 180 Z" fill="#151E16" />
            <path d="M260 180 L260 250 L265 250 L265 180 Z" fill="#151E16" />
          </g>
        </svg>
      );

    case 'outdoor_sandal':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="245" rx="135" ry="14" fill="#000000" fillOpacity="0.1" />
          <g>
            {/* Anatomical EVA Footbed */}
            <path
              d="M120 205 C115 218, 125 228, 145 228 L320 228 C350 228, 365 218, 360 205 C355 195, 335 192, 310 192 L140 192 C125 192, 120 198, 120 205 Z"
              fill="#3A2C21"
            />
            {/* Rugged Wet-Grip Lug Sole */}
            <path
              d="M118 228 L362 228 C366 228, 370 234, 365 240 L355 246 L115 246 C110 246, 108 238, 114 231 Z"
              fill="#181512"
            />
            {/* Cleat ridges */}
            <path d="M125 246 L140 246 M155 246 L175 246 M190 246 L215 246 M230 246 L255 246 M270 246 L295 246 M310 246 L335 246" stroke="#4A3B2C" strokeWidth="4" />
            {/* Quick-dry Webbing Straps */}
            <path d="M145 205 C160 155, 190 155, 205 205" stroke={colorHex || '#9E6B2C'} strokeWidth="16" strokeLinecap="round" />
            <path d="M230 205 C250 160, 280 160, 305 205" stroke={colorHex || '#9E6B2C'} strokeWidth="16" strokeLinecap="round" />
            <path d="M145 185 L310 185" stroke="#1F1A14" strokeWidth="8" strokeLinecap="round" />
            {/* Velcro Buckle & Woodland Badge */}
            <rect x="220" y="168" width="30" height="14" rx="2" fill="#D4AF37" />
            <text x="223" y="178" fill="#181512" fontSize="7" fontWeight="bold">WOODLAND</text>
          </g>
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
          Woodland Gear
        </div>
      );
  }
};
