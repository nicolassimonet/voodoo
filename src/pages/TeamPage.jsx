import React from 'react';
import Navigation from '../components/Navigation';
import Particles from '../components/Particles';

const TeamPage = () => {
  const teamMembers = [
    { name: 'Caroline'},
    { name: 'Christelle'},
    { name: 'Emmanuelle'},
    { name: 'Claude'},
    { name: 'Nicolas'}
  ];

  return (
    <div className="page-container">
      <Navigation />
      <div className="team-section">
        <Particles />
        <div className="team-hero">
          <h1 className="team-title">Notre Équipe</h1>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="team-member"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="member-content">
                <h2>{member.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
