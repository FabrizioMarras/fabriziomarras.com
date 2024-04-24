import {
  ainsyte,
  drop,
} from "../assets/posts";

export const posts = [
    { id: 1, 
      date: '',
      image: ainsyte,
      name: 'First Blog Post', 
      content: 'The client was looking for a minimal and poligon design of a drop of water to symbolize the delicacy of our ocean. After some research about polygonal shapes and other drop-shaped designs as well as origami, I proposed and designed a 2D version of the logo using Adobe Illustrator and a light blue color-based palette to indicate the connection to clean water.',
      tags: [
        { name: "Artificial Intelligence"},
        { name: "Content Creation"},
      ],
      pageContent: [
          { title: "2D Logo Design",
            description: "The client was looking for a minimal and poligon design of a drop of water to symbolize the delicacy of our ocean. After some research about polygonal shapes and other drop-shaped designs as well as origami, I proposed and designed a 2D version of the logo using Adobe Illustrator and a light blue color-based palette to indicate the connection to clean water.",
            image: ainsyte,
          },
          { title: "3D Logo Design",
            description: "Due to new designs trends, including 3D animation and 3D printing, the organisation asked me to make a 3D version of their logo and an animated logo intro for marketing purposes. Using the polygonal 2D logo as starting idea, I created a 3D version in Maxxon Cinema 4D using a distorted sphere as basic shape.",
            image: ainsyte,
          },
          { title: "3D Logo Animation",
            description: "For the final animation, the ripple effect and reflections were created by applying a particle generator to a ripple and water texture of a plane object. The final video was exported in After Effects for final adjustment layers and rendering. Only one camera was used in the scene and it was positioned and rotated from the center of the polygonal logo to the outside to finally reveal the full 3D logo. Few different lights were also used in the scene to create a deeper atmosphere which reflects the style of music from the organisers.",
            video: 'https://youtu.be/euUPV5QxKEE',
          },
          { title: "Live Streaming Events",
            description: "For the Strawless campaign held in bar Feijoa in the center of Amsterdam, the client asked me to create an animated introduction to their livestream. The animation was created by putting together a 2D graphic created using a combination of Adobe illustrator and Photoshop together with a 3D logo animation designed with Maxxon Cinema 4D. I was also asked to set up the livestream itself, which included the addition of few other animated graphic material, such as titles, artists names, the use of OBS Studio software, and one HD camera and an external audio card for the streaming of audio and video.",
            video:"https://youtu.be/aGmKPuq9wfY",
          }] 
        },
    { id: 2,
      date: '',
      image: drop,
      name: 'Second Blog Post',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      tags: [
        { name: "Content Creation"},
        { name: "Motion Graphics"},
      ],
      pageContent: [
          { title: "2D Logo Design",
            description: "The client was looking for a minimal and poligon design of a drop of water to symbolize the delicacy of our ocean. After some research about polygonal shapes and other drop-shaped designs as well as origami, I proposed and designed a 2D version of the logo using Adobe Illustrator and a light blue color-based palette to indicate the connection to clean water.",
            image: drop,
          },
          { title: "3D Logo Design",
            description: "Due to new designs trends, including 3D animation and 3D printing, the organisation asked me to make a 3D version of their logo and an animated logo intro for marketing purposes. Using the polygonal 2D logo as starting idea, I created a 3D version in Maxxon Cinema 4D using a distorted sphere as basic shape.",
            image: drop,
          },
          { title: "3D Logo Animation",
            description: "For the final animation, the ripple effect and reflections were created by applying a particle generator to a ripple and water texture of a plane object. The final video was exported in After Effects for final adjustment layers and rendering. Only one camera was used in the scene and it was positioned and rotated from the center of the polygonal logo to the outside to finally reveal the full 3D logo. Few different lights were also used in the scene to create a deeper atmosphere which reflects the style of music from the organisers.",
            video: 'https://youtu.be/euUPV5QxKEE',
          },
          { title: "Live Streaming Events",
            description: "For the Strawless campaign held in bar Feijoa in the center of Amsterdam, the client asked me to create an animated introduction to their livestream. The animation was created by putting together a 2D graphic created using a combination of Adobe illustrator and Photoshop together with a 3D logo animation designed with Maxxon Cinema 4D. I was also asked to set up the livestream itself, which included the addition of few other animated graphic material, such as titles, artists names, the use of OBS Studio software, and one HD camera and an external audio card for the streaming of audio and video.",
            video:"https://youtu.be/aGmKPuq9wfY",
          }
        ] 
      }
  ]