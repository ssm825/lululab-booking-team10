# lululab-booking-taem10

## # 프로젝트 개요

- 진행기간 : 10/07 ~ 10/10
- 과제주관 : lululab
- 참여명단 : 정훈조, 서수민 장종현
- DEMO : [DEMO]()
  <br/>
  <br/>

## ⚙ 프로젝트 관리 및 설계와 관련된 사항들

- 기술스택 : React / TypeScript / Recoil

- 동일한 상태값으로 캘린더 / 예약 / 조회 사용함으로 전역으로 관리하고자 recoil 사용
  - 마운트시 useFetch 훅 사용 목데이터 fetch 후 전역 상태인 globalState 업데이트
  - 해당 state가 필요한 컴포넌트에서 호출하여 사용

```js
///Main.tsx

const Main = () => {
  const { results, loading } = useFetch();
  const setGlobalAtom = useSetRecoilState(globalState);

  useEffect(() => {
    setGlobalAtom(results);
  }, [loading]);

  return (
    <Wapper>
      {loading && results.length === 0 ? <Loader /> : <Calendar />}
    </Wapper>
  );
};

export default Main;
```

- 예약 등록 / 조회 동일한 모달 재사용하여 구현<br/>

```js
const Modal = ({ children }: Props) => {
  return (
    <Overlay>
      <Wapper>
        <Content>{children}</Content>
      </Wapper>
    </Overlay>
  );
};
```

## 요구사항과 해결방법

> MISSION 1

### 병원 예약 가능 목록

- #### fullcalendar 라이브러리 사용 하여 구현<br/>

```js
///Calendar.tsx

<FullCalendar
  locale={'ko'}
  plugins={[dayGridPlugin, interactionPlugin]}
  dayMaxEventRows={true}
  moreLinkClick="popover"
  events={Data}
  eventColor="#EFB33F"
  selectable={true}
  editable={true}
  dateClick={(info: DateClickArg) => {
    setSelectDate(info.dateStr);
    reserveHandler();
  }}
/>
```

<br/>

> MISSION 2

### 예약 등록 페이지

- 캘린더 날짜 클릭할시 예약가능한 모달 마운트<br/>
- 예약 불가능한 시간 , 중복예약 불가하게 구현

```js
/// useRegistration.ts
const handleReservation = (
  event: React.FormEvent<HTMLFormElement>,
  globalAtom: DefaultType[],
  selectDate: string,
  reserveHandler: () => void
) => {
  event.preventDefault();
  for (let i = 0; i < globalAtom.length; i++) {
    const {
      id,
      user_name,
      user_phone,
      booking_date,
      booking_time,
      categories,
    } = globalAtom[i];

    if (booking_date === selectDate && booking_time === time) {
      alert(`${time}에는 예약할 수 없습니다. \n다른 시간을 선택해 주세요.`);
      return;
    }
    if (user_name === values.name && user_phone === values.phone) {
      alert(`${values.name}님은 중복 예약입니다.`);
      return;
    }
  }
  const userInfo = {
    id: 220181,
    user_name: values.name,
    user_phone: values.phone,
    booking_date: selectDate,
    booking_time: time,
    categories: category,
  };
  setUser(prev => [...prev, userInfo]);
  reserveHandler();
};
```

<br/>

> MISSION 3

### 예약 내역 조회 페이지

- Result 컴포넌트의 조건부 랜더링 활용 내역 확인
- useSearch 훅 사용 전역 상태(globalState) 중 사용자가 입력한 정보가 존재하는지 확인후 return <br/>
- 조회 TEST =>
  - 이름 : 홍길동
  - 핸드폰번호 : 010-3286-6377
  - email: test@test.com

```js
/// Result.tsx
const Result = ({ searchResult }: { searchResult: SearchType }) => {
  const { isResult, result } = searchResult;
  return (
    <Wapper>
      <Content>
        <Description>
          {!isResult ? (
            <>
              <p>이름, 핸드폰번호, 이메일을 입력한 뒤</p>
              <p>조회 버튼을 클릭해주세요.</p>
            </>
          ) : (
            <>
              <p>예약 이름 : {result?.user_name}</p>
              <p>
                예약 시간 : {result?.booking_date} 일 {result?.booking_time}
              </p>
              <p>예약 내용 : {result?.categories}</p>
              <p>예약 번호 : {result?.id}</p>
            </>
          )}
        </Description>
      </Content>
    </Wapper>
  );
};
```

<br/>

```js
/// useSearch.ts
const handleSerch = (
  event: React.FormEvent<HTMLFormElement>,
  globalAtom: DefaultType[]
) => {
  event.preventDefault();
  for (let i = 0; i < globalAtom.length; i++) {
    const {
      id,
      user_name,
      user_phone,
      booking_date,
      booking_time,
      categories,
    } = globalAtom[i];
    if (user_name === values.name && user_phone === values.phone) {
      return setSearchResult(() => ({
        isResult: true,
        result: {
          id,
          user_name,
          user_phone,
          booking_date,
          booking_time,
          categories,
        },
      }));
    }
  }
  alert(
    `${values.name}님 예약 내역이 존재하지 않습니다 \n이름 또는 핸드폰 번호를 확인해주세요.`
  );
  setSearchResult(initializeState);
};
```

<br/>

# 팀 컨밴션

git commit

- ADD : 새로운 기능 추가했을 때
- EDIT : 버그, 디자인 등 수정했을 때
- DELETE : 파일을 삭제하는 작업만 수행한 경우

branch

- feature/기능

<br/>

# 테스크

서수민 : 예약 등록 기능 구현, 목데이터 설계

정종현 : 예약 목록 리스트(캘린더) 기능 구현

정훈조 : 예약 조회 기능 구현 , 초기세팅, 재사용 컴포넌트(모달, 로더, 버튼), recoil 세팅

<br/>

# 목데이터 예시

```js
// id, name, date, time
// 예약을 누르면 reservation에 담기게, 프론트에서는 reservation만 조회

[달력 위에 표시]
점심 시간 12:00 ~ 13:00
평일 진료 09:00 ~ 17:00 - 최대 8명
주말 휴무
9시 / 10시 / 11시 / 13시/ 14시 / 15시 / 16시 / 17시

"categories": ["진료", "검진", "기타"]

{
  "reservation": [
    {
      "id": 220101,
      "user_name": "홍길동",
      "user_phone": "010-1234-5678",
      "booking_date": "2022-10-01",
      "booking_time": "10:00",
      "categories": ["진료"]
    },
    {
      "id": 220102,
      "user_name": "김철수",
      "user_phone": "010-1234-5678",
      "booking_date": "2022-10-02",
      "booking_time": "13:00",
      "categories": ["진료"]
    },
    {
      "id": 220103,
      "user_name": "김영희",
      "user_phone": "010-1234-5678",
      "booking_date": "2022-10-02",
      "booking_time": "15:00",
      "categories": ["진료"]
    }
  ]
}
```
