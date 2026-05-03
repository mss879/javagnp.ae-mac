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
      let originalContent = content;

      // Replace font-normal with font-semibold on headings
      const headingRegex = /<(motion\.h[1-6]|h[1-6])[^>]*className=(['"])(.*?)\2/g;
      content = content.replace(headingRegex, (match, tag, quote, classes) => {
        let classList = classes.split(/\s+/).filter(Boolean);
        
        if (classList.includes('font-normal')) {
            classList = classList.filter(c => c !== 'font-normal');
            classList.push('font-semibold');
        } else if (!classList.includes('font-semibold') && !classList.includes('font-bold') && !classList.includes('font-medium')) {
            classList.push('font-semibold');
        }
        
        const newClasses = classList.join(' ');
        return match.replace(classes, newClasses);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Thickened fonts in: ${fullPath}`);
      }
    }
  }
}

processDir('./src/app');
console.log('Done thickening fonts!');
