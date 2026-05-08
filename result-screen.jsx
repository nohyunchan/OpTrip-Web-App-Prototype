// OpTrip — Result carousel + detail (separated for context efficiency)

function ScreenResult({ result, prefs, name, restart, accent, cardLayout }) {
  const [idx, setIdx] = useState(0);
  const [detail, setDetail] = useState(null);
  const touchRef = useRef({ x: 0 });

  if (!result) return null;
  const cards = (result.top3 && result.top3.length) ? result.top3 : [{ region: result.region, reasons: result.reasons }];
  const summary = [
    prefs.duration,
    prefs.companion,
    prefs.budgetMan && `${prefs.budgetMan}만원`,
    (prefs.purposes || []).slice(0, 1).join(''),
  ].filter(Boolean).join(' · ');

  if (detail) {
    return <ResultDetail region={detail} prefs={prefs} accent={accent} onBack={() => setDetail(null)} restart={restart} />;
  }

  const total = cards.length;
  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  const onTouchStart = e => { touchRef.current.x = e.touches[0].clientX; };
  const onTouchEnd = e => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
  };

  return (
    <ScreenShell bg="#F7F6F2">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingBottom: 32 }}>
        <div style={{ padding: '16px 24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4, color: '#1F2A44' }}>
            {name || '여행자'}님을 위한 추천 여행지
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: '#9CA3AF' }}>{summary}</div>
        </div>

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
             onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div style={{ width: 252, height: 408, position: 'relative' }}>
            {cards.map((c, i) => {
              const offset = i - idx;
              if (Math.abs(offset) > 1) return null;
              const Illus = (window.OPTRIP_ILLUS?.REGION_ILLUS || {})[c.region.illus];
              const isActive = offset === 0;
              return (
                <button
                  key={c.region.id}
                  onClick={() => isActive ? setDetail(c.region) : (offset > 0 ? next() : prev())}
                  aria-label={c.region.regionName}
                  style={{
                    position: 'absolute', inset: 0,
                    transform: `translateX(${offset * 88}%) scale(${isActive ? 1 : 0.82})`,
                    opacity: isActive ? 1 : 0.55,
                    transition: 'transform .42s cubic-bezier(.2,.7,.2,1), opacity .3s',
                    background: '#fff', borderRadius: 28, overflow: 'hidden', border: 'none',
                    boxShadow: isActive ? '0 24px 60px rgba(31,42,68,0.18), 0 4px 12px rgba(31,42,68,0.06)' : '0 8px 24px rgba(31,42,68,0.10)',
                    padding: 0, cursor: 'pointer', fontFamily: T.font, zIndex: isActive ? 2 : 1,
                  }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {Illus ? <Illus accent={accent} /> : <div style={{ width: '100%', height: '100%', background: `${accent}40` }} />}
                  </div>
                  <div style={{ position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(247,246,242,0.85) 0%, rgba(247,246,242,0) 38%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)' }} />
                  <div style={{ position: 'absolute', top: 18, left: 0, right: 0, textAlign: 'center',
                    fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#6B7280' }}>
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </div>
                  <div style={{ position: 'absolute', top: '40%', left: 0, right: 0,
                    transform: 'translateY(-50%)', textAlign: 'center', color: '#1F2A44' }}>
                    <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.8 }}>{c.region.regionName}</div>
                  </div>
                  {isActive && (
                    <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, 0)' }}>
                      <span style={{
                        display: 'inline-block', padding: '9px 20px', borderRadius: 99,
                        background: '#fff', color: '#1F2A44', fontSize: 13, fontWeight: 700,
                        boxShadow: '0 6px 16px rgba(31,42,68,0.12)',
                      }}>자세히 보기 →</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 18, left: 16, right: 16, display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {c.region.tags.slice(0, 2).map(t => (
                      <span key={t} style={{
                        background: 'rgba(255,255,255,0.92)', color: '#1F2A44',
                        padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <button onClick={prev} aria-label="prev" style={resultArrow('left')}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="#1F2A44" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={next} aria-label="next" style={resultArrow('right')}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 1l6 6-6 6" stroke="#1F2A44" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '8px 0 16px' }}>
          {cards.map((_, i) => (
            <span key={i} style={{
              width: i === idx ? 22 : 6, height: 6, borderRadius: 99,
              background: i === idx ? accent : '#D8D5CD', transition: 'all .3s',
            }}/>
          ))}
        </div>

        <div style={{ padding: '0 24px' }}>
          <button onClick={restart} style={{
            width: '100%', height: 50, borderRadius: 14,
            background: 'transparent', color: '#6B7280',
            border: '1px solid #E5E2DA', cursor: 'pointer',
            fontFamily: T.font, fontSize: 14, fontWeight: 600,
          }}>다시 추천받기</button>
        </div>
      </div>
    </ScreenShell>
  );
}

function resultArrow(side) {
  return {
    position: 'absolute', top: '50%', [side]: 16, transform: 'translateY(-50%)',
    width: 36, height: 36, borderRadius: 99, background: '#fff',
    border: 'none', cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(31,42,68,0.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5,
  };
}

function ResultDetail({ region, prefs, accent, onBack, restart }) {
  const Illus = (window.OPTRIP_ILLUS?.REGION_ILLUS || {})[region.illus];
  return (
    <ScreenShell bg="#F7F6F2">
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 110 }}>
        <div style={{ position: 'relative', height: 320 }}>
          {Illus ? <Illus accent={accent} /> : <div style={{ width: '100%', height: '100%', background: `${accent}40` }} />}
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(247,246,242,1) 100%)' }} />
          <button onClick={onBack} aria-label="back" style={{
            position: 'absolute', top: 16, left: 16,
            width: 40, height: 40, borderRadius: 99,
            background: 'rgba(255,255,255,0.92)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            <svg width="9" height="16" viewBox="0 0 9 16"><path d="M8 1L1 8l7 7" stroke="#1F2A44" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          </button>
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: '#1F2A44' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: accent, marginBottom: 6 }}>RECOMMENDED</div>
            <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.8 }}>{region.regionName}</div>
          </div>
        </div>

        <div style={{ padding: '8px 24px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1F2A44', lineHeight: 1.5, marginBottom: 20 }}>
            {region.shortDescription}
          </div>

          <div style={{ background: '#fff', borderRadius: 18, padding: '18px 20px',
            boxShadow: '0 4px 14px rgba(31,42,68,0.05)', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: 99, background: `${accent}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.5 3 3.5.5-2.5 2.5.6 3.5L6 9 2.9 10.5l.6-3.5L1 4.5 4.5 4z" fill={accent}/></svg>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2A44' }}>이 여행지를 추천하는 이유</div>
            </div>
            <div style={{ fontSize: 14, color: '#3F4B66', lineHeight: 1.65 }}>{region.reason}</div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {region.tags.map(t => (
              <span key={t} style={{
                background: `${accent}15`, color: accent,
                padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            <DetailStat label="예산 적합도" value={tierLabel(region.budgetTier)} />
            <DetailStat label="추천 일정" value={(region.durationFit && region.durationFit[0]) || '1박2일'} />
            <DetailStat label="동행" value={(region.companionFit && region.companionFit.slice(0, 2).join(', ')) || '누구나'} />
            <DetailStat label="분위기" value={(region.purposeFit && region.purposeFit[0]) || '여유'} />
          </div>

          <div style={{ background: '#fff', borderRadius: 14, padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            border: `1px solid ${accent}30`, marginBottom: 20 }}>
            <div style={{ fontSize: 18 }}>💸</div>
            <div style={{ fontSize: 13, color: '#1F2A44', fontWeight: 500 }}>
              {prefs.budgetMan}만원 예산에 적합한 여행지예요
            </div>
          </div>

          <div style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.6, paddingBottom: 8 }}>
            * 상세 코스 추천은 추후 업데이트 예정입니다
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 24px 32px',
        background: 'linear-gradient(180deg, rgba(247,246,242,0) 0%, rgba(247,246,242,0.95) 30%, rgba(247,246,242,1) 100%)',
        display: 'flex', gap: 8 }}>
        <button onClick={onBack} style={{
          flex: 1, height: 56, borderRadius: 14,
          background: '#fff', color: '#1F2A44',
          border: '1px solid #E8E6E0', cursor: 'pointer',
          fontFamily: T.font, fontSize: 15, fontWeight: 600,
        }}>다른 추천 보기</button>
        <button onClick={() => navigator.clipboard?.writeText(`${region.regionName} - ${region.shortDescription}`)} style={{
          flex: 1, height: 56, borderRadius: 14,
          background: accent, color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: T.font, fontSize: 15, fontWeight: 700,
        }}>저장하기</button>
      </div>
    </ScreenShell>
  );
}

function DetailStat({ label, value }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 14, color: '#1F2A44', fontWeight: 700, letterSpacing: -0.2 }}>{value}</div>
    </div>
  );
}

function tierLabel(tier) {
  return tier === 'high' ? '고예산형' : tier === 'mid' ? '중간예산형' : '저예산형';
}

Object.assign(window, { ScreenResult });
