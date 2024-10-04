// src/pages/LocalHive.js
import React from 'react';
import PageTemplate from '../components/PageTemplate';

import fullAppVideoUrl from '../assets/images/local-hive/full-app.mp4';
import needfindingInterviewsImageUrl from '../assets/images/local-hive/needfinding-interviews.png';
import initialSynthesisImageUrl from '../assets/images/local-hive/initial-synthesis.jpg';
import affinityMapImageUrl from '../assets/images/local-hive/affinity-map.jpg';
import leaderEmpathyMapImageUrl from '../assets/images/local-hive/community-leader-empathy-map.png';
import memberEmpathyMapImageUrl from '../assets/images/local-hive/community-member-empathy-map.png';
import journeyMapStickyNotesImageUrl from '../assets/images/local-hive/2-by-2-journey-map-sticky-notes.png';
import journeyMapCondensedImageUrl from '../assets/images/local-hive/2-by-2-journey-map-condensed.png';
import hmwIdeationImageUrl from '../assets/images/local-hive/hmw-ideation.jpg';
import hmwAffinityGroupingImageUrl from '../assets/images/local-hive/hmw-affinity-grouping.jpg';
import hmwSolutionBrainstormImageUrl from '../assets/images/local-hive/hmw-solution-brainstorm.png';
import hmwSolutionFinalIdeasImageUrl from '../assets/images/local-hive/hmw-solution-final-ideas.png';
import e1Prototype1ImageUrl from '../assets/images/local-hive/e1-prototype-1.png';
import e1Prototype2ImageUrl from '../assets/images/local-hive/e1-prototype-2.png';
import conceptSketchesImageUrl from '../assets/images/local-hive/concept-sketches.png';
import uiSketch1ImageUrl from '../assets/images/local-hive/ui-sketch-1.jpg';
import uiSketch2ImageUrl from '../assets/images/local-hive/ui-sketch-2.jpg';
import uiSketch3ImageUrl from '../assets/images/local-hive/ui-sketch-3.jpg';
import easyTaskFlowImageUrl from '../assets/images/local-hive/easy-task-flow.png';
import mediumTaskFlowImageUrl from '../assets/images/local-hive/medium-task-flow.png';
import complexTaskFlowImageUrl from '../assets/images/local-hive/complex-task-flow.png';
import lowFiOverviewImageUrl from '../assets/images/local-hive/low-fi-overview.jpg';

const FIGMA_URL = 'https://embed.figma.com/proto/3kFM2Rku8FVGHng69FMslw/MidFi-(Final-Draft)?node-id=7-8&node-type=canvas&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&embed-host=share';

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
        We interviewed 8 people in total: 2 from Buenaventura, Colombia and 6 from Palo Alto, California, some of which self-identified as "community leaders" and others as "community members." We wanted to get a sense of the differences between disparate communities, so we hoped that by reaching out to folks in Buenaventura, we could break out of our own Palo Alto bubble.
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
      <img src={needfindingInterviewsImageUrl} alt='Needfinding Interviews' width='60%'/>
      <br></br>
      <p>
        We then started a synthesis process by reviewing our interview notes and writing insights onto sticky notes which we grouped by interviewer. We guided our insights with the overarching question "How might we help communities overcome crises?".
      </p>
      <br></br>
      <img src={initialSynthesisImageUrl} alt='Initial Synthesis' width='50%'/>
      <br></br>
      <p>
        With the visual aid from the sticky notes, we then grouped the insights into categories like leadership qualities, community obstacles, and infrastructure issues, as well as identifying standout "super-members" who took on leadership roles. This process clarified key takeaways and allowed us to form meaningful narratives from our interview data.
      </p>
      <br></br>
      <img src={affinityMapImageUrl} alt='Affinity Map' width='70%'/>
      <br></br>
      <p>
        We distilled the insights from our affinity map even further into two empathy maps: one for a community leader, and one for a community member.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <figure>
            <img
            src={leaderEmpathyMapImageUrl}
            alt='Community Leader Empathy Map'
            style={{ width: '70%', display: 'inline-block', marginRight: '2%' }}
          />
          <figcaption>Community Leader Empathy Map</figcaption>
        </figure>
        <figure>
          <img
            src={memberEmpathyMapImageUrl}
            alt='Community Member Empathy Map'
            style={{ width: '70%', display: 'inline-block' }}
          />
          <figcaption>Community Member Empathy Map</figcaption>
        </figure>
      </div>
      <br></br>
      <p>
        Between our affinity map and our empathy maps, we noticed some trends that could be mapped to a 2x2 journey map, where one axis was low versus high community cohesion, and the second axis was leadership versus membership. From these graphs, we realized that a community is able to self-organize when the lines between leadership and membership blur into a state of equal collaboration.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <figure>
            <img
            src={journeyMapStickyNotesImageUrl}
            alt='Initial 2x2 Journey Map'
            style={{ width: '90%', display: 'inline-block', marginRight: '2%' }}
          />
          <figcaption>Initial 2x2 Journey Map using sticky notes from past exercises</figcaption>
        </figure>
        <figure>
          <img
            src={journeyMapCondensedImageUrl}
            alt='Condensed 2x2 Journey Map'
            style={{ width: '70%', display: 'inline-block' }}
          />
          <figcaption>Condensed 2x2 Journey Map</figcaption>
        </figure>
      </div>
      <br></br>
      <p>
        To conclude our needfinding exercise, we summarized our insights into the following points:
      </p>
      <ol>
        <li>
          Communities differed mainly in their level of cohesion.
        </li>
        <li>
          Low-cohesion communities had clear leaders focused on distributing tasks and resources.
        </li>
        <li>
          Medium-cohesion communities saw leaders act as organizers, while members took on larger roles themselves.
        </li>
        <li>
          High-cohesion communities governed by consensus, with little distinction between leaders and members.
        </li>
        <li>
          As cohesion increases, leadership skills both influence members and empower new leaders.
        </li>
        <li>
          Technology is used differently across communities, from communication in low-cohesion to collaboration in high-cohesion groups.
        </li>
        <li>
          Helping each other is necessary in low-cohesion communities but voluntary in high-cohesion ones.
        </li>
        <li>
          Leaders seek recognition in low-cohesion settings, while in higher-cohesion communities, leadership roles are often more understated.
        </li>
      </ol>
      <p>
        By this point we felt like we had a deep understanding of our community cohesion problem, so we were ready to move onto the next steps of generating "Point of View" and "How Might We?" statements. 
      </p>
      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>"Point of View" and "How Might We?" Statements</h2>
      <p>
        We collected the following 3 points of view from a subset of our interviewees:
      </p>
      <ol>
        <li>
          "Leonard," a community leader, sees his role as connecting external resources with internal needs. However, his tendency to prioritize external solutions over local talent reveals an opportunity to shift leaders' mindsets towards leveraging internal resources first.
        </li>
        <li>
          "Ashley," an aspiring social worker in Buenaventura, feels that leadership in her community is exclusionary, preventing her from stepping up. Dismantling existing leadership structures could empower new leaders and promote more inclusive community involvement.
        </li>
        <li>
          Palo Alto cooperative living members have naturally built a knowledge-sharing network through daily interactions, but unequal distribution of voice within the group shows a need to create a more balanced and collaborative environment.
        </li>
      </ol>
      <p>
        We used these POVs to brainstorm 53 "How might we?" statements that we tracked with sticky notes.
      </p>
      <br></br>
      <img src={hmwIdeationImageUrl} alt='HMW Ideation' width='100%'/>
      <br></br>
      <p>
        We then reorganized the HMW sticky notes into affinity groups, and as a group we voted on 3 themes to focus on:
      </p>
      <ul>
        <li>
          Members Speak Up
        </li>
        <li>
          Searching for Resources
        </li>
        <li>
          Teaching Skills
        </li>
      </ul>
      <br></br>
      <img src={hmwAffinityGroupingImageUrl} alt='HMW Affinity Grouping' width='100%'/>
      <br></br>
      <p>
        We generated a final set of HMWs from these themes:
      </p>
      <ol>
        <li>
          How might we break up hierarchical community structures that prevent new leaders from speaking up?
        </li>
        <li>
          How might we advertise one's skills more broadly?
        </li>
        <li>
          How might we make people share and recruit skills inside the community? 
        </li>
      </ol>
      <p>
        Equipped with our finalized HMWs, we moved onto the solution ideation phase of the design process.
      </p>
      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>Solution Ideation</h2>
      <p>
        We launched another sticky note brainstorm session, this time generating 48 ideas for our 3 HMW groups.
      </p>
      <br></br>
      <img src={hmwSolutionBrainstormImageUrl} alt='HMW Solution Brainstorm' width='100%'/>
      <br></br>
      <p>
        As a group we voted for our favorite ideas and landed on 34 options.
      </p>
      <br></br>
      <img src={hmwSolutionFinalIdeasImageUrl} alt='HMW Solution Final Ideas' width='60%'/>
      <br></br>
      <p>
        After a final voting round, we landed on the following 4 ideas:
      </p>
      <ul>
        <li>
          Matching/apprenticeship program for those who want to learn with those who can teach it
        </li>
        <li>
          Place for leaders and community members to post and find skills that they need
        </li>
        <li>
          Pop-up classes/skill teach-ins
        </li>
        <li>
          (Dark horse idea) Hackathon
        </li>
      </ul>
      <p>
        From here we moved into an experimental phase to decide which idea would be the best candidate for our project.
      </p>
      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>Experience Prototypes</h2>
      <p>
        We developed 3 experience prototypes based on the outcomes of our solution ideation exercise. For each prototype, we tested a hypothesis over a short week-long timeframe and analyzed our assumptions based on testing results.
      </p>
      <h3>EP 1: Skills and Services Marketplace</h3>
      <img src={e1Prototype1ImageUrl} alt='EP 1 Prototype 1' width='100%'/>
      <br></br>
      <img src={e1Prototype2ImageUrl} alt='EP 1 Prototype 2' width='40%'/>
      <p>
        <b>Hypothesis:</b> If members could know what skills and knowledge their neighbors have, they would be more motivated to ask them for help.
        <br></br>
        <br></br>
        <b>Method:</b> We presented a spreadsheet of skilled community members and available tasks to a Palo Alto co-op member.
      </p>
      <span><b>Results:</b>
      </span>
      <ul>
        <li>
          (+) Matching people to tasks was intuitive
        </li>
        <li>
          (+) Table of people with skills was easy to read
        </li>
        <li>
          (-) Projects may stagnate if there aren't appropriate skills within the community
        </li>
        <li>
          (-) Without funding, some projects may not be feasible
        </li>
      </ul>
      <span><b>Validity:</b></span>
      <ul>
        <li>
          Our hypothesis was valid because all available tasks required community members to join in the same space.
        </li>
        <li>
          A new assumption is that some members in the community must start with social capital to post tasks.
        </li>
      </ul>
      <h3>EP 2: Hold a "Hackathon" of Community Service</h3>
      <p>
        <b>Hypothesis:</b> Sharing an activity improves social connection between members and improves the shared understanding of individual skills and knowledge of members of the community.
        <br></br>
        <br></br>
        <b>Method:</b> Group chat “ideation” session with 1 leader and 1 member of Buenaventura. Will community members have a better idea of what skills their neighbors have?
      </p>
      <span><b>Results:</b>
      </span>
      <ul>
        <li>
          (-) Shared activities surfaces skills and knowledge, but users want to know about the players' intentions!
        </li>
        <li>
          Social goals are more effective recruiting people for shared activities
        </li>
      </ul>
      <span><b>Validity:</b></span>
      <ul>
        <li>
          Our hypothesis was not valid because members in low cohesion communities struggle to find help in their communities to launch their projects. We found out these communities have scarce knowledge of the skills and knowledge other members have. Can shared activities surface these skills and knowledge?
        </li>
      </ul>
      <h3>EP 3: Creating More Leaders</h3>
      <p>
        <b>Hypothesis:</b> If people take ownership over some responsibility, they can develop into leaders.
        <br></br>
        <br></br>
        <b>Method:</b> Chatbot that thrusts users into a (gardening) simulation.
      </p>
      <span><b>Results:</b>
      </span>
      <ul>
        <li>
          (+) Participation wasn't hard to get, people seemed to like the storyline
        </li>
        <li>
          (-) Texting in the same room was a little awkward, and people who knew the subject weren't as interested
        </li>
        <li>
          Had to go off-script, realized this was almost like role-playing/situation training
        </li>
        <li>
          Lack of experience kept leaders humble
        </li>
      </ul>
      <span><b>Validity:</b></span>
      <ul>
        <li>
          Our hypothesis was valid because the simulation gave participants sense of making quick judgements under stress. However, we didn't find our results to indicate long-term success of emerging leaders.
        </li>
      </ul>
      <h3>EP Outcomes: Analysis</h3>
      <p>
        After testing our 3 experience prototypes, we decided to move forward with EP 1, our "Skills and Services Marketplace" idea. We believed that this EP demonstrated the most promising results and would be the most likely to deliver long-term outcomes for community cohesion. We were ready to move into the initial stages of prototyping.
      </p>
      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>Low Fidelity Prototype</h2>
      <p>
        At this point in our project, we branded ourselves as <b>Local Hive</b> and described our mission/problem/solution:
        <br></br>
        <br></br>
        <b>Mission:</b> Boost your projects and build your own skills with the power of your community.
        <br></br>
        <b>Problem:</b> How can community members support each other when they are not in close physical proximity?
        <br></br>
        <b>Solution:</b> Create a marketplace of projects and skills using social capital as currency.
        <br></br>
        <br></br>
        We took to the drawing boards once again to sketch out concepts for our solution.
      </p>
      <h3>Concept Sketches</h3>
      <img src={conceptSketchesImageUrl} alt='Concept Sketches' width='100%' />
      <p>
        Sketches centered around 4 input modalities: web, mobile, AR, existing platform integrations (Slack, iMessage, etc.). We voted on our top two modalities, web and mobile, and proceeded to make more sketches for possible UI.
      </p>
      <h3>UI Sketches</h3>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <figure>
            <img
            src={uiSketch1ImageUrl}
            alt='Mobile UI Sketch 1'
            style={{ width: '90%', display: 'inline-block', marginRight: '2%' }}
          />
          <figcaption>Mobile UI Sketch 1</figcaption>
        </figure>
        <figure>
          <img
            src={uiSketch2ImageUrl}
            alt='Mobile UI Sketch 2'
            style={{ width: '90%', display: 'inline-block' }}
          />
          <figcaption>Mobile UI Sketch 2</figcaption>
        </figure>
      </div>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <figure>
            <img
            src={uiSketch3ImageUrl}
            alt='Web UI Sketch'
            style={{ width: '40%', display: 'inline-block', marginRight: '2%' }}
          />
          <figcaption>Web UI Sketch</figcaption>
        </figure>
      </div>
      <br></br>
      <p>
        Once we had our UI sketches laid out, we evaluated their potential using our insights from the needfinding phase of our project and came to the conclusion that a <b>mobile app</b> would be the better selection because:
      </p>
      <ol>
        <li>
          People already use phones to organize and consume information.
        </li>
        <li>
          A mobile app with push notifications is the most appealing and immediate to users who wish to connect with their community.
        </li>
        <li>
          There is already a pre-existing social networking mental model that people associate with phones.
        </li>
      </ol>
      <p>
        With our decision made, we moved on to defining our task flows which would help us design a low-level prototype.
      </p>
      <h3>Task Flows</h3>
      <p>In order to structure the screens we needed to create for our low-fi prototype, we defined a set of tasks with increasing difficulty. These would help guide us in our initial UI decisions as well as provide us with direction for what the app should enable a user to accomplish. We sketched a task flow for each task listed to inform our low-fi screen designs.</p>
      <img src={easyTaskFlowImageUrl} alt='Easy Task Flow' width='50%' />
      <br></br>
      <p>
        <b>Easy Task: Joining a project</b>
        <br></br>
        Joining a project involves: signing up, exploring projects, finding a project you are qualified for, joining the project then optionally reaching out to project leader for more information.
      </p>
      <br></br>
      <img src={mediumTaskFlowImageUrl} alt='Medium Task Flow' width='50%' />
      <br></br>
      <p>
        <b>Medium Task: Creating a project</b>
        <br></br>
        Creating a project involves: specifying a time, location, the categories of skills involved, compensation awarded and a description for your project then recruiting users and posting the project.
      </p>
      <br></br>
      <img src={complexTaskFlowImageUrl} alt='Complex Task Flow' width='50%' />
      <br></br>
      <p>
        <b>Complex Task: Monitoring community involvement</b>
        <br></br>
        Monitoring Community Involvement involves: project leaders monitoring who is contributing to their project and individual users monitoring their own community involvement and contributions made by the overall community.
      </p>
      <p>
        With our task flows defined, we started sketching out the screens we would need for our low-fi prototype.
      </p>
      <h3>Low-Fi Prototype Screens</h3>
      <img src={lowFiOverviewImageUrl} alt='Low-Fi Overview' width='100%' />
      <br></br>
      <p>
        We sketched out 17 separate screens on sheets of paper and used plastic film to create the illusion of buttons and selection. Our design decisions were guided by the following:
      </p>
      <ul>
        <li>
          Users should be encouraged to work on projects outside their skillset by reaching out, gathering information, and collaborating.
        </li>
        <li>
          Meeting people is just as valuable as the work itself, and this is integrated into the app.
        </li>
        <li>
          Attitudes and intents matter, influencing AI recommendations through goal-based questions.
        </li>
      </ul>
      <p>
        With our low-fi prototype literally in hand, we began testing our app.
      </p>
      <h3>User Testing</h3>
      <p>
        We developed a test plan that included an interview question template and aimed to investigate:
      </p>
      <ol>
        <li>
          Gather the likeability of a user to complete a task without guidance
        </li>
        <li>
          Gather the excitement of a user to complete a task without guidance
        </li>
        <li>
          Find out what actions are done and in what order
        </li>
        <li>
          Find out if people are more likely to join a project or to create a new project
        </li>
        <li>
          Find out whether people can attend more projects by adjusting the language:
          <ol>
            <li>
              Contribute to your community
            </li>
            <li>
              Meet people today
            </li>
            <li>
              Earn points
            </li>
            <li>
              Learn to do something
            </li>
          </ol>
        </li>
      </ol>
      <p>
        We conducted 20-minute user tests with 3 separate participants of different ages and backgrounds. We asked them to run through our 3 tasks by interacting with our paper prototype and using our "buttons" to make selections. Members of our team took turns operating as an interview facilitator who ran through the template interview questions, a "computer" who would manually switch paper screens based on user selections, and a notetaker who logged any critical incidents and successes that occurred during the test.
      </p>



      <br></br>
      <hr className="solid"></hr>
      <br></br>
      <h2>Try Our Prototype</h2>
      <p>FIXME: Prototype not embedding</p>
      <iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)', width: '800', height: '450', src: FIGMA_URL}} allowFullScreen></iframe>
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