"use client";

type CookieSettingsButtonProps = {
  className?: string;
};

export default function CookieSettingsButton({
  className = "",
}: CookieSettingsButtonProps) {
  const openCookieSettings = () => {
    window.dispatchEvent(
      new Event("kuka:open-cookie-settings")
    );
  };

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={`font-normal focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A1E19] ${className}`}
    >
      Cookie Settings
    </button>
  );
}