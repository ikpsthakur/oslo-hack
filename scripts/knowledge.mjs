import { readFile } from 'node:fs/promises';
import path from 'node:path';

const MAX_CONTEXT = 32000;
export function validateSources(config) {
  if (config?.version !== 1 || !Array.isArray(config.sources) || !config.sources.length) throw new Error('Invalid knowledge source configuration');
  const paths = new Set();
  let guides = 0;
  for (const source of config.sources) {
    if (!source || !['public-guide', 'synthetic'].includes(source.kind) ||
        !/^wiki\/public\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.md$/.test(source.path ?? '')) {
      throw new Error('Knowledge sources must be explicit Markdown paths inside wiki/public');
    }
    if (paths.has(source.path)) throw new Error(`Duplicate knowledge source: ${source.path}`);
    paths.add(source.path);
    if (source.kind === 'public-guide') {
      if (source.path !== 'wiki/public/visitor-guide.md') throw new Error('Only the visitor guide can be the baseline public guide');
      guides++;
    } else if (!source.path.startsWith('wiki/public/synthetic/')) throw new Error('Synthetic sources must be inside wiki/public/synthetic');
  }
  if (guides !== 1) throw new Error('Exactly one baseline visitor guide is required');
  return config.sources;
}

export function compileKnowledge(documents) {
  validateSources({ version: 1, sources: documents });
  const ids = new Set();
  const references = new Set();
  const sections = documents.map(({ path: source, kind, content }) => {
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!frontmatter) throw new Error(`Missing knowledge metadata: ${source}`);
    const synthetic = /^dataset: synthetic$/m.test(frontmatter[1]);
    if ((kind === 'synthetic') !== synthetic) throw new Error(`Knowledge type mismatch: ${source}`);
    const body = content.slice(frontmatter[0].length).trim();
    if (!body) throw new Error(`Empty knowledge source: ${source}`);
    if (synthetic && !/fictional/i.test(body)) throw new Error(`Synthetic source needs a visible fictional-data warning: ${source}`);
    const records = [...body.matchAll(/^## ((?:FAQ|SESSION|PROJECT|POLICY|GUIDE|SUPPORT|COMBO|INSIGHT)-\d{3})\b/gm)];
    if (synthetic && !records.length) throw new Error(`Synthetic source has no records: ${source}`);
    for (const [, id] of records) {
      if (ids.has(id)) throw new Error(`Duplicate synthetic record: ${id}`);
      ids.add(id);
    }
    for (const [id] of body.matchAll(/\b(?:FAQ|SESSION|PROJECT|POLICY|GUIDE|SUPPORT|COMBO|INSIGHT)-\d{3}\b/g)) references.add(id);
    return `SOURCE: ${source}\nTYPE: ${synthetic ? 'SYNTHETIC — FICTIONAL DEMO ONLY; NOT REAL EVENTS OR POLICIES' : 'BASELINE PUBLIC GUIDE — UNKNOWN FACTS REMAIN UNCONFIRMED'}\n${body}`;
  });
  for (const id of references) if (!ids.has(id)) throw new Error(`Unknown knowledge record reference: ${id}`);
  const bundle = sections.join('\n\n---\n\n');
  if (bundle.length > MAX_CONTEXT) throw new Error(`Knowledge bundle exceeds ${MAX_CONTEXT} characters; curate or add targeted retrieval before expanding`);
  return bundle;
}

export async function loadKnowledge(root) {
  const config = JSON.parse(await readFile(path.join(root, 'wiki/public/knowledge-sources.json'), 'utf8'));
  const sources = validateSources(config);
  const documents = await Promise.all(sources.map(async source => ({ ...source, content: await readFile(path.join(root, source.path), 'utf8') })));
  return compileKnowledge(documents);
}
