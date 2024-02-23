import {
    ainsyte,
    mnml,
    lovelace,
    prasanna,
    speak2lead,
    drop,
    drop_01,
    drop_02,
    adobe_ae, adobe_xp, adobe_cc, adobe_il, adobe_lr, adobe_ps, adobe_pr, blender, cinema4d,
    html, css, javascript, nodejs, artificial,
  } from "../assets";

export const projects = [
    {
        id: "01",
        name: "AInsyte",
        description:
          "Brand identity design for AInsyte, with a 3D logo and animations. Rendered more than 300 templates, videos and animations for social media content. Design a modern-looking website, and develop a user-friendly frontend interface. Built a robust server infrastructure with an efficient API routing and backend operations, integrating GPT-4 functionality via Openai API, to complete and automate the overall functionality of the website.",
        tags: [
          { name: "Graphic Design"},
          { name: "Web Design"},
          { name: "Web Development"},
          { name: "Motion Graphics"},
          { name: "Content Creation"},
          { name: "Videos"},
          { name: "Artificial Intelligence"},
        ],
        techs: [
          {
            name: "Blender",
            img: blender,
          },{
            name: "Adobe Illustrator",
            img: adobe_il,
          },{
            name: "Adobe AfterEffects",
            img: adobe_ae,
          },{
            name: "Adobe Premiere",
            img: adobe_pr,
          },{
            name: "HTML",
            img: html,
          },{
            name: "CSS",
            img: css,
          },{
            name: "Javascript",
            img: javascript,
          },{
            name: "NodeJS",
            img: nodejs,
          },{
            name: "AI",
            img: artificial,
          }
        ],
        image: ainsyte,
        link: "https://ainsyte.com/",
        link_fm: "/project/Ainsyte",
        content: [
          { title: "The Client",
            description: "Ainsyte is a platform that leverages AI to provide comprehensive personality, astrology, numerology, and metaphysical analyses, aiding users in understanding their individual traits, strengths, weaknesses, and avenues for personal development.",
          },
          {
            title: 'The Challenge',
            description: 'a comprehensive brand identity solution encompassing logo design, 2D/3D animation, and graphic design for website and social media. Demanded full-stack development of website with AI integration, emphasizing minimalist design.',
          },
          { title: "2D Logo Design",
            description: "The client was looking for a minimal and poligon design of a drop of water to symbolize the delicacy of our ocean. After some research about polygonal shapes and other drop-shaped designs as well as origami, I proposed and designed a 2D version of the logo using Adobe Illustrator and a light blue color-based palette to indicate the connection to clean water.",
            image: drop_02,
          },
          { title: "3D Logo Design",
            description: "Due to new designs trends, including 3D animation and 3D printing, the organisation asked me to make a 3D version of their logo and an animated logo intro for marketing purposes. Using the polygonal 2D logo as starting idea, I created a 3D version in Maxxon Cinema 4D using a distorted sphere as basic shape.",
            image: drop_02,
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
      },
    {
      id: "02",
      name: "Drop Music Official",
      description:
        "Designed a geometrically refined 2D water drop logo for Drop Music using Adobe Illustrator. Transitioned to advanced 3D design in Maxon Cinema 4D, incorporating a dynamic ripple effect and reflections. The seamless integration of Adobe Suite and 3D graphic software produced a visually striking logo and an animated intro for livestream events.",
      tags: [
        { name: "Graphic Design"},
        { name: "Motion Graphics"},
        { name: "Content Creation"},
        { name: "Live Streaming"},
        { name: "Videos"},
        { name: "Event Management"},
      ],
      techs: [
        {
          name: "Cinema 4D",
          img: cinema4d,
        },{
          name: "Adobe Lightroom",
          img: adobe_lr,
        },{
          name: "Adobe Illustrator",
          img: adobe_il,
        },{
          name: "Adobe AfterEffects",
          img: adobe_ae,
        },{
          name: "Adobe Premiere",
          img: adobe_pr,
        }
      ],
      image: drop,
      link: "",
      link_fm: "/project/Drop-Music-Official",
      content: [
        { title: "The Client",
          description: "Drop Music Official started out as a fundraiser combining the love for music with the message of raising awareness against plastic by organising events in the heart of Amsterdam. After their first successful party in Club Oak in Leidseplein, they are now hosting a series of livestream events that support the cause and provides useful information, creating a movement that supports music, positivity and our planet.",
        },
        {
          title: 'The Challenge',
          description: 'a unique brand identity including logo design and animations. Requested graphic and video content for social media and assistance with live streaming event setup at chosen location.',
        },
        { title: "2D Logo Design",
          description: "The client was looking for a minimal and poligon design of a drop of water to symbolize the delicacy of our ocean. After some research about polygonal shapes and other drop-shaped designs as well as origami, I proposed and designed a 2D version of the logo using Adobe Illustrator and a light blue color-based palette to indicate the connection to clean water.",
          image: drop_01,
        },
        { title: "3D Logo Design",
          description: "Due to new designs trends, including 3D animation and 3D printing, the organisation asked me to make a 3D version of their logo and an animated logo intro for marketing purposes. Using the polygonal 2D logo as starting idea, I created a 3D version in Maxxon Cinema 4D using a distorted sphere as basic shape.",
          image: drop_02,
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
    },
    {
      id: "03",
      name: "Speak 2 Lead",
      description:
        "Designed Speak 2 Lead's brand with a futuristic visual identity, creating symbolic 3D icons in Adobe Illustrator and animating them in Maxon Cinema 4D. Developed a gamified questionnaire using Adobe Illustrator, Adobe Edge Animate, and Javascript, enhancing the website and promotional materials with high-quality animated assets.",
      tags: [
        { name: "Graphic Design"},
        { name: "Web Design"},
        { name: "Web Development"},
        { name: "Motion Graphics"},
        { name: "E-Learning"},
        { name: "Content Creation"},
        { name: "Videos"},
      ],
      techs: [
        {
          name: "Cinema 4D",
          img: cinema4d,
        },{
          name: "Adobe Illustrator",
          img: adobe_il,
        },{
          name: "Adobe AfterEffects",
          img: adobe_ae,
        },{
          name: "Adobe Premiere",
          img: adobe_pr,
        },{
          name: "HTML",
          img: html,
        },{
          name: "CSS",
          img: css,
        },{
          name: "Javascript",
          img: javascript,
        }
      ],
      image: speak2lead,
      link: "",
      link_fm: "/project/Speak-2-Lead",
      content: [
        { title: "The Client",
          description: "Speak 2 Lead delivers tailored e-learning solutions designed to enhance business language proficiency and communication skills among corporate professionals. Through gamification strategies, they optimize engagement and facilitate effective learning outcomes.",
        },
        {
          title: 'The Challenge',
          description: 'a strong brand identity solution with logo design and animations. Needed website and e-learning platform design and development with interactive games like snakes and ladders, focusing on user engagement.',
        },
        { title: "3D Icons Design",
          description: "Elearning brought the classical learning methodology to a more modern and futuristic aspect of learning using a virtual oriented experience. For this reason, the client asked me to bring their existing brand to a more futuristic and technological look, with the addition of 3D and animated imagery that could represent their vision and mission. As first step towards the client needs, I designed and created 3 icons which symbolise the company name and vision: 1) the speech bubble indicating their aim to bring the client toward more confident and highly skilled speaking, 2) the horse - already present in their logo - used as symbol for business leaders, and 3) the chess pattern piece symbolising the strategic learning experience. The 3 icons were first created as vector graphics in Adobe Illustrator and later on imported and developed as 3D images in Maxxon Cinema 4D. Simple splines, extrude, and materials were created and applied to each icon. An external camera and few lights, including some colored light to put in evidence some outlines, were added to the scene.",
          image:"",
        },
        { title: "3D Icons Animation",
          description: "The final project was animated in Cinema 4D using simple rotations of few elements in the scene, and a camera XYZ-translation. The final animated scene was exported as high quality .mp4 video, and used as an asset for the company website development, and for promotional marketing materials.",
          image:"",
        },
        { title: "The Website",
          description: "The design of Speak 2 Lead website started on paper, sketching the first draft version of its structure. The ideas where then vectorised in illustrator followed by the development of the wireframe in Adobe Muse. The work continued with the production of the prototype - Adobe Muse was used as platform - for the launching campaign. The design evolved with the addition of new and fresher color to the palette. From the prototype, using HTML, CSS and Javascript I developed the final and current version of the Speak 2 Lead website.",
          image:"",
        },
        { title: "Elearning Gamification",
          description: "For one of the company training activities, a gamification questionnaire was required. The idea for the game pointed us to a simplified version of a board game, snakes and ladders - which could involve multiple players in case of group classes, but that could have also been played at the same time by a single student - all followed by the teacher during a class exercise or online between students after class. The game snakes and ladders is a very popular board game and the choice was easy. The board, horse pieces for the different participants, tiles and other elements of the game were designed and created in Adobe illustrator. they were then imported in Adobe Edge Animate, and finally Javascript was added to create the drag and drop functions and the opening of the questionnaire. The game was then tested, and approved to be used in some of their exercise.",
          image:"",
        },
        { title: "Promo Marketing Video",
          description: "For the launching campaign, the client was looking for a self-explanatory promotional video which could set a good base for a B2B and B2C environment. After receiving preliminary guidelines, I designed and developed a storyboard for the promo. After a few little sketches, and I then started creating all the necessary assets using Adobe Illustrator and Photoshop for the graphics and Audition for the audio track. The designs and the audio track were then imported into Adobe After Effects, further edited, animated, and synchronised together with the audio track to produce the final motion graphic video promo.",
          image:"",
        }
      ]
    },
    {
      id: "04",
      name: "Lovelace",
      description:
        "Crafted Lovelace Engineering's brand identity from scratch, designing a modern logo symbolizing passion, engineering and DevOp cloud expertise. Developed a vibrant red heart-shaped cloud with moving engineering gears and a simulated blood circulation system in a 2D logo animation using Adobe Creative Cloud.",
      tags: [
        { name: "Graphic Design"},
        { name: "Motion Graphics"},
        { name: "Content Creation"},
      ],
      techs: [
        {
          name: "Adobe Illustrator",
          img: adobe_il,
        },{
          name: "Adobe AfterEffects",
          img: adobe_ae,
        },{
          name: "Adobe Premiere",
          img: adobe_pr,
        }
      ],
      image: lovelace,
      link: "",
      link_fm: "/project/Lovelace",
      content: [
        { title: "The Client",
          description: "Lovelace Engineering was founded in 2015 in memory of Ada Lovelace, a great woman, a wonderful scientist, and a free thinker. It provides expert advice and consulting on operational efficiency, modern scalable cloud infrastructure and engineering. It specializes in cloud-native solutions, leveraging extensive expertise in cloud infrastructure and Kubernetes. Their advanced architectures ensure scalability and resilience, empowering businesses to thrive in the digital landscape.",
        },
        {
          title: 'The Challenge',
          description: 'a cohesive brand identity solution including logo, business cards, letters, and website design to reflect company ethos and professionalism.'
        },
        { title: "2D Logo Design",
          description: 'The client requested a new and modern looking logo which could reflect the meaning of the company name and brand, therefore including "passion" for "engineering" and their DevOp "cloud" expertise. After a brainstorming sessions with the client, and couple of sketches, the idea was set: a heart alimented by engineering gears originating a final shape of a cloud. After refining the sketches, I created the final logo as vector graphic in Adobe Illustrator, where the shapes and color palette where combined into the final product. The client wanted to use a bright color, and together we decided to go for a bright red, as it is used usually for symbolising hearts, love and passion.',
          image:"",
        },
        { title: "Brand Identity",
          description: 'Once the logo idea was set and ultimately, it was straightforward to create a branding identity. Business cards were born presenting a white "cloud-framed" background, which showed, behind the scenes, the engineered gear system. All the graphics were designed in Adobe Illustrator, and the presentation mock-ups were created importing the PNG images of the graphics into a mock-up template in Adobe Photoshop.',
          image:"",
        },
        { title: "2D Logo Animation",
          description: "The client wanted to create a more modern and technological feeling to the brand, so they asked me to prepare an animated version of their 2D logo in order to be able to place it on their website, and use it in future marketing campaigns and promotional videos. For the 2D logo animation, the idea is to show the engineering gears moving in order to give life to the heart-cloud system, which it is able to live thanks to the blood circulating system from the heart throughout the all cloud. The design of the animation was created in HTML5, by importing the 2D logo vector graphic from Adobe Illustrator into Adobe Animate CC. There, all the animations of the single gears, the blood circulation line, and the heart beats were created and combined synergically into the final animation.",
          image:"",
        }
      ]
    },
    {
      id: "05",
      name: "Techno Kube",
      description:
        "Developed Techno Kube brand identity for mnml.amsterdam, an Amsterdam's techno event. I designed all branding material such as Logo, flyers, and promotional content for audiences engagemernt across all social media. I designed and developed a user-friendly frontend web interface with event information and ticket sales. I served as stage manager, ensuring smooth operations and coordination between performers, crew, and attendees.",
      tags: [
        { name: "Graphic Design"},
        { name: "Web Design"},
        { name: "Web Development"},
        { name: "Content Creation"},
        { name: "Event Management"},
      ],
      techs: [
        {
          name: "Adobe Lightroom",
          img: adobe_lr,
        },{
          name: "Adobe Photoshop",
          img: adobe_ps,
        },{
          name: "Adobe Illustrator",
          img: adobe_il,
        },{
          name: "Adobe AfterEffects",
          img: adobe_ae,
        },{
          name: "Adobe Premiere",
          img: adobe_pr,
        },{
          name: "HTML",
          img: html,
        },{
          name: "CSS",
          img: css,
        },{
          name: "Javascript",
          img: javascript,
        }
      ],
      image: mnml,
      link: "https://mnml.amsterdam/",
      link_fm: "/project/Techno-Kube",
      content: [
        { title: "The Client",
          description: "mnml.amsterdam is an event management and booking agency company specializing in techno events across Amsterdam. From event planning to artist booking and music production, they deliver exceptional experiences for techno enthusiasts in nightclubs and festivals.",
        },
        {
          title: 'The Challenge',
          description: 'For Techno Kube nights the client requested a distinct brand identity solution with logo design and a single page website. The website needed to include the event showcase, ticket sales, and music player integration. The client also required assistance with event logistics, a booking agent and a stage manager.'
        },
        { title: "The Website",
          description: "Few important points were imposed by the client: 1) a simple and bright design which reflected the summer season and the interests of their business customers, 2) two languages - english as the main language as to attract more foreign customers but also italian in order to not limit the possibility of national tourism, and 3) the color palette which was already part of their print marketing material. The first part of the project consisted of creating a wireframe of the full website using Adobe illustrator. The project wireframe was then exported to Adobe Muse where the full website was created with scrolling sections, single page and multipage layouts. The last and final step toward the complete project was the creations of breakpoints on Adobe Muse for a fully responsive and mobile device compatible design, which included the description of the business, available accommodations, location, and a descriptive page regarding the host.",
          image:"",
        }
      ]
    },
    {
      id: "06",
      name: "Prasanna",
      description:
        "Developed a clean and user-friendly website for Prasanna Yoga in Rotterdam, adhering to the client's specific guidelines, including a provided logo, color palette, and content. Utilized Adobe Muse for the project, ensuring a responsive layout with a fully translated Dutch version and embedded Google Maps.",
      tags: [
        { name: "Graphic Design"},
        { name: "Web Design"},
        { name: "Web Development"},
      ],
      techs: [
        {
          name: "Adobe Photoshop",
          img: adobe_ps,
        },{
          name: "Adobe Illustrator",
          img: adobe_il,
        },{
          name: "HTML",
          img: html,
        },{
          name: "CSS",
          img: css,
        },{
          name: "Javascript",
          img: javascript,
        }
      ],
      image: prasanna,
      link: "http://prasannayoga.nl/",
      link_fm: "/project/Prasanna",
      content: [
        { title: "The Client",
          description: "Prasanna Yoga is a Yoga practice studio situated in the northern side of the city of Rotterdam, The Netherlands. They offers transformative yoga practices aimed at fostering inner peace and holistic well-being. Rooted in tradition, their teachings guide students towards physical and mental alignment, facilitating a harmonious and balanced lifestyle.",
        },
        {
          title: 'The Challenge',
          description: 'a multilingual website solution for class scheduling and information dissemination. Required a user-friendly interface for both teachers and students in English and Dutch languages.'
        },
        { title: "The Website",
          description: "The design followed strict recommendations from the client, who provided a logo, color palette, images, content and full structure of the website, including a fully translated version of the site content. After gathering all the necessary and given information, and assets, I created the final version of the project using Adobe Muse, including a Dutch translated version of the website and I embedded google maps linking to the yoga classroom location, contact links, in a mobile device friendly and responsive layout.",
          image:"",
        }
      ]
    },
  ];