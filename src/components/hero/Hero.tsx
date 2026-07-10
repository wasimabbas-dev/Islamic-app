import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const Hero = () => {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2">
        <HeroLeft />
        <HeroRight />
      </div>
    </section>
  );
};

export default Hero;
