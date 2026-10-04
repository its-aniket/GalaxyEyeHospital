import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type SelectOption<T extends string | number> = { value: T; label: string };

type ThemedSelectProps<T extends string | number> = {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
  disabled?: boolean;
  buttonClassName?: string;
  menuClassName?: string;
  /** Use for controls inside a scrolling container so the menu is never clipped. */
  portal?: boolean;
};

export default function ThemedSelect<T extends string | number>({
  value, options, onChange, ariaLabel, disabled = false, buttonClassName = '', menuClassName = '', portal = false,
}: ThemedSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0, width: 0 });
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      const target = event.target as Node;
      if (!container.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, []);

  useEffect(() => {
    if (!open || !portal) return;
    function positionMenu() {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect) return;
      const estimatedMenuHeight = Math.min(options.length * 44 + 12, 256);
      const opensUpward = window.innerHeight - rect.bottom < estimatedMenuHeight && rect.top > estimatedMenuHeight;
      setMenuPosition({ left: rect.left, top: opensUpward ? rect.top - estimatedMenuHeight - 8 : rect.bottom + 8, width: rect.width });
    }
    positionMenu();
    window.addEventListener('resize', positionMenu);
    window.addEventListener('scroll', positionMenu, true);
    return () => { window.removeEventListener('resize', positionMenu); window.removeEventListener('scroll', positionMenu, true); };
  }, [open, portal, options.length]);

  function select(option: SelectOption<T>) {
    onChange(option.value);
    setOpen(false);
  }

  function moveFocus(direction: 1 | -1) {
    const current = options.findIndex((option) => option.value === value);
    const next = (current + direction + options.length) % options.length;
    onChange(options[next].value);
    optionRefs.current[next]?.focus();
  }

  return (
    <div ref={container} className="relative">
      <button
        ref={trigger}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); }
        }}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-[hsl(var(--primary))] shadow-sm transition-all hover:border-[hsl(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/35 disabled:cursor-not-allowed disabled:opacity-60 ${buttonClassName}`}
      >
        <span className="truncate">{selected?.label}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 text-[hsl(var(--accent))] transition-transform ${open ? 'rotate-180' : ''}`} fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" /></svg>
      </button>
      {open && (portal ? createPortal(<div ref={menu} id={listId} role="listbox" aria-label={ariaLabel} style={{ left: menuPosition.left, top: menuPosition.top, width: menuPosition.width }} className={`fixed z-50 max-h-64 overflow-auto rounded-xl border border-teal-100 bg-white p-1.5 shadow-xl shadow-slate-900/10 ${menuClassName}`}>
        {options.map((option, index) => <button
          key={String(option.value)}
          ref={(element) => { optionRefs.current[index] = element; }}
          type="button"
          role="option"
          aria-selected={option.value === value}
          onClick={() => select(option)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') { setOpen(false); return; }
            if (event.key === 'ArrowDown') { event.preventDefault(); moveFocus(1); }
            if (event.key === 'ArrowUp') { event.preventDefault(); moveFocus(-1); }
          }}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${option.value === value ? 'bg-[hsl(var(--primary))] text-white' : 'text-slate-700 hover:bg-teal-50 hover:text-[hsl(var(--primary))]'}`}
        >
          <span>{option.label}</span>
          {option.value === value && <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" /></svg>}
        </button>)}</div>, document.body) : <div ref={menu} id={listId} role="listbox" aria-label={ariaLabel} className={`absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-teal-100 bg-white p-1.5 shadow-xl shadow-slate-900/10 ${menuClassName}`}>
        {options.map((option, index) => <button
          key={String(option.value)}
          ref={(element) => { optionRefs.current[index] = element; }}
          type="button"
          role="option"
          aria-selected={option.value === value}
          onClick={() => select(option)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') { setOpen(false); return; }
            if (event.key === 'ArrowDown') { event.preventDefault(); moveFocus(1); }
            if (event.key === 'ArrowUp') { event.preventDefault(); moveFocus(-1); }
          }}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${option.value === value ? 'bg-[hsl(var(--primary))] text-white' : 'text-slate-700 hover:bg-teal-50 hover:text-[hsl(var(--primary))]'}`}
        >
          <span>{option.label}</span>
          {option.value === value && <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" /></svg>}
        </button>)}</div>)}
    </div>
  );
}
