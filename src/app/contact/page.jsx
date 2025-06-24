import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <div className="bg-black">
      <Navbar />
      
    <div className="min-h-screen flex items-center ">
      <ContactForm />
    </div>
    </div>
  );
}
