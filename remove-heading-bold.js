const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if ((fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) && !fullPath.includes('Hero.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Match <h1...6 className="...">
      const headingRegex = /<(h[1-6])[^>]*className=(['"])(.*?)\2/g;
      
      content = content.replace(headingRegex, (match, tag, quote, classes) => {
        let classList = classes.split(/\s+/);
        
        const originalLength = classList.length;
        classList = classList.filter(c => c !== 'font-bold' && c !== 'font-semibold' && c !== 'font-extrabold');
        
        // Let's add font-medium or just font-normal
        if (classList.length !== originalLength) {
            classList.push('font-normal');
        }
        
        const newClasses = classList.join(' ');
        if (newClasses !== classes) {
          changed = true;
          return match.replace(classes, newClasses);
        }
        return match;
      });

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Removed bold from ${fullPath}`);
      }
    }
  }
}

processDir('./src/app');
console.log('Done');
