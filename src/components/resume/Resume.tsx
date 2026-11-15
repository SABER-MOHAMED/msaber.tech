'use client';
import './resume.css';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';

interface YearMonth {
  year: number;
  month: number; // 1-12
}

interface Job {
  id: string;
  label: string;
  title: string;
  type: string;
  company: {
    name: string;
    link: string;
  };
  location: string;
  start: YearMonth;
  end: YearMonth; // inclusive
  color: string;
  details: string[];
}

const experience: Job[] = [
  {
    id: 'yutapp',
    label: 'Yutapp',
    title: 'Systems Engineer',
    type: 'Full-time',
    company: {
      name: 'Yutapp',
      link: 'https://yutapp.com/',
    },
    location: 'Arlington, USA (Remote)',
    start: { year: 2023, month: 2 },
    end: { year: 2025, month: 2 },
    color: '#10b981',
    details: [
      'Reverse-engineered Figma’s undocumented binary .fig format at the byte level: magic header, little-endian length-prefixed chunks compressed with DEFLATE or Zstandard, a binary schema, and float32 vector geometry.',
      'Built a converter from the decoded nodes to our page templates, which the team used to build templates faster. Open-sourced the study and converter on GitHub.',
      'Co-designed the backend and the data path for a multi-tenant platform for content creators, launched on Product Hunt.',
      'Deployed the platform on Linux virtual machines (AWS EC2), working over SSH with shell scripts to set up and update services on remote hosts.',
    ],
  },
  {
    id: 'fandasoft',
    label: 'FandaSoft',
    title: 'AI Systems Engineer',
    type: 'Contract',
    company: {
      name: 'FandaSoft',
      link: 'https://www.linkedin.com/company/fandasoft',
    },
    location: 'Marrakech, Morocco',
    start: { year: 2025, month: 7 },
    end: { year: 2025, month: 9 },
    color: '#ef4444',
    details: [
      'Built a few-shot LLM pipeline on AWS Bedrock that generates a domain-specific language (DSL and JSON schema).',
      'Benchmarked Claude and Llama models on latency and output quality. Llama 3.1 70B was 1.8× faster, but 7% of its outputs were invalid JSON, so we shipped Claude and kept Llama as a backup.',
    ],
  },
  {
    id: 'utwente',
    label: 'CAES · UTwente',
    title: 'Master’s Thesis: Hardware-Software Co-Design',
    type: 'Research',
    company: {
      name: 'CAES Research Group, University of Twente',
      link: 'https://www.utwente.nl/en/eemcs/caes/',
    },
    location: 'Enschede, Netherlands',
    start: { year: 2026, month: 2 },
    end: { year: 2026, month: 8 },
    color: '#0ea5e9',
    details: [
      'Mapped a DeiT-Tiny vision-transformer block onto SparkRV, a multi-core RISC-V neuromorphic processor with 256 KiB of local SRAM per core: the first mapping of an attention mechanism onto SparkRV.',
      'Built a C reference of the PyTorch block and checked every sub-operation to a tolerance of 10⁻⁶, including the on-core approximations of softmax and GELU.',
      'Profiled compute against data movement: on one core the first fully connected layer was ~82% of the block’s runtime, while attention was under 1% of compute but ~64% of on-chip network traffic.',
      'Rewrote the C/C++ kernels so softmax and GELU reuse their buffers in place, reducing runtime memory by 29%.',
      'Scaled asymmetrically by putting extra cores on the heavy fully connected layer: 14.73× single-core throughput at 43 cores with energy per token unchanged (~2.50 mJ/token), versus 9.81× for a balanced 31-core split.',
    ],
  },
];

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Each preset's scale makes its tick interval the labelled one.
const ZOOM_PRESETS = [
  { label: '1M', pxPerMonth: 160 },
  { label: '3M', pxPerMonth: 64 },
  { label: '6M', pxPerMonth: 32 },
  { label: '1Y', pxPerMonth: 16 },
];
const MAX_PX_PER_MONTH = 240;
const ZOOM_STEP = 1.5;
const WHEEL_ZOOM_SENSITIVITY = 0.003;
const DRAG_THRESHOLD = 4;
const SIDE_PADDING = 16;
const AXIS_HEIGHT = 34;
const LANES_TOP_GAP = 8;
const LANE_HEIGHT = 32;
const BAR_HEIGHT = 20;
const TRACK_BOTTOM_PADDING = 22;
// Geist Mono glyphs are 0.6em wide; labels render at 11px.
const LABEL_CHAR_WIDTH = 6.6;
const LABEL_INSET = 16;

const toMonthIndex = ({ year, month }: YearMonth) => year * 12 + month - 1;

const formatYearMonth = ({ year, month }: YearMonth) =>
  `${MONTH_NAMES[month - 1]} ${year}`;

function formatDuration(job: Job) {
  const months = toMonthIndex(job.end) - toMonthIndex(job.start) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest > 0) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
}

function tickInterval(pxPerMonth: number) {
  if (pxPerMonth >= 120) return 1;
  if (pxPerMonth >= 48) return 3;
  if (pxPerMonth >= 24) return 6;
  return 12;
}

const sortedExperience = [...experience].sort(
  (a, b) => toMonthIndex(a.start) - toMonthIndex(b.start)
);
const latestJob = sortedExperience[sortedExperience.length - 1];

export default function Resume() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pxRef = useRef(ZOOM_PRESETS[3].pxPerMonth);
  const pendingScrollRef = useRef<number | null>(null);
  const hasScrolledToLatest = useRef(false);
  const dragRef = useRef<{
    startX: number;
    startScroll: number;
    active: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const [viewportWidth, setViewportWidth] = useState(0);
  const [pxPerMonth, setPxPerMonth] = useState(ZOOM_PRESETS[3].pxPerMonth);
  const [selectedId, setSelectedId] = useState(latestJob.id);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => setNow(new Date()), []);

  const rangeStart = toMonthIndex({
    year: sortedExperience[0].start.year,
    month: 1,
  });
  const lastYear = Math.max(
    ...experience.map((job) => job.end.year),
    now?.getFullYear() ?? 0
  );
  const rangeEnd = (lastYear + 1) * 12;
  const totalMonths = rangeEnd - rangeStart;

  const minPx =
    viewportWidth > 0 ? (viewportWidth - SIDE_PADDING * 2) / totalMonths : 0;
  const clampPx = useCallback(
    (px: number) => Math.min(MAX_PX_PER_MONTH, Math.max(minPx, px)),
    [minPx]
  );
  const scale = clampPx(pxPerMonth);
  const trackWidth = totalMonths * scale + SIDE_PADDING * 2;
  const trackHeight =
    AXIS_HEIGHT +
    LANES_TOP_GAP +
    sortedExperience.length * LANE_HEIGHT +
    TRACK_BOTTOM_PADDING;

  const xForMonth = (monthsFromStart: number) =>
    SIDE_PADDING + monthsFromStart * scale;

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setViewportWidth(entry.contentRect.width)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    pxRef.current = scale;
    const el = viewportRef.current;
    if (!el) return;
    if (pendingScrollRef.current !== null) {
      el.scrollLeft = pendingScrollRef.current;
      pendingScrollRef.current = null;
    } else if (!hasScrolledToLatest.current && viewportWidth > 0) {
      el.scrollLeft = el.scrollWidth;
      hasScrolledToLatest.current = true;
    }
  }, [scale, viewportWidth]);

  const zoomTo = useCallback(
    (targetPx: number, anchorX?: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const next = clampPx(targetPx);
      const current = pxRef.current;
      if (next === current) return;
      const x = anchorX ?? el.clientWidth / 2;
      const scrollLeft = pendingScrollRef.current ?? el.scrollLeft;
      const monthAtAnchor = (scrollLeft + x - SIDE_PADDING) / current;
      pendingScrollRef.current = monthAtAnchor * next + SIDE_PADDING - x;
      pxRef.current = next;
      setPxPerMonth(next);
    },
    [clampPx]
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      zoomTo(
        pxRef.current * Math.exp(-event.deltaY * WHEEL_ZOOM_SENSITIVITY),
        event.clientX - rect.left
      );
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomTo]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClickRef.current = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragRef.current = {
      startX: event.clientX,
      startScroll: event.currentTarget.scrollLeft,
      active: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    if (!drag.active) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      drag.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }
    event.currentTarget.scrollLeft = drag.startScroll - dx;
  };

  const endDrag = () => {
    if (dragRef.current?.active) {
      suppressClickRef.current = true;
      setIsDragging(false);
    }
    dragRef.current = null;
  };

  const ticks = useMemo(() => {
    const interval = tickInterval(scale);
    return Array.from({ length: totalMonths }, (_, i) => {
      const month = (rangeStart + i) % 12;
      const year = Math.floor((rangeStart + i) / 12);
      return {
        key: rangeStart + i,
        offset: i,
        isYear: month === 0,
        labelled: month % interval === 0,
        text: month === 0 ? `${year}` : MONTH_NAMES[month],
      };
    });
  }, [scale, totalMonths, rangeStart]);

  const todayOffset = now
    ? toMonthIndex({ year: now.getFullYear(), month: now.getMonth() + 1 }) -
      rangeStart +
      (now.getDate() - 1) /
        new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    : null;

  const activePreset = [...ZOOM_PRESETS]
    .reverse()
    .find((preset) => Math.abs(clampPx(preset.pxPerMonth) - scale) < 0.01);
  const selectedJob =
    experience.find((job) => job.id === selectedId) ?? latestJob;

  return (
    <section aria-label="Resume" className="resume" id="resume">
      <h2 className="resume-title">Experience</h2>

      <div className="exp-timeline">
        <div className="exp-toolbar">
          <span className="exp-toolbar-label">Zoom</span>
          <div className="exp-zoom" role="group" aria-label="Timeline zoom">
            <button
              type="button"
              className="exp-zoom-btn"
              onClick={() => zoomTo(scale / ZOOM_STEP)}
              disabled={scale <= minPx + 0.01}
              aria-label="Zoom out"
            >
              <FiZoomOut />
            </button>
            {ZOOM_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={`exp-zoom-btn${
                  activePreset === preset ? ' active' : ''
                }`}
                onClick={() => zoomTo(preset.pxPerMonth)}
                aria-pressed={activePreset === preset}
              >
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              className="exp-zoom-btn"
              onClick={() => zoomTo(scale * ZOOM_STEP)}
              disabled={scale >= MAX_PX_PER_MONTH - 0.01}
              aria-label="Zoom in"
            >
              <FiZoomIn />
            </button>
          </div>
          <span className="exp-hint">
            Ctrl or ⌘ + scroll to zoom · drag to pan · click a bar for details
          </span>
        </div>

        <div
          ref={viewportRef}
          className={`exp-viewport${isDragging ? ' dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onScroll={(event) => setScrollLeft(event.currentTarget.scrollLeft)}
          onClickCapture={(event) => {
            if (suppressClickRef.current) {
              suppressClickRef.current = false;
              event.stopPropagation();
            }
          }}
        >
          <div
            className="exp-track"
            style={{ width: trackWidth, height: trackHeight }}
          >
            <div className="exp-axis" style={{ height: AXIS_HEIGHT }} />

            {ticks.map((tick) => (
              <div
                key={tick.key}
                className={`exp-gridline${tick.isYear ? ' year' : ''}${
                  tick.labelled ? ' labelled' : ''
                }`}
                style={{ left: xForMonth(tick.offset) }}
              >
                {tick.labelled && (
                  <span
                    className={`exp-tick-label${tick.isYear ? ' year' : ''}`}
                  >
                    {tick.text}
                  </span>
                )}
              </div>
            ))}

            {todayOffset !== null && (
              <div
                className="exp-today"
                style={{ left: xForMonth(todayOffset), top: AXIS_HEIGHT }}
              >
                <span className="exp-today-label">Now</span>
              </div>
            )}

            {sortedExperience.map((job, lane) => {
              const startOffset = toMonthIndex(job.start) - rangeStart;
              const months = toMonthIndex(job.end) - toMonthIndex(job.start) + 1;
              const left = xForMonth(startOffset);
              const width = months * scale;
              const labelWidth = job.label.length * LABEL_CHAR_WIDTH;
              const labelFits = width >= labelWidth + LABEL_INSET * 2;
              const labelLeft = Math.min(
                Math.max(LABEL_INSET / 2, scrollLeft - left + LABEL_INSET / 2),
                width - labelWidth - LABEL_INSET / 2
              );
              const isSelected = job.id === selectedJob.id;

              return (
                <button
                  key={job.id}
                  type="button"
                  className={`exp-bar${isSelected ? ' selected' : ''}`}
                  style={
                    {
                      left,
                      width,
                      height: BAR_HEIGHT,
                      top:
                        AXIS_HEIGHT +
                        LANES_TOP_GAP +
                        lane * LANE_HEIGHT +
                        (LANE_HEIGHT - BAR_HEIGHT) / 2,
                      '--job-color': job.color,
                    } as CSSProperties
                  }
                  onClick={() => setSelectedId(job.id)}
                  aria-pressed={isSelected}
                  aria-label={`${job.title} at ${job.company.name}, ${formatYearMonth(
                    job.start
                  )} to ${formatYearMonth(job.end)}`}
                >
                  <span
                    className={`exp-bar-label ${
                      labelFits ? 'inside' : 'outside'
                    }`}
                    style={labelFits ? { left: labelLeft } : undefined}
                  >
                    {job.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <article
        className="exp-details"
        style={{ '--job-color': selectedJob.color } as CSSProperties}
        aria-live="polite"
      >
        <header className="exp-details-header">
          <div>
            <h3 className="exp-details-title">{selectedJob.title}</h3>
            <p className="exp-details-company">
              <a
                href={selectedJob.company.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedJob.company.name}
              </a>
              <span className="exp-details-location">
                {' '}
                · {selectedJob.location}
              </span>
            </p>
          </div>
          <div className="exp-details-meta">
            <span className="exp-details-type">{selectedJob.type}</span>
            <span className="exp-details-dates">
              {formatYearMonth(selectedJob.start)} –{' '}
              {formatYearMonth(selectedJob.end)} · {formatDuration(selectedJob)}
            </span>
          </div>
        </header>
        <ul className="exp-details-list">
          {selectedJob.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
