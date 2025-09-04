import React, { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'announcements_v4';

function generateSeedPosts() {
  const now = new Date()
  const toIso = (d) => d.toISOString()
  const seeded = [
    {
      id: 'p1',
      author: 'Registrar Office',
      role: 'Admin',
      content:
        'Class suspended na po guys!!.',
      imageUrl: undefined,
      createdAt: toIso(new Date(now.getTime() - 1000 * 60 * 60 * 2)),
      likes: 23,
      liked: false,
      comments: [
        {
          id: 'c1',
          author: 'Davezu',
          text: 'Paldo',
          createdAt: toIso(new Date(now.getTime() - 1000 * 60 * 60 * 1.5)),
        },
        { id: 'c1b', author: 'Raf', text: 'Yesss', createdAt: toIso(new Date(now.getTime() - 1000 * 60 * 70)) },
        { id: 'c1c', author: 'Mark', text: 'Stay safe everyone.', createdAt: toIso(new Date(now.getTime() - 1000 * 60 * 65)) },
        { id: 'c1d', author: 'Jeric', text: 'Yun Oh!', createdAt: toIso(new Date(now.getTime() - 1000 * 60 * 60)) },
      ],
    },
    
  ]
  return seeded
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  return `${days}d`
}

function Home() {
  const [posts, setPosts] = useState([])
  const [commentDrafts, setCommentDrafts] = useState({})
  const [expandedComments, setExpandedComments] = useState({})

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setPosts(JSON.parse(raw))
        return
      } catch (e) {
        console.warn('Failed to parse announcements from storage', e)
      }
    }
    setPosts(generateSeedPosts())
  }, [])

  useEffect(() => {
    if (posts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  }, [posts])

  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    )
  }

  const handleAddComment = (postId) => {
    const text = (commentDrafts[postId] || '').trim()
    if (!text) return
    /** @type {CommentShape} */
    const newComment = {
      id: Math.random().toString(36).slice(2),
      author: 'You',
      text,
      createdAt: new Date().toISOString(),
    }
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p)))
    setCommentDrafts((d) => ({ ...d, [postId]: '' }))
  }

  const totalAnnouncements = useMemo(() => posts.length, [posts])

  const toggleExpand = (postId) => {
    setExpandedComments((s) => ({ ...s, [postId]: !s[postId] }))
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-muted-foreground text-sm">{totalAnnouncements} updates</span>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          const isExpanded = !!expandedComments[post.id]
          const visibleCount = isExpanded ? post.comments.length : Math.min(3, post.comments.length)
          const hiddenCount = Math.max(0, post.comments.length - visibleCount)
          const visibleComments = post.comments.slice(0, visibleCount)
          return (
            <article key={post.id} className="border bg-card text-card-foreground rounded-lg p-4 shadow-sm">
              <header className="mb-3 flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.author}</span>
                    {post.role && (
                      <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs">
                        {post.role}
                      </span>
                    )}
                    <span className="text-muted-foreground text-xs">• {timeAgo(post.createdAt)}</span>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                </div>
              </header>

              {post.imageUrl && (
                <img src={post.imageUrl} alt="post" className="mb-3 w-full overflow-hidden rounded-md" />
              )}

              <div className="mt-2 flex items-center gap-2">
                <button
                  className={`h-8 rounded-md px-3 text-sm transition-colors ${
                    post.liked
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:opacity-90'
                  }`}
                  onClick={() => handleToggleLike(post.id)}
                >
                  {post.liked ? 'Liked' : 'Like'} • {post.likes}
                </button>

                <span className="text-muted-foreground text-sm">
                  {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                </span>
              </div>

              <section className="mt-3 space-y-3">
                {visibleComments.map((c) => (
                  <div key={c.id} className="rounded-md bg-muted/40 p-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{c.author}</span>
                      <span className="text-muted-foreground text-xs">{timeAgo(c.createdAt)}</span>
                    </div>
                    <p className="text-sm leading-snug">{c.text}</p>
                  </div>
                ))}

                {hiddenCount > 0 && (
                  <button
                    className="text-muted-foreground hover:text-foreground text-sm"
                    onClick={() => toggleExpand(post.id)}
                  >
                    {isExpanded ? 'Hide comments' : `View ${hiddenCount} more comment${hiddenCount > 1 ? 's' : ''}`}
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <input
                    className="bg-background border-input focus-visible:ring-ring h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2"
                    placeholder="Write a comment..."
                    value={commentDrafts[post.id] || ''}
                    onChange={(e) => setCommentDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id)
                    }}
                  />
                  <button
                    className="bg-primary text-primary-foreground h-9 rounded-md px-3 text-sm"
                    onClick={() => handleAddComment(post.id)}
                  >
                    Comment
                  </button>
                </div>
              </section>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home 