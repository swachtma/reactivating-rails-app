import { Responsive } from 'semantic-ui-react'

export const onlyMobile = { maxWidth: Responsive.onlyMobile.maxWidth }
export const onlyTablet = Responsive.onlyTablet
export const onlyDesktop = Responsive.onlyComputer
export const onlyLarge = Responsive.onlyLargeScreen
export const onlyWide = Responsive.onlyWidescreen

export const aboveMobile = { minWidth: onlyMobile.maxWidth + 1 }
export const aboveTablet = { minWidth: onlyTablet.maxWidth + 1 }
export const aboveDesktop = { minWidth: onlyDesktop.maxWidth + 1 }

export const belowTablet = { maxWidth: onlyTablet.minWidth - 1 }
export const belowDesktop = { maxWidth: onlyDesktop.minWidth - 1 }
export const belowLarge = { maxWidth: onlyLarge.minWidth - 1 }
