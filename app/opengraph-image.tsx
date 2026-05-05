import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ONCHAINBUBBLES — Real-time Crypto Market Visualization';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const bubbles: [number, number, number, string, number, string, number][] = [
  // left, top, diameter, color, opacity, ticker, fontSize
  // Left side
  [-70, -30, 220, '#06a131', 0.9, 'BTC', 26],
  [55,  170, 160, '#e15454', 0.85, 'ETH', 20],
  [-55, 380, 200, '#00dc3e', 0.8,  'SOL', 24],
  [45,  560, 145, '#d85252', 0.85, 'BNB', 18],

  // Top row
  [300, -55, 135, '#e15454', 0.8,  'AVAX', 16],
  [480, -45, 105, '#00dc3e', 0.75, 'TRX',  14],
  [635, -65, 155, '#d85252', 0.85, 'DOGE', 18],
  [845, -45, 115, '#06a131', 0.8,  'POL',  14],
  [995, -55, 145, '#e15454', 0.75, 'DOT',  18],

  // Bottom row
  [270, 605, 155, '#06a131', 0.85, 'LINK', 18],
  [455, 615, 115, '#e15454', 0.8,  'UNI',  14],
  [605, 595, 175, '#00dc3e', 0.85, 'ARB',  20],
  [825, 605, 125, '#d85252', 0.75, 'OP',   16],
  [990, 610, 145, '#8da868', 0.8,  'ATOM', 16],

  // Right side
  [1115, 30,  165, '#e15454', 0.9,  'XRP', 20],
  [1190, 250, 135, '#00dc3e', 0.85, 'LTC', 16],
  [1100, 445, 185, '#d85252', 0.8,  'FTM', 22],
  [1175, 600, 155, '#06a131', 0.75, 'TON', 18],
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0c0c0c',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Bubbles */}
        {bubbles.map(([left, top, diameter, color, opacity, ticker, fontSize], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: left,
              top: top,
              width: diameter,
              height: diameter,
              borderRadius: '50%',
              background: color,
              opacity: opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.95)',
              fontWeight: '800',
              fontSize: fontSize,
              letterSpacing: '1px',
            }}
          >
            {ticker}
          </div>
        ))}

        {/* Subtle glow behind center text */}
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 130,
            width: 720,
            height: 370,
            borderRadius: '50%',
            background: 'rgba(0, 220, 62, 0.06)',
            display: 'flex',
          }}
        />

        {/* Center content overlay */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span
                style={{
                  fontSize: '86px',
                  fontWeight: '900',
                  color: '#ffffff',
                  letterSpacing: '4px',
                  lineHeight: 1,
                }}
              >
                ONCHAIN
              </span>
              <span
                style={{
                  fontSize: '86px',
                  fontWeight: '900',
                  color: '#00dc3e',
                  letterSpacing: '4px',
                  lineHeight: 1,
                }}
              >
                BUBBLES
              </span>
            </div>

            {/* Accent divider */}
            <div
              style={{
                width: '90px',
                height: '3px',
                background: '#00dc3e',
                borderRadius: '2px',
                display: 'flex',
                marginTop: '24px',
              }}
            />

            {/* Subtitle */}
            <div
              style={{
                fontSize: '22px',
                color: '#808080',
                letterSpacing: '4px',
                textAlign: 'center',
                display: 'flex',
                marginTop: '20px',
              }}
            >
              REAL-TIME CRYPTO MARKET VISUALIZATION
            </div>

            {/* Network tags */}
            <div
              style={{
                display: 'flex',
                marginTop: '32px',
                gap: '10px',
              }}
            >
              {['ETH', 'SOL', 'BASE', 'BSC', 'TRON', 'AVAX', 'OP'].map((net) => (
                <div
                  key={net}
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    border: '1px solid #2a2a2a',
                    borderRadius: '20px',
                    color: '#5b5b5b',
                    fontSize: '14px',
                    letterSpacing: '1.5px',
                    fontWeight: '600',
                  }}
                >
                  {net}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
