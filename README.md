# 이호준 소개 페이지

세일즈 매니저 이호준의 소개 및 방명록 페이지.

- **Framework**: Next.js (App Router) + Tailwind CSS
- **Hosting**: Vercel
- **Database**: Supabase (댓글/방명록 저장, RLS 적용)

## 로컬 개발

```bash
npm install
npm run dev
```

`.env.local`에 아래 값이 필요합니다.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
