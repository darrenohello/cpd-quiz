import type { Profile } from '$lib/questions';

export const lastReviewed = '2025-06-01';

export const sources: { label: string; url: string }[] = [
  { label: 'NMBA CPD registration standard', url: 'https://www.nursingmidwiferyboard.gov.au/Registration-Standards/Continuing-professional-development.aspx' },
  { label: 'AHPRA', url: 'https://www.ahpra.gov.au/' },
];

// Base minimum hours by profession (NMBA). Non-practising typically 0; confirm with current standard.
const DEFAULT_MIN_HOURS = 20;
const ENDORSEMENT_ADDITIONAL_HOURS_PER = 10;

export function computeRequiredHours(profile: Profile): number {
  if (!profile.profession) return DEFAULT_MIN_HOURS;
  if (profile.registrationType === 'NonPractising') return 0;

  let hours = DEFAULT_MIN_HOURS;
  const endorsements = profile.endorsementsCount ?? 0;
  hours += endorsements * ENDORSEMENT_ADDITIONAL_HOURS_PER;
  return hours;
}

export function computeRequirementLabel(profile: Profile): string {
  const hours = computeRequiredHours(profile);
  if (hours === 0) return 'No CPD hours required while non-practising.';
  return `Minimum ${hours} hours of CPD per registration period.`;
}
