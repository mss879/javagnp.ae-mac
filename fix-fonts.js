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
      let changed = false;

      // Match <h1...6 className="...">
      const headingRegex = /<(h[1-6])[^>]*className=(['"])(.*?)\2/g;
      
      content = content.replace(headingRegex, (match, tag, quote, classes) => {
        let classList = classes.split(/\s+/);
        
        // Remove font-sans and font-heading
        classList = classList.filter(c => c !== 'font-sans' && c !== 'font-heading');
        
        // Add font-tech if not present
        if (!classList.includes('font-tech')) {
          classList.push('font-tech');
        }
        
        const newClasses = classList.join(' ');
        if (newClasses !== classes) {
          changed = true;
          return match.replace(classes, newClasses);
        }
        return match;
      });

      // Also let's check for headings without className and add it.
      const noClassRegex = /<(h[1-6])((?:\s+(?!className=)[a-zA-Z0-9-]+(?:=(?:(['"]).*?\3|\{.*?\})|))*)\s*>/g;
      content = content.replace(noClassRegex, (match, tag, rest) => {
        changed = true;
        return `<${tag}${rest} className="font-tech">`;
      });

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('./src/app');
console.log('Done');
