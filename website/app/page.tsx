import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import VideoDemoSection from '../components/VideoDemoSection'
import ScrollStory from '../components/ScrollStory'
import CloudMatrix from '../components/CloudMatrix'
import WorkflowSection from '../components/WorkflowSection'
import ComparisonSection from '../components/ComparisonSection'
import SecurityVault from '../components/SecurityVault'
import DisasterRecovery from '../components/DisasterRecovery'
import SchedulerSection from '../components/SchedulerSection'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue">
      {/* Product Navigation */}
      <Navbar />

      <main className="flex-1 space-y-6 sm:space-y-12">
        {/* 1. Hero & Kura Philosophy */}
        <Hero />

        {/* 2. Interactive Video Product Demo */}
        <VideoDemoSection />

        {/* 3. Scroll Story: lets-scroll 4-act journey */}
        <ScrollStory />

        {/* 4. Supported Cloud Destinations Matrix */}
        <CloudMatrix />

        {/* 5. Simple 3-Step Setup Workflow */}
        <WorkflowSection />

        {/* 6. Why GitKura Comparison Table */}
        <ComparisonSection />

        {/* 7. Air-Gapped Security & Zero-Telemetry Privacy */}
        <SecurityVault />

        {/* 8. Disaster Recovery: 3 Ways to Restore */}
        <DisasterRecovery />

        {/* 9. Automated Background Sync */}
        <SchedulerSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Product Footer */}
      <Footer />
    </div>
  )
}
