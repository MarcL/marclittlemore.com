const iconClass = 'w-10 h-10 fill-current';
const icons = {
  globe: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/></svg>`,
  laptop: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M128 32C92.7 32 64 60.7 64 96V352h64V96H512V352h64V96c0-35.3-28.7-64-64-64H128zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480H563.2c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2H19.2z"/></svg>`,
  desktop: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z"/></svg>`,
  mobile: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM304 64H80V384H304V64z"/></svg>`,
  tablet: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM256 448c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM384 64H64V384H384V64z"/></svg>`,
  apple: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>`,
  android: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/></svg>`,
  gamepad: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconClass}" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 248c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40zm-24 56c0 22.1-17.9 40-40 40s-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>`,
};

module.exports = [
  {
    url: "https://marcl.github.io/see-it-off/",
    data: {
      title: "See It Off",
      subtitle: "Released: 2017",
      description: "This was a fun web game which I made with my work colleague [Cyrièle Piancastelli](http://cyro.me/) to celebrate/commiserate the depature of our team mate [Tom Robinson](https://twitter.com/iamtmrobinson) earlier in 2017. I used the [Phaser](http://phaser.io/) JavaScript framework for the first time and this made it really easy to get a fun game up and running quickly. You can find [the code here](https://github.com/MarcL/see-it-off) but be warned that it was written very quickly over a few nights so don't view it as best practice for games programming!",
      gameImage: "/images/games/see-it-off-javascript-web-game.jpg",
      icons: [icons.globe, icons.laptop, icons.desktop, icons.mobile]
    }
  },
  {
    data: {
      title: "What The Book",
      subtitle: "Released: 2015",
      description: "This was a mobile puzzle game I originallly started before [I became very ill](/how-i-almost-died/) but it took me a year and a half to finish in the end. This was written using C# and the [Unity](https://unity3d.com/) game engine. This was a great project for learning about integration of in-app payments, social network sharing and advertising networks. Unfortunately, I ended up taking the project down due to copyright claims because I was using books as the main theme for the puzzles.",
      gameImage: "/images/games/what-the-book-ios-game.jpg",
      icons: [icons.apple, icons.mobile]
    }
  },
  {
    data: {
      title: "Santa's Chrismas Present Countdown",
      subtitle: "Released: 2014",
      description: "This was a simple one-touch game I wrote using C# and the [Unity](https://unity3d.com/) game engine. Different coloured presents fall from the top of the screen at increasing speeds and the player scores points by catching them with the correctly coloured Santa. A very basic game but taught me about Unity and adding advertising networks, and automating deployment to the Apple app store.",
      gameImage: "/images/games/santas-christmas-present-countdown-ios-game.jpg",
      icons: [icons.apple, icons.mobile]
    }
  },
  {
    data: {
      title: "2K Drive",
      subtitle: "Released: 2013",
      description: "I was responsible for a lot of the backend server code for this driving game from [Lucid](http://www.lucidgames.co.uk/). Written in PHP, it allowed on-the-fly updates of new game modes and easy update of the game's economy and statistics for game balancing. It taught me an awful lot about effective caching, devops and how not to write solid unit and integration tests for a project. I've learnt an awful lot about properly mocking and stubbing systems since this game!",
      gameImage: "/images/games/2k-drive-568x568.jpg",
      icons: [icons.apple, icons.android, icons.mobile, icons.tablet]  
    }
  },
  {
    data: {
      title: "The Walking Dead: Assault",
      subtitle: "Released: 2012",
      description: "One of my first mobile titles which was based on The Walking Dead graphic novels rather than the TV series of the same name. I built the game editor, some of the game modes and the inventory sytems for this fun real-time strategy game on iOS and Android.",
      gameImage: "/images/games/walking-dead-assault-568x568.jpg",
      icons: [icons.apple, icons.android, icons.mobile, icons.tablet]
    }
  },
  {
    data: {
      title: "Shift 2: Unleashed",
      subtitle: "Released: 2011",
      description: "After many years of being a Sony developer, contracting for [Slightly Mad Studios](http://www.slightlymadstudios.com/) allowed me to work on a cross-platform game, developing for the XBox 360, PS3 and PC. I developed the in-game downloadable content systems and EA's Online Pass for this game across all platforms.",
      gameImage: "/images/games/shift2-unleashed-640x360.jpg",
      icons: [icons.gamepad]
    }
  },
  {
    data: {
      title: "WipEout Pulse",
      subtitle: "Released: 2007",
      description: "My first lead programmer role was developing the sequel to the successful PSP version of WipEout called WipEout Pure. Although a did a lot of bug fixing and implemented some low-level game saving, my job was mainly managing a team of 11 programmers and attempting to help to get the game out on time, within the memory constraints.",
      gameImage: "/images/games/wipeout-pulse-480x272.jpg",
      icons: [icons.gamepad]
    }
  },
  {
    data: {
      title: "F1 2006 / F1 Championship Edition",
      subtitle: "Released: 2006",
      description: "Another classic Sony developed franchise from the late 90s until the final PS3 version in 2007. I helped to get the game running on PSP and mainly managed and mentored a team of graduate programmers in implementing the game's user interface across the PSP, PS2 and PS3 versions of the game.",
      gameImage: "/images/games/f1-championship-edition-640x360.jpg",
      icons: [icons.gamepad]
    }
  },
  {
    data: {
      title: "WipEout Pure",
      subtitle: "Released: 2005",
      description: "Joining Sony's sadly-no-longer-with-us [Liverpool Studio](http://www.worldwidestudios.net/) back in 2004, allowed me to work on the first PSP title for the studio - WipEout Pure. A handheld version of the classic futuristic racing game which showed off the new console's power. I worked on some of the UI but mainly implemented the game's audio and video streaming systems. This project was one of the most fun I've worked on. A great team and a fantastic atmosphere.",
      gameImage: "/images/games/wipeout-pure-480x272.jpg",
      icons: [icons.gamepad]
    }
  },
  {
    data: {
      title: "Wolverine's Revenge",
      subtitle: "Released: 2003",
      description: "Marvel and Activision's Wolverine Revenge was developed at another now-defunct studio in the North West of England called Genepool Software. I was brought on board to write the game's streaming audio system on PS2 and develop many of the game's boss battle AI. A difficult project to work on due to the game's somewhat brittle game engine, but the game ended up being quite fun in the end.",
      gameImage: "/images/games/wolverines-revenge-512x384.jpg",
      icons: [icons.gamepad]
    }
  },
  {
    data: {
      title: "Silver",
      subtitle: "Released: 1998",
      description: "Silver was a classic RPG in the vein of the Japanese role playing games of the mid-90s. Think Final Fantasy but with British accents! This was one of the hardest but most fun projects that I worked on. Many, many late nights helped to get this game out of the door but expanding on an in-game scripting language, developing lots of the enemy and boss AI and helping to design and script up game levels made it brilliant fun.",
      gameImage: "/images/games/silver-640x480.jpg",
      icons: [icons.desktop]
    }
  }
];
