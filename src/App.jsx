import About from "./components/About";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";

const App = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <TechStack />
    </main>
  );
};

export default App;
