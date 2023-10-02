'use client'

import './globals.css'

import { useState } from 'react';
import downloadZip from './utils/downloader';

export default function Home() {
  const [numberDownload, setNumberDownload] = useState(1000)
  const [latency, setlatency] = useState(200)
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <button onClick={() => downloadZip(numberDownload, latency)} className="bg-slate-700" style={{marginBottom: '10px'}}>
        Compress file
      </button>

      <div>
        <div>Number request by file</div>
        <input id="request" type="number" defaultValue={numberDownload} onChange={e => setNumberDownload((e.target as HTMLInputElement).value as unknown as number)} />
      </div>
      <div style={{marginTop: '10px'}}>
        <div>Latency</div>
        <input type="number" id="latency" defaultValue={latency} onChange={e => setlatency((e.target as HTMLInputElement).value as unknown as number)} />
      </div>
    </main>
  )
}
