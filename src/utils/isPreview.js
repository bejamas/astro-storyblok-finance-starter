import { loadEnv } from 'vite'
const env = loadEnv('', process.cwd(), '')

export default function isPreview() {
  return env.IS_PREVIEW === 'yes'
}
