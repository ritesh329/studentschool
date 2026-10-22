// Components/StuAttendance/Attendance.jsx
import React, { useMemo, useState } from 'react';

const DAY_LABELS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Builds a Sun–Sat calendar grid for a given month, marking each day's status.
// attendanceRecords: optional map of 'YYYY-MM-DD' -> 'present' | 'absent' | 'leave' | 'holiday'
function buildMonthGrid(year, monthIndex, attendanceRecords = {}) {
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startWeekday = firstDay.getDay(); // 0 = Sun

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, monthIndex, d);
    const key = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
    const status = attendanceRecords[key] || (isWeekend ? 'weekend' : 'none');
    cells.push({ day: d, status });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const STATUS_STYLES = {
  present: { bg: '#2F9E5B', dot: '#2F9E5B', text: '#FFFFFF' },
  absent: { bg: '#D2483B', dot: '#D2483B', text: '#FFFFFF' },
  leave: { bg: '#2F7FD8', dot: '#2F7FD8', text: '#FFFFFF' },
  holiday: { bg: '#7C5CD4', dot: '#7C5CD4', text: '#FFFFFF' },
  none: { bg: '#FFF4DC', dot: '#E3B04B', text: '#8A6A1F' },
  weekend: { bg: '#F5F4F1', dot: '#B8B2A6', text: '#8A8377' },
};

// Same depth on both the right-hand arrow tip and the left-hand notch, so
// every tab — first one included — renders as an identical, evenly spaced shape.
const CHEVRON_DEPTH = 14;

function chevronClip(isFirst) {
  return isFirst
    ? `polygon(0 0, calc(100% - ${CHEVRON_DEPTH}px) 0, 100% 50%, calc(100% - ${CHEVRON_DEPTH}px) 100%, 0 100%)`
    : `polygon(0 0, calc(100% - ${CHEVRON_DEPTH}px) 0, 100% 50%, calc(100% - ${CHEVRON_DEPTH}px) 100%, 0 100%, ${CHEVRON_DEPTH}px 50%)`;
}

const Attendance = ({ studentData }) => {
  const today = new Date();
  const [monthIndex, setMonthIndex] = useState(today.getMonth());
  const year = studentData?.year || today.getFullYear();

  const attendanceRecords = studentData?.attendanceRecords || {};

  const presentDays = studentData?.presentDays ?? Math.round((studentData?.attendance || 0) * 1.2);
  const totalDays = studentData?.totalDays ?? 120;
  const absentDays = studentData?.absentDays ?? Math.max(totalDays - presentDays, 0);
  const overallPct = studentData?.attendance ?? Math.round((presentDays / totalDays) * 100);

  const weeks = useMemo(
    () => buildMonthGrid(year, monthIndex, attendanceRecords),
    [year, monthIndex, attendanceRecords]
  );

  // Circle Math Calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPct / 100) * circumference;

  return (
    <div style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", color: '#2B2A28', maxWidth: 760, margin: '0 auto' }}>

      {/* Overview */}
      <div style={{
        border: '2px solid #1F3A5F',
        borderRadius: 20,
        padding: '10px 9px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        background: '#ddf3ff',
      }}>
        {/* Changed ONLY this circle part */}
        <div style={{ position: 'relative', width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="110" height="110" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#EAEFEF"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#2F9E5B"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#5A5750' }}>Overall</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Attendance</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1F3A5F', marginTop: 2 }}>{overallPct}%</div>
          </div>
        </div>

        
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  width: '100%',
  maxWidth: 580,
  background: '#FFFFFF',
  borderRadius: 12,
  padding: '5px 0',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  border: '1px solid #EAEFEF',
}}>
  {/* Present Days */}
  <div style={{ textAlign: 'center', borderRight: '1px solid #880cda', padding: '2px 4px' }}>
    <div style={{ fontSize: 13, color: '#4B5563', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
      <span style={{ 
        width: 16, height: 16, borderRadius: '50%', background: '#2F9E5B', color: '#FFF', 
        fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' 
      }}>✓</span>
      Present Days
    </div>
    <div style={{ fontSize: 22, fontWeight: 700, color: '#2F9E5B', marginTop: 4 }}>
      {presentDays}
    </div>
  </div>

  {/* Absent Days */}
  <div style={{ textAlign: 'center', borderRight: '1px solid #880cda', padding: '2px 4px' }}>
    <div style={{ fontSize: 13, color: '#4B5563', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
      <span style={{ 
        width: 16, height: 16, borderRadius: '50%', background: '#D2483B', color: '#FFF', 
        fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' 
      }}>✕</span>
      Absent Days
    </div>
    <div style={{ fontSize: 22, fontWeight: 700, color: '#D2483B', marginTop: 4 }}>
      {absentDays}
    </div>
  </div>

  {/* Total Days */}
  <div style={{ textAlign: 'center', padding: '2px 4px' }}>
    <div style={{ fontSize: 13, color: '#4B5563', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
      <span style={{ fontSize: 14 }}>📅</span>
      Total Days
    </div>
    <div style={{ fontSize: 22, fontWeight: 700, color: '#1F3A5F', marginTop: 4 }}>
      {totalDays}
    </div>
  </div>
</div>
      </div>

      {/* Month tabs */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginTop: 24,
          height: 46,
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '2px 0',
          scrollbarWidth: 'none',
        }}
      >
        {MONTHS.map((m, idx) => {
          const active = idx === monthIndex;
          const isFirst = idx === 0;
          const isLast = idx === MONTHS.length - 1;

          let clipPath;

          // January = Start
          if (isFirst) {
            clipPath = `
              polygon(
                0 0,
                calc(100% - 12px) 0,
                100% 50%,
                calc(100% - 12px) 100%,
                0 100%
              )
            `;
          }

          // December = End
          else if (isLast) {
            clipPath = `
              polygon(
                0 0,
                100% 0,
                100% 100%,
                0 100%,
                13px 50%
              )
            `;
          }

          // February - November = Middle
          else {
            clipPath = `
              polygon(
                0 0,
                calc(100% - 12px) 0,
                100% 50%,
                calc(100% - 12px) 100%,
                0 100%,
                12px 50%
              )
            `;
          }

          return (
            <button
              key={m}
              onClick={() => setMonthIndex(idx)}
              style={{
                flex: '1 0 58px',
                minWidth: 58,
                height: 42,

                // Tabs connect with each other
                marginLeft: isFirst ? 0 : -10,

                zIndex: active ? 20 : idx + 1,

                clipPath,

                border: 'none',
                outline: 'none',

                background: active
                  ? 'linear-gradient(135deg, #14D9A5, #06B98A)'
                  : '#EBEDF1',

                color: active ? '#FFFFFF' : '#7A8091',

                fontSize: 12,
                fontWeight: active ? 700 : 500,
                letterSpacing: 0.2,

                cursor: 'pointer',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                padding: '0 8px',

                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {m.slice(0, 3)}
            </button>
          );
        })}
      </div>

      {/* Selected month label */}
      <div style={{ marginTop: 16, marginBottom: 8, fontSize: 18, fontWeight: 700, color: '#1F3A5F' }}>
        {MONTHS[monthIndex]} {year}
      </div>

      {/* Calendar grid */}
      <div style={{ border: '2px solid #1F3A5F', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {DAY_LABELS.map((d) => (
            <div key={d} style={{
              padding: '10px 4px',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 15,
              borderRight: '1px solid #1F3A5F',
              borderBottom: '2px solid #1F3A5F',
              background: '#F5F4F1',
            }}>
              {d}
            </div>
          ))}
        </div>

        {weeks.map((week, wIdx) => (
          <div key={wIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {week.map((cell, dIdx) => {
              const style = cell ? STATUS_STYLES[cell.status] : null;
              return (
                <div
                  key={dIdx}
                  style={{
                    minHeight: 56,
                    borderRight: dIdx < 6 ? '1px solid #D8D3C8' : 'none',
                    borderBottom: '1px solid #D8D3C8',
                    background: style ? style.bg : '#FFFFFF',
                    padding: '6px 8px',
                    position: 'relative',
                  }}
                >
                  {cell && (
                    <>
                      <span style={{ fontSize: 13, fontWeight: cell.status === 'weekend' ? 400 : 600, color: style.text }}>{cell.day}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12, fontSize: 12, color: '#5A5750' }}>
        <LegendDot color={STATUS_STYLES.present.dot} label="Present" />
        <LegendDot color={STATUS_STYLES.absent.dot} label="Absent" />
        <LegendDot color={STATUS_STYLES.leave.dot} label="Leave" />
        <LegendDot color={STATUS_STYLES.holiday.dot} label="Holiday" />
        <LegendDot color={STATUS_STYLES.weekend.dot} label="Weekend" />
        <LegendDot color={STATUS_STYLES.none.dot} label="Not marked" />
      </div>
    </div>
  );
};

const Stat = ({ label, value, color }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 13, color: '#5A5750' }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
  </div>
);

const LegendDot = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
    {label}
  </div>
);

export default Attendance;