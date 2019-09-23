import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { cl } from '../styled/GlobalStyle';

const About = ({ profile }) => {
  const { bio, location, website, skills, user } = profile[0];
  console.log(skills);
  return (
    <StyledAbout>
      <section className="col-1 col">
        <p>Location: {location}</p>
      </section>
      <section className="col-2 col">
        <p>{website !== null ? <span>Website: {website}</span> : null}</p>
      </section>
      <section className="col-3 col">
        <p>
          {user.name.split(' ')[0]}'s Bio: {bio}
        </p>
      </section>
      <section className="col-4 col skills">skills</section>
    </StyledAbout>
  );
};

About.propTypes = {
  profile: PropTypes.array.isRequired,
};

const StyledAbout = styled.div`
  padding: 2rem 1.5rem;
  background: ${cl.white};
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  width: 100%;
  margin: 1.5rem 0;
  justify-content: center;
  color: ${cl.dark};
  section {
    margin: 1rem;
    padding: 1rem;
  }
  .col-3 {
  }
`;

export default About;
