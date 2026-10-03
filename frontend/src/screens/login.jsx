import { useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/use-user.js'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api/users').replace(/\/$/, '')

export default function Login() {
    const location = useLocation()
    const navigate = useNavigate()
    const { login } = useUser()
    const isRegistering = location.pathname === '/register'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        if (isRegistering && password !== confirmPassword) {
            setError('Those passwords do not match.')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await fetch(`${API_URL}/${isRegistering ? 'register' : 'login'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const result = await response.json().catch(() => ({}))

            if (!response.ok) {
                const validationError = Array.isArray(result.errors) ? result.errors[0]?.msg : result.errors
                throw new Error(validationError || result.message || 'We could not complete your request.')
            }

            if (!result.token) {
                throw new Error('The server did not return an authentication token.')
            }

            login({ token: result.token, user: result.user })
            navigate('/', { replace: true })
        } catch (requestError) {
            setError(requestError.message || 'Unable to connect. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101310] px-5 py-12 text-[#f3f2ed] sm:px-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(117,148,73,0.13),transparent_38%),radial-gradient(ellipse_at_90%_90%,rgba(81,111,95,0.12),transparent_35%)]" />
            <div className="relative grid w-full max-w-5xl overflow-hidden border border-white/10 bg-[#171b17]/95 shadow-2xl shadow-black/30 md:min-h-152.5 md:grid-cols-[1fr_1.05fr]">
                <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-[#1d241b] p-12 md:flex">
                    <div aria-hidden="true" className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#c4f06c]/10" />
                    <div aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#c4f06c]/15" />
                    <Link className="relative flex items-center gap-3 text-sm font-semibold tracking-wide" to="/login">
                        <span className="grid h-9 w-9 place-items-center bg-[#c4f06c] text-sm font-black text-[#182015]">N</span>
                        NORTHSTAR
                    </Link>
                    <div className="relative max-w-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c4f06c]">A clearer way forward</p>
                        <h1 className="mt-5 text-4xl font-medium leading-[1.12] tracking-tight">Make room for what matters.</h1>
                        <p className="mt-5 max-w-xs text-sm leading-6 text-[#a4aaa1]">A thoughtful space to bring your work into focus and keep moving.</p>
                    </div>
                    <p className="relative text-xs text-[#72796f]">Simple by design. Ready when you are.</p>
                </aside>

                <section className="flex flex-col justify-center px-6 py-10 sm:px-12 md:px-14">
                    <div className="mb-12 flex items-center gap-3 text-sm font-semibold tracking-wide md:hidden">
                        <span className="grid h-9 w-9 place-items-center bg-[#c4f06c] text-sm font-black text-[#182015]">N</span>
                        NORTHSTAR
                    </div>
                    <div className="max-w-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4f06c]">{isRegistering ? 'Get started' : 'Welcome back'}</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{isRegistering ? 'Create your account' : 'Sign in to continue'}</h2>
                        <p className="mt-2 text-sm leading-6 text-[#a4aaa1]">
                            {isRegistering ? 'Set up your account with an email and password.' : 'Enter your details below to pick up where you left off.'}
                        </p>

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <label className="block text-sm font-medium text-[#e7e8e2]" htmlFor="email">
                                Email address
                                <input
                                    autoComplete="email"
                                    className="mt-2 h-12 w-full border border-white/10 bg-[#101310] px-4 text-sm text-white outline-none transition placeholder:text-[#666d64] focus:border-[#c4f06c]/70 focus:ring-2 focus:ring-[#c4f06c]/10"
                                    id="email"
                                    name="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    type="email"
                                    value={email}
                                />
                            </label>

                            <label className="block text-sm font-medium text-[#e7e8e2]" htmlFor="password">
                                Password
                                <input
                                    autoComplete={isRegistering ? 'new-password' : 'current-password'}
                                    className="mt-2 h-12 w-full border border-white/10 bg-[#101310] px-4 text-sm text-white outline-none transition placeholder:text-[#666d64] focus:border-[#c4f06c]/70 focus:ring-2 focus:ring-[#c4f06c]/10"
                                    id="password"
                                    minLength={6}
                                    name="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="At least 6 characters"
                                    required
                                    type="password"
                                    value={password}
                                />
                            </label>

                            {isRegistering && (
                                <label className="block text-sm font-medium text-[#e7e8e2]" htmlFor="confirm-password">
                                    Confirm password
                                    <input
                                        autoComplete="new-password"
                                        className="mt-2 h-12 w-full border border-white/10 bg-[#101310] px-4 text-sm text-white outline-none transition placeholder:text-[#666d64] focus:border-[#c4f06c]/70 focus:ring-2 focus:ring-[#c4f06c]/10"
                                        id="confirm-password"
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        placeholder="Enter your password again"
                                        required
                                        type="password"
                                        value={confirmPassword}
                                    />
                                </label>
                            )}

                            {error && <p aria-live="polite" className="text-sm leading-5 text-[#ff9385]" role="alert">{error}</p>}

                            <button
                                className="flex h-12 w-full items-center justify-center bg-[#c4f06c] px-5 text-sm font-bold text-[#182015] transition hover:bg-[#d2f995] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4f06c] disabled:cursor-wait disabled:opacity-60"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? 'Please wait…' : isRegistering ? 'Create account' : 'Sign in'}
                            </button>
                        </form>

                        <p className="mt-7 text-center text-sm text-[#a4aaa1]">
                            {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}{' '}
                            <Link className="font-semibold text-[#c4f06c] underline decoration-[#c4f06c]/40 underline-offset-4 hover:text-white" to={isRegistering ? '/login' : '/register'}>
                                {isRegistering ? 'Sign in' : 'Create one'}
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}