/**
 * 全局置顶排序工具（纯函数，无依赖主题/配置，便于测试）
 *
 * - 开启 topTag（topTag 非空）才生效
 * - 置顶文章整体前置，按 lastEditedDate（兜底 publishDate）倒序
 * - 非置顶文章保持原有相对顺序
 * - 相同时间保持稳定（原相对顺序）
 */

function getPostLatestTime(post) {
  // lastEditedDate：getPageProperties 里基于 notion last_edited_time 生成
  if (post?.lastEditedDate) {
    return post.lastEditedDate
  }
  // publishDate：兜底保证不会出现 NaN
  if (post?.publishDate) {
    return post.publishDate
  }
  return 0
}

export function sortPinnedPostsByLatestUpdate(posts, topTag) {
  if (!Array.isArray(posts) || !topTag) {
    return posts
  }

  const pinned = []
  const normal = []
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i]
    const tags = Array.isArray(p?.tags) ? p.tags : []
    if (tags.includes(topTag)) {
      pinned.push({ post: p, idx: i })
    } else {
      normal.push(p)
    }
  }

  if (pinned.length === 0) {
    return posts
  }

  pinned.sort((a, b) => {
    const timeA = new Date(getPostLatestTime(a.post)).getTime()
    const timeB = new Date(getPostLatestTime(b.post)).getTime()
    if (timeB !== timeA) {
      return timeB - timeA
    }
    // 稳定：相同时间保持原相对顺序
    return a.idx - b.idx
  })

  return [...pinned.map(item => item.post), ...normal]
}
