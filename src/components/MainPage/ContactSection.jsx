import { useState } from "react";
import "./ContactSection.css";

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 A enviar formulário:", form);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("📥 Resposta do servidor:", data);

      if (!res.ok) throw new Error(data.message);

      setStatus("Message sent! ✅");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      console.error("❌ Erro ao enviar:", err);
      setStatus("Error sending message. ❌");
    }
  };

  return (
    <div className="contact-section" id="contact">
      <div className="contact-contender">
        <div className="contact-text">
          <h2>Get In Touch</h2>
          <p className="contact-subtittle">Always available for you</p>
          <p className="contact-description">
            Have questions, suggestions, or just want to say hello? We'd love to
            hear from you! Reach out to our team.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=joao.evaristo.work@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>joao.evaristo.work@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="contact-item">
              <a
                href="https://github.com/joaoevaristo11/PMHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon">
                  <img
                    src="/images/Contacts/discord_clyde.png"
                    alt="Discord"
                  />
                </span>
                <div>
                  <h4>Discord</h4>
                  <p>Join our community server</p>
                </div>
              </a>
            </div>

            <div className="contact-item">
              <a
                href="https://github.com/joaoevaristo11/JustTakes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon">
                  <img
                    src="/images/Contacts/github-mark.png"
                    alt="GitHub"
                  />
                </span>
                <div>
                  <h4>GitHub</h4>
                  <p>Contribute to the project</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-sec">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-sec">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-sec">
              <textarea
                name="message"
                placeholder="Your message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact-button">
              Send Message
            </button>
            {status && (<p className="status-message" style={{ marginTop: "10px" }}>{status}</p>)}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
