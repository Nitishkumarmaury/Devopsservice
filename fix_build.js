const fs = require('fs');
const path = require('path');

// 1. app/page.tsx
const pagePath = path.join(__dirname, 'app/page.tsx');
let pageCode = fs.readFileSync(pagePath, 'utf8');
pageCode = pageCode.replace('import { consultationHref } from "@/lib/constants";\n', '');
fs.writeFileSync(pagePath, pageCode);

// 2. components/sections/landing-hero.tsx
const heroPath = path.join(__dirname, 'components/sections/landing-hero.tsx');
let heroCode = fs.readFileSync(heroPath, 'utf8');
heroCode = heroCode.replace('{pipelineNodes.map(({ label, caption, step }, index) => (', '{pipelineNodes.map(({ label, caption, step }) => (');
fs.writeFileSync(heroPath, heroCode);

// 3. components/ui/scroll-reveal.tsx
const srPath = path.join(__dirname, 'components/ui/scroll-reveal.tsx');
let srCode = fs.readFileSync(srPath, 'utf8');
srCode = srCode.replace('import type { ReactNode } from "react";', 'import type { ReactNode, ElementType } from "react";');
srCode = srCode.replace('const Component = motion[as] as any;', 'const Component = motion[as] as ElementType;');
fs.writeFileSync(srPath, srCode);

// 4. components/ui/scroll-text-reveal.tsx
const strPath = path.join(__dirname, 'components/ui/scroll-text-reveal.tsx');
let strCode = fs.readFileSync(strPath, 'utf8');
strCode = strCode.replace('import type { CSSProperties, ElementType } from "react";', 'import type { CSSProperties } from "react";');
strCode = strCode.replace('ref={ref as React.RefObject<any>}', 'ref={ref as React.RefObject<never>}');
fs.writeFileSync(strPath, strCode);

console.log("Fixed files!");
