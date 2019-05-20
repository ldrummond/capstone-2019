
# *Part To Whole* - Capstone Project
Web Application (http://lucasbuilds.site/capstone-2019)


*"In philosophy, systems theory, science, and art, emergence is the condition of an entity having properties its parts do not have, due to interactions among the parts."*


#### About

This project explores concepts of emergence through 5 interactive simulations, each presenting an example of an emergent system. The hope is that by exploring the ways in which bottom-up organization exists throughout the word, users might begin to think of the systems in their lives from a different perspective.  

It was created as a senior capstone project for the Washington University in St. Louis Communication Design Program, and was designed and developed by Lucas Drummond. See more of my work at http://lucasbuilds.site


***


## Research

#### Background

Ever seen a swarm of birds move through the sky, twisting and turning as though they were a single creature? This is a classic example of an emergent system – one where many individual parts interact to create a complex pattern. What makes these systems unique is their organization and structure. There is no leader among these birds telling them when or where to turn. Instead, each bird follows simple rules in how it interacts with its neighbors. And the result of these simple rules is a complex, intelligent system. 

This is called bottom up organization, rather than the top-down organization that human society takes as standard. With bottom up organization, the whole system responds intelligently even when the individuals act according to simple rules. For example, when a hawk tries to attack the a flock of birds, the whole flock splits to avoid the predator and chase it away. Even the birds that cannot see the hawk act in unison by responding to the motion of their neighbors. 

Although humans are used to top-down order, emergence is not just a natural phenomenon. Emergent properties can be found in everything from traffic, the stock market, the layout of cities and the motions of crowds. These systems all rely on the interaction between parts, and as such are hard to predict or solve with typical top down structures. That is why traffic is still a problem on your morning commute! Because traffic is a complex pattern stemming from simple interactions, solutions to traffic rely on improved interactions between drivers rather than more stop lights or wider freeways. 


#### Related Terms

- Self Organization
- Spontaneous Order
- Bottom-up Organization

#### Examples of Emergence

- Cities
- The World Wide Web
- [Grand Design Galaxies](https://en.wikipedia.org/wiki/Grand_design_spiral_galaxy)
- [Starling murmuration (nice soundtrack)](https://www.youtube.com/watch?v=eakKfY5aHmY) -video 
- [Slime mold solving a maze](https://www.youtube.com/watch?v=5UfMU9TsoEM) -video
- [Emergence in traffic](https://www.youtube.com/watch?v=7wm-pZp_mi0) -video
- [Snowflakes](https://en.wikipedia.org/wiki/Emergence#/media/File:SnowflakesWilsonBentley.jpg)
- [Ants Ted Talk](https://www.ted.com/talks/deborah_gordon_digs_ants?language=en) -video

#### Research Sources

- *Emergence: The Connected Lives of Ants, Brains, Cities, and Software*, Stephen Johnson
- [Boids](https://www.red3d.com/cwr/boids/), Craig Reynolds
- *Emergence in Interactive Art*, Jennifer Seevinck
- *Self-organization*, Sidney W Fox
- *[The Chemical Basis of Morphogenesis](http://www.dna.caltech.edu/courses/cs191/paperscs191/turing.pdf)*, Alan Turing
- *[Bird flocks](https://www.audubon.org/magazine/march-april-2009/how-flock-birds-can-fly-and-move-together)*, Audobon Magazine
- *[Emergent Crowd Behaviour](http://www.cog.brown.edu/research/ven_lab/Publications/RioWarren_FollowCrowd_PED12.pdf)*

#### Emergence in the CPU and GPU

One core concept of emergent systems, bottom-up organization, interestingly relates to an underlying component of computer processing. The distribution of computer resources between CPU and GPU technology. CPU's are like the leader in a top down system. They are incredibly smart and versatile, can do many different types of operations, but because of this versatility they are limited to one or a few tasks at a time. GPU's on the other hand are like a bottom up system – they are made of thousands of cores each running simple operations very quickly. They are not intelligent, but they are efficient – by working in unison, they achieve a complex result greater than their individual capabilities. Rendering video, for example, is incredibly complex but efficiently managed by the GPU. Compare this to a flock of birds. The flock achieves complex movements and patterns because each bird acts in parallel. The birds knowledge of the whole flock is limited and their actions are simple, but their ability to sense their neighbors and move is very efficient. The result is the whole flock responding incredibly quickly. 

For this project, due to limited experience with openGL, implementations of **boids** (the basis of all of the project simulations) run on the CPU. Because of that, for each update cycle in the simulations, every boid has to compare its position to that every other boid. This complexity causes the number of boids to be capped at about 50 to maintain smooth rendering. Ideally, the GPU could be leveraged to compute the position of each boid and increase the number of active members. This is a great example of a [GPU Boid Flock](https://github.com/Shinao/Unity-GPU-Boids). As seen at the bottom of the project readme, GPU flocks can efficiently support many more members than CPU flocks. 

***

## Design

#### Inspiration

- [Histography](https://histography.io/)
- [17 Issues](https://art4globalgoals.com/en)
- 
- 

#### Images Sources
[Unsplash](https://unsplash.com/)

- [Fish](https://unsplash.com/photos/ekthrVC_DVs), David Clode
- [Bat]
-

***

## Development

This project is built with [React](https://reactjs.org/) and bootstrapped with [Create React App](https://github.com/ianmcgregor/boid). The project was ejected and modified from the Create React App defaults.

#### Specific Coding Concepts Explored

- intelligent agents (in this case, [boids](https://www.red3d.com/cwr/boids/))
- html canvas based rendering and animations
- redux for app state 

#### Tools Used

- [Ian McGregor's JS Implementation](https://github.com/ianmcgregor/boid) of Craig Reynolds Boids
- [Create React App](https://github.com/facebook/create-react-app)
- [Redux](https://redux.js.org/introduction/getting-started)
- [React Router](https://github.com/ReactTraining/react-router)
- [Lodash](https://lodash.com/) (Throttle)
- Deepmerge
- Classnames

***

## Usage

To run locally: 
```shell
$npm install
```

#### Development
```shell
$ npm run start
``` 

#### Build 
```shell
$ npm run build
```

#### Test
```shell
$ npm run test
``` 

