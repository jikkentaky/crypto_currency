import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0c0c0c',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          borderRadius: '14px',
        }}
      >
        {/* Large green bubble — top-left */}
        <div
          style={{
            position: 'absolute',
            left: 4,
            top: 10,
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: '#00dc3e',
            display: 'flex',
          }}
        />
        {/* Medium red bubble — top-right */}
        <div
          style={{
            position: 'absolute',
            left: 32,
            top: 6,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#e15454',
            display: 'flex',
          }}
        />
        {/* Small accent bubble — bottom-center */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 40,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#8da868',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
