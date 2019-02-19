import carCover from '../assets/car-cover.png';
import batCover from '../assets/bat-cover.png';
import fishCover from '../assets/fish-cover.png';

export default {
  systems: [
    {
      path: "traffic", 
      systemPart: "Cars", 
      systemWhole: "Traffic", 
      coverImage: {
        src: carCover, 
      },
      question: "What causes traffic?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
      color: '#A38E76',
    },
    {
      path: "colony", 
      systemPart: "Bats", 
      systemWhole: "Colony", 
      coverImage: {
        src: batCover, 
      },
      question: "How do bats coordinate their flight?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
      color: '#F7A558',
    },
    {
      path: "school", 
      systemPart: "Fish", 
      systemWhole: "School", 
      coverImage: {
        src: fishCover, 
      },
      question: "How do fish avoid predators?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
      color: '#579CC6',
    },
    {
      path: "crowd", 
      systemPart: "Person", 
      systemWhole: "Crowd", 
      coverImage: {
        src: fishCover, 
      },
      question: "How do crowds navigate cities?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.      ",
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.", 
      color: '#EFB2C5',
    },
    {
      path: "slime", 
      systemPart: "Cell", 
      systemWhole: "Mold", 
      coverImage: {
        src: fishCover, 
      },
      question: "How can mold solve a maze?", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus sem eget tellus feugiat, quis efficitur neque tempor. Pellentesque ut dui a nisi porta pharetra quis sit amet mi. Quisque ac ante nulla. Quisque ut est cursus, sodales nulla eget, scelerisque nisl. Maecenas nec mollis velit. Donec viverra leo eget auctor ultricies. Nullam faucibus placerat orci, vel rhoncus velit auctor in. Cras at nibh quis massa feugiat lobortis nec eu quam.", 
      rules: "adsad jalskd k k ask kk dalsjdj klajsblgh lkak j llk jaskldj lkj alk",
      instructions: "Chase the fish to see how they follow their neighbors to avoid predators.",
      color: '#79857E',
    },
  ],
}