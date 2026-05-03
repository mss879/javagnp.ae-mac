const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      const headingRegex = /<(motion\.h[1-6])[^>]*className=(['"])(.*?)\2/g;
      content = content.replace(headingRegex, (match, tag, quote, classes) => {
        let classList = classes.split(/\s+/).filter(Boolean);
        
        classList = classList.filter(c => !['font-sans', 'font-heading', 'font-serif', 'font-mono', 'font-tech'].includes(c));
        classList.push('font-tech');
        
        if (!fullPath.includes('Hero.tsx')) {
            classList = classList.filter(c => !['font-bold', 'font-semibold', 'font-extrabold', 'font-black'].includes(c));
            if (!classList.includes('font-normal') && !classList.includes('font-light') && !classList.includes('font-medium')) {
                classList.push('font-normal');
            }
        } else {
            if (tag === 'motion.h1' && !classList.includes('font-bold')) {
                classList.push('font-bold');
            }
        }
        
        const newClasses = classList.join(' ');
        return match.replace(classes, newClasses);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated motion inline fonts in: ${fullPath}`);
      }
    }
  }
}

processDir('./src/app');
console.log('Done fixing motion inline fonts!');
