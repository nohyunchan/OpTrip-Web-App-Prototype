// OpTrip — main app router

const { useState, useEffect } = React;

const PALETTES = {
  navy_sage: { primary: '#1F2A44', accent: '#7C9885', bg: '#F7F6F2' },
  ocean: { primary: '#0F3D5C', accent: '#5BA8C7', bg: '#F4F8FA' },
  warm: { primary: '#3B2E2A', accent: '#C97B5C', bg: '#F9F4EC' },
  mono: { primary: '#111111', accent: '#1F2A44', bg: '#F4F4F2' },
};

const FONT_OPTIONS = {
  pretendard: '"Pretendard Variable", Pretendard, sans-serif',
  noto: '"Noto Sans KR", sans-serif',
  ibm: '"IBM Plex Sans KR", sans-serif',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#1F2A44", "#7C9885", "#F7F6F2"],
  "fontKey": "pretendard",
  "cardLayout": "hero",
  "homeCard": "soft"
}/*EDITMODE-END*/;

const STEPS = [
  'welcome1', 'welcome2', 'welcome3',
  'name', 'gender', 'birth', 'job',
  'home',
  'budget', 'calendar', 'companion', 'purpose',
  'loading', 'result',
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accent = (Array.isArray(t.palette) ? t.palette[1] : '#7C9885');
  const fontFamily = FONT_OPTIONS[t.fontKey] || FONT_OPTIONS.pretendard;

  const [step, setStep] = useState('welcome1');
  const [prefs, setPrefs] = useState({
    name: '', gender: '', birth: '', job: '',
    budgetMan: '', start: null, end: null, noDate: false,
    duration: '', companion: '', purposes: [],
  });
  const [result, setResult] = useState(null);

  const setField = (k, v) => setPrefs(p => ({ ...p, [k]: v }));
  const goto = s => setStep(s);
  const idx = STEPS.indexOf(step);
  const next = () => goto(STEPS[idx + 1]);
  const back = () => goto(STEPS[Math.max(0, idx - 1)]);

  // Calendar → derive duration string
  const computeDuration = () => {
    if (prefs.noDate) return '';
    if (!prefs.start || !prefs.end) return '';
    const s = new Date(prefs.start.y, prefs.start.m, prefs.start.d);
    const e = new Date(prefs.end.y, prefs.end.m, prefs.end.d);
    const nights = Math.round((e - s) / 86400000);
    if (nights === 0) return '당일치기';
    if (nights >= 5) return '5박6일';
    return `${nights}박${nights + 1}일`;
  };

  // Loading → result
  useEffect(() => {
    if (step === 'loading') {
      const duration = computeDuration();
      setField('duration', duration);
      const t1 = setTimeout(() => {
        const finalPrefs = { ...prefs, duration, budgetMan: Number(prefs.budgetMan) || 50 };
        const r = window.OPTRIP_DATA.recommend(finalPrefs);
        setResult(r);
        goto('result');
      }, 2400);
      return () => clearTimeout(t1);
    }
  }, [step]);

  const restart = () => {
    setPrefs(p => ({
      ...p,
      budgetMan: '', start: null, end: null, noDate: false,
      duration: '', companion: '', purposes: [],
    }));
    setResult(null);
    goto('home');
  };

  const screenProps = { accent };
  let screen;
  switch (step) {
    case 'welcome1': screen = <ScreenWelcome1 {...screenProps} go={next}/>; break;
    case 'welcome2': screen = <ScreenWelcome2 {...screenProps} go={next} back={back}/>; break;
    case 'welcome3': screen = <ScreenWelcome3 {...screenProps} go={next} back={back}/>; break;
    case 'name':
      screen = <ScreenName {...screenProps} value={prefs.name} set={v => setField('name', v)}
        go={next} back={back}/>; break;
    case 'gender':
      screen = <ScreenGender {...screenProps} value={prefs.gender} set={v => setField('gender', v)}
        go={next} back={back}/>; break;
    case 'birth':
      screen = <ScreenBirth {...screenProps} value={prefs.birth} set={v => setField('birth', v)}
        go={next} back={back}/>; break;
    case 'job':
      screen = <ScreenJob {...screenProps} value={prefs.job} set={v => setField('job', v)}
        go={next} back={back}/>; break;
    case 'home':
      screen = <ScreenHome {...screenProps} name={prefs.name} go={() => goto('budget')}
        cardStyle={t.homeCard}/>; break;
    case 'budget':
      screen = <ScreenBudget {...screenProps} value={prefs.budgetMan}
        set={v => setField('budgetMan', v)}
        go={next} skip={next} back={() => goto('home')}/>; break;
    case 'calendar':
      screen = <ScreenCalendar {...screenProps}
        start={prefs.start} end={prefs.end}
        setRange={(s, e) => setPrefs(p => ({ ...p, start: s, end: e }))}
        noDate={prefs.noDate} setNoDate={v => setField('noDate', v)}
        go={next} skip={next} back={back}/>; break;
    case 'companion':
      screen = <ScreenCompanion {...screenProps} value={prefs.companion}
        set={v => setField('companion', v)}
        go={next} skip={next} back={back}/>; break;
    case 'purpose':
      screen = <ScreenPurpose {...screenProps} values={prefs.purposes}
        set={v => setField('purposes', v)}
        go={() => goto('loading')} skip={() => goto('loading')} back={back}/>; break;
    case 'loading': screen = <ScreenLoading {...screenProps}/>; break;
    case 'result':
      screen = <ScreenResult {...screenProps} result={result} prefs={prefs}
        name={prefs.name} restart={restart} cardLayout={t.cardLayout}/>; break;
    default: screen = null;
  }

  // Stage scaling for any viewport
  return (
    <div style={{
      minHeight: '100vh', width: '100vw',
      background: `radial-gradient(circle at 30% 20%, ${accent}10, transparent 60%), #F0EFEA`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily, padding: 20, boxSizing: 'border-box',
    }}>
      <style>{`
        * { font-family: ${fontFamily}; }
        body { margin: 0; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <IOSDevice width={402} height={874}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }} key={step}>
            <div style={{ width: '100%', height: '100%', animation: 'fade .35s ease-out' }}>
              {screen}
            </div>
          </div>
        </IOSDevice>

        {/* step indicator (debug nav) */}
        <div style={{ display: 'flex', gap: 4, fontSize: 11, color: '#9CA3AF',
          fontFamily: 'ui-monospace, monospace', flexWrap: 'wrap',
          justifyContent: 'center', maxWidth: 460 }}>
          {STEPS.map(s => (
            <button key={s} onClick={() => goto(s)} style={{
              background: s === step ? accent : 'transparent',
              color: s === step ? '#fff' : '#9CA3AF',
              border: `1px solid ${s === step ? accent : '#D1D5DB'}`,
              borderRadius: 99, padding: '3px 9px', fontSize: 10, cursor: 'pointer',
              fontFamily: 'ui-monospace, monospace',
            }}>{s}</button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <TweaksPanel>
        <TweakSection label="Theme">
          <TweakColor label="Palette" value={t.palette}
            options={[
              ['#1F2A44', '#7C9885', '#F7F6F2'],
              ['#0F3D5C', '#5BA8C7', '#F4F8FA'],
              ['#3B2E2A', '#C97B5C', '#F9F4EC'],
              ['#111111', '#1F2A44', '#F4F4F2'],
            ]}
            onChange={v => setTweak('palette', v)}/>
        </TweakSection>
        <TweakSection label="Typography">
          <TweakRadio label="Font" value={t.fontKey}
            options={[
              { value: 'pretendard', label: 'Pretendard' },
              { value: 'noto', label: 'Noto KR' },
              { value: 'ibm', label: 'IBM Plex' },
            ]}
            onChange={v => setTweak('fontKey', v)}/>
        </TweakSection>
        <TweakSection label="Result card">
          <TweakRadio label="Layout" value={t.cardLayout}
            options={[
              { value: 'hero', label: 'Hero' },
              { value: 'split', label: 'Split' },
              { value: 'editorial', label: 'Edit' },
            ]}
            onChange={v => setTweak('cardLayout', v)}/>
        </TweakSection>
        <TweakSection label="Home">
          <TweakRadio label="Hero card" value={t.homeCard}
            options={[
              { value: 'soft', label: 'Soft' },
              { value: 'image', label: 'Image' },
            ]}
            onChange={v => setTweak('homeCard', v)}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
