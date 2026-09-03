// Computed at build time so it's correct on deploy, then refreshed client-side
// (see the inline script in the layouts) so it keeps ticking over between deploys.
export function tenureYears(startISO: string, at: Date = new Date()): string {
  const start = new Date(startISO);
  const years = (at.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return years.toFixed(1);
}
