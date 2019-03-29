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
  trafficColor = '#A38E76',
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
      },
      question: "What causes traffic?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Navigate the lanes to get work.",
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
      },
      question: "How do bats coordinate their flight?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
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
      },
      question: "How do fish avoid predators?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors, and avoid predators.",
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
      },
      question: "How do crowds navigate cities?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.      ",
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.", 
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
      },
      question: "How can mold build a network?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
      color: moldColor,
      icon: moldIcon, 
    },
  ],
}