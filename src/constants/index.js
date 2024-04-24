import {
    gh,yt,li,
  } from "../assets/socials";

  export const navLinks = [
    {
      id: "about",
      title: "About",
      to: "#about",
      type: 'anchor'
    },
    {
      id: "experience",
      title: "Experience",
      to: "#experience",
      type: 'anchor'
    },
    {
      id: "projects",
      title: "Portfolio",
      to: "#projects",
      type: 'anchor'
    },
    {
      id: "contact",
      title: "Contact",
      to: "#contact",
      type: 'anchor'
    },
    {
      id: "blog",
      title: "Blog",
      to: "/blog",
    },
  ];

  export const socials = [
    {
      id: "linkedIn",
      icon: li,
      url: "https://www.linkedin.com/in/fabriziomarras",
    },
    {
      id: "github",
      icon: gh,
      url: "https://github.com/FabrizioMarras",
    },
    {
      id: "youtube",
      icon: yt,
      url: "https://www.youtube.com/@fabriziomarras7644",
    },
  ];

  export const footerNavs = [
    {
      id: "about",
      title: "About",
      url: "/#about"
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      url: "/terms"
    },{
      id: "contact",
      title: "Contact",
      url: "/#contact"
    },
  ]