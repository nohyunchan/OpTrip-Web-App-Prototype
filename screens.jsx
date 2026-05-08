// OpTrip — screen components
// All screens are 402×874 (iPhone 14 Pro inside IOSDevice frame)

const { useState, useEffect, useRef } = React;

// ─── Tokens ──────────────────────────────────────────────────
const T = {
  font: '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
};

// ─── Shared bits ─────────────────────────────────────────────
// (StatusBar removed — IOSDevice provides its own status bar)
// We reserve 54px top padding in ScreenShell to clear the status bar overlay.

function ProgressBar({ value, total, accent }) {
  return (
    <div style={{
      height: 3, background: 'rgba(0,0,0,0.06)',
      margin: '0 24px', borderRadius: 99, overflow: 'hidden',
    }}>
      <div style={{
        width: `${(value / total) * 100}%`, height: '100%',
        background: accent, transition: 'width .4s cubic-bezier(.2,.8,.2,1)',
      }} />
    </div>
  );
}

function NavTop({ onBack, onSkip, accent, showBack = true, showSkip = true }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 20px 8px', height: 44, boxSizing: 'border-box',
    }}>
      {showBack ? (
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', padding: 8, marginLeft: -8,
          cursor: 'pointer', color: '#1F2A44', fontSize: 15,
          fontFamily: T.font, fontWeight: 500, whiteSpace: 'nowrap',
          display: 'inline-flex', alignItems: 'center',
        }}>
          <svg width="9" height="16" viewBox="0 0 9 16" style={{ marginRight: 6, verticalAlign: -2 }}>
            <path d="M8 1L1 8l7 7" stroke="#1F2A44" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          이전
        </button>
      ) : <div style={{ width: 60 }} />}
      {showSkip ? (
        <button onClick={onSkip} style={{
          background: 'transparent', border: 'none', padding: 8, marginRight: -8,
          cursor: 'pointer', color: '#9CA3AF', fontSize: 14,
          fontFamily: T.font, fontWeight: 500, textDecoration: 'underline',
          textUnderlineOffset: 3, whiteSpace: 'nowrap',
        }}>건너뛰기</button>
      ) : <div style={{ width: 60 }} />}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, accent, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', height: 56, borderRadius: 14,
      background: disabled ? '#E5E5E0' : accent,
      color: disabled ? '#9CA3AF' : '#fff',
      border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: T.font, fontSize: 17, fontWeight: 600,
      letterSpacing: -0.3,
      transition: 'transform .1s, opacity .15s',
      ...style,
    }}
    onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      {children}
    </button>
  );
}

function ScreenShell({ children, bg = '#FFFFFF' }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      fontFamily: T.font, color: '#1F2A44',
      position: 'relative', overflow: 'hidden',
      paddingTop: 54,
      boxSizing: 'border-box',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {children}
    </div>
  );
}

// ─── 0. Welcome 1 ─────────────────────────────────────────────
function ScreenWelcome1({ go, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        padding: '24px 24px 48px', boxSizing: 'border-box' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{
            width: 110, height: 110, borderRadius: 28, background: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28, boxShadow: `0 12px 40px ${accent}45`,
          }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.6, marginBottom: 10, wordBreak: 'keep-all' }}>
            환영합니다
          </div>
          <div style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 1.5,
            maxWidth: 280 }}>
            예산과 취향에 꼭 맞는 국내 여행지를<br/>찾아드릴게요
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <PrimaryButton accent={accent} onClick={go}>시작하기</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── 1. Welcome 2 ─────────────────────────────────────────────
function ScreenWelcome2({ go, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} accent={accent} showSkip={false} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
          <div style={{
            fontSize: 34, fontWeight: 800, letterSpacing: -0.8, color: accent,
            marginBottom: 4, lineHeight: 1,
          }}>
            {window.OpTripLogo ? (
              <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 4 }}>
                <window.OpTripLogo height={42} color="#1F2A44" pinColor={accent} />
                <span style={{ color: '#1F2A44', fontSize: 34, fontWeight: 800 }}>은</span>
              </span>
            ) : <span>OpTrip<span style={{ color: '#1F2A44' }}>은</span></span>}
          </div>
          <div style={{
            fontSize: 26, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.35, marginTop: 18,
          }}>
            사용자 맞춤형<br/>여행지 추천 서비스예요
          </div>
          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: i === 1 ? 24 : 8, height: 8, borderRadius: 99,
                background: i === 1 ? accent : 'rgba(0,0,0,0.12)',
                transition: 'all .3s',
              }} />
            ))}
          </div>
        </div>
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go}>다음</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── 2. Welcome 3 ─────────────────────────────────────────────
function ScreenWelcome3({ go, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} accent={accent} showSkip={false} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
          <div style={{
            fontSize: 26, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.4,
          }}>
            더 정교한 추천을 위해<br/>회원님의 정보가 필요해요
          </div>
          <div style={{ fontSize: 14, color: '#9CA3AF', marginTop: 16, lineHeight: 1.6 }}>
            입력하신 정보는 추천에만 사용되며<br/>외부에 공유되지 않아요
          </div>
          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: i === 2 ? 24 : 8, height: 8, borderRadius: 99,
                background: i === 2 ? accent : 'rgba(0,0,0,0.12)',
              }} />
            ))}
          </div>
        </div>
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go}>시작하기</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── 3-6. Onboarding (signup) screens ─────────────────────────
function StepHeader({ step, total, title, accent }) {
  return (
    <>
      <ProgressBar value={step} total={total} accent={accent} />
      <div style={{ padding: '28px 24px 8px', fontSize: 24, fontWeight: 700,
        letterSpacing: -0.5, lineHeight: 1.3 }}>{title}</div>
    </>
  );
}

function ScreenName({ value, set, go, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} accent={accent} showSkip={false} />
        <StepHeader step={1} total={4} title="이름을 입력해 주세요" accent={accent} />
        <div style={{ padding: '24px 24px 0', flex: 1 }}>
          <input
            autoFocus
            value={value}
            onChange={e => set(e.target.value)}
            placeholder="이름"
            style={{
              width: '100%', border: 'none', borderBottom: `1.5px solid ${value ? accent : '#E5E5E0'}`,
              background: 'transparent', fontSize: 22, fontWeight: 500, padding: '12px 0',
              outline: 'none', fontFamily: T.font, color: '#1F2A44', letterSpacing: -0.3,
              transition: 'border-color .2s', boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go} disabled={!value.trim()}>다음</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

function ChoiceGrid({ options, value, onChange, cols = 2 }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 10, padding: '0 24px',
    }}>
      {options.map(opt => {
        const sel = value === opt;
        return (
          <button key={opt} onClick={() => onChange(opt)} style={{
            height: 64, borderRadius: 14, border: 'none',
            background: sel ? '#1F2A44' : '#F2F0EA',
            color: sel ? '#fff' : '#1F2A44',
            fontFamily: T.font, fontSize: 16, fontWeight: 600,
            cursor: 'pointer', transition: 'all .15s',
            letterSpacing: -0.3,
          }}>{opt}</button>
        );
      })}
    </div>
  );
}

function ScreenGender({ value, set, go, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} accent={accent} showSkip={false} />
        <StepHeader step={2} total={4} title="성별을 선택해 주세요" accent={accent} />
        <div style={{ height: 24 }} />
        <div style={{ flex: 1 }}>
          <ChoiceGrid options={['여성', '남성']} value={value} onChange={set} />
        </div>
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go} disabled={!value}>다음</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

function ScreenBirth({ value, set, go, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} accent={accent} showSkip={false} />
        <StepHeader step={3} total={4} title="태어난 연도를 입력해 주세요" accent={accent} />
        <div style={{ padding: '24px 24px 0', flex: 1, display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <input
            autoFocus
            value={value}
            inputMode="numeric"
            maxLength={4}
            onChange={e => set(e.target.value.replace(/\D/g, ''))}
            placeholder="YYYY"
            style={{
              flex: 1, minWidth: 0, border: 'none',
              borderBottom: `1.5px solid ${value ? accent : '#E5E5E0'}`,
              background: 'transparent', fontSize: 22, fontWeight: 500, padding: '12px 0',
              outline: 'none', fontFamily: T.font, color: '#1F2A44', letterSpacing: 2,
              boxSizing: 'border-box',
            }}
          />
          <span style={{ color: '#9CA3AF', fontSize: 16 }}>년</span>
        </div>
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go} disabled={value.length !== 4}>다음</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

const JOBS = ['학생', '직장인', '프리랜서', '주부', '자영업', '기타'];
function ScreenJob({ value, set, go, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} accent={accent} showSkip={false} />
        <StepHeader step={4} total={4} title="직업을 선택해 주세요" accent={accent} />
        <div style={{ height: 24 }} />
        <div style={{ flex: 1 }}>
          <ChoiceGrid options={JOBS} value={value} onChange={set} cols={2} />
        </div>
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go} disabled={!value}>완료</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── Main / Home ──────────────────────────────────────────────
function ScreenHome({ name, go, accent, cardStyle }) {
  const card = cardStyle || 'soft';
  return (
    <ScreenShell bg="#F7F6F2">
      <div>
        <div style={{ padding: '20px 24px 8px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center' }}>
          {window.OpTripLogo ? <window.OpTripLogo height={26} color="#1F2A44" pinColor={accent} /> : <div style={{ fontSize: 22, fontWeight: 800, color: accent, letterSpacing: -0.5 }}>OpTrip</div>}
          <div style={{ width: 36, height: 36, borderRadius: 99, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#1F2A44" strokeWidth="1.8"/>
              <path d="M4 21c1-4 4-6 8-6s7 2 8 6" stroke="#1F2A44" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <div style={{ padding: '28px 24px 0' }}>
          <div style={{ fontSize: 16, color: '#6B7280', marginBottom: 4 }}>
            {name || '여행자'}님, 안녕하세요
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.7, lineHeight: 1.2 }}>
            어디로<br/>가 볼까요?
          </div>
        </div>
        {/* Hero card */}
        <div style={{ padding: '28px 24px 0' }}>
          <div style={{
            background: card === 'image' ? '#fff' : `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
            borderRadius: 20, color: card === 'image' ? '#1F2A44' : '#fff', minHeight: 180,
            boxShadow: card === 'image' ? '0 12px 28px rgba(31,42,68,0.10)' : `0 16px 36px ${accent}30`,
            position: 'relative', overflow: 'hidden',
          }}>
            {card === 'image' && window.IllusCompass ? (
              <div style={{ position: 'absolute', inset: 0 }}><window.IllusCompass accent={accent} /></div>
            ) : null}
            <div style={{ position: 'relative', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 180 }}>
              <div>
                <div style={{ fontSize: 13, opacity: card === 'image' ? 0.7 : 0.85, marginBottom: 4 }}>맞춤 추천</div>
                <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, letterSpacing: -0.4 }}>
                  몇 가지 답변으로<br/>딱 맞는 여행지를 찾아요
                </div>
              </div>
              <button onClick={go} style={{
                alignSelf: 'flex-start', marginTop: 24,
                background: card === 'image' ? accent : '#fff',
                color: card === 'image' ? '#fff' : '#1F2A44', border: 'none',
                borderRadius: 99, padding: '12px 22px',
                fontFamily: T.font, fontWeight: 700, fontSize: 14,
                cursor: 'pointer',
              }}>계획 세우기 →</button>
            </div>
          </div>
        </div>

        <div style={{ padding: '32px 24px 0', fontSize: 15, fontWeight: 600, color: '#6B7280' }}>
          이번 달 인기 여행지
        </div>
        <div style={{ padding: '12px 24px 0', display: 'flex', gap: 12, overflowX: 'auto' }}>
          {[
            { name: '제주', illus: 'jeju' },
            { name: '강릉', illus: 'gangneung' },
            { name: '경주', illus: 'gyeongju' },
          ].map(p => {
            const Illus = (window.OPTRIP_ILLUS?.REGION_ILLUS || {})[p.illus];
            return (
            <div key={p.name} style={{
              flex: '0 0 100px', borderRadius: 14, overflow: 'hidden',
              background: '#E8E6E0', height: 130, position: 'relative',
            }}>
              {Illus ? <Illus accent={accent} /> : null}
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 12,
                color: '#fff', fontWeight: 700, fontSize: 14 }}>{p.name}</div>
            </div>
            );
          })}
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── Budget ──────────────────────────────────────────────────
function ScreenBudget({ value, set, go, skip, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} onSkip={skip} accent={accent} />
        <ProgressBar value={1} total={4} accent={accent} />
        <div style={{ padding: '28px 24px 0', fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}>
          예산이 얼마인가요?
        </div>
        <div style={{ padding: '8px 24px 0', fontSize: 14, color: '#9CA3AF' }}>
          1인 기준, 만원 단위로 입력해 주세요
        </div>
        <div style={{ padding: '36px 24px 0', display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <input
            autoFocus
            value={value || ''}
            inputMode="numeric"
            onChange={e => set(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="0"
            style={{
              flex: 1, minWidth: 0, border: 'none',
              borderBottom: `1.5px solid ${value ? accent : '#E5E5E0'}`,
              background: 'transparent',
              fontSize: 32, fontWeight: 700, padding: '12px 0',
              outline: 'none', fontFamily: T.font, color: '#1F2A44', textAlign: 'right',
              boxSizing: 'border-box',
            }}
          />
          <span style={{ fontSize: 18, fontWeight: 600, color: '#1F2A44', flexShrink: 0 }}>만원</span>
        </div>
        <div style={{ padding: '20px 24px 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[20, 50, 100, 200].map(v => (
            <button key={v} onClick={() => set(String(v))} style={{
              background: '#F2F0EA', border: 'none', borderRadius: 99,
              padding: '8px 14px', fontFamily: T.font, fontSize: 13, fontWeight: 500,
              color: '#6B7280', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{v}만원</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go} disabled={!value}>다음</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── Calendar ────────────────────────────────────────────────
function ScreenCalendar({ start, end, setRange, go, skip, back, accent, noDate, setNoDate }) {
  const [month, setMonth] = useState(new Date(2026, 4, 1)); // May 2026
  const monthName = month.toLocaleDateString('en-US', { month: 'long' });
  const year = month.getFullYear();
  const firstDay = new Date(year, month.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, month.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const dateKey = d => `${year}-${month.getMonth()}-${d}`;
  const startKey = start && `${start.y}-${start.m}-${start.d}`;
  const endKey = end && `${end.y}-${end.m}-${end.d}`;

  const onPick = d => {
    if (noDate) return;
    const pick = { y: year, m: month.getMonth(), d };
    const ts = new Date(year, month.getMonth(), d).getTime();
    if (!start || (start && end)) setRange(pick, null);
    else {
      const sTs = new Date(start.y, start.m, start.d).getTime();
      if (ts < sTs) setRange(pick, null);
      else setRange(start, pick);
    }
  };

  const isInRange = d => {
    if (!start || !end) return false;
    const ts = new Date(year, month.getMonth(), d).getTime();
    const s = new Date(start.y, start.m, start.d).getTime();
    const e = new Date(end.y, end.m, end.d).getTime();
    return ts > s && ts < e;
  };

  return (
    <ScreenShell>
     <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <NavTop onBack={back} onSkip={skip} accent={accent} />
      <ProgressBar value={2} total={4} accent={accent} />
      <div style={{ padding: '28px 24px 16px', fontSize: 24, fontWeight: 700 }}>
        언제 떠나나요?
      </div>
      <div style={{ padding: '0 24px 12px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setMonth(new Date(year, month.getMonth() - 1, 1))}
          style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer' }}>
          <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke="#1F2A44" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
        <div style={{ fontSize: 17, fontWeight: 600 }}>{monthName} {year}</div>
        <button onClick={() => setMonth(new Date(year, month.getMonth() + 1, 1))}
          style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer' }}>
          <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="#1F2A44" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginBottom: 8, fontWeight: 600 }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((d, i) => {
          if (d === null) return <div key={i} style={{ height: 40 }} />;
          const k = dateKey(d);
          const isStart = k === startKey;
          const isEnd = k === endKey;
          const inRange = isInRange(d);
          const sel = isStart || isEnd;
          return (
            <button key={i} onClick={() => onPick(d)} disabled={noDate} style={{
              height: 40, border: 'none', cursor: noDate ? 'not-allowed' : 'pointer',
              background: sel ? accent : (inRange ? `${accent}25` : 'transparent'),
              color: noDate ? '#D1D5DB' : (sel ? '#fff' : '#1F2A44'),
              fontFamily: T.font, fontSize: 15, fontWeight: sel ? 700 : 500,
              borderRadius: sel ? 99 : (inRange ? 0 : 99),
              opacity: noDate ? 0.4 : 1,
            }}>{d}</button>
          );
        })}
      </div>
      <div style={{ padding: '20px 24px 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 14, color: '#6B7280', cursor: 'pointer' }}>
          <input type="checkbox" checked={noDate} onChange={e => setNoDate(e.target.checked)}
            style={{ accentColor: accent, width: 16, height: 16 }}/>
          구체적인 일정이 없어요
        </label>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: '0 24px 48px' }}>
        <PrimaryButton accent={accent} onClick={go} disabled={!noDate && !(start && end)}>다음</PrimaryButton>
      </div>
     </div>
    </ScreenShell>
  );
}

// ─── Companion ───────────────────────────────────────────────
const COMPANIONS = ['혼자', '연인', '친구', '가족', '부모님과', '아이와'];
function ScreenCompanion({ value, set, go, skip, back, accent }) {
  return (
    <ScreenShell>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NavTop onBack={back} onSkip={skip} accent={accent} />
        <ProgressBar value={3} total={4} accent={accent} />
        <div style={{ padding: '28px 24px 24px', fontSize: 24, fontWeight: 700 }}>
          누구와 가나요?
        </div>
        <div style={{ flex: 1 }}>
          <ChoiceGrid options={COMPANIONS} value={value} onChange={set} cols={2} />
        </div>
        <div style={{ padding: '0 24px 48px' }}>
          <PrimaryButton accent={accent} onClick={go} disabled={!value}>다음</PrimaryButton>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─── Purpose (multi-select) ───────────────────────────────────
const PURPOSES = ['힐링', '역사적인', '액티비티', '맛집', '유명관광지', '직접 입력'];
function ScreenPurpose({ values, set, go, skip, back, accent }) {
  const [customMode, setCustomMode] = useState(values.some(v => !PURPOSES.slice(0, 5).includes(v) && v !== '직접 입력'));
  const [customText, setCustomText] = useState(values.find(v => !PURPOSES.slice(0, 5).includes(v) && v !== '직접 입력') || '');
  const inputRef = useRef(null);

  const toggle = p => {
    if (p === '직접 입력') {
      if (customMode) {
        setCustomMode(false);
        if (customText) set(values.filter(v => v !== customText));
        setCustomText('');
      } else {
        setCustomMode(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      return;
    }
    if (values.includes(p)) set(values.filter(v => v !== p));
    else set([...values, p]);
  };

  const onCustomChange = e => {
    const v = e.target.value;
    const without = values.filter(x => x !== customText);
    setCustomText(v);
    set(v ? [...without, v] : without);
  };

  return (
    <ScreenShell>
     <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <NavTop onBack={back} onSkip={skip} accent={accent} />
      <ProgressBar value={4} total={4} accent={accent} />
      <div style={{ padding: '28px 24px 4px', fontSize: 24, fontWeight: 700 }}>
        어떤 여행을 원하나요?
      </div>
      <div style={{ padding: '0 24px 24px', fontSize: 13, color: '#9CA3AF' }}>
        중복 선택 가능
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10, padding: '0 24px' }}>
        {PURPOSES.map(p => {
          const isCustom = p === '직접 입력';
          const sel = isCustom ? customMode : values.includes(p);
          return (
            <button key={p} onClick={() => toggle(p)} style={{
              height: 64, borderRadius: 14, border: 'none',
              background: sel ? '#1F2A44' : '#F2F0EA',
              color: sel ? '#fff' : '#1F2A44',
              fontFamily: T.font, fontSize: 16, fontWeight: 600,
              cursor: 'pointer', transition: 'all .15s',
              position: 'relative',
            }}>
              {p}
              {sel && <div style={{
                position: 'absolute', top: 8, right: 10, width: 18, height: 18, borderRadius: 99,
                background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 14 14"><path d="M3 7L6 10 11 4" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>}
            </button>
          );
        })}
      </div>
      {customMode && (
        <div style={{ padding: '16px 24px 0' }}>
          <input
            ref={inputRef}
            value={customText}
            onChange={onCustomChange}
            placeholder="원하는 여행 스타일을 적어주세요"
            maxLength={20}
            style={{
              width: '100%', boxSizing: 'border-box',
              border: 'none', borderBottom: `1.5px solid ${customText ? accent : '#E5E5E0'}`,
              background: 'transparent', fontSize: 16, fontWeight: 500, padding: '12px 0',
              outline: 'none', fontFamily: T.font, color: '#1F2A44',
            }}
          />
        </div>
      )}
      <div style={{ flex: 1 }} />
      <div style={{ padding: '0 24px 48px' }}>
        <PrimaryButton accent={accent} onClick={go} disabled={values.length === 0}>다음</PrimaryButton>
      </div>
     </div>
    </ScreenShell>
  );
}

// ─── Loading ─────────────────────────────────────────────────
function ScreenLoading({ accent }) {
  return (
    <ScreenShell bg="#F7F6F2">
      <div style={{ height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1F2A44', marginBottom: 32 }}>
          맞춤 여행지를 찾고 있어요
        </div>
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `3px solid ${accent}25`, borderTopColor: accent,
            animation: 'optripSpin 1s linear infinite',
          }}/>
          <div style={{
            position: 'absolute', inset: 12, borderRadius: '50%',
            background: `${accent}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke={accent} strokeWidth="1.6" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" stroke={accent} strokeWidth="1.6"/>
            </svg>
          </div>
        </div>
        <div style={{ marginTop: 36 }}>
          {window.OpTripLogo ? <window.OpTripLogo height={28} color="#1F2A44" pinColor={accent} /> : <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: accent }}>OpTrip</div>}
        </div>
        <style>{`@keyframes optripSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, {
  ScreenWelcome1, ScreenWelcome2, ScreenWelcome3,
  ScreenName, ScreenGender, ScreenBirth, ScreenJob,
  ScreenHome, ScreenBudget, ScreenCalendar,
  ScreenCompanion, ScreenPurpose,
  ScreenLoading,
});
