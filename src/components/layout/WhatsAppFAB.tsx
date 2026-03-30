import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/5492255628886"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 active:scale-95"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
    </a>
  );
}
