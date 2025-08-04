import React, { useState, useEffect, useRef, useMemo } from 'react';

/* ── easily change colours here ───────────────────────────── */
const TOOLTIP_BG   = 'bg-white';
const TOOLTIP_TEXT = 'text-sky-500';
const HOLIDAY_BG   = 'bg-orange-300';
const HOLIDAY_TEXT = 'text-orange-900';
/* ─────────────────────────────────────────────────────────── */

export const AttendanceCalendar = ({
  calendarData       = [],
  onMonthYearChange,
  disableFutureDates = true,
  holidaysEndpoint   = '/api/holidays'
}) => {
  /* ── basic date helpers ─────────────────────────────────── */
  const today = new Date();
  const [selectedYear,  setSelectedYear ] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedDate,  setSelectedDate ] = useState(null);
  const [showSidebar,   setShowSidebar ]  = useState(false);

  const daysInMonth   = (y,m) => new Date(y, m, 0).getDate();
  const firstWeekDay  = (y,m) => new Date(y, m - 1, 1).getDay();
  const dayCount      = daysInMonth(selectedYear, selectedMonth);
  const firstDay      = firstWeekDay(selectedYear, selectedMonth);
  const calendarDays  = Array(firstDay).fill(null)
                        .concat([...Array(dayCount).keys()].map(i => i + 1));

  /* ── pull holidays from backend ─────────────────────────── */
  const [holidays,setHolidays] = useState([]);
  useEffect(() => {
    (async () => {
      try { setHolidays(await (await fetch(holidaysEndpoint)).json()); }
      catch (e) { console.error('Holiday fetch failed', e); }
    })();
  }, [holidaysEndpoint]);

  const toISO = d => {
    const [dd, mm, yy] = d.split('-');
    const yyyy = +yy < 50 ? `20${yy}` : `19${yy}`;
    return `${yyyy}-${mm.padStart(2,'0')}-${dd.padStart(2,'0')}`;
  };

  const holidayMap = useMemo(() => {
    const m=new Map();
    holidays.forEach(h=>m.set(toISO(h.date),h));
    return m;
  }, [holidays]);

  /* ── tooltip state ──────────────────────────────────────── */
  const [tip,setTip]=useState({show:false,msg:'',x:0,y:0});
  const showTip=(e,msg)=>{
    const r=e.target.getBoundingClientRect();
    setTip({show:true,msg,x:r.left+r.width/2,y:r.top});
  };
  const hideTip=()=>setTip(s=>({...s,show:false}));

  /* ── outside-click for sidebar ──────────────────────────── */
  const sbRef=useRef();
  useEffect(()=>{
    const h=e=>{ if(sbRef.current&&!sbRef.current.contains(e.target)) setShowSidebar(false); };
    if(showSidebar) document.addEventListener('mousedown',h);
    return ()=>document.removeEventListener('mousedown',h);
  },[showSidebar]);

  /* ── helpers ────────────────────────────────────────────── */
  const isFuture=d=>{
    if(!disableFutureDates||!d) return false;
    return new Date(selectedYear,selectedMonth-1,d) >
           new Date(today.getFullYear(),today.getMonth(),today.getDate());
  };
  const isToday=d=> d===today.getDate() &&
                     selectedMonth===today.getMonth()+1 &&
                     selectedYear===today.getFullYear();
  const isSelected=d=> selectedDate &&
                      selectedDate.year===selectedYear &&
                      selectedDate.month===selectedMonth &&
                      selectedDate.day===d;

  const months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
                'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

  const fmtTip = (reason, group) =>
    `${reason[0].toUpperCase()+reason.slice(1)} : applicable to ${group}`;

  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className="relative w-full h-full flex flex-col border-2 rounded-lg bg-white">

      {/* tooltip */}
      {tip.show && (
        <div className={`fixed z-50 px-2 py-1 rounded shadow ${TOOLTIP_BG} ${TOOLTIP_TEXT} text-xs`}
             style={{left:tip.x,top:tip.y-10,transform:'translate(-50%,-100%)'}}>
          {tip.msg}
        </div>
      )}

      {/* sidebar */}
      <div ref={sbRef}
           className={`absolute inset-y-0 left-0 w-60 bg-white shadow-lg p-4 z-30 transform duration-300
                      ${showSidebar?'translate-x-0':'-translate-x-full'}`}>
        <div className="flex justify-between mb-4">
          <button onClick={()=>setSelectedYear(y=>y-1)}>&lt;</button>
          <span>{selectedYear}</span>
          <button onClick={()=>setSelectedYear(y=>y+1)}>&gt;</button>
        </div>
        <div className="grid gap-2 overflow-y-auto">
          {months.map((m,i)=>(
            <button key={m}
                    onClick={()=>{
                      setSelectedMonth(i+1);
                      onMonthYearChange?.(selectedYear,i+1);
                      setShowSidebar(false);
                    }}
                    className={`px-3 py-1 rounded text-left text-sm
                               ${i+1===selectedMonth?'bg-blue-500 text-white':'hover:bg-gray-100'}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* header */}
      <div className="relative p-3 flex items-center">
        <button onClick={()=>setShowSidebar(!showSidebar)}
                className="flex flex-col gap-0.5">
          <span className="w-4 h-0.5 bg-gray-700"></span>
          <span className="w-4 h-0.5 bg-gray-700"></span>
          <span className="w-4 h-0.5 bg-gray-700"></span>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 font-bold">
          {months[selectedMonth-1]} {selectedYear}
        </div>
      </div>

      {/* calendar */}
      <div className="flex-1 px-2 pb-2 flex flex-col gap-1">
        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-600">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>(
            <div key={d} className="h-6 flex items-center justify-center">{d}</div>
          ))}
        </div>

        <div className="flex-1 grid grid-rows-6 gap-1">
          {Array.from({length:6},(_,w)=>(
            <div key={w} className="grid grid-cols-7 gap-1">
              {Array.from({length:7},(_,c)=>{
                const d=calendarDays[w*7+c];
                const dateKey=d?`${selectedYear}-${String(selectedMonth).padStart(2,'0')}-${String(d).padStart(2,'0')}`:'';
                const att=calendarData.find(r=>r.date===dateKey);
                const status=att?.status;
                const holObj=d?
                  holidayMap.get(dateKey) || (c===0 ? {reason:'sunday',applicableTo:'all'} : null)
                  : null;

                let txt='text-gray-700', bg='hover:bg-gray-100';
                if(!d||isFuture(d)){ txt='text-gray-400 pointer-events-none'; bg=''; }
                else if(isSelected(d)){ txt='text-white'; bg='bg-blue-500'; }
                else if(status==='present'){ txt='text-green-700'; bg='bg-green-100'; }
                else if(status==='absent'){ txt='text-red-700';   bg='bg-red-100'; }
                else if(status==='remote'){ txt='text-blue-700';  bg='bg-blue-100'; }
                else if(holObj){ txt=`${HOLIDAY_TEXT} font-semibold`; bg=HOLIDAY_BG; }
                else if(isToday(d)){ txt='text-blue-600'; bg='border border-blue-500'; }

                return (
                  <div key={c} className="flex items-center justify-center h-8 w-8 mx-auto">
                    {d&&(
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs cursor-pointer ${bg} ${txt}`}
                           onClick={()=>!isFuture(d)&&setSelectedDate({year:selectedYear,month:selectedMonth,day:d})}
                           onMouseEnter={holObj ? (e)=>showTip(e, fmtTip(holObj.reason, holObj.applicableTo)) : undefined}
                           onMouseLeave={hideTip}>
                        {d}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 text-xs mt-2">
          <LegendDot color="bg-green-100" text="Present"/>
          <LegendDot color="bg-red-100"   text="Absent"/>
          <LegendDot color="bg-blue-100"  text="Remote"/>
          <LegendDot color={HOLIDAY_BG}   text="Holiday"/>
        </div>
      </div>
    </div>
  );
};

const LegendDot = ({color,text})=>(
  <div className="flex items-center gap-1">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    <span>{text}</span>
  </div>
);
