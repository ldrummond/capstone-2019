import carCover from '../assets/car-cover.png';
import batCover from '../assets/bat-cover.png';
import fishCover from '../assets/fish-cover.png';
import crowdsCover from '../assets/crowds-cover.png';
import moldCover from '../assets/mold-cover.png';

import { ReactComponent as carIcon } from '../assets/car-icon.svg';
import { ReactComponent as batIcon } from '../assets/bat-icon.svg';
import { ReactComponent as fishIcon }  from '../assets/fish-icon.svg';
import { ReactComponent as crowdsIcon }  from '../assets/crowd-icon.svg';
import { ReactComponent as moldIcon }  from '../assets/mold-icon.svg';

const 
  trafficColor = '#9e9e9e',
  batColor = '#F7A558',
  fishColor = '#579CC6',
  crowdsColor = '#EFB2C5',
  moldColor = '#709170'; //'#79857E';

export default {
  description: [
    `Ever wonder what causes traffic, why fish swim in schools, or how crowds move through cities? 

     These are all systems of emergence – where a complex pattern occurs through simple interactions 
     between parts.`,
  ],
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
      question: "What causes traffic?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Navigate the lanes to get work.",
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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors, and avoid predators.",
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
      question: "How do crowds navigate cities?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.      ",
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.", 
      interactions: [
        "Each fish is only aware of its close neighbors. It turns and slows to match their speed and angle.",
        "When a predator attacks, only the closest fish can actually see and respond to the predator.",
        "When they turn, the other fish respond, and the whole school moves as a unit overwhelming the predator."
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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
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