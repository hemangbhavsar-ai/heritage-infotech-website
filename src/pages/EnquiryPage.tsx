import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { PageHero } from '../components/PageHero'

export function EnquiryPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero title="Enquiry Form" subtitle="Tell us about your project and we'll get back to you" />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
              <h2 className="text-xl font-semibold text-brand-800">Thank you for your enquiry!</h2>
              <p className="mt-2 text-brand-700">
                We have received your message and will respond within 1–2 business days.
              </p>
            </div>
          ) : (
            <form
              name="enquiry"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <input type="hidden" name="form-name" value="enquiry" />
              <p className="hidden">
                <label>Don&apos;t fill this out: <input name="bot-field" /></label>
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-700">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-700">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-700">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-700">
                  Service of Interest *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="">Select a service</option>
                  <option value="it">IT Professional Services</option>
                  <option value="logistics">Logistic Solutions Suite</option>
                  <option value="staffing">Staffing Solutions</option>
                  <option value="bpo">Business Process Outsourcing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 sm:w-auto"
              >
                <Send size={18} />
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}