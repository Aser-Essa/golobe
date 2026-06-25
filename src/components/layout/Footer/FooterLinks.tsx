import { footerLinks } from "#/lib/constants";
import Logo from "../Logo";
import FooterLinksBlock from "./FooterLinksBlock";

export default function FooterLinks() {
  return (
    <div className="bg-primary flex min-h-105.5 w-full flex-col justify-between gap-12 px-4 pt-54.5 pb-16 sm:px-8 md:px-16 lg:flex-row xl:px-26">
      <div className="flex-1 space-y-3 lg:space-y-6">
        <Logo varient="white" className="inline-block" />
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/asser.yasser.711906/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/facebook-icon-fill.svg" />
          </a>
          <a
            href="https://www.linkedin.com/in/asser-essa-a03407341/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/linkedin-icon-fill.svg" className="size-4.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/asser-essa-a03407341/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/youtube-icon-fill.svg" />
          </a>

          <a
            href="https://www.instagram.com/asser_essa_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/instagram-icon-fill.svg" />
          </a>
        </div>
      </div>
      <div className="flex flex-[2.5] flex-wrap items-start justify-between gap-8">
        {footerLinks.map((link, index) => (
          <FooterLinksBlock key={index} title={link.title} links={link.links} />
        ))}
      </div>
    </div>
  );
}
