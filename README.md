# frieeren-design-system

[moeum-design-system](https://github.com/team-moeum/moeum-design-system) 템플릿을 기반으로 구축된 디자인 토큰부터 컴포넌트 생성까지, Figma에서 코드까지 자동화된 완전한 디자인 시스템 파이프라인

<br />

## Packages

### Design Token 생성 패키지

- Figma Variables을 [`style-dictionary`](https://amzn.github.io/style-dictionary/#/quick_start?id=node)를 활용한 디자인 토큰 코드로 변환
- 색상, 타이포그래피, 스페이싱 등 디자인 토큰 관리
- [디자인 토큰 가이드](./packages/figma-token/README.md)

### Icon 컴포넌트 생성 패키지

- Figma의 아이콘을 [`SVGR`](https://react-svgr.com/)을 활용하여 컴포넌트로 자동 변환
- [아이콘 사용 가이드](./packages/frieeren-icons/README.md)

### 공통 컴포넌트 패키지

- Design Token과 Icon을 활용한 재사용 가능한 컴포넌트 제공
- [컴포넌트 패키지 체크리스트](https://github.com/Frieeren/design-system/wiki/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B2%B4%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%8A%B8)
- [공통 컴포넌트 가이드](https://Frieeren.github.io/design-system/)

### Figma Code 변환 패키지

- Figma의 특정 화면을 공통 컴포넌트, 아이콘이 적용된 React 컴포넌트 코드로 자동 변환
- [Figma Code 변환 가이드](./packages/figma-componentgen-plugin/README.md)

<br />

## Guide
- [디자인 시스템 overview](https://github.com/Frieeren/design-system/wiki/%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%83%81)
- [plugin 폴더 구조](https://github.com/Frieeren/design-system/wiki/plugin-%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0)

<br />

## 시작하기

### 요구사항

- Node.js v20
- Figma 계정 및 Github Token

### 사용 예시

```ts
// Icon 사용
import { ArrowIcon } from "@team-frieeren/icons";

// 컴포넌트 사용
import { Button, Input } from "@team-frieeren/components";
import { Popup } from "@team-frieeren/components/client";
```

<br />

## Bug Report

If you find a bug, please report it to me using the [issues](https://github.com/Frieeren/design-system/issues) page on Github.

<br />

## Contribute

You're free to contribute to this project by submitting [issues](https://github.com/Frieeren/design-system/issues) and/or [PRs](https://github.com/Frieeren/design-system/pulls).
