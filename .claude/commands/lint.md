코드를 깔끔하고 일관되게 유지해드려요.

**할 일**: 코드 스타일 문제를 찾아서 자동으로 고쳐요.

## 1단계: 프로젝트 설정 감지
이 프로젝트가 어떤 도구를 쓰는지 확인:
- 찾아볼 것: `.eslintrc*`, `.prettierrc*`, `biome.json`, `pyproject.toml`
- `package.json`에서 lint 스크립트 확인
- 언어 확인 (JS/TS, Python, Go 등)

## 2단계: 린터 실행
프로젝트 타입에 따라:

**JavaScript/TypeScript:**
```bash
npm run lint 2>&1 || npx eslint . 2>&1
```

**Python:**
```bash
ruff check . 2>&1 || python -m flake8 . 2>&1
```

**Go:**
```bash
go vet ./...
```

## 3단계: 자동 수정
자동 수정 명령어 실행:

**JavaScript/TypeScript:**
```bash
npm run lint:fix || npx eslint . --fix
npx prettier --write .
```

**Python:**
```bash
ruff check --fix . && ruff format .
```

## 4단계: 결과 보고

```
## ✅ 자동 수정됨
[자동으로 고친 것들]

## ⚠️ 수동 수정 필요
[직접 고쳐야 하는 것들]
**파일:라인** - 문제 설명 - 고치는 방법

## 요약
- X개 이슈 발견
- Y개 자동 수정
- Z개 수동 수정 필요
```

## 린터 설정이 없나요?
린터가 설정 안 되어 있으면 설치 도와드려요:
- JS/TS → ESLint + Prettier
- Python → Ruff
- Go → golangci-lint

💡 `/lint` 만 실행하면 자동으로 감지하고 고쳐요.
