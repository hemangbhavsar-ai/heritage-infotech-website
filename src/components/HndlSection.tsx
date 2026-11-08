import { Link } from 'react-router-dom'
import type { HndlSectionContent } from '../types/content'

export function HndlSection({ section }: { section: HndlSectionContent }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
      <div className="mt-4 space-y-4">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
      {section.complement && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{section.complement}</p>
      )}
      {section.note && (
        <p className="mt-6 text-sm leading-relaxed text-slate-600">
          {section.note}{' '}
          {section.noteLink && (
            <Link
              to={section.noteLink}
              className="font-semibold text-brand-600 transition hover:text-brand-500"
            >
              {section.noteLinkLabel ?? 'Contact us'}
            </Link>
          )}
        </p>
      )}
    </div>
  )
}
