import Hero from '@/components/hero/Hero';
import Resume from '@/components/resume/Resume';
import Contact from '@/components/contact/Contact';
import PiStatus from '@/components/pi-status/PiStatus';

export default function Home() {
  return (
    <main>
      <Hero />
      <Resume />
      <Contact />
      {/* <PiStatus /> */}
    </main>
  );
}
