import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const teamMembers = [
  { name: "Puskar Bhatt", photo: "/images/puskar.JPG", role: "Full Stack Developer" },
  { name: "Anita Badu", photo: "/images/anita.jpg", role: "Frontend Developer" },
  { name: "Dinesh Prasad Bhatt", photo: "/images/dinesh.jpg", role: "Backend Developer" },
  { name: "Goma Chand", photo: "/images/goma.jpg", role: "UI/UX Designer" },
  
];

const features = [
  "Mock Tests That Feel Real: Practice with timed mock exams that give the feeling of the actual NEC test environment.",
  "Track Your Progress: See your improvement clearly using simple progress charts that show where you're doing well and where you need practice.",
  "Healthy Competition: Compete on the leaderboard with other learners to stay motivated and push yourself to perform better.",
];

const About = () => (
  <section className="bg-gradient-to-br from-white to-gray-100 text-gray-800 min-h-screen">
    {/* Meet the Team Section */}
    <div className="max-w-4xl mx-auto text-center py-14 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Meet the Team Behind the Mission</h1>
      <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-10">
        We are a group of computer engineering students from Far Western University who believe learning should be practical, smart, and fun. After facing challenges while preparing for the NEC exam ourselves, we decided to create a helpful online platform. Our goal is to make exam preparation easier and more effective for engineering students across Nepal. By combining our technical skills with real exam experience, we’ve built tools that students can trust. This platform is made by students, for students-because we understand what you need and what works best. Let’s prepare smarter together and make success more achievable.
      </p>
      {/* Team Layout: Featured + Row */}
      <div className="flex flex-col items-center gap-8">
        {/* Featured member */}
        <div className="bg-white rounded-2xl shadow-lg w-56 p-6 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl mb-2">
          <img
            src={teamMembers[0].photo}
            alt={teamMembers[0].name}
            className="w-24 h-24 rounded-full object-cover shadow mb-4 border-4 border-blue-100"
          />
          <p className="text-lg font-semibold">{teamMembers[0].name}</p>
          <span className="text-blue-600 text-sm mt-1">{teamMembers[0].role}</span>
        </div>
        {/* Row of the remaining three */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.slice(1).map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg w-56 p-6 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover shadow mb-4 border-4 border-blue-100"
              />
              <p className="text-lg font-semibold">{member.name}</p>
              <span className="text-blue-600 text-sm mt-1">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t-2 border-gray-200 my-12 w-2/3 mx-auto"></div>

    {/* Our Vision Section */}
    <div className="max-w-3xl mx-auto py-12 px-4 bg-gray-50 rounded-xl shadow-sm mb-12">
      <h2 className="text-3xl font-bold text-center mb-6">Our Vision</h2>
      <p className="text-lg text-center leading-relaxed">
        Our vision is to help engineering students succeed in their NEC exams with more confidence and less stress. We believe that learning should not only be about reading books but also about practicing what you learn in real situations. Through our platform, we provide tools that make students feel like they’re actually taking the NEC exam. We also want to make learning more enjoyable with clear progress tracking and friendly competition. In short, we aim to build a smarter, more practical way to prepare for exams, so students feel ready and perform their best when it matters most.
      </p>
    </div>

    {/* What We Offer Section */}
    <div className="max-w-3xl mx-auto py-12 bg-white px-4 rounded-xl shadow-sm mb-12">
      <h2 className="text-3xl font-bold text-center mb-4">What We Offer</h2>
      <p className="text-base max-w-2xl mx-auto mb-6 text-center leading-relaxed text-gray-700">
        We provide the key features every NEC exam student needs. From realistic mock tests to helpful performance charts and leaderboards,
        our platform is built to guide and motivate you at every step.
      </p>
      <ul className="space-y-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-lg">
            <FaCheckCircle className="text-blue-600 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Call to Action Section */}
    <div className="py-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center px-4 rounded-xl shadow-lg max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl font-bold mb-4">Join the Future of Exam Prep</h2>
      <p className="text-lg max-w-xl mx-auto mb-6">
        Ready to make your NEC exam preparation smarter and easier? Join our platform and start practicing with confidence today.
      </p>
      <a
        href="/signup"
        className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition text-lg"
      >
        Get Started Now
      </a>
    </div>
  </section>
);

export default About;
