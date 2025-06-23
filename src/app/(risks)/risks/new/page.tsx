// src/app/(risks)/risks/new/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchRiskCategories,
  fetchLikelihoods,
  fetchConsequences,
  fetchRiskLevels,
  createRisk,
} from '@/shared/lib/fetcher';
import type { 
  RiskCategory,
  Likelihood,
  Consequence,
  RiskLevel
} from '@/shared/types';


export default function NewRiskPage() {
  const router = useRouter();
  // form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [inherentLikelihoodId, setInherentLikelihoodId] = useState<number>(0);
  const [inherentConsequenceId, setInherentConsequenceId] = useState<number>(0);
  const [inherentRiskLevelId, setInherentRiskLevelId] = useState<number>(0);
  const [residualLikelihoodId, setResidualLikelihoodId] = useState<number>(0);
  const [residualConsequenceId, setResidualConsequenceId] = useState<number>(0);
  const [residualRiskLevelId, setResidualRiskLevelId] = useState<number>(0);
  const [riskResponse, setRiskResponse] = useState<'MITIGATE'|'ACCEPT'|'AVOID'|'TRANSFER'>('MITIGATE');
  const [riskOwner, setRiskOwner] = useState('');
  // lookup data
  const [categories, setCategories] = useState<RiskCategory[]>([]);
  const [likelihoods, setLikelihoods] = useState<Likelihood[]>([]);
  const [consequences, setConsequences] = useState<Consequence[]>([]);
  const [riskLevels, setRiskLevels] = useState<RiskLevel[]>([]);

  useEffect(() => {
    fetchRiskCategories().then(setCategories);
    fetchLikelihoods().then(setLikelihoods);
    fetchConsequences().then(setConsequences);
    fetchRiskLevels().then(setRiskLevels);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createRisk({
      title,
      description,
      categoryId,
      inherentLikelihoodId,
      inherentConsequenceId,
      inherentRiskLevelId,
      residualLikelihoodId,
      residualConsequenceId,
      residualRiskLevelId,
      riskResponse,
      riskOwner,
    });
    router.push('/risks');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Risk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title *</label>
          <input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description *</label>
          <textarea
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Category *</label>
            <select required value={categoryId} onChange={e => setCategoryId(+e.target.value)} className="w-full border px-3 py-2 rounded">
              <option value="">Select…</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label>Response *</label>
            <select required value={riskResponse} onChange={e => setRiskResponse(e.target.value as any)} className="w-full border px-3 py-2 rounded">
              <option>MITIGATE</option>
              <option>ACCEPT</option>
              <option>AVOID</option>
              <option>TRANSFER</option>
            </select>
          </div>
        </div>
        {/* Inherent & Residual groups… */}
        <div className="grid grid-cols-2 gap-4">
          <fieldset>
            <legend className="font-semibold">Inherent Assessment *</legend>
            <label>Likelihood</label>
            <select required value={inherentLikelihoodId} onChange={e => setInherentLikelihoodId(+e.target.value)} className="w-full border px-2 py-1 rounded">
              <option value="">…</option>
              {likelihoods.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
            <label>Consequence</label>
            <select required value={inherentConsequenceId} onChange={e => setInherentConsequenceId(+e.target.value)} className="w-full border px-2 py-1 rounded">
              <option/>
              {consequences.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </fieldset>
        </div>
        <div>
          <label>Owner *</label>
          <input required value={riskOwner} onChange={e => setRiskOwner(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
}
