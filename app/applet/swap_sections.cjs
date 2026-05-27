const fs = require('fs');
const content = fs.readFileSync('/app/applet/src/App.tsx', 'utf8');

const lines = content.split('\n');

const aboutStart = lines.findIndex(l => l.includes('<section id="about"'));
let aboutActualStart = aboutStart;
// check going backwards for the matching comment
while(lines[aboutActualStart - 1].trim() === '' || lines[aboutActualStart - 1].includes('{/*')) {
    aboutActualStart--;
}

const pipelineStart = lines.findIndex(l => l.includes('<section id="pipeline"'));
let pipelineActualStart = pipelineStart;
while(lines[pipelineActualStart - 1].trim() === '' || lines[pipelineActualStart - 1].includes('{/*')) {
    pipelineActualStart--;
}

const globalStart = lines.findIndex(l => l.includes('<section id="global"'));
let globalActualStart = globalStart;
while(lines[globalActualStart - 1].trim() === '' || lines[globalActualStart - 1].includes('{/*')) {
    globalActualStart--;
}

if (aboutStart !== -1 && pipelineStart !== -1 && globalStart !== -1) {
  const beforeAbout = lines.slice(0, aboutActualStart);
  const aboutSection = lines.slice(aboutActualStart, pipelineActualStart);
  const pipelineSection = lines.slice(pipelineActualStart, globalActualStart);
  const afterPipeline = lines.slice(globalActualStart);

  const newLines = [...beforeAbout, ...pipelineSection, ...aboutSection, ...afterPipeline];
  fs.writeFileSync('/app/applet/src/App.tsx', newLines.join('\n'));
  console.log('Swapped sections successfully');
} else {
  console.log('Could not find all sections:', { aboutStart, pipelineStart, globalStart });
}
