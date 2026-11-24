/**
 * Retro Chicago Skyline Bike Runner
 * Extracted from Charles Honig (charleshonig.design)
 * High-performance procedural pixel runner arcade game.
 */
(function() {
  'use strict';

  // 1. Procedural sprite and skyline generation helpers
let eM="bike-run-played",eA=!1;function eL(e){return fetch("/api/rides",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0})}var eW = { EASE: [0.16, 1, 0.3, 1] };let eT=(e,t)=>Array.from({length:t},()=>Array(e).fill(".")),eq=e=>e.map(e=>[...e]);function eR(e,t,a){for(let n of a){let[a,i]=n.split(":"),[o,s=o]=i.split("-").map(Number),r=e[Number(a)];for(let e=o;e<=s;e++)r&&e<r.length&&(r[e]=t)}return e}function ez(e,t,a,n){return t.forEach((t,i)=>[...t].forEach((t,o)=>{let s=e[n+i];"."!==t&&s&&a+o<s.length&&(s[a+o]=t)})),e}function e$(e,t){let a=e.map(e=>e.map(()=>!1)),n=(a,n)=>e[n]?.[a]===t&&e[n][a-1]!==t&&e[n][a+1]!==t,i="";return e.forEach((e,o)=>{for(let s=0;s<e.length;s++){if(e[s]!==t||a[o][s])continue;let r=1;for(;e[s+r]===t;)r++;let l=1;if(1===r)for(;n(s,o+l);)a[o+l++][s]=!0;i+=`M${s} ${o}h${r}v${l}h-${r}z`,s+=r-1}}),i}let eI=e=>({w:e[0].length,h:e.length,ink:e$(e,"#"),grey:e$(e,"o"),band:e$(e,"x")}),eP=(e,t)=>`url("data:image/svg+xml,${`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${e[0].length} ${e.length}' preserveAspectRatio='none' shape-rendering='crispEdges'><path d='${e$(e,t)}'/></svg>`.replace(/</g,"%3C").replace(/>/g,"%3E")}")`,eH=["..###..",".#...#.","#.....#","#.....#","#.....#",".#...#.","..###.."],eB=[["1:3","2:3","3:3","4:3","5:3"],["2:4","3:3","4:2"],["3:1-5"],["2:2","3:3","4:4"]];function eO(e){let t=eT(7,7);return eR(t,"o",eB[e%4]),ez(t,eH,0,0),t.map(e=>e.join(""))}let eF=["7:4-7","8:6-12","9:6","10:7","11:7","12:8","13:7-8","9:12","11:13","12:14","13:14","13:3","7:12-14","8:14"],e_=["0:12-13","1:11-14","2:11-14","3:8-13","4:7-9","5:6-8","6:5-8","4:12","5:13","6:13"],eV=["4:14-15","5:7-16","6:5-16","7:14-15"],eD=["7:7-8","8:7-8","9:8","10:8","11:8","12:8","13:8","14:8","15:8-9"],eK=["7:8-10","8:9-10","9:10","10:9","11:8-9"],eY=["7:7-8","8:8-9","9:9-10","10:10","11:10","12:10","13:10-11"],eX=["7:7","8:7","9:6-7","10:6","11:6","12:6","13:5-6"],eJ=new Map;function eU(e,t,a,n){let i=!!e|t<<1|a<<2|n+1<<4,o=eJ.get(i);if(o)return o;let s=eT(18,17);if(eR(s,"#",t?eX:eK),ez(s,eO(a),0,10),ez(s,eO(a),11,10),eR(s,"#",eF),eR(s,"#",t?eY:eD),eR(s,"#",e?eV:e_),s.unshift(Array(18).fill(".")),n)for(let e=9*(n>0);e<=(n>0?17:8);e++){for(let t=0;t<17;t++)s[t][e]=s[t+1][e];s[17][e]="."}let r=eI(function(e){let t=e.length,a=e[0].length,n=e.map(e=>e.map(()=>!1)),i=[];for(let e=0;e<t;e++)i.push([0,e],[a-1,e]);for(let e=0;e<a;e++)i.push([e,0],[e,t-1]);for(;i.length;){let[o,s]=i.pop();o<0||s<0||o>=a||s>=t||n[s][o]||"."!==e[s][o]||(n[s][o]=!0,i.push([o+1,s],[o-1,s],[o,s+1],[o,s-1]))}return e.map((e,t)=>e.map((e,a)=>"."!==e||n[t][a]?e:"x"))}(s));return eJ.set(i,r),r}let eG=[".##.","#oo#","#oo#",".##."];function eZ(e){let t=eT(24,11);return eR(t,"#",["0:9-18","1:8-19","2:7-20","3:2-23","4:0-23","5:0-23","6:0-23","7:0-23"]),eR(t,"o",["1:9-12","1:14-17","2:8-12","2:14-18","4:0","5:0"]),e&&eR(t,"o",["4:10","4:12","4:14","5:9","5:11","5:13","5:15"]),eR(t,".",["6:3-8","7:3-8","6:16-21","7:16-21"]),ez(t,eG,4,7),ez(t,eG,17,7),e&&t.unshift([..."............###........."]),t}function eQ(e){let t=eT(11,12);return eR(t,"#",["3:2-3","4:1-4","5:0-6","6:1-9","7:2-10","8:3-8"]),eR(t,"#",e?["0:7-8","1:6-8","2:6-9","3:6-9","4:6-9","5:7-9"]:["9:5-8","10:6-8","11:7-8"]),t}function e0(e){let t=eT(16,12);return eR(t,"#",["4:1-3","5:0-12","6:1-14","7:3-11"]),eR(t,"#",e?["0:13-14","1:11-13","2:9-12","3:7-10","4:6-9"]:["8:6-9","9:8-11","10:10-12","11:12-13"]),t}function e1(e){let t=eT(20,12);return eR(t,"#",["4:1-2","5:0-17","4:10-15","6:8-18","7:8-19","8:10-16"]),eR(t,"o",["5:2"]),eR(t,"#",e?["0:13-15","1:12-15","2:11-15","3:10-15"]:["9:11-15","10:12-15","11:13-14"]),t}let e2=["..##########################..",".############################.","##############################","###oooo#oooo#oooo#oooo#oooo###","###oooo#oooo#oooo#oooo#oooo###","###oooo#oooo#oooo#oooo#oooo###","##############################","##############################","##############################","...########........########...","....##..##..........##..##....","....##..##..........##..##...."];function e3(e){let t=32*e,a=eT(t,32);for(let n of(ez(a,e2,1,0),2===e&&(ez(a,e2,33,0),eR(a,"#",["8:31-32"])),eR(a,"#",[`12:0-${t-1}`,`16:0-${t-1}`]),[0,t-1]))for(let e of[13,14,15])a[e][n]="#";for(let e=0;e<t;e++)a[e%4==0?13:e%4==2?15:14][e]="#";return a}let t, a, n;
let e4={cone:{art:[eI(eq(["...#...","...#...","..###..","..ooo..","..###..",".#####.",".ooooo.",".#####.","#######"]))],boxes:[[3,11,0,14]],speed:1},sign:{art:[eI(eq(["....#....","...###...","..##o##..",".###o###.","####o####",".#######.","..##o##..","...###...","....#....","....#....","....#....","....#....","..#####.."]))],boxes:[[7,11,0,9],[3,15,9,23]],speed:1},stop:{art:[eI(eq(["..#####..",".#######.","#########","#########","#ooooooo#","#########","#########",".#######.","..#####..","....#....","....#....","....#....","....#....","....#...."]))],boxes:[[7,11,0,10],[2,16,10,27]],speed:1},sedan:{art:[eI(eZ(!1))],boxes:[[3,45,0,14],[18,38,14,20]],speed:1.25},taxi:{art:[eI(eZ(!0))],boxes:[[3,45,0,14],[18,38,14,20]],speed:1.25},hatch:{art:[eI((eR(t=eT(20,11),"#",["0:8-17","1:7-18","2:6-19","3:1-19","4:0-19","5:0-19","6:0-19","7:0-19"]),eR(t,"o",["1:8-11","1:13-16","2:7-11","2:13-17","4:0","5:0"]),eR(t,".",["6:2-7","7:2-7","6:12-17","7:12-17"]),ez(t,eG,3,7),ez(t,eG,13,7),t))],boxes:[[3,37,0,14],[16,36,14,20]],speed:1.25},pickup:{art:[eI((eR(a=eT(26,11),"#",["0:8-14","1:7-14","2:6-14","3:2-14","3:16-25","4:0-25","5:0-25","6:0-25","7:0-25"]),eR(a,"o",["1:8-10","1:12-13","2:7-10","2:12-13","4:0","5:0"]),eR(a,".",["6:3-8","7:3-8","6:18-23","7:18-23"]),ez(a,eG,4,7),ez(a,eG,19,7),a))],boxes:[[3,49,0,14],[15,28,14,20]],speed:1.25},van:{art:[eI((eR(n=eT(22,12),"#",["0:5-21","1:4-21","2:3-21","3:2-21","4:1-21","5:0-21","6:0-21","7:0-21","8:0-21"]),eR(n,"o",["2:4-7","3:3-7","2:9-13","3:9-13","5:0","6:0"]),eR(n,".",["7:3-8","8:3-8","7:14-19","8:14-19"]),ez(n,eG,4,8),ez(n,eG,15,8),n))],boxes:[[3,42,0,13],[9,42,13,22]],speed:1.25},walkup:{art:[eI(eq([".......#...","......###..","......###..","......###..","......#.#..","###########","###########","##oo###oo##","##oo###oo##","###########","##oo###oo##","##oo###oo##","###########","##oo###oo##","##oo###oo##","###########"]))],boxes:[[1,21,0,21],[13,17,21,29]],speed:1},marina:{art:[eI(eq(["...##...","...##...","########",".######.","########",".######.","########",".######.","########",".######.","########",".######.","########",".######.","########",".######.","########"]))],boxes:[[2,14,0,29]],speed:1},willis:{art:[eI(eq(["...#..#...","...#..#...","...#..#...","...####...","...####...","...####...","..######..","..######..","..######..","..######..",".########.",".########.",".########.","##########","##########","##########","##########","##########","##########"]))],boxes:[[1,19,0,17],[5,15,17,30]],speed:1},hancock:{art:[eI(eq(["...#.#...","...#.#...","...#.#...","..#####..","..#o#o#..","..##o##..","..#o#o#..",".#######.",".#o###o#.",".##o#o##.",".###o###.",".##o#o##.",".#o###o#.","#########","##o###o##","###o#o###","####o####","###o#o###","#########"]))],boxes:[[1,17,0,23],[5,13,23,30]],speed:1},tower:{art:[eI(eq([".....#.....","....###....","...#####...","....###....","....###....","....#o#....","....###....","....###....","....###....","..#.###.#..","..#######..","..##o#o##..","..#######..","#.#######.#","###########","##o##o##o##","###########","#####o#####","#####o#####"]))],boxes:[[1,21,0,10],[5,17,10,18],[9,13,18,32]],speed:1},cottage:{art:[eI(eq([".....#..#..","....###.#..","...######..","..#######..",".#########.","###########",".#########.",".#oo###oo#.",".#oo###oo#.",".#########.",".#oo###oo#.",".#oo###oo#.",".#########.",".####o####.",".####o####."]))],boxes:[[3,19,0,19],[7,15,19,26]],speed:1},bird:{art:[eI(eQ(!0)),eI(eQ(!1))],boxes:[[2,20,4,17]],speed:1},gull:{art:[eI(e0(!0)),eI(e0(!1))],boxes:[[2,30,4,15]],speed:1},goose:{art:[eI(e1(!0)),eI(e1(!1))],boxes:[[2,38,4,17]],speed:1},track:{art:[eI(e3(2))],boxes:[[2,126,30,64]],speed:1},single:{art:[eI(e3(1))],boxes:[[2,62,30,64]],speed:1}},e6={0:["###","#.#","#.#","#.#","###"],1:[".#.","##.",".#.",".#.","###"],2:["###","..#","###","#..","###"],3:["###","..#","###","..#","###"],4:["#.#","#.#","###","..#","..#"],5:["###","#..","###","..#","###"],6:["###","#..","###","#.#","###"],7:["###","..#","..#","..#","..#"],8:["###","#.#","###","#.#","###"],9:["###","#.#","###","..#","###"],H:["#.#","#.#","###","#.#","#.#"],I:["###",".#.",".#.",".#.","###"]};function e5(e){let t=e=>" "===e?3:4,a=eT([...e].reduce((e,a)=>e+t(a),-1),5),n=0;for(let i of e)ez(a,e6[i]??[],n,0),n+=t(i);return eI(a)}let e8=eI(eq(["oooooooo","ooooooo.","oooooo..","ooooooo.","oooooooo","o.......","o.......","o.......","o.......","o.......","o.......","o.......","o......."])),e7=[["2:0-2","2:7","4:3-5"],["4:0","3:3-4"],["2:0-1","4:4-6"],["3:0-2","2:6","4:8-9"],["4:0-1","2:4-5"]],e9=function(){let e=eT(800,12);for(let[t,a]of(eR(e,"#",["0:0-"+799]),[[118,6],[311,5]])){let n=2*t,i=(t+a)*2-1;eR(e,".",[`0:${n}-${i}`]),eR(e,"#",[`2:${n}-${i}`]);for(let t=1;t<2;t++)eR(e,"#",[`${t}:${n-1}`,`${t}:${i+1}`])}return[9,47,81,133,170,214,249,292,336,371].forEach((t,a)=>{eR(e,"o",e7[a%e7.length].map(e=>{let[a,n]=e.split(":"),[i,o=i]=n.split("-").map(Number);return`${2*Number(a)}:${(i+t)*2}-${(o+t+1)*2-1}`}))}),e}(),te={w:800,h:+e9.length,ink:eP(e9,"#"),grey:eP(e9,"o")},tt={willis:[[2,7],[2,10],[1,13],[1,17],[1,13],[1,17],[1,13],[2,10],[2,7]],hancock:[[1,8],[1,10],[1,12],[1,13],[1,16],[1,13],[1,16],[1,13],[1,12],[1,10],[1,8]],marina:[[3,8],[2,0],[3,8]],aon:[[5,15]],pru:[[2,9],[1,11],[1,12],[1,16],[1,12],[1,11],[2,9]],trump:[[3,5],[3,9],[2,13],[1,17],[2,13],[3,8]],crain:[[1,8],[1,9],[1,10],[1,11],[1,12],[4,6]],board:[[3,7],[2,10],[1,12],[1,14],[1,12],[2,10],[3,7]],spire:[[3,6],[2,9],[1,11],[1,15],[1,11],[3,8]],church:[[4,4],[1,6],[1,9],[1,6],[5,4]],tank:[[6,4],[1,6],[2,7],[1,6],[5,4]],block:[[5,5],[4,12],[4,6],[6,3]],slab:[[4,6],[5,9],[3,4]],twin:[[4,11],[1,0],[4,13]],step:[[4,6],[4,10],[3,7]],stacks:[[3,5],[1,0],[3,7],[1,0],[3,5]],terrace:[[3,3],[3,5],[3,7],[3,5]],wide:[[8,6],[5,4]],garage:[[9,3]],low1:[[5,3],[4,6],[3,4]],low2:[[6,4],[4,2]],low3:[[4,7],[3,5]],low4:[[7,2],[4,5]],low5:[[3,3],[5,5],[6,2]],low6:[[5,4]]},ta=[6,"low1",4,"willis",5,"low2",3,"marina",6,"block",5,"hancock","low6",8,"low3",2,"spire",6,"low4",10,"low5",9,"aon",3,"slab",7,"tank",12,"low2",4,"pru",4,"low1",8,"step",11,"low4",6,"trump",9,"low5",5,"low3",14,"tank",6,"crain",7,"low1",10,"twin",5,"low2",13,"slab",4,"low3",9,"block",12,"low4",7,"step",5,"low5",16,"low1",6,"spire",8,"low2",11,"tank",9,"low3",4,"slab",14,"low4",8,"low1",12,"garage",7,"board",9,"low2",5,"terrace",12,"church",6,"low4",10,"stacks",4,"wide",8,"low1",13,"block",6,"low3",9,"twin",5,"garage",11,"low5",7,"step",4,"terrace",12,"low2",8,"church",10,"wide",6,"low1",9,"stacks",12,"low4",7,"slab",10],tn=[["....#####.....","..##.....###..",".#..........#.","#............#","##############"],["...####...",".##....##.","#........#","##########"]],ti=[[38,1,0],[121,2,1],[203,0,1],[296,2,0],[352,0,1],[447,2,1],[530,1,0],[628,1,1],[715,0,0],[790,2,1],[872,1,1],[948,0,0],[1036,2,1],[1120,1,0],[1190,0,1]],to=[{kind:"cone",family:"small",from:6},{kind:"sign",family:"small",from:6},{kind:"stop",family:"small",from:6},{kind:"sedan",family:"car",from:6},{kind:"taxi",family:"car",from:6},{kind:"hatch",family:"car",from:6},{kind:"pickup",family:"car",from:6.6},{kind:"van",family:"car",from:6.6},{kind:"walkup",family:"building",from:6},{kind:"marina",family:"building",from:6},{kind:"cottage",family:"building",from:6},{kind:"willis",family:"building",from:6.6},{kind:"hancock",family:"building",from:6.6},{kind:"tower",family:"building",from:6.6},{kind:"bird",family:"bird",from:6},{kind:"gull",family:"bird",from:6},{kind:"goose",family:"bird",from:6},{kind:"track",family:"overhead",from:6},{kind:"single",family:"overhead",from:6}],ts={small:3,car:3,building:2,bird:3,overhead:2},tr={small:2,car:4,building:2,bird:0,overhead:0},tl=e=>2*Math.sqrt(Math.max(0,207025-3140*e))/1570,td="bike-run-hi",tc=e=>String(e).padStart(5,"0"),tu=(e,t,a)=>e+(t-e)*a,tp=e=>2*Math.round(e/2),tf=e=>`0 0 ${e.w} ${e.h}`,tm=e=>2*e4[e].art[0].w,th=eU(!1,0,0,0),tx=e5(tc(0)),tg={shapeRendering:"crispEdges","aria-hidden":!0},tv=e=>`calc(100% + ${e}px)`,tb=(e,t,a)=>({maskImage:e,WebkitMaskImage:e,maskSize:`${t}px ${a}px`,WebkitMaskSize:`${t}px ${a}px`,maskRepeat:"repeat-x",WebkitMaskRepeat:"repeat-x"});

  // 2. Main runner initialization
  window.initFooterRunner = function() {
    const trackElement = document.getElementById('bike-runner');
    if (!trackElement) return;

    if (trackElement.__runnerInitialized) return;
    trackElement.__runnerInitialized = true;

    const cyclistElement = trackElement.querySelector('.runner-cyclist');
    const skylineElement = trackElement.querySelector('.runner-skyline');
    const roadElement = trackElement.querySelector('.runner-road');
    const landmarkElement = trackElement.querySelector('.runner-landmark');
    const scoreElement = trackElement.querySelector('.runner-score');
    const hiscoreElement = trackElement.querySelector('.runner-hiscore');
    const scoreOuter = trackElement.querySelector('.runner-score-outer');
    const scoreInner = trackElement.querySelector('.runner-score-inner');
    const promptDesktop = trackElement.querySelector('.runner-prompt');
    const promptDesktopText = trackElement.querySelector('.runner-prompt-text');
    const promptMobile = trackElement.querySelector('.runner-prompt-mobile');

    if (!cyclistElement || !skylineElement || !roadElement) return;

    // Initialize road masks
    const roadGrey = roadElement.querySelector('.runner-road-grey');
    const roadInk = roadElement.querySelector('.runner-road-ink');
    if (roadGrey) Object.assign(roadGrey.style, tb(te.grey, te.w, te.h));
    if (roadInk) Object.assign(roadInk.style, tb(te.ink, te.w, te.h));
    roadElement.style.width = tv(te.w);
    roadElement.style.height = `${te.h}px`;

    // Initialize cyclist paths
    const cyclistSvg = cyclistElement.querySelector('svg');
    if (cyclistSvg) {
      cyclistSvg.setAttribute('width', String(2 * th.w));
      cyclistSvg.setAttribute('height', String(2 * th.h));
      cyclistSvg.setAttribute('viewBox', tf(th));
      const band = cyclistElement.querySelector('[data-part="band"]');
      const grey = cyclistElement.querySelector('[data-part="grey"]');
      const ink = cyclistElement.querySelector('[data-part="ink"]');
      if (band) band.setAttribute('d', th.band);
      if (grey) grey.setAttribute('d', th.grey);
      if (ink) ink.setAttribute('d', th.ink);
    }

    // Initialize score SVG
    if (scoreElement) {
      const scoreSvg = scoreElement.querySelector('svg');
      if (scoreSvg) {
        scoreSvg.setAttribute('width', String(2 * tx.w));
        scoreSvg.setAttribute('height', String(2 * tx.h));
        scoreSvg.setAttribute('viewBox', tf(tx));
        const path = scoreSvg.querySelector('path');
        if (path) path.setAttribute('d', tx.ink);
      }
    }

    // Obstacles wrap (20 slots)
    let obstaclesWrap = trackElement.querySelector('.runner-obstacles-wrap');
    if (!obstaclesWrap) {
      obstaclesWrap = document.createElement('div');
      obstaclesWrap.className = 'runner-obstacles-wrap';
      trackElement.appendChild(obstaclesWrap);
    }

    let obstacleNodes = Array.from(obstaclesWrap.children);
    if (obstacleNodes.length < 20) {
      obstaclesWrap.innerHTML = '';
      obstacleNodes = [];
      for (let i = 0; i < 20; i++) {
        const slot = document.createElement('div');
        slot.className = 'runner-obstacle absolute left-0 hidden will-change-transform data-[kind]:block';
        slot.style.bottom = '12px';
        slot.innerHTML = '<svg shape-rendering="crispEdges" aria-hidden="true" class="max-w-none"><path data-part="grey" class="fill-[#9d9d9d]"></path><path data-part="ink" class="fill-[#f5f5f6]"></path></svg>';
        obstaclesWrap.appendChild(slot);
        obstacleNodes.push(slot);
      }
    }

    // State transition handler for UI (prompts, score wrap)
    const n = function(state) {
      if (state === 'running') {
        if (promptDesktop) {
          promptDesktop.style.opacity = '0.85';
          if (promptDesktopText) promptDesktopText.textContent = 'or Click to jump';
        }
        if (promptMobile) {
          promptMobile.style.opacity = '0.85';
          promptMobile.textContent = 'Tap to jump';
        }
        if (scoreOuter) scoreOuter.style.width = '160px';
        if (scoreInner) scoreInner.style.transform = 'translateY(0%)';
      } else if (state === 'over') {
        if (promptDesktop) {
          promptDesktop.style.opacity = '1';
          if (promptDesktopText) promptDesktopText.textContent = 'to ride again';
        }
        if (promptMobile) {
          promptMobile.style.opacity = '1';
          promptMobile.textContent = 'Tap to ride again';
        }
        if (scoreOuter) scoreOuter.style.width = '160px';
        if (scoreInner) scoreInner.style.transform = 'translateY(0%)';
      } else { // idle
        if (promptDesktop) {
          promptDesktop.style.opacity = '1';
          if (promptDesktopText) promptDesktopText.textContent = 'to ride';
        }
        if (promptMobile) {
          promptMobile.style.opacity = '1';
          promptMobile.textContent = 'Tap to ride';
        }
        if (scoreOuter) scoreOuter.style.width = '0px';
        if (scoreInner) scoreInner.style.transform = 'translateY(110%)';
      }
    };

    // React ref adapters
    const f = { current: trackElement };
    const m = { current: cyclistElement };
    const h = { current: skylineElement };
    const x = { current: roadElement };
    const g = { current: obstacleNodes };
    const v = { current: landmarkElement };
    const b = { current: scoreElement };
    const y = { current: hiscoreElement };

    // --- Core Runner Engine ---
let e=f.current,t=m.current,a=h.current;if(!e||!t||!a)return;let i={band:t.querySelector('[data-part="band"]'),grey:t.querySelector('[data-part="grey"]'),ink:t.querySelector('[data-part="ink"]')},o=g.current.map(e=>({node:e,svg:e?.querySelector("svg"),grey:e?.querySelector('[data-part="grey"]'),ink:e?.querySelector('[data-part="ink"]')})),s=function(){let e=1+(1.44-1)*ta.reduce((e,t)=>e+("number"==typeof t?t:tt[t].reduce((e,[t])=>e+t,0)),0)/ta.reduce((e,t)=>e+("number"==typeof t?t:0),0),t=ta.flatMap(t=>"number"==typeof t?[[Math.round(t*e),0]]:tt[t]).flatMap(([e,t])=>Array(e).fill(Math.round(1.3*t))),a=t.length,n=t.flatMap((e,n)=>{let i=t[(n-1+a)%a],o=t[(n+1)%a],s=e>i&&i===o;return Array.from({length:2},(t,a)=>(s&&a?o:e)*2)}),i=n.length,o=eT(i,72);for(let[e,s,r]of(n.forEach((e,t)=>{if(!e)return;let a=Math.min(n[(t-1+i)%i],n[(t+1)%i],e-1);for(let n=a+1;n<=e;n++)o[72-n][t]="-"}),ti)){let n=Math.round(1.44*e),l=tn[r],d=l[0].length,c=e=>{let n=0;for(let i=-3;i<d+3;i++)n=Math.max(n,t[(e+i+a)%a]);return n},u=n;for(let e=1;c(u)>9&&e<80;e++)u=9>=c(n+e)?n+e:n-e;let p=(e,t)=>{let a=l[Math.floor(t/2)],n=Math.floor(e/2);return!!a&&n>=a.indexOf("#")&&n<=a.lastIndexOf("#")},f=(22-s-l.length)*2;for(let e=0;e<2*l.length;e++)for(let t=0;t<2*d;t++)p(t,e)&&!(p(t-1,e)&&p(t+1,e)&&p(t,e-1)&&p(t,e+1))&&(o[f+e][(2*u+t+i)%i]="-")}return{w:2*a,h:72,far:eP(o,"-")}}();Object.assign(a.style,tb(s.far,s.w,s.h),{width:tv(s.w),height:`${s.h}px`});let r=window.matchMedia("(pointer: coarse)"),l=window.matchMedia("(prefers-reduced-motion: reduce)"),d="idle",c=e.clientWidth,u=t.offsetLeft,p=!1,w=0,k=0,j=6,N=0,S=0,C=0,E=0,M=0,A=0,L=0,W=!1,T=!1,q=-1,R=0,z=null,$=0,I=null,P=0,H=!1,B=0,O=0,F=0,_=0,V=0,D=!1,K=-1,Y=null,X=0,J=-1,U=[],G=(e,t)=>{let a=e5(t),n=e.querySelector("svg");n?.setAttribute("width",String(2*a.w)),n?.setAttribute("height",String(2*a.h)),n?.setAttribute("viewBox",tf(a)),n?.querySelector("path")?.setAttribute("d",a.ink);let i=e.querySelector("span");i&&(i.textContent=t)},Z=()=>{let e=y.current;e&&(G(e,`HI ${tc(X)}`),e.hidden=0===X)};try{X=Number(window.localStorage.getItem(td))||0}catch{}Z();let Q=()=>Math.min(1,Math.max(.75,c/500)),ee=()=>42*j*Q(),et=()=>{let e=to.filter(e=>j>=e.from&&e.kind!==I&&!(e.family===z&&$>=2)&&!("overhead"===e.family&&r.matches)),t=[...new Set(e.map(e=>e.family))],a=Math.random()*t.reduce((e,t)=>e+ts[t],0),n=t[0];for(let e of t)if(n=e,(a-=ts[e])<0)break;let i=e.filter(e=>e.family===n),o=i[Math.floor(Math.random()*i.length)];return $=n===z?$+1:1,z=n,o},ea=e=>{let t=[{kind:e.kind,at:0}],a=(j-6)/7,n=tr[e.family]>0&&j>=6.3&&Math.random()<tu(.4,.7,a)?j>=7.2&&.45>Math.random()?3:2:1,i=to.filter(t=>t.family===e.family&&j>=t.from),o=ee()*e4[e.kind].speed,s=Math.min(...e4[e.kind].boxes.map(([e])=>e)),r=Math.max(...e4[e.kind].boxes.map(e=>e[3])),l=tm(e.kind);for(;t.length<n;){let a=t[t.length-1].kind,n=i.filter(e=>e.kind!==a);if(!n.length)break;let{kind:d}=n[Math.floor(Math.random()*n.length)],{boxes:c}=e4[d],u=l+tr[e.family],p=u+Math.max(...c.map(e=>e[1])),f=Math.max(r,...c.map(e=>e[3]));if((p-s+30-6)/o>tl(f)-.12)break;t.push({kind:d,at:u}),r=f,l=u+tm(d)}return I=t[t.length-1].kind,t},en=(e,t)=>{let{node:a,svg:n,grey:i,ink:s}=o[e.slot],r=e4[e.kind].art[t];e.frame<0&&(n?.setAttribute("width",String(2*r.w)),n?.setAttribute("height",String(2*r.h)),n?.setAttribute("viewBox",tf(r)),a&&(a.dataset.kind=e.kind)),i?.setAttribute("d",r.grey),s?.setAttribute("d",r.ink),e.frame=t},ei=(e,t,a)=>{let n=new Set(U.map(e=>e.slot)),i=0;for(;n.has(i);)i++;if(i>=20)return!1;let o={slot:i,kind:e,gap:t,alt:a,frame:-1};return U.push(o),en(o,0),!0},eo=()=>{for(;R<c+40;){let e=et(),t=ea(e);if(U.length+t.length>20)return;let a="bird"===e.family,n=e4[e.kind].speed,i=r.matches?[4,44]:[4,26,44],o=a?i[Math.floor(Math.random()*i.length)]:0;for(let e of t)ei(e.kind,R+e.at/n,o);let s=Math.max(...t.map(e=>tm(e.kind))),l=t[t.length-1],d=(j-6)/7,c=Math.max(Math.min(s,52)*j*Q()+(a?50:40),ee()*tu(1,.7,d));R+=(l.at+tm(l.kind))/n+c*(1+.5*Math.random())}},es=()=>{let e=W&&0===A&&!O,n=eU(e,e||A>0?1:Math.floor(N/44)%2,Math.floor(S/22)%4,0===A||O?0:L>60?1:L<-60?-1:0);n!==Y&&(Y=n,i.band?.setAttribute("d",n.band),i.grey?.setAttribute("d",n.grey),i.ink?.setAttribute("d",n.ink)),t.style.transform=`translate3d(${-tp(F)}px, ${-tp(A)}px, 0) rotate(${-90*O}deg)`,x.current&&(x.current.style.transform=`translate3d(${-tp(N%te.w)}px, 0, 0)`),a.style.transform=`translate3d(${-tp(E%s.w)}px, 0, 0)`;let r=Math.floor(M/.14)%2;for(let e of U){let{node:t}=o[e.slot],{art:a,speed:n}=e4[e.kind];a.length>1&&e.frame!==r&&en(e,r),t&&(t.style.transform=`translate3d(${tp(e.gap*n)}px, ${-e.alt}px, 0)`)}let l=v.current;if(l){let e=u+30+(J-C)*Q(),t=J<0||e>c||e<-(2*e8.w);l.hidden=t,t||(l.style.transform=`translate3d(${tp(e)}px, 0, 0)`)}let d=Math.floor(.035*C);d!==K&&b.current&&(K=d,G(b.current,tc(d)))},er=()=>{for(let e of g.current)e&&delete e.dataset.kind;U=[],j=6,N=0,S=0,H=!1,O=0,F=0,C=0,M=0,A=0,L=0,W=!1,q=-1,z=null,$=0,I=null,J=X>0?(X+1)/.035:-1,R=Math.max(2.4*ee(),c),eo(),es()},el=e=>{let t=k?Math.min((e-k)/1e3,.05):0;if(k=e,"running"===d)((e,t)=>{j=Math.min(13,j+.06*e);let a=ee()*e;N+=a,S+=a,C+=42*j*e,l.matches||(E+=.2*a),M+=e,R-=a,(A>0||L>0)&&(!T&&A>=22&&L>227.5&&(L=227.5),L-=1570*(W?3:1)*e,0===(A=Math.max(0,A+L*e))&&(L=455*(q>=0&&M-q<.12),q=-1));let i=A+(W&&0===A?24:32),s=!1;for(let e of U){e.gap-=a;let{boxes:t,speed:n}=e4[e.kind],o=e.gap*n;for(let[a,n,r,l]of t)o+a<u+30&&o+n>u+6&&e.alt+r<i&&e.alt+l>A&&(s=!0)}U=U.filter(e=>{let{art:t,speed:a}=e4[e.kind];if(e.gap*a+2*t[0].w>-8)return!0;let{node:n}=o[e.slot];return n&&delete n.dataset.kind,!1}),eo(),es(),s&&(e=>{d="over",P=e;let t=Math.floor(.035*C);if(!(t<1))try{eL({kind:"score",score:t}).catch(()=>{})}catch{}if(t>X){X=t;try{window.localStorage.setItem(td,String(X))}catch{}Z()}n("over"),l.matches||(H=!0,B=0,D=!1,L=300,V=(_=ee())/1.1)})(t)})(t,e);else B+=t,O=Math.min(2,Math.ceil(B/.13)),(A>0||L>0)&&(L-=1570*t,A=Math.max(0,A+L*t),F+=24*t,0===A&&(L=D?0:-(.35*L),D=!0)),S+=(_=Math.max(0,_-V*t))*t,H=A>0||L>0||_>0,es();w=("running"===d||H)&&p?requestAnimationFrame(el):0},ed=()=>{k=0,w||(w=requestAnimationFrame(el))},ec=e=>{(T=!0,"running"===d)?0===A?L=455:q=M:"over"===d&&e-P<600||("over"===d&&er(),d="running",n("running"),function(){try{let e=!1;try{e=!eA&&!window.localStorage.getItem(eM)}catch{}if(!e)return void eL({kind:"ride",first:e}).catch(()=>{});eA=!0,eL({kind:"ride",first:e}).then(e=>{if(200!==e.status){eA=!1;return}try{window.localStorage.setItem(eM,"1")}catch{}}).catch(()=>{eA=!1})}catch{}}(),ed())},eu=()=>{T=!1},ep=e=>{let t,a="Space"===e.code||"ArrowUp"===e.key,n="ArrowDown"===e.key;!a&&!n||(t=e.target instanceof Element?e.target:null,!p||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||t?.closest("input, textarea, select, button, a, summary, [contenteditable], [role='button'], [role='switch'], [role='tab']")||document.querySelector('[aria-modal="true"]')||document.documentElement.classList.contains("agent-open"))||("running"===d||"Space"===e.code)&&(e.preventDefault(),n?W=!0:e.repeat||ec(e.timeStamp))},ef=e=>{"ArrowDown"===e.key?W=!1:("Space"===e.code||"ArrowUp"===e.key)&&eu()},em=e=>{0===e.button&&ec(e.timeStamp)},eh=new ResizeObserver(()=>{c=e.clientWidth,u=t.offsetLeft,"idle"===d&&er()});eh.observe(e);let ex=new IntersectionObserver(([entry])=>{
      p=entry.isIntersecting;
      if(p){
        if("idle"===d){
          ec(performance.now());
        }else if("running"===d||H){
          ed();
        }
      }
    },{threshold:[0,0.05,0.1]});
    // Ensure active visibility if in view on init
    let rct=e.getBoundingClientRect();
    if(rct.top<window.innerHeight&&rct.bottom>0){p=!0;setTimeout(()=>{if("idle"===d)ec(performance.now())},150)}
    let em_safe=ev=>{if(0===ev.button){p=!0;ec(ev.timeStamp)}};
    let ep_safe=ev=>{p=!0;ep(ev)};
    return ex.observe(e),er(),window.addEventListener("keydown",ep_safe),window.addEventListener("keyup",ef),e.addEventListener("pointerdown",em_safe),window.addEventListener("pointerup",eu),window.addEventListener("pointercancel",eu)

    // Set initial prompt / score UI
    n('idle');
  };
})();
