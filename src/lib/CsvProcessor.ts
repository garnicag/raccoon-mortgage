export function csvToObjects(csv: string): Record<string, string>[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(';').map(h => normalizeKey(h.trim()));
  
  return lines.slice(1).map(line => {
    const values = line.split(';').map(v => v.trim());
    const record: Record<string, string> = {};

    headers.forEach((header, idx) => {
      record[header] = values[idx] ?? '';
    });
    
    return record;
  });
}

function normalizeKey(key: string): string {
  // Remove accents
  let normalized = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Remove non-alphabetic characters
  normalized = normalized.replace(/[^a-zA-Z ]/g, ' ');
  // Convert to camelCase
  normalized = normalized
    .split(' ')
    .filter(Boolean)
    .map((word, idx) =>
      idx === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
  return normalized;
}
