import { WHY_CHOOSE_US } from "#/lib/constants";

export default function WhyUs() {
  return (
    <section className="space-y-14">
      <div className="space-y-6">
        <h2 className="font-trade-gothic text-2xl font-bold">
          Why choose Golobe?
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="hover:border-primary rounded-xl border bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className="border-primary/25 bg-primary/10 text-primary mb-5 flex size-14 items-center justify-center rounded-full border">
                  <Icon className="size-6" />
                </div>

                <h3 className="mb-2 font-semibold">{item.title}</h3>

                <p className="text-muted-foreground text-sm leading-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
