import { useState, useEffect } from 'react';
import { getJobs } from '@/lib/api';

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.institution.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">KPSS İş İlanları</h1>
      <input 
        type="text" 
        placeholder="Ara..." 
        className="p-2 border rounded w-full mb-6"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.institution}</p>
            <a href={job.original_url} target="_blank" className="text-blue-500 underline">Başvur</a>
          </div>
        ))}
      </div>
    </div>
  );
}
