/**
 * 全局置顶配置
 *
 * 使用方式：
 * - 在 Notion 的 Config 页填写 `TOP_TAG`（同名覆盖）
 * - 或在环境变量中设置 `NEXT_PUBLIC_TOP_TAG` / `TOP_TAG`
 *
 * 开启后：
 * - 含 TOP_TAG 的文章整体置顶
 * - 置顶文章按最近更新时间倒序排序
 * - 非置顶文章保持原有相对顺序
 */
module.exports = {
  TOP_TAG: process.env.NEXT_PUBLIC_TOP_TAG ?? process.env.TOP_TAG ?? 'top'
}
