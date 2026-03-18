'use client';

import { useMemo, useState } from 'react';

import {
  LaptopCustomizationCategory,
  LaptopCustomizationOption
} from '@/lib/types/entities';

type LaptopCustomizationPanelProps = {
  categories: LaptopCustomizationCategory[];
  basePrice: number; // computed from product.priceRange
};

function parseINRNumber(value: string) {
  const cleaned = value.replace(/[^\d.,L+l]/gi, '').trim();
  if (!cleaned) return null;

  // Handle lakh: "1.5L"
  const lakhMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*L/i);
  if (lakhMatch) {
    const n = Number(lakhMatch[1]);
    if (!Number.isNaN(n)) return Math.round(n * 100000);
  }

  // Handle comma numbers: "78,000"
  const digits = cleaned.replace(/,/g, '');
  const n = Number(digits.replace(/[^\d.]/g, ''));
  if (Number.isFinite(n)) return Math.round(n);

  return null;
}

function parseBasePrice(priceRange: string): number {
  // Supports patterns like:
  // - "₹78,000 - ₹95,000"
  // - "₹80,000+"
  // - "₹1.5L+"
  const normalized = priceRange.replace(/\s/g, '');

  const parts: number[] = [];
  // Capture lakh values and comma/decimal values.
  const lakhValues = [...normalized.matchAll(/(\d+(?:\.\d+)?)L\+?/gi)].map((m) => m[1]);
  for (const v of lakhValues) {
    const n = Number(v);
    if (Number.isFinite(n)) parts.push(Math.round(n * 100000));
  }

  const rupeeValues = [...normalized.matchAll(/(\d[\d,]*)(?:\.\d+)?/g)].map((m) => m[1]);
  for (const v of rupeeValues) {
    const n = parseINRNumber(v);
    if (n != null) parts.push(n);
  }

  if (parts.length >= 2) {
    const sorted = parts.sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    return Math.round((min + max) / 2);
  }

  if (parts.length === 1) return parts[0];
  return 0;
}

function formatINR(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '₹—';
  return `₹${value.toLocaleString('en-IN')}`;
}

function getOptionById(category: LaptopCustomizationCategory, optionId: string | null) {
  if (!optionId) return null;
  return category.options.find((o) => (o.id ?? o.label) === optionId) ?? null;
}

export function LaptopCustomizationPanel({ categories, basePrice }: LaptopCustomizationPanelProps) {
  const initialSelection = useMemo(() => {
    const next: Record<string, string> = {};
    for (const category of categories) {
      const first = category.options[0];
      if (first) next[category.id ?? category.name] = (first.id ?? first.label);
    }
    return next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const [selectionByCategory, setSelectionByCategory] = useState<Record<string, string>>(initialSelection);

  const estimate = useMemo(() => {
    const optionTotal = categories.reduce((sum, category) => {
      const catKey = category.id ?? category.name;
      const chosenOptionId = selectionByCategory[catKey];
      const opt = getOptionById(category, chosenOptionId);
      return sum + (opt?.price ?? 0);
    }, 0);

    return Math.round((basePrice || 0) + optionTotal);
  }, [basePrice, categories, selectionByCategory]);

  // If basePrice is 0 (parsing failed), we still show estimate as option total.
  const effectiveBase = basePrice || 0;

  return (
    <section className="customization-card" aria-label="Laptop customization and price estimate">
      <div className="customization-head">
        <h3>PC & laptop customization</h3>
        <p>Choose one option per category. We specialize in PC customization too, and you will always get the best price for your selected build.</p>
      </div>

      <div className="customization-grid">
        {categories.map((category) => {
          const catKey = category.id ?? category.name;
          const chosenOptionId = selectionByCategory[catKey] ?? '';

          return (
            <label className="customization-field" key={catKey}>
              <span className="customization-label">{category.name}</span>
              <select
                className="customization-select"
                value={chosenOptionId}
                onChange={(e) => {
                  const next = { ...selectionByCategory, [catKey]: e.target.value };
                  setSelectionByCategory(next);
                }}
              >
                {category.options.map((option: LaptopCustomizationOption) => {
                  const optionId = option.id ?? option.label;
                  return (
                    <option key={optionId} value={optionId}>
                      {option.label} ({formatINR(option.price)})
                    </option>
                  );
                })}
              </select>
            </label>
          );
        })}
      </div>

      <div className="estimate-row">
        <div className="estimate-pill">
          <div className="estimate-label">Estimated Total</div>
          <div className="estimate-value">{formatINR(estimate)}</div>
        </div>

        {effectiveBase > 0 && (
          <div className="estimate-sub">
            Base price from your selected model + chosen upgrades
          </div>
        )}
      </div>
    </section>
  );
}

// Re-export parse helper (useful later if we want to move parsing here).
export const __internal = { parseBasePrice };

