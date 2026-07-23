/** SpeakEasy brand tokens — balanced: vibrant yet refined */

export const BRAND = {
  name: 'SpeakEasy',
  studio: 'SpeakEasy Studio',
  tagline: 'Speak with confidence',
}

export const brandGradient = 'from-orange-400 via-rose-400 to-amber-300'
export const brandGradientText =
  'bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300 bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent'
export const brandGradientBg = 'bg-gradient-to-r from-orange-500 via-rose-500 to-amber-400'
export const brandGradientBr = 'bg-gradient-to-br from-orange-500 via-rose-500 to-amber-400'

export const moduleThemes = {
  speaking: {
    iconGradient: 'bg-gradient-to-br from-orange-400 to-rose-500',
    iconShadow: 'shadow-lg shadow-orange-500/30',
    iconBg: 'bg-orange-500/12 border border-orange-400/25',
    bar: 'bg-gradient-to-r from-orange-400 to-rose-400',
    badge: 'bg-orange-500/15 text-orange-400 border border-orange-400/25',
    hover: 'group-hover:text-orange-400',
    ring: 'group-hover:ring-orange-400/30',
    line: 'bg-gradient-to-r from-orange-400/60 to-rose-400/40',
  },
  vocabulary: {
    iconGradient: 'bg-gradient-to-br from-amber-400 to-orange-500',
    iconShadow: 'shadow-lg shadow-amber-500/25',
    iconBg: 'bg-amber-500/12 border border-amber-400/25',
    bar: 'bg-gradient-to-r from-amber-400 to-orange-400',
    badge: 'bg-amber-500/15 text-amber-500 border border-amber-400/25',
    hover: 'group-hover:text-amber-500',
    ring: 'group-hover:ring-amber-400/30',
    line: 'bg-gradient-to-r from-amber-400/60 to-orange-400/40',
  },
  reading: {
    iconGradient: 'bg-gradient-to-br from-rose-400 to-pink-500',
    iconShadow: 'shadow-lg shadow-rose-500/25',
    iconBg: 'bg-rose-500/12 border border-rose-400/25',
    bar: 'bg-gradient-to-r from-rose-400 to-pink-400',
    badge: 'bg-rose-500/15 text-rose-400 border border-rose-400/25',
    hover: 'group-hover:text-rose-400',
    ring: 'group-hover:ring-rose-400/30',
    line: 'bg-gradient-to-r from-rose-400/60 to-pink-400/40',
  },
  interview: {
    iconGradient: 'bg-gradient-to-br from-orange-500 to-amber-500',
    iconShadow: 'shadow-lg shadow-orange-500/25',
    iconBg: 'bg-orange-500/12 border border-orange-400/25',
    bar: 'bg-gradient-to-r from-orange-500 to-amber-400',
    badge: 'bg-orange-500/15 text-orange-400 border border-orange-400/25',
    hover: 'group-hover:text-orange-400',
    ring: 'group-hover:ring-orange-400/30',
    line: 'bg-gradient-to-r from-orange-500/50 to-amber-400/40',
  },
  presentation: {
    iconGradient: 'bg-gradient-to-br from-rose-400 to-orange-400',
    iconShadow: 'shadow-lg shadow-rose-500/25',
    iconBg: 'bg-rose-500/12 border border-rose-400/25',
    bar: 'bg-gradient-to-r from-rose-400 to-orange-300',
    badge: 'bg-rose-500/15 text-rose-400 border border-rose-400/25',
    hover: 'group-hover:text-rose-400',
    ring: 'group-hover:ring-rose-400/30',
    line: 'bg-gradient-to-r from-rose-400/60 to-orange-300/40',
  },
  conversation: {
    iconGradient: 'bg-gradient-to-br from-amber-300 to-rose-400',
    iconShadow: 'shadow-lg shadow-amber-500/20',
    iconBg: 'bg-amber-500/12 border border-amber-400/25',
    bar: 'bg-gradient-to-r from-amber-300 to-rose-400',
    badge: 'bg-amber-500/15 text-amber-500 border border-amber-400/25',
    hover: 'group-hover:text-amber-500',
    ring: 'group-hover:ring-amber-400/30',
    line: 'bg-gradient-to-r from-amber-300/60 to-rose-400/40',
  },
  debate: {
    iconGradient: 'bg-gradient-to-br from-red-400 to-orange-500',
    iconShadow: 'shadow-lg shadow-red-500/25',
    iconBg: 'bg-red-500/12 border border-red-400/25',
    bar: 'bg-gradient-to-r from-red-400 to-orange-400',
    badge: 'bg-red-500/15 text-red-400 border border-red-400/25',
    hover: 'group-hover:text-red-400',
    ring: 'group-hover:ring-red-400/30',
    line: 'bg-gradient-to-r from-red-400/60 to-orange-400/40',
  },
}

export function getModuleTheme(id) {
  return moduleThemes[id] || moduleThemes.speaking
}
