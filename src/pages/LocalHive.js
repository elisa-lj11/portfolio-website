// src/pages/LocalHive.js
import React from 'react';
import PageTemplate from '../components/PageTemplate';

import fullAppVideoUrl from '../assets/images/local-hive/full-app.mp4';
import needfindingInterviewsImageUrl from '../assets/images/local-hive/needfinding-interviews.png';
import initialSynthesisImageUrl from '../assets/images/local-hive/initial-synthesis.jpg';
import affinityMapImageUrl from '../assets/images/local-hive/affinity-map.jpg';

const LocalHive = () => {
  return (
    <PageTemplate title='"Local Hive": A Human-Centered AI Project'>
      <h2>Completed June 2019</h2>
      <div className="video-vertical">
        <video controls autoPlay muted>
          <source src={fullAppVideoUrl} type="video/mp4" />
        </video>
      </div>
      <br></br>
      <p>
        In my Senior Spring quarter at Stanford in 2019, I took "<a href="https://hci.stanford.edu/courses/cs377e/2019/sp/">CS 377E</a>: Designing Solutions to Global Grand Challenges: Human-Centered AI." In this class, I worked with a team of 4 on a quarter-long project applying design thinking, processes, and tools to the intersection of healthcare and smart technology. Over the course of 10 weeks, we underwent the design journey from ideation to iterating on prototypes to presenting our final product in a public fair, in which we received special recognition for our work.
        <br></br>
        <br></br>
        Our final product was an app-hosted platform that fostered community cohesion and social capital through a marketplace of projects and skills that allow community members to create and join projects, volunteer time, and further community involvement. Not only was the project fun to work on, but it gave me a fantastic template for how to design and build out a product. I detail this process in the sections below.
      </p>
      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>Background Research</h2>
      <p>
        Since the goal of the class was to develop a project using human-centered AI to address global challenges, we wanted to apply our technical skills for social good. One of our team members was from Colombia, so we began researching issues in the region. We quickly identified the pressing need to address the impacts of conflict and violence, particularly how these crises affect social infrastructure and community cohesion.
        <br></br>
        <br></br>
        Our background research revealed that social infrastructure—such as trust, social cohesion, and self-organization—was a key factor in building community resilience in conflict-affected areas. In Colombia, especially in Buenaventura, a coastal seaport city, communities were grappling with poverty, violence, and unemployment despite the city's importance as a trade hub (Miroff, 2016). Government and NGO efforts often focused on physical infrastructure, but evidence suggested that strengthening social bonds and fostering collaboration within communities was a more effective way to help them recover and thrive (Aldrich & Meyer, 2015).
        <br></br>
        <br></br>
        Based on these insights, we developed a project aimed at fostering social capital to help communities like Buenaventura become more resilient. We explored using tools like time banking, AI, and blockchain to enable people to exchange skills and services, which would reinforce social ties and support economic self-sufficiency. We were now ready to move to the next phase of needfinding, where we would engage directly with communities to understand their needs and ensure that our app design aligned with their goals.
      </p>
      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>Needfinding</h2>
      <p>
        We interviewed 8 people in total: 2 from Buenaventura, Colombia and 6 from Palo Alto, California. We wanted to get a sense of the differences between disparate communities, so we hoped that by reaching out to folks in Buenaventura, we could break out of our own Palo Alto bubble.
      </p>
      <p>
        We asked questions about the following 5 topics:
      </p>
      <ol>
        <li>
          <b>Community Description</b>: Gain insight into the overall characteristics of the community, including its demographics, culture, and unique aspects.
        </li>
        <li>
          <b>Community Problems</b>: Understand the main challenges faced by the community, such as issues related to poverty, violence, or lack of resources.
        </li>
        <li>
          <b>Interconnectivity</b>: Assess the level of social cohesion within the community and the extent of relationships with other communities.
        </li>
        <li>
          <b>Outstanding Members/Projects</b>: Identify key figures or initiatives within the community that are driving positive change or providing valuable services.
        </li>
        <li>
          <b>Applying Social Capital</b>: Explore how social capital is used within the community, and introduce the concept of time banking to gauge their interest in leveraging it for community improvement.
        </li>
      </ol>
      <p>
        When we completed our interviews, we coalesced our responses into a single spreadsheet.
      </p>
      <br></br>
      <img src={needfindingInterviewsImageUrl} width="60%"/>
      <br></br>
      <p>
        We then started a synthesis process by reviewing our interview notes and writing insights onto sticky notes which we grouped by interviewer.
      </p>
      <br></br>
      <img src={initialSynthesisImageUrl} width="50%"/>
      <br></br>
      <p>
        With the visual aid from the sticky notes, we then grouped the insights into categories like leadership qualities, community obstacles, and infrastructure issues, as well as identifying standout "super-members" who took on leadership roles. This process clarified key takeaways and allowed us to form meaningful narratives from our interview data.
      </p>
      <br></br>
      <img src={affinityMapImageUrl} width="70%"/>
      <br></br>
      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>Works Cited</h2>
      <ul>
        <li>
          Miroff, N (August 24, 2016) The staggering toll of Colombia's war with FARC rebels explained in numbers. The Washington Post. Available in  https://www.washingtonpost.com/
        </li>
        <li>
          Aldrich, D. P., & Meyer, M. A. (2015). Social capital and community resilience. American behavioral scientist, 59(2), 254-269.
        </li>
      </ul>
    </PageTemplate>
  );
};

export default LocalHive;