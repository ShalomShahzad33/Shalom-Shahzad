import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MyWork from "./components/MyWork";
import TechStack from "./components/TechStack";

const App = () => {
  return (
    <main className="">
      <Hero />
      <About />
      <TechStack />
      <MyWork />
      <Footer />
    </main>
  );
};

export default App;
