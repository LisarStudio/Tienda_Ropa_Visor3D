import React from 'react';
import { ArrowUpDown, Sparkles } from 'lucide-react';
import './CategoryFilter.css';

export function CategoryFilter({ categories, activeCategory, onSelectCategory, sortBy, onSortChange, totalItems }) {
  return (
    <div className="brand-category-filter-bar">
      {/* Category Pills */}
      <div className="category-pills-wrap">
        {categories.map(cat => {
          const isActive = activeCategory === cat.slug || activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.slug || cat.id)}
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Sorting & Counter */}
      <div className="catalog-sort-group">
        <span className="items-counter-label">
          {totalItems} {totalItems === 1 ? 'prenda' : 'prendas'}
        </span>

        <div className="sort-select-wrapper">
          <ArrowUpDown size={14} className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select-input"
          >
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
