import { CalendarDays, Phone } from "lucide-react";
import type { PracticeProfile } from "@vadentalcare/shared";

type MobileBottomBarProps = {
  practice: PracticeProfile;
};

export function MobileBottomBar({ practice }: MobileBottomBarProps) {
  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile quick actions">
      <a href={`tel:${practice.phoneE164}`}>
        <Phone size={18} />
        Call
      </a>
      <a href="#booking">
        <CalendarDays size={18} />
        Request
      </a>
    </nav>
  );
}
