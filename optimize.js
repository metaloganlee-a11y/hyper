import * as fs from 'fs';

const file = 'src/Home.tsx';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

const navStart = lines.findIndex(line => line.includes('{/* Navigation */}'));
const heroStart = lines.findIndex(line => line.includes('{/* Hero Section */}'));

const globalStart = lines.findIndex(line => line.includes('{/* Global Strategy */}'));
const validationStart = lines.findIndex(line => line.includes('{/* Validation */}'));

const footerStart = lines.findIndex(line => line.includes('{/* CTA / Footer */}'));
const footerEnd = lines.findIndex(line => line.includes('} // End of App'));

let newLines = [];
let hasProcessedImports = false;

for (let i = 0; i < lines.length; i++) {
  if (i === 1) { // insert imports
    newLines.push("import { Navigation } from './components/Navigation';");
    newLines.push("import { Footer } from './components/Footer';");
    newLines.push("import { GlobalStrategy } from './components/GlobalStrategy';");
    newLines.push(lines[i]);
    continue;
  }

  if (i >= navStart && i < heroStart) {
    if (i === navStart) {
      newLines.push("      <Navigation />");
    }
    continue; // skip the rest
  }

  if (i >= globalStart && i < validationStart) {
    if (i === globalStart) {
      newLines.push("      <GlobalStrategy />");
    }
    continue;
  }

  if (i >= footerStart && i < lines.length) {
    if (i === footerStart) {
      newLines.push("      <Footer />");
      newLines.push("    </div>");
      newLines.push("  );");
      newLines.push("}");
    }
    break;
  }

  newLines.push(lines[i]);
}

fs.writeFileSync(file, newLines.join('\n'));
console.log('Successfully written file');
