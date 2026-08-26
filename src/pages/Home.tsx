import Hero from '@/components/Hero';
import About from '@/components/About';
import MyStack from '@/components/MyStack';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MyStack />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
