export async function fetchRisks() {
  const res = await fetch('/api/risks');
  if (!res.ok) throw new Error('Failed to fetch risks');
  return res.json();
}