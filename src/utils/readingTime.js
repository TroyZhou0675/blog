/**
 * 计算阅读时长（中文约 400 字/分钟，英文约 200 words/分钟）
 */
export function readingTime(body) {
  const text = body || '';
  const chinese = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const english = (text.replace(/[\u4e00-\u9fa5]/g, ' ').trim().match(/[a-zA-Z]+/g) || []).join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(chinese / 400 + english / 200);
  return Math.max(1, minutes);
}
