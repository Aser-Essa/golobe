import { Link } from "@tanstack/react-router";

export default function ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="w-38 space-y-4 md:w-auto">
      <p className="font-trade-gothic text-base font-bold">{title}</p>
      <ul className="text-foreground/70 space-y-2 text-sm font-medium">
        {links.map((link, index) => (
          <li key={index}>
            <Link viewTransition to={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
