import { Navigate, useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('authToken')
        navigate('/login', { replace: true })
    }

    if (!localStorage.getItem('authToken')) {
        return <Navigate to="/login" replace />
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#101310] px-6 text-[#f3f2ed]">
            <section className="w-full max-w-lg border border-white/10 bg-[#171b17] p-8 sm:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4f06c]">Signed in</p>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight">You’re all set.</h1>
                <p className="mt-3 text-sm leading-6 text-[#a4aaa1]">Your account is ready to use.</p>
                <button
                    className="mt-8 text-sm font-medium text-[#c4f06c] underline decoration-[#c4f06c]/40 underline-offset-4 transition hover:text-white"
                    onClick={handleLogout}
                    type="button"
                >
                    Sign out
                </button>
            </section>
        </main>
    )
}