import { Button } from "#/components/ui/button";
import Container from "../Container";

export default function SubscribeNewsletter() {
  return (
    <Container>
      <div className="box-shadow-sm flex min-h-76.25 items-center justify-between gap-20 rounded-[20px] bg-[#CDEAE1] p-4 pb-0! md:p-6">
        <div className="h-full pb-4 md:pb-6">
          <p className="font-trade-gothic text-[32px] leading-none font-bold md:text-[44px] md:leading-[54px]">
            Subscribe <br /> Newsletter
          </p>

          <div className="space-y-4">
            <div className="mt-6 space-y-2">
              <p className="text-foreground/80 font-trade-gothic text-xl font-bold">
                The Travel
              </p>
              <p className="text-foreground/70 text-base font-medium">
                Get inspired! Receive travel discounts, tips and behind the
                scenes stories.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row">
              <input
                type="text"
                placeholder="Your email address"
                className="placeholder:text-foreground h-14 w-full rounded-[4px] bg-white px-4 py-2"
              />
              <Button className="bg-foreground hover:bg-foreground/80 h-14 w-full max-w-none text-white md:max-w-26">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden w-full max-w-100 lg:block">
          <img src="/news-letter-img.svg" className="h-full w-full" />
        </div>
      </div>
    </Container>
  );
}
