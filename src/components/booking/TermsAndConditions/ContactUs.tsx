import { contactUsDetails } from "#/lib/constants";

export default function ContactUs() {
  return (
    <div className="space-y-4">
      <p className="text-xl font-medium">Contact Us</p>
      <ul>
        {contactUsDetails.map((term, index) => (
          <li key={index}>
            <p className="text-sm">{term}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
