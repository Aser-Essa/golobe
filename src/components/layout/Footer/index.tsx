import FooterLinks from "./FooterLinks";
import SubscribeNewsletter from "./SubscribeNewsletter";

export default function Footer() {
  return (
    <div className="-mt-40 lg:-mt-26">
      <div className="relative translate-y-1/2">
        <SubscribeNewsletter />
      </div>
      <FooterLinks />
    </div>
  );
}
