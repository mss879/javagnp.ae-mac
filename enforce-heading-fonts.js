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

      // Match headings with className
      const headingWithClassRegex = /<(h[1-6])[^>]*className=(['"])(.*?)\2/g;
      content = content.replace(headingWithClassRegex, (match, tag, quote, classes) => {
        let classList = classes.split(/\s+/).filter(Boolean);
        
        // Remove existing font families
        classList = classList.filter(c => !['font-sans', 'font-heading', 'font-serif', 'font-mono', 'font-tech'].includes(c));
        
        // Add font-tech
        classList.push('font-tech');
        
        // Handle thickness (font weight)
        if (!fullPath.includes('Hero.tsx')) {
            // Remove thickness classes
            classList = classList.filter(c => !['font-bold', 'font-semibold', 'font-extrabold', 'font-black'].includes(c));
            // Add font-normal to ensure it's not thick
            if (!classList.includes('font-normal') && !classList.includes('font-light') && !classList.includes('font-medium')) {
                classList.push('font-normal');
            }
        } else {
            // In Hero.tsx, make sure h1 has font-bold
            if (tag === 'h1' && !classList.includes('font-bold')) {
                classList.push('font-bold');
            }
        }
        
        const newClasses = classList.join(' ');
        return match.replace(classes, newClasses);
      });

      // Match headings without className
      const headingWithoutClassRegex = /<(h[1-6])((?:\s+(?!className=)[a-zA-Z0-9-]+(?:=(?:(['"]).*?\3|\{.*?\})|))*)\s*>/g;
      content = content.replace(headingWithoutClassRegex, (match, tag, rest) => {
          let extraClasses = 'font-tech';
          if (!fullPath.includes('Hero.tsx')) {
              extraClasses += ' font-normal';
          }
          return `<${tag}${rest} className="${extraClasses}">`;
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated inline fonts in: ${fullPath}`);
      }
    }
  }
}

processDir('./src/app');
console.log('Done fixing inline heading fonts!');
