const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const lines = content.split('\n');

const aboutStart = lines.findIndex(l => l.includes('<section id="about"'));
let aboutActualStart = aboutStart;
if (lines[aboutStart - 1].includes('{/* Gaps in Care */}')) {
  aboutActualStart = aboutStart - 1;
}

const pipelineStart = lines.findIndex(l => l.includes('<section id="pipeline"'));
let pipelineActualStart = pipelineStart;
if (lines[pipelineStart - 1].includes('{/* NEW SECTION')) {
  pipelineActualStart = pipelineStart - 1;
}

const globalStart = lines.findIndex(l => l.includes('<section id="global"'));
let globalActualStart = globalStart;
if (lines[globalStart - 1].includes('{/* Global Strategy */}')) {
  globalActualStart = globalStart - 1;
}

if (aboutActualStart !== -1 && pipelineActualStart !== -1 && globalActualStart !== -1) {
  const beforeAbout = lines.slice(0, aboutActualStart);
  const aboutSection = lines.slice(aboutActualStart, pipelineActualStart);
  const pipelineSection = lines.slice(pipelineActualStart, globalActualStart);
  const afterPipeline = lines.slice(globalActualStart);

  const newLines = [...beforeAbout, ...pipelineSection, ...aboutSection, ...afterPipeline];
  fs.writeFileSync('src/App.tsx', newLines.join('\n'));
  console.log('Swapped sections successfully');
} else {
  console.log('Could not find all sections:', { aboutActualStart, pipelineActualStart, globalActualStart });
}
