export default function Herosection() {
  return (
    <div className="relative">
      <div className="relative aspect-video min-h-[400px] w-full md:max-h-[572px]">
        <img
          src="herosection-bg.png"
          alt="hero-section"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-black/10"></div>
      </div>

      <div className="absolute max-md:top-1/2 right-0 left-0 flex flex-col items-center justify-center gap-3 md:gap-5 px-4 text-center text-white  max-md:-translate-y-1/2 md:top-35">
        <p className="font-trade-gothic text-[clamp(20px,4vw,40px)]  leading-none font-bold">
          Find Your Perfect Stay
        </p>
        <p className="font-trade-gothic  text-[clamp(34px,6vw,80px)] leading-none font-bold">
          Stay in Comfort
        </p>
        <p className=" text-[clamp(14px,3vw,20px)] font-semibold">
          Luxury hotels, cozy stays, and unforgettable experiences.
        </p>
      </div>
    </div>
  );
}
