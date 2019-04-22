import carCover from '../assets/car-cover.png';
import batCover from '../assets/bat-cover.png';
import fishCover from '../assets/fish-cover.png';
import crowdsCover from '../assets/crowds-cover.png';
import moldCover from '../assets/mold-cover.png';

import carInstructions from '../assets/car-instructions.png';
import batInstructions from '../assets/bat-instructions.png';
import fishInstructions from '../assets/fish-instructions.png';
import crowdsInstructions from '../assets/crowds-instructions.png';
import moldInstructions from '../assets/mold-instructions.png';

import carVideo from '../assets/car-video.mp4';
import batVideo from '../assets/bat-video.mp4';
import fishVideo from '../assets/fish-video.mp4';
import crowdsVideo from '../assets/crowds-video.mp4';
import moldVideo from '../assets/mold-video.mp4';

import { ReactComponent as carIcon } from '../assets/car-icon.svg';
import { ReactComponent as batIcon } from '../assets/bat-icon.svg';
import { ReactComponent as fishIcon }  from '../assets/fish-icon.svg';
import { ReactComponent as crowdsIcon }  from '../assets/crowds-icon.svg';
import { ReactComponent as moldIcon }  from '../assets/mold-icon.svg';

const 
  trafficColor = '#a7a7b7',
  batColor = '#e99242',
  fishColor = '#579CC6',
  crowdsColor = '#e5aabf', //'#f4adc3',
  moldColor = '#709b70'; //'#79857E';

// "Each simulation presents simple components interacting to form a complex pattern"

export default {
  description:
    `Ever wonder what causes a traffic jam? Why fish swim in schools? How crowds move through cities? 
     <div class='break'></div>
     Surprisingly, these systems are all connected: they are all examples of <em>emergence</em>, 
     where a complex pattern occurs through simple interactions between parts.<div class='break'></div>
     This project explores the way emergent systems form throughout our world, looking at these systems
     through 5 seemingly unrelated questions.`
  ,
  systems: [
    {
      path: "traffic", 
      nextButtonTitle: "Traffic",
      systemPart: "Cars", 
      systemWhole: "Traffic", 
      coverImage: {
        src: carCover, 
        alt: 'Car'
      },
      previewVideo: {
        src: carVideo,
      },
      question: "What causes traffic to form?", 
      instructions: `Click your cursor to create a slowdown and modify the flow of traffic.`,
      instructionPng: carInstructions,
      interactions: [
        "Most often on the road, each car is in a rush and stays as close to the next car as possible, while ignoring the cars behind it.",
        "Because of this, if one car slows down there is a chain reaction as the cars behind it slow in response.",
        `When the first cars begin to move forward again, the slowdown stays in place, sometimes even traveling backwards
        after the intial cars have sped on.`
      ],
      color: trafficColor,
      icon: carIcon, 
    },
    {
      path: "colony", 
      nextButtonTitle: "Bats",
      systemPart: "Bats", 
      systemWhole: "Colony", 
      coverImage: {
        src: batCover, 
        alt: 'Bat'
      },
      previewVideo: {
        src: batVideo,
      },
      question: "Why do bats coordinate their flight?", 
      instructions: "Click on the walls of the cave to adjust the height of the opening.",
      instructionPng: batInstructions,
      interactions: [
        "Each bat has highly powerful sensing abilities for tracking the distance between it and its neighbors.",
        `By adjusting its speed and position, each bat maintains a precise amount of space from its neighbors, 
        including the ones behind it.`,
        `This allows the bats to fly as a unit, rapidly modifying their distance and never colliding. The unit can
        respond to available space, compressing when there is less room.`
      ],
      color: batColor,
      icon: batIcon, 
    },
    {
      path: "school", 
      nextButtonTitle: "Fish",
      systemPart: "Fish", 
      systemWhole: "School", 
      coverImage: {
        src: fishCover, 
        alt: 'Fish'
      },
      previewVideo: {
        src: fishVideo,
      },
      question: "How do fish avoid predators?", 
      instructions: "Move your cursor to guide a predator towards the school of fish.",
      instructionPng: fishInstructions,
      interactions: [
        "Each fish is only aware of its close neighbors. It turns and slows to match their speed and angle.",
        "When a predator attacks, only the closest fish can actually see and respond to the predator.",
        `When these fish turn, the other fish respond to their motion, and the whole school moves as a unit 
        overwhelming the predator.`
      ],
      color: fishColor,
      icon: fishIcon, 
    },
    {
      path: "crowds", 
      nextButtonTitle: "Crowds",
      systemPart: "Person", 
      systemWhole: "Crowds", 
      coverImage: {
        src: crowdsCover, 
        alt: 'crowd_crossing_street'
      },
      previewVideo: {
        src: crowdsVideo,
      },
      question: "How do crowds interact in cities?", 
      instructions: "Click the buttons to change the number of people and affect the interactions of the crowds.", 
      instructionPng: crowdsInstructions,
      interactions: [
        "Each person in the crowd is traveling at a similar pace, even though they may be heading to different destinations.",
        "As they travel, each person maintains an even distance to avoid colliding with their neighbors and with people traveling in the opposite direction.",
        `As the crowds pass, lanes of efficient motion naturally form and grow— without the direction of any leader.`
      ],
      color: crowdsColor,
      icon: crowdsIcon, 
    },
    {
      path: "mold", 
      nextButtonTitle: "Mold",
      systemPart: "Cell", 
      systemWhole: "Mold", 
      coverImage: {
        src: moldCover, 
        alt: 'mold_colony'
      },
      previewVideo: {
        src: moldVideo,
      },
      question: "How can mold build a network?", 
      instructions: "Click your cursor to place 5 food sources, guiding the mold network",
      instructionPng: moldInstructions,
      interactions: [
        "Each mold cell wanders through its environment searching for food. When it reaches a food source, the cell releases pheremones.",
        `Other mold cells are attracted to those pheremones—when they get close to the source, they add their own pheremones and strengthen the trail.`,
        "As the trails refine, the mold cells build an efficient network between multiple food sources."
      ],
      color: moldColor,
      icon: moldIcon, 
    },
  ],
}