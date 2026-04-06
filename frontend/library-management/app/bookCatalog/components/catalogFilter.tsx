import React from 'react';

interface CatalogFilterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const TABS = ['All Books', 'Philosophy', 'Science', 'History', 'Art'];
const SORT_OPTIONS = ['Recently Added', 'Most Popular', 'Title (A-Z)'];

const CatalogFilter: React.FC<CatalogFilterProps> = ({
  activeTab,
  onTabChange,
  sortBy,
  onSortChange
}) => {
  return (
    <section data-aos="fade-up" data-aos-duration="300" className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
      <div className="flex flex-wrap gap-3">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={activeTab === tab
              ? "vibrant-gradient-bg text-on-primary px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:brightness-110 transition-all"
              : "bg-white border border-outline-variant text-on-surface-variant px-5 py-2 rounded-lg text-sm font-bold hover:border-primary hover:text-primary transition-all"}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 bg-white border border-outline-variant rounded-lg px-4 py-2">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Sort by</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-transparent border-none py-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer outline-none"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default CatalogFilter;
