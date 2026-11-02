'use client';

import { useEffect, useState } from 'react';

// Updated in the browser so the footer stays right on a site that is not rebuilt often.
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
