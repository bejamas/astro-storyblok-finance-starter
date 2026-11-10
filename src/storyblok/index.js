import { defineStoryblokBlocks } from '@storyblok/astro'
import AdvisersSection from './AdvisersSection.astro'
import BannerCta from './BannerCta.astro'
import BannerSplit from './BannerSplit.astro'
import Button from './Button.astro'
import FeaturesSection from './FeaturesSection.astro'
import Heading from './Heading.astro'
import Hero from './Hero.astro'
import Page from './Page.astro'
import PartnersSection from './PartnersSection.astro'
import Report from './Report.astro'
import ReportsList from './ReportsList.astro'
import ReportsSection from './ReportsSection.astro'
import StatsSection from './StatsSection.astro'
import TeamSection from './TeamSection.astro'
import TestimonialsSection from './TestimonialsSection.astro'

// Maps Storyblok technical block names to the components that render them.
// Extra props passed to StoryblokBlock (language, translate, classes) are forwarded to the component.
export const { StoryblokBlock, StoryblokRichText } = defineStoryblokBlocks(() => ({
  components: {
    advisers_section: AdvisersSection,
    banner_cta: BannerCta,
    banner_split: BannerSplit,
    button: Button,
    features_section: FeaturesSection,
    heading: Heading,
    hero: Hero,
    page: Page,
    partners_section: PartnersSection,
    report: Report,
    reports_list: ReportsList,
    reports_section: ReportsSection,
    stats_section: StatsSection,
    team_section: TeamSection,
    testimonials_section: TestimonialsSection,
  },
}))
