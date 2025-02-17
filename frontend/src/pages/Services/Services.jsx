import React from "react";
import { Link } from "react-router-dom";
import webImage from "../../assets/images/card-web.png";
import seoImage from "../../assets/images/card-seo.png";
import socialMediaImage from "../../assets/images/card-mark.png";
import "./services.css";

const Services = () => {
    const servicesData = [
        {
            title: "Custom Web Development",
            description: "We create responsive, visually stunning, and functional websites tailored to your brand.",
            points: ["Mobile-friendly design", "SEO-optimized structure", "Custom integrations (e.g., e-commerce, CRM tools)"],
            img: webImage,
            bg: "service-bg-1",
        },
        {
            title: "SEO That Drives Results",
            description: "Boost your online visibility with tailored strategies that get your business noticed.",
            points: ["🔍 Keyword research and optimization", "📄 On-page and off-page SEO", "📈 Monthly performance reporting"],
            img: seoImage,
            bg: "service-bg-2",
        },
        {
            title: "Social Media Marketing",
            description: "Create a strong social presence with campaigns that captivate your audience.",
            points: [
                "Platform-specific strategies (e.g., Instagram, LinkedIn, Facebook)",
                "Professional content creation and curation",
                "Analytics and performance tracking to measure success",
            ],
            img: socialMediaImage,
            bg: "service-bg-3",
        },
    ];
    return (
        <div className="services-container">
          <section className="services-intro">
            <h1>
              <span className="expertise">Our Expertise,</span>
              <span className="advantage"> Your Advantage</span>
            </h1>
            <p>
              From cutting-edge web development to impactful marketing strategies, we deliver solutions that help your business stand out.
            </p>
          </section>

            {servicesData.map((service, index) => (
                <section key={index} className={`service-section ${service.bg}`}>
                    <div className={`service-text ${index % 2 === 0 ? "left" : "right"}`}>
                        <h2>{service.title}</h2>
                        <p>{service.description}</p>
                        <ul>
                            {service.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="service-image">
                        <img src={service.img} alt={service.title} />
                    </div>
                </section>
            ))}

            <section className="services-packages">
                <h2>Tailored Packages for Every Business</h2>
                <p>Choose from flexible packages combining our core services to suit your needs.</p>
                <div className="packages-grid">
                    {[
                        { name: "Starter Package", features: ["Web Development", "Basic SEO"], icon: "🛠️", bg: "package-bg-1" },
                        { name: "Growth Package", features: ["Web Development", "SEO", "Social Media Marketing"], icon: "📈", bg: "package-bg-2" },
                        { name: "Custom Package", features: ["Fully tailored to your business goals"], icon: "🎨", bg: "package-bg-3" },
                    ].map((pkg, index) => (
                        <div key={index} className={`package-card ${pkg.bg}`}>
                            <div className="package-icon">{pkg.icon}</div>
                            <h3>{pkg.name}</h3>
                            <ul>
                                {pkg.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                            <div className="package-price">Contact Us for Pricing</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="services-cta">
                <h2>Ready to Elevate Your Business?</h2>
                <Link to="/contact" className="cta-button">
                    Contact Us
                </Link>
            </section>
        </div>
    );
};

export default Services;
