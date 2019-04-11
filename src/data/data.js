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

import { ReactComponent as carIcon } from '../assets/car-icon.svg';
import { ReactComponent as batIcon } from '../assets/bat-icon.svg';
import { ReactComponent as fishIcon }  from '../assets/fish-icon.svg';
import { ReactComponent as crowdsIcon }  from '../assets/crowds-icon.svg';
import { ReactComponent as moldIcon }  from '../assets/mold-icon.svg';

const 
  trafficColor = '#AAA', //'#9e9e9e',
  batColor = '#F7A558',
  fishColor = '#579CC6',
  crowdsColor = '#f4adc3',
  moldColor = '#709170'; //'#79857E';

export default {
  description:
    `Ever wonder what causes a traffic jam? Why fish swim in schools? How crowds move through cities? 
     <div class='break'></div>
     Surprisingly, these systems are all connected – they are all examples of <em>emergence</em>, 
     where a complex pattern occurs through simple interactions between parts.<div class='break'></div>
     This project explores the way emergent systems throughout our world, through 5 interactive simulations 
     revolving around seemingly unrelated questions.`
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
      question: "What causes traffic to form?", 
      instructions: `Click your cursor to create a slowdown and see how drivers respond.`,
      instructionPng: carInstructions,
      interactions: [
        "Each car is in a rush, staying as close to the next car as possible.",
        "Because of this, if one car slows down, there is a chain reaction.",
        "Each car slows in response to its neighbors, but the slowdown stays in place."
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
      question: "Why do bats coordinate their flight?", 
      instructions: "Click on the walls of the cave to adjust the height of the opening.",
      instructionPng: batInstructions,
      interactions: [
        "Each bat maintains the optimum distance from its neighbors, so that they never collide.",
        "When the sun sets, the bats fly through the cave entrance in a tighly coordinate mass.",
        "The bats adjust their position to the amount of available space and fly as a unit."
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
      question: "How do fish avoid predators?", 
      instructions: "Move your cursor to guide a predator towards the school of fish.",
      instructionPng: fishInstructions,
      interactions: [
        "Each fish is only aware of its close neighbors. It turns and slows to match their speed and angle.",
        "When a predator attacks, only the closest fish can actually see and respond to the predator.",
        "When they turn, the other fish respond, and the whole school moves as a unit overwhelming the predator."
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
      question: "How do crowds interact in cities?", 
      instructions: "Click the buttons to change the number of people and affect the interactions of the crowds.", 
      instructionPng: crowdsInstructions,
      interactions: [
        "Each person travels at a similar pace towards their destination.",
        "They avoid people traveling in opposite directions, and avoid colliding with neighbors.",
        "As the crowds pass, lanes of efficient motion naturally form."
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
      question: "How can mold build a network?", 
      instructions: "Click your cursor to place 5 food sources, guiding the mold network",
      instructionPng: moldInstructions,
      interactions: [
        "Each mold cell is brainless, but in the presence of food, they release pheremones.",
        "Other mold cells are attracted to those pheremones - when they get close, they strengthen the pheremone trail.",
        "As the trails refine, the mold cells build an efficient network between multiple food sources."
      ],
      color: moldColor,
      icon: moldIcon, 
    },
  ],
}