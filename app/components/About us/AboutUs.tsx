import { Sprout, HeartHandshake, Leaf, Palette, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Sprout,
    title: "Quality Plants",
    description: "In consequat quamid sodales hendrerit eros mi lacinia",
  },
  {
    icon: HeartHandshake,
    title: "Plant Renovation",
    description: "In consequat quamid sodales hendrerit eros mi lacinia",
  },
  {
    icon: Leaf,
    title: "Seed Supply",
    description: "In consequat quamid sodales hendrerit eros mi lacinia",
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "In consequat quamid sodales hendrerit eros mi lacinia",
  },
];

const AboutUs = () => {
  return (
    <section className="bg-[#E9EEE8] py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-2 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16  items-center">
          {/* Left: Text content */}
          <div className="md:mr-2 lg:mr-8 xl:mr-14">
            <span className="inline-block text-[#5a8139] font-semibold text-sm tracking-wide mb-4">
              ABOUT OUR SERVICES
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#192C27] leading-tight mb-6">
              We just love our work and plant nature, so we provide a high
              quality services
            </h2>

            <div className="space-y-4 text-[#5b6660] text-base leading-relaxed mb-8">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis etquasi.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                odit aut fugit, sed quia consequuntur magni dolores eos qui
                ratione voluptatem sequi nesciunt. Neque porro quisquam est
                qui dolorem.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 bg-[#5a8139] hover:bg-[#264123] text-white text-sm font-semibold tracking-wide px-7 py-3.5 rounded-md transition-colors">
              BROWSE
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right: Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
  key={service.title}
  className="group bg-white lg:w-83.75 lg:h-73.75 rounded-xl p-7 sm:p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 hover:bg-[#5a8139]"
>
  <div className="flex justify-center mt-10 mb-5">
    <Icon
      size={46}
      strokeWidth={1.5}
      className="text-[#5a8139] transition-colors duration-300 group-hover:text-white"
    />
  </div>

  <h3 className="font-semibold text-lg text-[#192C27] mb-2 transition-colors duration-300 group-hover:text-white">
    {service.title}
  </h3>

  <p className="text-sm text-[#8E98A0] leading-relaxed transition-colors duration-300 group-hover:text-white">
    {service.description}
  </p>
</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;