import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterOptions } from '@/types';

interface FilterDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterDropdown({ options, value, onChange, className }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        type="button"
        className="glass inline-flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label || 'Sort by'}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 ml-2 transition-transform duration-300" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 glass rounded-lg shadow-xl border border-gray-200/20 animate-fadeInUp">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={cn(
                    'block w-full px-4 py-3 text-sm text-left transition-all duration-300 hover:bg-blue-500/20',
                    option.value === value
                      ? 'bg-blue-500/30 text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 