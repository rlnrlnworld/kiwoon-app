# 기능 사항
## 1. 시작
![홈 화면](https://github.com/user-attachments/assets/0d8b0bc2-c636-41fa-a348-41966e228a96)


### Description
페이지를 클릭하면 도마뱀 목록을 확인할 수 있는 페이지로 넘어간다.

<br/>

## 2. 도마뱀 등록
![도마뱀 등록 (1)](https://github.com/user-attachments/assets/0a6120af-7073-4d3d-a364-cc885ba80a0c)
![도마뱀 등록 (2)](https://github.com/user-attachments/assets/2fa36afa-5f9e-417f-a2dd-33e703590e0a)


### Input
이름, 생일, 입양일, 몸무게, 종, 모프, 메이팅 희망 여부 <br/>
### API 
/api/lizards <br/>
### Description
1. **애니메이션** : Hover 애니메이션을 추가하여 동적 페이지 구현 <br/>
2. **YYMMDD 구분** : 연도와 월, 일 사이에 "/"를 추가하여 구분이 쉽도록 하고, api request에는 제거하고 전달 <br/>
3. **모프 선택 값 분류**: 선택 종에 따라 선택할 수 있는 모프 옵션 값을 달리 설정 <br/>

<br />

## 3. 도마뱀 목록 확인
![image](https://github.com/user-attachments/assets/876917d3-4e5c-49b3-a416-1d22f0bd9942)

### API 
/api/lizards <br/>
### Description
1. **비동기 작동** : api에서 도마뱀 목록을 가져와 렌더링
2. **등록 페이지와 연결** : 목록에서 플러스 버튼을 누르면 등록 페이지로 연결

<br />

## 4. 도마뱀 상세 기능
![케이지 관리](https://github.com/user-attachments/assets/7ef97965-c88b-4c0f-8bb1-a9f0de8e58b7)

### API 
/api/lizards <br/>
### Description
1. **케이지 연동** : 케이지와 연결하여 실시간으로 온습도 적정 파악 및 원격 설정
2. **물 분사** : 케이지와 연결하여 도마뱀에게 물을 주고 싶을 때 실시간으로 물 분사

<br />

## 5. 성장 비교 서비스
![성장 비교 서비스](https://github.com/user-attachments/assets/10d31925-66a7-442a-b86a-7c2951e9a416)

### API 
/api/lizards <br/>
### Description
1. **몸무게를 이용한 성장 비교** : 해당 도마뱀의 개월 수와 현재 몸무게 정보를 불러와 해당 종의 평균 몸무게와 비교하여 출력
2. **사료 구독** : 사료 구독 서비스와 연결될 수 있도록 하여 이익 창출

<br />

## 6. 메이팅 서비스
### API
/api/mating <br />

*추후 구현 예정*
