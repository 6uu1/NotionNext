import { sortPinnedPostsByLatestUpdate } from '@/lib/utils/pinnedPosts'

describe('sortPinnedPostsByLatestUpdate', () => {
  it('returns original array when topTag is falsy', () => {
    const posts = [
      { id: 'a', tags: ['top'], lastEditedDate: '2024-01-01' }
    ]
    const res = sortPinnedPostsByLatestUpdate(posts, '')
    expect(res).toBe(posts)
  })

  it('moves pinned posts to the front and sorts them by lastEditedDate desc', () => {
    const posts = [
      { id: 'A', tags: ['x'], lastEditedDate: '2024-01-01' },
      { id: 'P1', tags: ['top'], lastEditedDate: '2024-01-02' },
      { id: 'B', tags: ['x'], lastEditedDate: '2024-02-01' },
      { id: 'P2', tags: ['top'], lastEditedDate: '2024-03-01' },
      { id: 'C', tags: ['x'], lastEditedDate: '2024-01-03' }
    ]

    const res = sortPinnedPostsByLatestUpdate(posts, 'top')
    const ids = res.map(p => p.id)

    expect(ids).toEqual(['P2', 'P1', 'A', 'B', 'C'])
  })

  it('keeps pinned relative order when lastEditedDate is equal (stable)', () => {
    const posts = [
      { id: 'A', tags: ['x'], lastEditedDate: '2024-01-01' },
      { id: 'P1', tags: ['top'], lastEditedDate: '2024-01-02' },
      { id: 'B', tags: ['x'], lastEditedDate: '2024-02-01' },
      { id: 'P2', tags: ['top'], lastEditedDate: '2024-01-02' },
      { id: 'C', tags: ['x'], lastEditedDate: '2024-01-03' }
    ]

    const res = sortPinnedPostsByLatestUpdate(posts, 'top')
    const ids = res.map(p => p.id)
    expect(ids).toEqual(['P1', 'P2', 'A', 'B', 'C'])
  })

  it('moves a single pinned post to the front', () => {
    const posts = [
      { id: 'A', tags: ['x'], lastEditedDate: '2024-01-01' },
      { id: 'P1', tags: ['top'], lastEditedDate: '2024-01-02' },
      { id: 'B', tags: ['x'], lastEditedDate: '2024-02-01' }
    ]
    const res = sortPinnedPostsByLatestUpdate(posts, 'top')
    expect(res.map(p => p.id)).toEqual(['P1', 'A', 'B'])
  })

  it('returns original array when there are no pinned posts', () => {
    const posts = [
      { id: 'A', tags: ['x'], lastEditedDate: '2024-01-01' },
      { id: 'B', tags: ['x'], lastEditedDate: '2024-02-01' }
    ]
    const res = sortPinnedPostsByLatestUpdate(posts, 'top')
    expect(res).toBe(posts)
  })
})
