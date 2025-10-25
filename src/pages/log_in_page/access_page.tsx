import LogoImageSection from '@/pages/log_in_page/logo_image_section.tsx';
import type LogInSection from "@/pages/log_in_page/log_in_section.tsx";
import type SignUpSection from "@/pages/log_in_page/sign_up_section.tsx";

interface AccessPageProps {
  Section: typeof LogInSection | typeof SignUpSection;
}

export function AccessPage({Section}: AccessPageProps) {
  return (
    <div className="flex h-screen w-screen font-sans">
      <LogoImageSection/>
      <Section />
    </div>
  );
}
