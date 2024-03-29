# 투개더 📺

![](/images/2.png)

현재 반려동물(강아지)와 함께 살고 있는 20대~40대 남녀가 사용자의 위치 기반을 이용하여 반경 3km 내 반려인&반려동물과 함께 산책을 할 수 있다.

### 📎 [투개더 서비스 이용하기](https://twogaether.site/)

### 📎 [노션 페이지](https://pineapple-wrist-347.notion.site/02141ecad68845c1a3839dbf62489a8f)

<br>

## 1. 제작 기간 & 팀원 소개

- 2023년 2월 3일 ~ 2023년 3월 15일
  [FE]
  - 홍정기 : 메인페이지 , 좋아요리스트, 마이페이지의 기능구현 및 CSS , AWS (S3 + CloudFront) 배포
  - 전병진 :
  - 이정우 : 채팅창리스트, 실시간 채팅, 주소찾기 및 css

<br>

## 2. 사용 기술

#### Front-end

![javaScript](https://camo.githubusercontent.com/fe1c8df487dbc029d3a1819dcc5bf79e066f1307131191ac2b02de8c3c55da81/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d266c6f676f3d4a617661536372697074266c6f676f436f6c6f723d7768697465)
![React](https://camo.githubusercontent.com/34c6a7afcc16731e2c4d73f3af9b275b172b2e46dc1e82be3f121a71fe067de9/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3631444146423f7374796c653d266c6f676f3d5265616374266c6f676f436f6c6f723d7768697465)
![Redux](https://camo.githubusercontent.com/d58ceb12a14709c7049878ae358ef7628e42d4276108b758cbb66a8922e7ef3e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d3736344142433f7374796c653d266c6f676f3d5265647578266c6f676f436f6c6f723d7768697465)
![ReactRouter](https://camo.githubusercontent.com/d257f8e18789ba1e6d34a9c63cbe150083c96b6f0da2eb059ae02422914ea80a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f526561637420526f757465722d4341343234353f7374796c653d266c6f676f3d526561637420526f75746572266c6f676f436f6c6f723d7768697465)
![Axios](https://camo.githubusercontent.com/809053601ae7a670d58865bd88e0f313cc5ced1c0915ff43aeb2ad1d1bf252c2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4178696f732d3638323865323f7374796c653d)
![styledComponents](https://camo.githubusercontent.com/8d29f15964b1cb2254deccb293a2c444eee52078b3d448b6149c17c5ab40d2ce/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c65642d636f6d706f6e656e74732d4442373039333f7374796c653d266c6f676f3d7374796c65642d636f6d706f6e656e7473266c6f676f436f6c6f723d7768697465)

## 3. 실행화면
[![투개더](http://img.youtube.com/vi/yiDJVx1S8TU/0.jpg)](https://www.youtube.com/watch?v=yiDJVx1S8TU) 
## 4. 핵심기능

1. 로그인 기능 구현 ( 로컬 회원가입, 소셜로그인 구현  )
2. 강아지 추가하기 ( Form Data 방식으로 데이터 값을 백엔드와 교류 + GPS 데이터를 로컬기능을 통해서 위도경도값을 DB로 보내는 방식)
3. 데이터 값을 기반으로 유저 매칭 (유저간의 거리 비교 및 데이터를 가져와서 유저간의 매칭을 가능하게 해주는 기능)
4. 좋아요 기능 구현(받고 보낸 좋아요 데이터를 따로 모으며 프로필 확인과 채팅을 위해 매칭되는 기능 구현)
5. [Stomp.js](http://Stomp.js) ( 채팅기능을 구현하기위해 필요하다 생각한 개념입니다. )
