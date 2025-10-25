import { motion } from "framer-motion";
import "./AboutSection.css"

function AboutSection(){
    return (
        <div className="about-section" id="about">
        <div className="about-contender">

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2>About PMHUB</h2>
            <p className="about-subtitle">All Your Media. One Hub.</p>
            <p className="about-description">
              PMHub is your ultimate companion to track, rate, and share everything you watch, read, or play.
              From movies and series to anime, manga, books, and games — organize your media life in one
              intuitive and modern platform.
            </p>
            <p className="about-description">
              Build personal lists, get tailored recommendations, and connect with your friends through chat
              groups and shared experiences. Whether you're a casual viewer or a media completionist, PMHub
              evolves with your journey.
            </p>

            <motion.div
              className="about-features"
              initial="hidden"
              whileInView="visible"
              transition={{ staggerChildren: 0.5 }}
              viewport={{ once: true }}
            >
              {[
                { icon: "📊", text: "Track your progress across all media types" },
                { icon: "⭐", text: "Rate and review your favorites" },
                { icon: "🎯", text: "Get personalized recommendations" },
                { icon: "🫂", text: "Create groups and share media with friends" },
                { icon: "🏆", text: "Level up your profile and compete with others" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="feature-icon">{feature.icon}</span>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="/images/about-illustration.png" alt="PMHub Features" />
          </motion.div>
        </div>
      </div>
    )
}

export default AboutSection;