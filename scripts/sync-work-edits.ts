import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "fs";
import { join } from "path";

const DESKTOP_EXPORTS = "C:\\Users\\yumen\\Desktop\\pde-portfolio-works-editable\\exports";
const WORK_EDITS_DIR = join(process.cwd(), "src", "content", "work-edits");

const VALID_SLUGS = new Set([
  "geo-portal",
  "meiling-ai-tools",
  "flower-destination-recommend",
  "food-play-card",
  "frog-writing-platform",
]);

function syncFile(filePath: string) {
  const raw = readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as { slug?: string; data?: Record<string, unknown> };
  const slug = parsed.slug ?? filePath.replace(/.*[\\/]/, "").replace(".json", "");

  if (!VALID_SLUGS.has(slug)) {
    console.warn(`跳过未知作品：${slug}`);
    return false;
  }

  const data = parsed.data ?? parsed;
  const outPath = join(WORK_EDITS_DIR, `${slug}.json`);
  writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
  console.log(`✓ 已同步 ${slug} → ${outPath}`);
  return true;
}

mkdirSync(WORK_EDITS_DIR, { recursive: true });

const inputDir = process.argv[2] || DESKTOP_EXPORTS;

if (!existsSync(inputDir)) {
  console.error(`未找到目录：${inputDir}`);
  console.error("请先将导出的 JSON 放入 exports 文件夹，或指定路径：");
  console.error("  npm run sync:works -- \"C:\\path\\to\\exports\"");
  process.exit(1);
}

const files = readdirSync(inputDir).filter((f) => f.endsWith(".json"));
if (!files.length) {
  console.error(`目录中没有 JSON 文件：${inputDir}`);
  process.exit(1);
}

let count = 0;
for (const file of files) {
  if (syncFile(join(inputDir, file))) count++;
}

console.log(`\n完成：共同步 ${count} 个作品。请运行 npm run dev 预览网站。`);
