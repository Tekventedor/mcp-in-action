import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createNodeRenderer } from '@rendervid/renderer-node';

const __dirname = dirname(fileURLToPath(import.meta.url));

const scenesDir = join(__dirname, 'scenes');
const outputPath = join(__dirname, 'output', 'mcp-in-action.mp4');

const sceneFiles = readdirSync(scenesDir)
  .filter((f) => f.endsWith('.json'))
  .sort();

console.log(`Loading ${sceneFiles.length} scene files...`);

const scenes = [];
let firstTemplate = null;

for (const file of sceneFiles) {
  const template = JSON.parse(readFileSync(join(scenesDir, file), 'utf-8'));
  if (!firstTemplate) firstTemplate = template;
  for (const scene of template.composition.scenes) {
    scenes.push(scene);
    console.log(`  ${file}: scene "${scene.id}" frames ${scene.startFrame}–${scene.endFrame}`);
  }
}

const totalFrames = Math.max(...scenes.map((s) => s.endFrame));
console.log(`Total frames: ${totalFrames} (${(totalFrames / 30).toFixed(2)}s at 30fps)`);

const template = {
  name: 'MCP in Action',
  description: 'Claude Code + Playwright MCP — a 45s explainer.',
  version: '1.0.0',
  output: {
    type: 'video',
    width: 1920,
    height: 1080,
    fps: 30,
    duration: totalFrames / 30,
    backgroundColor: '#FFFFFF',
  },
  inputs: [],
  fonts: {
    google: [
      { family: 'Inter', weights: [200, 400, 500, 600, 700], styles: ['normal', 'italic'] },
      { family: 'JetBrains Mono', weights: [400, 600], styles: ['normal', 'italic'] },
    ],
  },
  composition: { scenes },
};

const renderer = createNodeRenderer({
  concurrency: 2,
  gpu: { rendering: true, encoding: 'auto', fallback: true },
});

const started = Date.now();

const result = await renderer.renderVideo({
  template,
  inputs: {},
  outputPath,
  codec: 'libx264',
  quality: 20,
  pixelFormat: 'yuv420p',
  audioCodec: 'none',
  onProgress: (p) => {
    if (p.phase === 'rendering' && p.currentFrame % 30 === 0) {
      process.stderr.write(
        `\r[render] frame ${p.currentFrame}/${p.totalFrames} (${p.percent.toFixed(1)}%)`,
      );
    }
    if (p.phase === 'complete') process.stderr.write('\n');
  },
});

const elapsed = ((Date.now() - started) / 1000).toFixed(1);

if (!result.success) {
  console.error(`Render failed: ${result.error}`);
  process.exit(1);
}

console.log(`\n✓ Rendered ${result.frameCount} frames in ${elapsed}s`);
console.log(`  → ${result.outputPath}`);
console.log(`  size: ${(result.fileSize / 1024 / 1024).toFixed(2)} MB`);
