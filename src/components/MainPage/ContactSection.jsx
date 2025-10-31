import { useState } from "react";
import "./ContactSection.css"

function ContactSection(){
    return(
        <div className="contact-section" id="contact">
        <div className="contact-contender">

          <div className="contact-text">
            <h2>Get In Touch</h2>
            <p className="contact-subtittle">Always available for you</p>
            <p className="contact-description">
              Have questions, suggestions, or just want to say hello?
              We'd love to hear from you! Reach out to our team.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=joao.evaristo.work@gmail.com" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>joao.evaristo.work@gmail.com</p>
                </div>
                </a>
              </div>

              <div className="contact-item">
                <a href="https://github.com/joaoevaristo11/PMHub" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">
                  <img src="/images/Contacts/discord_clyde.png" alt="Discord" />
                </span>
                <div>
                  <h4>Discord</h4>
                  <p>Join our community server</p>
                </div>
                </a>
              </div>

              <div className="contact-item">
                <a href="https://github.com/joaoevaristo11/PMHub" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">
                  <img src="/images/Contacts/github-mark.png" alt="GitHub" />
                </span>
                <div>
                  <h4>Github</h4>
                  <p>Contribute to the project</p>
                </div>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form>
              <div className="form-sec">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-sec">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-sec">
                <textarea placeholder="Your message" rows="5" required />
              </div>
              <button type="submit" className="contact-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default ContactSection