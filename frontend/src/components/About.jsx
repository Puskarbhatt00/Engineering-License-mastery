import React from 'react';

const About = () => {
  const teamMembers = [
    { name: "Anita Badu", photo: "/images/anita.jpg" },
    { name: "Dinesh Prasad Bhatt", photo: "/images/dinesh.jpg" },
    { name: "Goma Chand", photo: "/images/goma.jpg" },
    { name: "Puskar Bhatt", photo: "/images/puskar.JPG" },
  ];

  const features = [
    "Realistic Mock Tests: Randomized question sets with timed sessions to replicate NEC exam conditions",
    "Personalized Progress Analytics: Visual graphs to track strengths, weaknesses, and overall growth",
    "Competitive Leaderboards: Rank users to encourage healthy competition",
  ];

  return (
    <section className="p-8">
      <div className="content-section mb-8">
        <p className="text-lg max-w-2xl mx-auto text-center">
          We are a team of undergraduate students from the Department of Computer Engineering
          at the School OF ENGINEERING (SOE), Far Western University (FWU), passionate about leveraging technology to address educational challenges.
        </p>
      </div>

      <div className="content-section mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Who We Are</h2>
        <ul className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <li key={index} className="text-center">
              <img src={member.photo} alt={member.name} className="w-24 h-24 object-cover rounded-full mb-4 shadow-lg" />
              <div>{member.name}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="content-section mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Our Vision</h2>
        <p className="text-lg max-w-2xl mx-auto text-center">
          To revolutionize NEC exam preparation by bridging the gap between theoretical knowledge
          and practical readiness through simulated exam environments and gamified learning experiences.
        </p>
      </div>

      <div className="content-section mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">What We Offer</h2>
        <ul className="list-disc list-inside max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <li key={index} className="text-lg mb-3">{feature}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
