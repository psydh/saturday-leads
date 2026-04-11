import { LeadForm } from "@/components/lead-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">LeadCollector</span>
          <nav className="flex gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">
              기능
            </a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">
              문의하기
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-24 px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            비즈니스 성장의 시작,
            <br />
            <span className="text-primary">리드 수집</span>을 더 쉽게
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            잠재 고객의 정보를 간편하게 수집하고 관리하세요.
            <br />
            지금 바로 시작할 수 있습니다.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
          >
            무료로 시작하기
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            왜 LeadCollector인가요?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-primary font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">간편한 수집</h3>
              <p className="text-sm text-gray-600 leading-6">
                복잡한 설정 없이 폼 하나로 리드를 수집할 수 있습니다.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-primary font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">실시간 관리</h3>
              <p className="text-sm text-gray-600 leading-6">
                수집된 리드를 실시간으로 확인하고 관리할 수 있습니다.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-primary font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">데이터 분석</h3>
              <p className="text-sm text-gray-600 leading-6">
                수집된 데이터를 분석하여 인사이트를 얻을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="bg-gray-50 py-20 px-6">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            문의하기
          </h2>
          <p className="text-center text-gray-600 mb-8">
            아래 정보를 남겨주시면 빠르게 연락드리겠습니다.
          </p>
          <LeadForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="mx-auto max-w-5xl text-center text-sm text-gray-500">
          &copy; 2026 LeadCollector. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
