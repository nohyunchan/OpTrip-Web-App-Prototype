# OpTrip-Web-App-Prototype
Design Prototype

예산과 취향에 맞는 국내 여행지를 추천해주는 모바일 앱 디자인 프로토타입입니다.

## 🚀 실행 방법
1. 저장소를 다운로드 (Code → Download ZIP) 또는 clone
2. `OpTrip Prototype.html` 파일을 브라우저로 열기

별도 빌드/설치 불필요. 모든 화면이 React + Babel로 인라인 동작합니다.

## 📱 화면 구성
- **온보딩**: 환영 → 인사말 → 이름 / 성별 / 생년 / 직업 입력
- **홈**: OpTrip 로고 + "계획 세우기" CTA + 인기 지역
- **여행 계획**: 예산 → 일정(달력) → 일행 → 추구미 (직접 입력 지원)
- **로딩 → 결과**: Top 3 카드 캐러셀 (스와이프/화살표) → 카드 탭 시 상세 페이지

## 🎨 추천 로직 (룰 기반, PRD §6)
| 항목 | 가중치 |
|---|---|
| 예산 적합 | +40 (초과 시 탈락) |
| 일정 적합 | +30 |
| 목적(추구미) | +20 × 매칭 수 |
| 동행 | +10 |

`data.jsx`의 `recommend()` 함수 참고.

## 📂 파일 구조
| 파일 | 역할 |
|---|---|
| `OpTrip Prototype.html` | 진입점 (스크립트 로더) |
| `app.jsx` | 라우팅 / 상태 관리 |
| `screens.jsx` | 온보딩·계획 화면들 |
| `result-screen.jsx` | 결과 캐러셀 + 상세 |
| `data.jsx` | 8개 지역 데이터 + 추천 로직 |
| `illustrations.jsx` | 지역별 SVG 일러스트 |
| `logo.jsx` | OpTrip 워드마크 |
| `ios-frame.jsx` | iPhone 디바이스 프레임 |
| `tweaks-panel.jsx` | 라이브 색상/폰트 조정 패널 |

## 🔧 다음 단계
- SVG 일러스트 → 실제 사진 교체 (`data.jsx`의 `illus` 필드)
- 8개 지역 → 전국 데이터 확장
- 추천 로직 서버 이전 + API 연동
- 상세 코스/맛집/숙소 추가

## 📋 라이선스
MIT
