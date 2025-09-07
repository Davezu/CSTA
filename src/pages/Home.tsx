import { Heart } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const STORAGE_KEY = 'announcements_v4';

type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

type Post = {
  id: string;
  author: string;
  role?: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
};

function generate(): Post[] {
  const now = new Date()
  const toIso = (d: Date): string => d.toISOString()
  const seeded: Post[] = [
    {
      id: 'p1',
      author: 'Registrar Office',
      role: 'Admin',
      content: 'Class suspended na po guys!!.',
      imageUrl: '/public/img/csa.PNG', // Working image URL
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

function time(iso: string): string {
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
  const [posts, setPosts] = useState<Post[]>([])
  const [commentDrafts, drafts] = useState<Record<string, string>>({})
  const [expandedComments, expandComments] = useState<Record<string, boolean>>({})

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
    setPosts(generate())
  }, [])

  useEffect(() => {
    if (posts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  }, [posts])

  const likeToggle = (postId: string): void => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    )
  }

  const addComments = (postId: string): void => {
    const text = (commentDrafts[postId] || '').trim()
    if (!text) return
    const newComment: Comment = {
      id: Math.random().toString(36).slice(2),
      author: 'You',
      text,
      createdAt: new Date().toISOString(),
    }
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p)))
    drafts((d) => ({ ...d, [postId]: '' }))
  }

  const totalAnnouncements = useMemo(() => posts.length, [posts])

  const expand = (postId: string): void => {
    expandComments((s) => ({ ...s, [postId]: !s[postId] }))
  }

  const collapse = (postId: string): void => {
    expandComments((s) => ({ ...s, [postId]: false }))
  }

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 -mt-8">
    <div className="mx-auto max-w-4xl">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-semibold sm:text-xl">Announcements</h1>
        <span className="text-muted-foreground text-sm">{totalAnnouncements} updates</span>
      </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {posts.map((post: Post) => {
          const isExpanded = !!expandedComments[post.id]
          const visibleCount = isExpanded ? post.comments.length : Math.min(3, post.comments.length)
          const hiddenCount = Math.max(0, post.comments.length - visibleCount)
          const visibleComments = post.comments.slice(0, visibleCount)
          return (
              <article key={post.id} className="border bg-card text-card-foreground rounded-lg p-3 shadow-sm sm:p-4">
                <header className="mb-3 flex items-start gap-2 sm:gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src="/img/csa.PNG" alt="Test" />
                    <AvatarFallback className="text-xs sm:text-sm font-medium">
                      T
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <span className="font-medium text-sm sm:text-base truncate">{post.author}</span>
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    {post.role && (
                          <span className="bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 text-xs sm:px-2">
                        {post.role}
                      </span>
                    )}
                        <span className="text-muted-foreground text-xs">• {time(post.createdAt)}</span>
                      </div>
                  </div>
                    <p className="mt-1 whitespace-pre-wrap leading-relaxed text-sm sm:text-base break-words">{post.content}</p>
                </div>
              </header>

              {post.imageUrl && (
                <img src={post.imageUrl} alt="post" className="mb-3 w-full overflow-hidden rounded-md" />
              )}

                <div className="mt-2 flex items-center gap-3 sm:gap-2">
                  <button
                    className={`flex items-center gap-1 rounded-full p-1.5 transition-colors sm:p-2 ${
                    post.liked
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-muted-foreground hover:text-red-500'
                  }`}
                    onClick={() => likeToggle(post.id)}
                >
                    <Heart
                      className={`h-3.5 w-3.5 transition-colors sm:h-4 sm:w-4 ${
                        post.liked ? 'fill-current' : ''
                      }`}
                    />
                    <span className="text-xs sm:text-sm">{post.likes}</span>
                  </button>

                  <span className="text-muted-foreground text-xs sm:text-sm">
                  {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                </span>
              </div>

                <section className="mt-3 space-y-2 sm:space-y-3">
                  {visibleComments.map((c: Comment) => (
                  <div key={c.id} className="rounded-md bg-muted/40 p-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="font-medium truncate">{c.author}</span>
                        <span className="text-muted-foreground text-xs flex-shrink-0">{time(c.createdAt)}</span>
                    </div>
                      <p className="text-xs leading-snug sm:text-sm break-words">{c.text}</p>
                  </div>
                ))}

                {hiddenCount > 0 && (
                  <button
                      className="text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                      onClick={() => expand(post.id)}>
                    {isExpanded ? 'Hide comments' : `View ${hiddenCount} more comment${hiddenCount > 1 ? 's' : ''}`}
                  </button>
                )}

                  {isExpanded === true && (
                     <button 
                      className="text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                      onClick={() => collapse(post.id)}>
                      Show less
                    </button>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                  <input
                      className="bg-background border-input focus-visible:ring-ring h-8 w-full rounded-md border px-2 text-xs outline-none focus-visible:ring-2 sm:h-9 sm:px-3 sm:text-sm"
                    placeholder="Write a comment..."
                    value={commentDrafts[post.id] || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => drafts((d) => ({ ...d, [post.id]: e.target.value }))}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') addComments(post.id)
                    }}
                  />
                  <button
                      className="bg-primary text-primary-foreground h-8 rounded-md px-3 text-xs cursor-pointer sm:h-9 sm:text-sm"
                      onClick={() => addComments(post.id)}
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
    </div>
  )
}

export default Home 