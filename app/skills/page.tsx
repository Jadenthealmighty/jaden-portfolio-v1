import { redirect } from 'next/navigation'

// The skills page became the research page; keep old /skills links working.
export default function SkillsRedirect() {
  redirect('/research')
}
