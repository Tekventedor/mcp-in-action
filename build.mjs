// Builds template.json from inline React component source below.
// Each scene is one <type:"custom"> layer referencing a component here.
// Edit a component, re-run: `node build.mjs` — then Load template.json in Editor Playground.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─────────────────────────────────────────────────────────────────────────────
// Shared helper block that gets prepended inside every component so each has:
//   cl(x)    clamp 0-1
//   ease(t)  ease-out cubic
//   easeIn(t), easeInOut(t)
//   lerp(a,b,t)
//   R = React.createElement
// ─────────────────────────────────────────────────────────────────────────────
const HELPERS = `var R=React.createElement;var cl=function(x){return Math.max(0,Math.min(1,x));};var ease=function(t){return 1-Math.pow(1-t,3);};var easeIn=function(t){return t*t*t;};var easeInOut=function(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};var easeBack=function(t){var c1=1.70158;var c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};var lerp=function(a,b,t){return a+(b-a)*t;};`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. HookScene — "Your terminal can drive the browser." (90f)
// ─────────────────────────────────────────────────────────────────────────────
const HookScene = `function HookScene(props){${HELPERS}
  var f=props.frame||0;
  var inP=ease(cl(f/20));
  var outP=easeIn(cl((f-75)/15));
  var opacity=inP-outP;
  var scale=0.96+0.04*inP;
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif'}},
    R('div',{style:{opacity:opacity,transform:'scale('+scale+')',textAlign:'center',fontSize:'84px',fontWeight:700,color:'#111928',lineHeight:1.15,letterSpacing:'-1px',maxWidth:'1400px'}},
      'Your terminal can ',
      R('span',{style:{background:'linear-gradient(90deg,#0084FF,#1A56DB)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'drive'),
      ' the browser.'
    )
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// 2. ProblemScene — vision vs selectors, both crossed out (180f)
// ─────────────────────────────────────────────────────────────────────────────
const ProblemScene = `function ProblemScene(props){${HELPERS}
  var f=props.frame||0;
  var inP=ease(cl(f/20));
  var outP=easeIn(cl((f-160)/20));
  var baseOp=inP-outP;
  var xP=easeBack(cl((f-90)/20));
  var xOp=cl((f-90)/20)-outP;
  var panelStyle={flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',opacity:baseOp};
  var iconScale=0.95+0.05*inP;
  function cross(color){
    return R('div',{style:{position:'absolute',width:'200px',height:'200px',opacity:xOp,transform:'scale('+xP+')'}},
      R('svg',{width:'200',height:'200',viewBox:'0 0 200 200'},
        R('line',{x1:'30',y1:'30',x2:'170',y2:'170',stroke:color,strokeWidth:'10',strokeLinecap:'round'}),
        R('line',{x1:'170',y1:'30',x2:'30',y2:'170',stroke:color,strokeWidth:'10',strokeLinecap:'round'})
      )
    );
  }
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',fontFamily:'Inter,system-ui,sans-serif',position:'relative'}},
    R('div',{style:{position:'absolute',left:'50%',top:'31.5%',width:'1px',height:'37%',background:'#E5E7EB',opacity:baseOp}}),
    R('div',{style:panelStyle},
      R('div',{style:{transform:'scale('+iconScale+')',marginBottom:'32px'}},
        R('svg',{width:'120',height:'120',viewBox:'0 0 120 120',fill:'none'},
          R('circle',{cx:'50',cy:'50',r:'34',stroke:'#6B7280',strokeWidth:'4'}),
          R('line',{x1:'74',y1:'74',x2:'104',y2:'104',stroke:'#6B7280',strokeWidth:'6',strokeLinecap:'round'})
        )
      ),
      R('div',{style:{fontSize:'28px',fontWeight:600,color:'#111928',marginTop:'8px'}},'Vision models'),
      R('div',{style:{fontSize:'20px',color:'#6B7280',marginTop:'6px'}},'slow · unreliable'),
      cross('#EF4444')
    ),
    R('div',{style:panelStyle},
      R('div',{style:{transform:'scale('+iconScale+')',fontFamily:'JetBrains Mono,monospace',fontSize:'20px',color:'#374151',background:'#F3F4F6',padding:'18px 24px',borderRadius:'10px',border:'1px solid #E5E7EB',maxWidth:'620px',textAlign:'center',lineHeight:1.7,marginBottom:'32px'}},
        '#root > div.app-shell > main >',R('br'),'div:nth-child(3) > form > input'
      ),
      R('div',{style:{fontSize:'28px',fontWeight:600,color:'#111928',marginTop:'8px'}},'CSS selectors'),
      R('div',{style:{fontSize:'20px',color:'#6B7280',marginTop:'6px'}},'break on redesign'),
      cross('#EF4444')
    )
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// 3. PivotScene — "Playwright MCP" headline (150f)
// ─────────────────────────────────────────────────────────────────────────────
const PivotScene = `function PivotScene(props){${HELPERS}
  var f=props.frame||0;
  var pwP=ease(cl(f/15));
  var mcpP=ease(cl((f-10)/15));
  var subP=ease(cl((f-60)/15));
  var outP=easeIn(cl((f-130)/20));
  var zoomP=cl((f-110)/20);
  var opacity=1-outP;
  var scale=1+0.05*zoomP;
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',fontFamily:'Inter,system-ui,sans-serif',opacity:opacity,transform:'scale('+scale+')'}},
    R('div',{style:{display:'flex',alignItems:'baseline',gap:'24px',fontSize:'120px',fontWeight:700,letterSpacing:'-3px',lineHeight:1}},
      R('span',{style:{color:'#111928',opacity:pwP,transform:'translateY('+(20*(1-pwP))+'px)',display:'inline-block'}},'Playwright'),
      R('span',{style:{background:'linear-gradient(90deg,#0084FF,#1A56DB)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',opacity:mcpP,transform:'translateY('+(20*(1-mcpP))+'px)',display:'inline-block'}},'MCP')
    ),
    R('div',{style:{marginTop:'32px',fontSize:'28px',color:'#6B7280',opacity:subP,transform:'translateY('+(12*(1-subP))+'px)'}},'built for AI agents like Claude Code')
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// 4. ArchitectureScene — 3 boxes + arrows (300f)
// ─────────────────────────────────────────────────────────────────────────────
const ArchitectureScene = `function ArchitectureScene(props){${HELPERS}
  var f=props.frame||0;
  var outP=easeIn(cl((f-280)/20));
  var opacity=1-outP;
  function boxProg(delay){
    var p=ease(cl((f-delay)/40));
    return {opacity:p,transform:'scale('+(0.9+0.1*p)+')'};
  }
  function labelProg(delay){return cl((f-delay)/10);}
  function arrowProg(delay){return ease(cl((f-delay)/30));}
  var box1=boxProg(0), box2=boxProg(30), box3=boxProg(60);
  var arrowA=arrowProg(110), arrowB=arrowProg(140);
  var arrowC=arrowProg(180), arrowD=arrowProg(210);
  var labelA=labelProg(130), labelB=labelProg(160), labelC=labelProg(200), labelD=labelProg(230);
  function Box(props){
    var s=props.style||{};
    return R('div',{style:Object.assign({width:'360px',height:'260px',background:'#F9FAFB',border:'2px solid #D1D5DB',borderRadius:'16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',boxSizing:'border-box'},s)},props.children);
  }
  function ArrowRight(p,color,labelOp,labelText){
    return R('div',{style:{position:'relative',flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}},
      R('div',{style:{position:'absolute',top:'-28px',fontSize:'18px',fontWeight:600,color:color,opacity:labelOp}},labelText),
      R('div',{style:{position:'relative',width:'100%',height:'3px'}},
        R('div',{style:{position:'absolute',left:0,top:0,height:'3px',width:(100*p)+'%',background:color,transformOrigin:'left center'}}),
        R('div',{style:{position:'absolute',left:'calc('+(100*p)+'% - 1px)',top:'-7px',width:0,height:0,borderTop:'8px solid transparent',borderBottom:'8px solid transparent',borderLeft:'14px solid '+color,opacity:p>0.9?1:0}})
      )
    );
  }
  function ArrowLeft(p,color,labelOp,labelText){
    return R('div',{style:{position:'relative',flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}},
      R('div',{style:{position:'absolute',bottom:'-28px',fontSize:'18px',fontWeight:600,color:color,opacity:labelOp}},labelText),
      R('div',{style:{position:'relative',width:'100%',height:'3px'}},
        R('div',{style:{position:'absolute',right:0,top:0,height:'3px',width:(100*p)+'%',background:color}}),
        R('div',{style:{position:'absolute',right:'calc('+(100*p)+'% - 1px)',top:'-7px',width:0,height:0,borderTop:'8px solid transparent',borderBottom:'8px solid transparent',borderRight:'14px solid '+color,opacity:p>0.9?1:0}})
      )
    );
  }
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif',opacity:opacity,padding:'0 80px',boxSizing:'border-box'}},
    R('div',{style:{width:'100%',maxWidth:'1760px',display:'flex',flexDirection:'column',gap:'12px'}},
      R('div',{style:{display:'flex',alignItems:'center',gap:'24px'}},
        R('div',{style:box1},
          R(Box,null,
            R('div',{style:{width:'120px',height:'76px',border:'2px solid #374151',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'JetBrains Mono,monospace',fontSize:'28px',fontWeight:700,color:'#111928'}},'>_'),
            R('div',{style:{fontSize:'32px',fontWeight:600,color:'#111928',marginTop:'16px'}},'Claude Code'),
            R('div',{style:{fontSize:'18px',color:'#6B7280',marginTop:'4px'}},'your terminal')
          )
        ),
        R('div',{style:{flex:1,display:'flex',flexDirection:'column',gap:'32px'}},
          ArrowRight(arrowA,'#0084FF',labelA,'tool calls'),
          ArrowLeft(arrowC,'#475569',labelC,'accessibility snapshot')
        ),
        R('div',{style:box2},
          R(Box,null,
            R('div',{style:{display:'flex',flexDirection:'column',gap:'8px'}},
              R('div',{style:{width:'120px',height:'22px',border:'1.5px solid #374151',borderRadius:'4px',display:'flex',alignItems:'center',paddingLeft:'8px'}},R('div',{style:{width:'8px',height:'8px',borderRadius:'50%',background:'#22C55E'}})),
              R('div',{style:{width:'120px',height:'22px',border:'1.5px solid #374151',borderRadius:'4px',display:'flex',alignItems:'center',paddingLeft:'8px'}},R('div',{style:{width:'8px',height:'8px',borderRadius:'50%',background:'#22C55E'}}))
            ),
            R('div',{style:{fontSize:'32px',fontWeight:600,color:'#111928',marginTop:'16px'}},'Playwright MCP'),
            R('div',{style:{fontSize:'16px',fontFamily:'JetBrains Mono,monospace',color:'#6B7280',marginTop:'4px'}},'npx @playwright/mcp')
          )
        ),
        R('div',{style:{flex:1,display:'flex',flexDirection:'column',gap:'32px'}},
          ArrowRight(arrowB,'#0084FF',labelB,'Playwright API'),
          ArrowLeft(arrowD,'#475569',labelD,'page state')
        ),
        R('div',{style:box3},
          R(Box,null,
            R('div',{style:{width:'140px',height:'76px',border:'2px solid #374151',borderRadius:'8px',overflow:'hidden'}},
              R('div',{style:{height:'14px',background:'#E5E7EB',borderBottom:'1px solid #374151',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:'6px',gap:'3px'}},
                R('div',{style:{width:'3px',height:'3px',borderRadius:'50%',background:'#6B7280'}}),
                R('div',{style:{width:'3px',height:'3px',borderRadius:'50%',background:'#6B7280'}}),
                R('div',{style:{width:'3px',height:'3px',borderRadius:'50%',background:'#6B7280'}})
              )
            ),
            R('div',{style:{fontSize:'32px',fontWeight:600,color:'#111928',marginTop:'16px'}},'Browser'),
            R('div',{style:{fontSize:'18px',color:'#6B7280',marginTop:'4px'}},'Chromium · Firefox · WebKit')
          )
        )
      )
    )
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// 5. InstallScene — terminal with typewriter (180f)
// ─────────────────────────────────────────────────────────────────────────────
const InstallScene = `function InstallScene(props){${HELPERS}
  var f=props.frame||0;
  var termP=ease(cl(f/20));
  var scale=0.95+0.05*termP;
  var cmd='claude mcp add playwright npx @playwright/mcp@latest';
  var typeStart=22, typeDur=68;
  var typedChars=Math.floor(cl((f-typeStart)/typeDur)*cmd.length);
  var typedText=cmd.slice(0,typedChars);
  var line2P=ease(cl((f-95)/15));
  var line2Scale=0.5+0.5*line2P;
  var line3P=ease(cl((f-110)/10));
  var cursorOn=Math.floor(((f-120)/15))%2===0 && f>=120;
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif'}},
    R('div',{style:{width:'1400px',height:'400px',background:'#1F2937',borderRadius:'12px',opacity:termP,transform:'scale('+scale+')',boxShadow:'0 30px 80px rgba(0,0,0,0.25)',display:'flex',flexDirection:'column',overflow:'hidden'}},
      R('div',{style:{height:'44px',borderBottom:'1px solid #374151',display:'flex',alignItems:'center',paddingLeft:'20px',gap:'10px',flexShrink:0}},
        R('div',{style:{width:'14px',height:'14px',borderRadius:'50%',background:'#EF4444'}}),
        R('div',{style:{width:'14px',height:'14px',borderRadius:'50%',background:'#F59E0B'}}),
        R('div',{style:{width:'14px',height:'14px',borderRadius:'50%',background:'#22C55E'}})
      ),
      R('div',{style:{padding:'36px 40px',fontFamily:'JetBrains Mono,monospace',fontSize:'22px',lineHeight:1.6,flex:1,display:'flex',flexDirection:'column',gap:'14px'}},
        R('div',null,
          R('span',{style:{color:'#6B7280'}},'$ '),
          R('span',{style:{color:'#E5E7EB'}},typedText),
          typedChars<cmd.length && (Math.floor(f/4)%2===0) ? R('span',{style:{color:'#E5E7EB'}},'▋') : null
        ),
        R('div',{style:{color:'#22C55E',opacity:line2P}},
          R('span',{style:{display:'inline-block',transform:'scale('+line2Scale+')',transformOrigin:'left center'}},'✓ Connected: playwright')
        ),
        R('div',{style:{color:'#9CA3AF',fontSize:'18px',opacity:line3P}},'Tools available: navigate, click, type, screenshot, +17 more'),
        R('div',{style:{color:'#E5E7EB',opacity:cursorOn?1:0}},'▋')
      )
    )
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// 6. SnapshotScene — a11y tree ⇄ UI (300f)
// ─────────────────────────────────────────────────────────────────────────────
const SnapshotScene = `function SnapshotScene(props){${HELPERS}
  var f=props.frame||0;
  var labelsP=ease(cl(f/20));
  var panesP=ease(cl(f/20));
  var rightHeaderP=ease(cl((f-20)/20));
  var outP=easeIn(cl((f-260)/40));
  var op=1-outP;
  var todosPulse=1;
  if(f>=40 && f<=70){ var pp=(f-40)/30; todosPulse=1+0.03*Math.sin(pp*Math.PI); }
  function lineProg(delay){return ease(cl((f-delay)/30));}
  var l1=lineProg(40), l2=lineProg(80), l3=lineProg(120), l4=lineProg(120), l5=lineProg(140);
  function refGlow(delay){
    var t=cl((f-delay)/10);
    return t<1 ? Math.sin(t*Math.PI)*0.6 : 0;
  }
  var e5Glow=refGlow(100), e10Glow=refGlow(140);
  var focusP=cl((f-100)/15);
  var focusHoldEnd=cl((f-115)/15);
  var focusFadeOut=cl((f-130)/15);
  var focusOp=focusP-focusFadeOut;
  function rowP(delay){
    var p=ease(cl((f-delay)/15));
    return {opacity:p,transform:'translateY('+(8*(1-p))+'px)'};
  }
  var row1=rowP(140), row2=rowP(153), row3=rowP(166);
  function typedText(text,start,dur){
    var n=Math.floor(cl((f-start)/dur)*text.length);
    return text.slice(0,n);
  }
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',fontFamily:'Inter,system-ui,sans-serif',padding:'180px 60px 60px',boxSizing:'border-box',position:'relative',opacity:op}},
    R('div',{style:{position:'absolute',top:'120px',left:'120px',width:'720px',textAlign:'center',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'1.5px',opacity:labelsP}},'WHAT CLAUDE READS'),
    R('div',{style:{position:'absolute',top:'120px',right:'120px',width:'720px',textAlign:'center',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'1.5px',opacity:labelsP}},'WHAT YOU SEE'),
    R('div',{style:{width:'720px',height:'520px',background:'#1F2937',borderRadius:'12px',opacity:panesP,padding:'40px 44px',boxSizing:'border-box',fontFamily:'JetBrains Mono,monospace',fontSize:'18px',lineHeight:1.7,color:'#E5E7EB',marginRight:'60px'}},
      R('div',{style:{opacity:l1}},'- heading "todos" [level=1]'),
      R('div',{style:{marginTop:'6px',opacity:l2}},'- textbox "What needs to be done?" ',
        R('span',{style:{color:'#FBBF24',fontWeight:600,textShadow:e5Glow>0?'0 0 '+(16*e5Glow)+'px rgba(251,191,36,'+e5Glow+')':'none'}},'[ref=e5]')
      ),
      R('div',{style:{marginTop:'6px',opacity:l3}},'- listitem:'),
      R('div',{style:{marginLeft:'28px',marginTop:'6px',opacity:l4}},'- checkbox "Toggle Todo" ',
        R('span',{style:{color:'#FBBF24',fontWeight:600,textShadow:e10Glow>0?'0 0 '+(16*e10Glow)+'px rgba(251,191,36,'+e10Glow+')':'none'}},'[ref=e10]')
      ),
      R('div',{style:{marginLeft:'28px',marginTop:'6px',opacity:l5}},'- text: "Buy groceries"')
    ),
    R('div',{style:{width:'720px',height:'520px',background:'#FFFFFF',border:'1.5px solid #E5E7EB',borderRadius:'12px',opacity:panesP,padding:'40px',boxSizing:'border-box',display:'flex',flexDirection:'column',alignItems:'center'}},
      R('div',{style:{fontSize:'72px',fontWeight:200,color:'#FDE2E2',lineHeight:1,opacity:rightHeaderP,transform:'scale('+todosPulse+')'}},'todos'),
      R('div',{style:{position:'relative',width:'600px',marginTop:'36px',opacity:rightHeaderP}},
        R('div',{style:{width:'600px',height:'44px',border:'1px solid #EDEDED',background:'#FFFFFF',display:'flex',alignItems:'center',padding:'0 18px',fontStyle:'italic',fontSize:'18px',color:'#BFBFBF'}},'What needs to be done?'),
        focusOp>0.001 ? R('div',{style:{position:'absolute',top:'-4px',left:'-4px',right:'-4px',bottom:'-4px',border:'2px solid #0084FF',borderRadius:'6px',opacity:focusOp}}) : null
      ),
      R('div',{style:{width:'600px',marginTop:'20px',display:'flex',flexDirection:'column'}},
        R('div',{style:Object.assign({},row1,{borderTop:'1px solid #EDEDED',padding:'18px 16px',display:'flex',alignItems:'center',gap:'14px'})},
          R('div',{style:{width:'22px',height:'22px',border:'1.5px solid #CCCCCC',borderRadius:'50%'}}),
          R('span',{style:{fontSize:'18px',color:'#4D4D4D'}},typedText('Buy groceries',140,15))
        ),
        R('div',{style:Object.assign({},row2,{borderTop:'1px solid #EDEDED',padding:'18px 16px',display:'flex',alignItems:'center',gap:'14px'})},
          R('div',{style:{width:'22px',height:'22px',border:'1.5px solid #CCCCCC',borderRadius:'50%'}}),
          R('span',{style:{fontSize:'18px',color:'#4D4D4D'}},typedText('Walk the dog',153,15))
        ),
        R('div',{style:Object.assign({},row3,{borderTop:'1px solid #EDEDED',padding:'18px 16px',display:'flex',alignItems:'center',gap:'14px'})},
          R('div',{style:{width:'22px',height:'22px',border:'1.5px solid #CCCCCC',borderRadius:'50%'}}),
          R('span',{style:{fontSize:'18px',color:'#4D4D4D'}},typedText('Ship the blog',166,15))
        )
      )
    )
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// 7. CTAScene — logo + title + button (150f)
// ─────────────────────────────────────────────────────────────────────────────
const CTAScene = `function CTAScene(props){${HELPERS}
  var f=props.frame||0;
  var logoP=ease(cl(f/20));
  var divP=ease(cl((f-20)/15));
  var titleP=ease(cl((f-35)/20));
  var btnP=ease(cl((f-60)/20));
  var urlP=ease(cl((f-120)/30));
  var arrowNudge=Math.sin(cl((f-80)/40)*Math.PI*2)*2;
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif'}},
    R('div',{style:{opacity:logoP,transform:'translateY('+(12*(1-logoP))+'px)',fontSize:'56px',fontWeight:700,letterSpacing:'-1px'}},
      R('span',{style:{color:'#111928'}},'Flow'),
      R('span',{style:{background:'linear-gradient(90deg,#0084FF,#1A56DB)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
    ),
    R('div',{style:{width:'200px',height:'1px',background:'#E5E7EB',marginTop:'28px',transform:'scaleX('+divP+')',transformOrigin:'center'}}),
    R('div',{style:{marginTop:'48px',textAlign:'center',opacity:titleP,transform:'translateY('+(12*(1-titleP))+'px)',maxWidth:'1400px'}},
      R('div',{style:{fontSize:'44px',fontWeight:700,color:'#111928',lineHeight:1.2,letterSpacing:'-0.5px'}},'How to Use Claude Code with Playwright MCP'),
      R('div',{style:{marginTop:'18px',fontSize:'24px',color:'#6B7280'}},'A complete setup guide')
    ),
    R('div',{style:{marginTop:'56px',width:'320px',height:'64px',borderRadius:'32px',background:'linear-gradient(90deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:600,color:'#FFFFFF',opacity:btnP,transform:'scale('+(0.9+0.1*btnP)+')',boxShadow:'0 12px 28px rgba(0,132,255,0.35)'}},
      R('span',null,'Read the guide '),
      R('span',{style:{display:'inline-block',marginLeft:'8px',transform:'translateX('+arrowNudge+'px)'}},'→')
    ),
    R('div',{style:{marginTop:'52px',fontSize:'20px',fontWeight:500,color:'#6B7280',opacity:urlP}},'flowhunt.io/blog')
  );
}`;

// ─────────────────────────────────────────────────────────────────────────────
// Assemble template
// ─────────────────────────────────────────────────────────────────────────────
function scene(id, startFrame, endFrame, componentName) {
  return {
    id,
    startFrame,
    endFrame,
    backgroundColor: '#FFFFFF',
    transition: { type: 'fade', duration: 18 },
    layers: [
      {
        id: `${id}-layer`,
        type: 'custom',
        position: { x: 0, y: 0 },
        size: { width: 1920, height: 1080 },
        customComponent: { name: componentName, props: {} },
      },
    ],
  };
}

const template = {
  name: 'MCP in Action',
  description: '45-second explainer on Claude Code + Playwright MCP.',
  version: '2.0.0',
  output: {
    type: 'video',
    width: 1920,
    height: 1080,
    fps: 30,
    duration: 45,
    backgroundColor: '#FFFFFF',
  },
  customComponents: {
    HookScene: { type: 'inline', code: HookScene },
    ProblemScene: { type: 'inline', code: ProblemScene },
    PivotScene: { type: 'inline', code: PivotScene },
    ArchitectureScene: { type: 'inline', code: ArchitectureScene },
    InstallScene: { type: 'inline', code: InstallScene },
    SnapshotScene: { type: 'inline', code: SnapshotScene },
    CTAScene: { type: 'inline', code: CTAScene },
  },
  inputs: [],
  composition: {
    scenes: [
      scene('s1-hook',          0,   90,  'HookScene'),
      scene('s2-problem',       90,  270, 'ProblemScene'),
      scene('s3-pivot',         270, 420, 'PivotScene'),
      scene('s4-architecture',  420, 720, 'ArchitectureScene'),
      scene('s5-install',       720, 900, 'InstallScene'),
      scene('s6-snapshot',      900, 1200,'SnapshotScene'),
      scene('s7-cta',           1200,1350,'CTAScene'),
    ],
  },
};

const outPath = join(__dirname, 'template.json');
writeFileSync(outPath, JSON.stringify(template, null, 2));
console.log(`Wrote ${outPath}`);
console.log(`  ${template.composition.scenes.length} scenes, ${template.output.duration}s`);
