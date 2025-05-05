import React from 'react';

const About = () => {
  const teamMembers = [
    { name: "Anita Badu", photo: "/images/anita.jpg" },
    { name: "Dinesh Prasad Bhatt", photo: "/images/dinesh.jpg" },
    { name: "Goma Chand", photo: "/images/goma.jpg" },
    { name: "Puskar Bhatt", photo: "/images/puskar.JPG" },
  ];

  const features = [
    "Mock Tests That Feel Real: Practice with timed mock exams that give the feeling of the actual NEC test environment.",
    "Track Your Progress: See your improvement clearly using simple progress charts that show where you're doing well and where you need practice.",
    "Healthy Competition: Compete on the leaderboard with other learners to stay motivated and push yourself to perform better.",
  ];

  return (
    <section className="bg-gradient-to-br from-white to-gray-100 text-gray-800">
      {/* Meet the Team Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl font-extrabold mb-4">Meet the Team Behind the Mission</h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          We are a group of computer engineering students from Far Western University who believe learning should be practical, smart, and fun. After facing challenges while preparing for the NEC exam ourselves, we decided to create a helpful online platform. Our goal is to make exam preparation easier and more effective for engineering students across Nepal. By combining our technical skills with real exam experience, we’ve built tools that students can trust. This platform is made by students, for students—because we understand what you need and what works best. Let’s prepare smarter together and make success more achievable.
        </p>
      </div>

      <div className="border-t-2 border-gray-200 my-8 w-2/3 mx-auto"></div>

      {/* Team Members Section */}
      <div className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Who We Are</h2>
        <div className="flex flex-wrap justify-center gap-10 px-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
              <img
                src={member.photo}
                alt={member.name}
                className="w-28 h-28 rounded-full shadow-lg object-cover mx-auto mb-4"
              />
              <p className="text-lg font-medium">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-gray-200 my-8 w-2/3 mx-auto"></div>

      {/* Our Vision Section */}
      <div className="py-12 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">Our Vision</h2>
        <p className="text-lg max-w-2xl mx-auto text-center leading-relaxed">
          Our vision is to help engineering students succeed in their NEC exams with more confidence and less stress. We believe that learning should not only be about reading books but also about practicing what you learn in real situations. Through our platform, we provide tools that make students feel like they’re actually taking the NEC exam. We also want to make learning more enjoyable with clear progress tracking and friendly competition. In short, we aim to build a smarter, more practical way to prepare for exams, so students feel ready and perform their best when it matters most.
        </p>
      </div>

      <div className="border-t-2 border-gray-200 my-8 w-2/3 mx-auto"></div>

      {/* What We Offer Section */}
      <div className="py-12 bg-white px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What We Offer</h2>
        <p className="text-base max-w-2xl mx-auto mb-4 text-center leading-relaxed text-gray-700">
          We provide the key features every NEC exam student needs. From realistic mock tests to helpful performance charts and leaderboards,
          our platform is built to guide and motivate you at every step.
        </p>
        <ul className="max-w-2xl mx-auto space-y-2 text-base leading-tight text-gray-800">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✔️</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t-2 border-gray-200 my-8 w-2/3 mx-auto"></div>

      {/* Call to Action Section */}
      <div className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Join the Future of Exam Prep</h2>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Ready to make your NEC exam preparation smarter and easier? Join our platform and start practicing with confidence today.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default About;
