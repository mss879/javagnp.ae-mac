const fs = require('fs');

let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
layout = layout.replace(/Space_Grotesk/g, 'Rajdhani');
layout = layout.replace(/weight: \["300", "400", "500", "600", "700"\]/, 'weight: ["300", "400", "500", "600", "700"]');
fs.writeFileSync('src/app/layout.tsx', layout, 'utf8');

// Also fix the motion.h2 in WhyJavaGNP.tsx
let why = fs.readFileSync('src/app/components/WhyJavaGNP.tsx', 'utf8');
why = why.replace(/font-tech font-bold/g, 'font-tech font-normal');
fs.writeFileSync('src/app/components/WhyJavaGNP.tsx', why, 'utf8');

// Also fix motion.h1 in Hero.tsx to ENSURE it is thick
let hero = fs.readFileSync('src/app/components/Hero.tsx', 'utf8');
if (!hero.includes('font-tech font-bold')) {
    hero = hero.replace(/font-tech( font-normal| font-light| font-medium)?/g, 'font-tech font-bold');
    fs.writeFileSync('src/app/components/Hero.tsx', hero, 'utf8');
}

console.log('Fonts updated!');
