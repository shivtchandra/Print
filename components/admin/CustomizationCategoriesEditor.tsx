'use client';

import { LaptopCustomizationCategory } from '@/lib/types/entities';

type CustomizationCategoriesEditorProps = {
  title: string;
  description: string;
  emptyHint: string;
  categories: LaptopCustomizationCategory[];
  onChange: (categories: LaptopCustomizationCategory[]) => void;
};

export function CustomizationCategoriesEditor({
  title,
  description,
  emptyHint,
  categories = [],
  onChange
}: CustomizationCategoriesEditorProps) {
  return (
    <div className="form-section mt-10">
      <div className="flex-between">
        <h3>{title}</h3>
        <button
          type="button"
          className="secondary-btn sm"
          onClick={() => {
            onChange([...categories, { name: '', options: [{ label: '', price: 0 }] }]);
          }}
        >
          + Add Category
        </button>
      </div>

      <p className="muted-text" style={{ marginTop: '0.75rem' }}>
        {description}
      </p>

      <div className="slides-container">
        {categories.map((category, catIndex) => (
          // IMPORTANT: keys must stay stable while the user types, otherwise React remounts
          // the input and cursor/focus becomes hard to use.
          <article key={category.id ?? `cat-${catIndex}`} className="admin-sub-card">
            <div className="flex-between">
              <h4>Category {catIndex + 1}</h4>
              <button
                type="button"
                className="danger-btn sm"
                onClick={() => {
                  const next = [...categories];
                  next.splice(catIndex, 1);
                  onChange(next);
                }}
              >
                Remove
              </button>
            </div>

            <div className="form-grid-inner">
              <label className="full-width">
                Category Name
                <input
                  required
                  value={category.name}
                  onChange={(e) => {
                    const nextCats = [...categories];
                    nextCats[catIndex] = { ...nextCats[catIndex], name: e.target.value };
                    onChange(nextCats);
                  }}
                />
              </label>
            </div>

            <div className="form-section mt-10">
              <div className="flex-between">
                <h3 style={{ fontSize: '1.1rem' }}>Options</h3>
                <button
                  type="button"
                  className="secondary-btn sm"
                  onClick={() => {
                    const nextCats = [...categories];
                    nextCats[catIndex] = {
                      ...nextCats[catIndex],
                      options: [...nextCats[catIndex].options, { label: '', price: 0 }]
                    };
                    onChange(nextCats);
                  }}
                >
                  + Add Option
                </button>
              </div>

              <div className="slides-container">
                {category.options.map((option, optIndex) => (
                  <article
                    key={option.id ?? `opt-${catIndex}-${optIndex}`}
                    className="admin-sub-card"
                  >
                    <div className="flex-between">
                      <h4>Option {optIndex + 1}</h4>
                      <button
                        type="button"
                        className="danger-btn sm"
                        onClick={() => {
                          const nextCats = [...categories];
                          const nextOpts = [...nextCats[catIndex].options];
                          nextOpts.splice(optIndex, 1);
                          nextCats[catIndex] = {
                            ...nextCats[catIndex],
                            options: nextOpts.length ? nextOpts : [{ label: '', price: 0 }]
                          };
                          onChange(nextCats);
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="form-grid-inner">
                      <label>
                        Option Label
                        <input
                          required
                          value={option.label}
                          onChange={(e) => {
                            const nextCats = [...categories];
                            const nextOpts = [...nextCats[catIndex].options];
                            nextOpts[optIndex] = { ...nextOpts[optIndex], label: e.target.value };
                            nextCats[catIndex] = { ...nextCats[catIndex], options: nextOpts };
                            onChange(nextCats);
                          }}
                        />
                      </label>

                      <label>
                        Price (+)
                        <input
                          required
                          type="number"
                          min={0}
                          value={option.price}
                          onChange={(e) => {
                            const nextCats = [...categories];
                            const nextOpts = [...nextCats[catIndex].options];
                            nextOpts[optIndex] = {
                              ...nextOpts[optIndex],
                              price: Number(e.target.value) || 0
                            };
                            nextCats[catIndex] = { ...nextCats[catIndex], options: nextOpts };
                            onChange(nextCats);
                          }}
                        />
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>
        ))}
        {categories.length === 0 && <p className="muted-text">{emptyHint}</p>}
      </div>
    </div>
  );
}
