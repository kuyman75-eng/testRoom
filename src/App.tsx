import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = name.trim() !== '' && phone.trim() !== '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase
      .from('event_registrations')
      .insert({ name: name.trim(), phone: phone.trim() });

    if (error) {
      setStatus('error');
      setErrorMsg('제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
      return;
    }

    setStatus('success');
    setName('');
    setPhone('');
  }

  function handleReset() {
    setStatus('idle');
    setName('');
    setPhone('');
    setErrorMsg('');
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 font-mono">
      <div className="w-full max-w-sm">
        {/* Wireframe label */}
        <div className="border border-dashed border-neutral-400 px-4 py-2 mb-6 text-center text-xs text-neutral-500 tracking-widest uppercase">
          Wireframe
        </div>

        {status === 'success' ? (
          <div className="border border-neutral-900 p-8 text-center">
            <p className="text-lg font-bold text-neutral-900 mb-2">
              신청 완료
            </p>
            <p className="text-sm text-neutral-600 mb-6">
              이벤트 신청이 정상적으로 접수되었습니다.
            </p>
            <button
              onClick={handleReset}
              className="w-full border border-neutral-900 bg-neutral-900 text-white py-3 font-bold tracking-wide hover:bg-white hover:text-neutral-900 transition-colors"
            >
              새로 신청하기
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-neutral-900 p-6 space-y-6"
          >
            <h1 className="text-xl font-bold text-neutral-900 text-center border-b border-neutral-300 pb-4">
              이벤트 신청서
            </h1>

            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-neutral-900"
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full border border-neutral-400 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-300 focus:border-neutral-900 focus:outline-none bg-white"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-neutral-900"
              >
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full border border-neutral-400 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-300 focus:border-neutral-900 focus:outline-none bg-white"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-neutral-900 border border-neutral-900 bg-neutral-100 px-3 py-2">
                {errorMsg}
              </p>
            )}

            {/* Submit button — stands out */}
            <button
              type="submit"
              disabled={!isValid || status === 'submitting'}
              className="w-full bg-neutral-900 text-white py-3.5 font-bold text-base tracking-wide hover:bg-neutral-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'submitting' ? '제출 중…' : '신청하기'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          입력된 정보는 이벤트 운영 목적으로만 사용됩니다.
        </p>
      </div>
    </div>
  );
}

export default App;
