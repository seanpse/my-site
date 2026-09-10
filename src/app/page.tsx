import CommentSection from "@/components/CommentSection";
import { createPublicClient } from "@/lib/supabase/public";

export const revalidate = 0;

const CAREER = [
  {
    period: "현재",
    title: "클래스101 세일즈 매니저",
    tag: "現",
  },
  {
    period: "이전",
    title: "토스 (Toss) Business Developer",
    tag: "前",
  },
  {
    period: "이전",
    title: "쿠팡이츠 사업개발팀",
    tag: "前",
  },
];

const STRENGTHS = [
  {
    title: "데이터 기반 협상력",
    desc: "토스·쿠팡이츠에서 쌓은 정량적 근거 기반의 딜 설계와 클로징 경험을 바탕으로, 감이 아닌 숫자로 설득합니다.",
  },
  {
    title: "빠른 실행력",
    desc: "스타트업 환경에서 검증된 신속한 실행과 반복 개선으로, 아이디어를 최단 시간에 결과로 만듭니다.",
  },
  {
    title: "이해관계자 조율",
    desc: "마케팅, 프로덕트, CS 등 여러 팀과의 협업 경험을 통해 복잡한 딜도 매끄럽게 성사시킵니다.",
  },
];

const GROWTH = [
  {
    title: "위임보다 실행을 우선하는 습관",
    desc: "디테일을 직접 챙기려는 성향이 강해 위임이 서툴렀지만, 팀 리딩을 맡으며 권한 위임과 우선순위 조정을 꾸준히 연습하고 있습니다.",
  },
  {
    title: "신중한 초기 판단",
    desc: "새로운 영역에 뛰어들 때 확신이 설 때까지 시간이 걸리는 편입니다. 다만 방향이 정해지면 끝까지 밀어붙이는 뚝심으로 보완하고 있습니다.",
  },
];

export default async function Home() {
  const supabase = createPublicClient();
  const { data: comments } = await supabase
    .from("comments")
    .select("id, nickname, content, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <div className="h-1.5 w-full bg-gradient-to-r from-navy to-navy-light" />

      <main className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        {/* Hero */}
        <section className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white sm:h-28 sm:w-28">
            이호준
          </div>
          <div className="mt-5 sm:mt-0">
            <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              이호준
            </h1>
            <p className="mt-1 text-base font-medium text-navy-light">
              세일즈 매니저 · 9년차
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              커머스와 핀테크를 넘나들며 매출을 만들어온 세일즈 매니저,
              이호준입니다. 숫자와 관계, 두 언어를 모두 다룹니다.
            </p>
          </div>
        </section>

        {/* Career */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-navy">경력</h2>
          <ol className="mt-4 space-y-3">
            {CAREER.map((c) => (
              <li
                key={c.title}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-sm font-bold text-navy">
                  {c.tag}
                </span>
                <span className="text-sm font-medium text-foreground sm:text-base">
                  {c.title}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Strengths */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-navy">강점</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {STRENGTHS.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Growth areas */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-navy">보완하고 있는 점</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {GROWTH.map((g) => (
              <div
                key={g.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-navy">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-12 rounded-2xl border border-border bg-navy p-6 text-white sm:p-8">
          <h2 className="text-lg font-semibold">연락처</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:gap-8">
            <a
              href="mailto:juno.lee@101.inc"
              className="flex items-center gap-2 hover:underline"
            >
              <span className="text-white/60">Email</span>
              juno.lee@101.inc
            </a>
            <a
              href="tel:010-7711-5904"
              className="flex items-center gap-2 hover:underline"
            >
              <span className="text-white/60">Phone</span>
              010-7711-5904
            </a>
          </div>
        </section>

        {/* Comments */}
        <div className="mt-12">
          <CommentSection initialComments={comments ?? []} />
        </div>

        <footer className="mt-14 text-center text-xs text-muted">
          © {new Date().getFullYear()} 이호준
        </footer>
      </main>
    </div>
  );
}
