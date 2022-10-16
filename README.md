# lululab-booking-taem10

## 프로젝트 개요

- 진행기간 : 10/15 ~ 10/17
- 과제주관 : lululab
- 참여명단 : 서수민, 장종현, 정훈조
- DEMO : [DEMO](https://sensational-strudel-86bb09.netlify.app/)
  <br/>
  <br/>

## ⚙ 프로젝트 관리 및 설계와 관련된 사항들

- 기술스택 : React / TypeScript / Recoil

- 동일한 상태 값으로 캘린더 / 예약 / 조회 사용함으로 전역으로 관리하고자 recoil 사용
  - 마운트 시 상수 데이터 전역 상태인 globalState 업데이트
    - Mock Data를 활용하여 개발 완료하였으나 배포 시 경로 오류로 인해 fetch가 되지 않아 상수 처리하였습니다.
  - 해당 state가 필요한 컴포넌트에서 호출하여 사용

```js
///Main.tsx

const Main = () => {
  const setGlobalAtom = useSetRecoilState(globalState);

  useEffect(() => {
    setGlobalAtom(DATA.data);
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

- fullcalendar 라이브러리 사용 하여 구현<br/>

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

- 캘린더 날짜 클릭 시 예약 가능한 모달을 마운트<br/>
- 예약 불가능한 시간, 중복예약 불가하게 구현

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
      const { user_name, user_phone, booking_date, booking_time } =
        globalAtom[i];

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
    alert(`${values.name}님 예약 완료되셨습니다!`);
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

## 팀 컨밴션

git commit

- ADD : 새로운 기능 추가했을 때
- EDIT : 버그, 디자인 등 수정했을 때
- DELETE : 파일을 삭제하는 작업만 수행한 경우

branch

- feature/기능

<br/>

## 테스크

서수민 : 예약 등록 기능 구현, 목데이터 설계

장종현 : 예약 목록 리스트(캘린더) 기능 구현

정훈조 : 예약 조회 기능 구현 , 초기세팅, 재사용 컴포넌트(모달, 로더, 버튼), recoil 세팅

<br/>

## 목데이터
<details>
<summary>예시</summary>

```js

"categories": ["진료", "검진", "기타"]

{
  "reservation": [
    {
      "id": 220101,
      "user_name": "홍길동",
      "user_phone": "010-1234-5678",
      "booking_date": "2022-10-01",
      "booking_time": "10:00",
      "categories": "진료"
    },
    {
      "id": 220102,
      "user_name": "김철수",
      "user_phone": "010-1234-5678",
      "booking_date": "2022-10-02",
      "booking_time": "13:00",
      "categories": "검진"
    },
    {
      "id": 220103,
      "user_name": "김영희",
      "user_phone": "010-1234-5678",
      "booking_date": "2022-10-02",
      "booking_time": "15:00",
      "categories": "기타"
    }
  ]
}
```
</details>

<br/>

## 고민했던 부분 및 느낀 점

<br/>

서수민
- 커스텀 한 selectbox의 style을 더 효율적으로 구현하지 못해 아쉬웠으나 Recoil로 전역 상태를 관리할 수 있는 법을 배우고 활용할 수 있어서 좋았습니다.

<br/>

장종현
- calendar상에 출력되는 events중 categories(검진, 진료, 기타)를 보다 직관적이게 색깔로 구분 하고 싶었지만, fullcalendar library를 빠르게 익히다보니 디테일하게 접근하지 못한 것이 아쉽다.

<br/>

정훈조
- 개발 경험을 향상할 수 있는 TypeScript 및 전역 상태관리의 Recoil 사용함으로 더 생산적인 개발을 할 수 있었습니다. 또한 팀 내 트러블 슈팅 발생 시 팀원 모두 문제 해결을 위해 소통하였고 즐거운 경험이었습니다.

<br/>



