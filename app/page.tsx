'use client';

import Image from "next/image";
import React, { useState } from 'react';
import Dropzone from '../components/Dropzone';
import DataTable from '../components/Datatable';
import DataChart from '../components/Datachart';

export default function Home() {
  const [csvData, setCsvData] = useState('');

  const handleClearData = () => {
    setCsvData('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Application powered by &nbsp;
          <code className="font-mono font-bold">Vercel | Next.js | OpenAI </code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <p className="flex w-full items-center justify-center font-mono text-2xl pt-2">
        SmartChart : Instant AI-generated insights and visualizations from your csv data
      </p>
      <p className=" w-full items-center justify-center font-mono text-lg pb-2">
        Import a csv document below and SmartChart will analyze the data, identify important insights, and provide a visualization and summary of the findings.
      </p>
      <div className="pt-8">
        {!csvData && <Dropzone onCsvData={setCsvData} />}
        {csvData && <DataChart csvData={csvData} />}
      </div>

      <div className="w-full pt-8">
        {csvData && (
          <div className="flex justify-center pt-4 pb-4">
            <button 
              onClick={handleClearData} 
              className="mt-4 px-4 py-2 bg-slate-500  font-mono text-sm text-white rounded hover:bg-slate-600"
            >
              Clear Data
            </button>
          </div>
        )}
        {csvData && <DataTable csvData={csvData} />}
      </div>
    </main>
  );
}
