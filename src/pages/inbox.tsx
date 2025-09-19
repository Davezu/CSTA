import React, { useState, useEffect } from 'react'
import { 
  Mail, 
  Star, 
  Search, 
  Reply, 
  Forward, 
  Paperclip,
  RefreshCw,
  MoreHorizontal,
  Send,
  Plus,
  X,
  Archive,
  Trash2,
  Flag,
  Copy,
  Download,
  Printer
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Email {
  id: string
  from: string
  fromName: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  isStarred: boolean
  hasAttachment: boolean
  content?: string
}

interface ComposeMessage {
  to: string
  subject: string
  content: string
}

interface User {
  id: string
  username: string
  fullName: string
  role: 'student' | 'teacher' | 'admin'
  isOnline: boolean
}
//user
const mockUsers: User[] = [
  { id: '1', username: 'admin', fullName: 'CSTA Administration', role: 'admin', isOnline: true },
  { id: '2', username: 'registrar', fullName: 'Registrar Office', role: 'admin', isOnline: false },
  { id: '3', username: 'librarian', fullName: 'CSTA Library', role: 'admin', isOnline: true },
  { id: '4', username: 'events', fullName: 'Student Affairs', role: 'admin', isOnline: true },
  { id: '5', username: 'careers', fullName: 'Career Services', role: 'admin', isOnline: false },
  { id: '6', username: 'john_doe', fullName: 'John Doe', role: 'student', isOnline: true },
  { id: '7', username: 'jane_smith', fullName: 'Jane Smith', role: 'student', isOnline: false },
  { id: '8', username: 'prof_wilson', fullName: 'Prof. Wilson', role: 'teacher', isOnline: true }
]

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'admin@csta.edu',
    fromName: 'CSTA Administration',
    subject: 'Final Exam Schedule Update',
    preview: 'Please note the updated final exam schedule for this semester.',
    time: '2h',
    isRead: false,
    isStarred: true,
    hasAttachment: true,
    content: 'Dear Students,\n\nPlease note the updated final exam schedule for this semester. The changes are as follows:\n\n- Computer Science 101: December 15, 2024 at 9:00 AM\n- Mathematics 201: December 16, 2024 at 1:00 PM\n- Physics 301: December 17, 2024 at 10:00 AM\n\nPlease review the attached schedule for complete details.\n\nBest regards,\nCSTA Administration'
  },
  {
    id: '2',
    from: 'registrar@csta.edu',
    fromName: 'Registrar Office',
    subject: 'Grade Release Notification',
    preview: 'Your midterm grades have been released in the student portal.',
    time: '4h',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    content: 'Dear Student,\n\nYour midterm grades have been released and are now available in the student portal. You can access them by logging into your account and navigating to the "Grades" section.\n\nIf you have any questions about your grades, please contact your instructors or visit the registrar office.\n\nRegistrar Office\nCSTA'
  },
  {
    id: '3',
    from: 'library@csta.edu',
    fromName: 'CSTA Library',
    subject: 'Overdue Book Reminder',
    preview: 'You have books that are overdue. Please return them soon.',
    time: '1d',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    content: 'Dear Student,\n\nYou have the following books that are overdue:\n\n- "Introduction to Algorithms" by Thomas H. Cormen\n- "Database System Concepts" by Abraham Silberschatz\n\nPlease return these books to the library as soon as possible to avoid additional late fees. The current late fee is $0.50 per day per book.\n\nThank you for your cooperation.\nCSTA Library'
  },
  {
    id: '4',
    from: 'events@csta.edu',
    fromName: 'Student Affairs',
    subject: 'Upcoming Campus Events',
    preview: 'Join us for campus events this week. Free food and activities.',
    time: '2d',
    isRead: false,
    isStarred: false,
    hasAttachment: false,
    content: 'Dear Students,\n\nWe have exciting campus events planned for this week:\n\n- Monday: Tech Talk with Industry Professionals (6:00 PM, Auditorium)\n- Wednesday: Coding Competition (2:00 PM, Computer Lab)\n- Friday: End of Semester Party (7:00 PM, Student Center)\n\nAll events include free food and activities. We hope to see you there!\n\nStudent Affairs Team'
  },
  {
    id: '5',
    from: 'careers@csta.edu',
    fromName: 'Career Services',
    subject: 'Job Fair Registration',
    preview: 'Annual job fair is coming up. Register to meet employers.',
    time: '3d',
    isRead: true,
    isStarred: true,
    hasAttachment: true,
    content: 'Dear Students,\n\nThe annual CSTA Job Fair is scheduled for January 20, 2025. This is a great opportunity to meet with top employers in the technology industry.\n\nParticipating companies include:\n- Microsoft\n- Google\n- Amazon\n- Local tech startups\n\nRegistration is now open. Please register early as spots are limited.\n\nCareer Services Office'
  },
  {
    id: '6',
    from: 'careers@csta.edu',
    fromName: 'Career Services',
    subject: 'Job Fair Registration',
    preview: 'Annual job fair is coming up. Register to meet employers.',
    time: '3d',
    isRead: true,
    isStarred: true,
    hasAttachment: true,
    content: 'Dear Students,\n\nThe annual CSTA Job Fair is scheduled for January 20, 2025. This is a great opportunity to meet with top employers in the technology industry.\n\nParticipating companies include:\n- Microsoft\n- Google\n- Amazon\n- Local tech startups\n\nRegistration is now open. Please register early as spots are limited.\n\nCareer Services Office'
  }
]

function Inbox() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [emails, setEmails] = useState<Email[]>(mockEmails)
  const [showCompose, setShowCompose] = useState(false)
  const [composeMessage, setComposeMessage] = useState<ComposeMessage>({
    to: '',
    subject: '',
    content: ''
  })
  const [showUserSuggestions, setShowUserSuggestions] = useState(false)
  const [replyMode, setReplyMode] = useState(false)
  const [forwardMode, setForwardMode] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const filteredEmails = emails.filter(email => {
    return email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.preview.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleStarToggle = (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ))
  }

  const handleMarkAsRead = (emailId: string) => {
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, isRead: true } : email
    ))
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleCompose = () => {
    setShowCompose(true)
    setReplyMode(false)
    setForwardMode(false)
    setComposeMessage({ to: '', subject: '', content: '' })
  }

  const handleReply = () => {
    if (selectedEmail) {
      setShowCompose(true)
      setReplyMode(true)
      setForwardMode(false)
      // Find the username from the email sender
      const senderUser = mockUsers.find(user => user.fullName === selectedEmail.fromName)
      setComposeMessage({
        to: senderUser?.username || selectedEmail.fromName.toLowerCase().replace(/\s+/g, '_'),
        subject: `Re: ${selectedEmail.subject}`,
        content: `\n\n--- Original Message ---\nFrom: ${selectedEmail.fromName}\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.content || selectedEmail.preview}`
      })
    }
  }

  const handleForward = () => {
    if (selectedEmail) {
      setShowCompose(true)
      setReplyMode(false)
      setForwardMode(true)
      setComposeMessage({
        to: '',
        subject: `Fwd: ${selectedEmail.subject}`,
        content: `\n\n--- Forwarded Message ---\nFrom: ${selectedEmail.fromName}\nSubject: ${selectedEmail.subject}\nDate: ${selectedEmail.time}\n\n${selectedEmail.content || selectedEmail.preview}`
      })
    }
  }

  const handleSendMessage = () => {
    if (composeMessage.to && composeMessage.subject && composeMessage.content) {
      // Find the recipient user
      const recipient = mockUsers.find(user => 
        user.username.toLowerCase() === composeMessage.to.toLowerCase() ||
        user.fullName.toLowerCase().includes(composeMessage.to.toLowerCase())
      )
      //for testing
      if (recipient) {
        alert(`Message sent to ${recipient.fullName} (${recipient.username})!`)
        setShowCompose(false)
        setComposeMessage({ to: '', subject: '', content: '' })
        setReplyMode(false)
        setShowUserSuggestions(false)
      } else {
        alert('User not found. Please check the username.')
      }
    } else {
      alert('Please fill in all fields')
    }
  }

  const handleCancelCompose = () => {
    setShowCompose(false)
    setComposeMessage({ to: '', subject: '', content: '' })
    setReplyMode(false)
    setForwardMode(false)
    setShowUserSuggestions(false)
  }

  const handleToInputChange = (value: string) => {
    setComposeMessage(prev => ({ ...prev, to: value }))
    setShowUserSuggestions(value.length > 0)
  }

  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(composeMessage.to.toLowerCase()) ||
    user.fullName.toLowerCase().includes(composeMessage.to.toLowerCase())
  )

  const selectUser = (user: User) => {
    setComposeMessage(prev => ({ ...prev, to: user.username }))
    setShowUserSuggestions(false)
  }

  const handleMoreOptions = (action: string) => {
    if (!selectedEmail) return

    switch (action) {
      case 'archive':
        setEmails(prev => prev.filter(email => email.id !== selectedEmail.id))
        alert('Email archived successfully!')
        setSelectedEmail(null)
        break
      case 'delete':
        setEmails(prev => prev.filter(email => email.id !== selectedEmail.id))
        alert('Email deleted successfully!')
        setSelectedEmail(null)
        break
      case 'flag':
        setEmails(prev => prev.map(email => 
          email.id === selectedEmail.id ? { ...email, isStarred: !email.isStarred } : email
        ))
        alert('Email flag status updated!')
        break
      case 'copy':
        navigator.clipboard.writeText(selectedEmail.content || selectedEmail.preview)
        alert('Email content copied to clipboard!')
        break
      case 'download': {
        const emailText = `Subject: ${selectedEmail.subject}\nFrom: ${selectedEmail.fromName}\nDate: ${selectedEmail.time}\n\n${selectedEmail.content || selectedEmail.preview}`
        const blob = new Blob([emailText], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${selectedEmail.subject.replace(/[^a-z0-9]/gi, '_')}.txt`
        a.click()
        URL.revokeObjectURL(url)
        alert('Email downloaded as text file!')
        break
      }
      case 'print': {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head><title>${selectedEmail.subject}</title></head>
              <body>
                <h2>${selectedEmail.subject}</h2>
                <p><strong>From:</strong> ${selectedEmail.fromName}</p>
                <p><strong>Date:</strong> ${selectedEmail.time}</p>
                <hr>
                <pre>${selectedEmail.content || selectedEmail.preview}</pre>
              </body>
            </html>
          `)
          printWindow.document.close()
          printWindow.print()
        }
        break
      }
    }
    setShowMoreOptions(false)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMoreOptions) {
        setShowMoreOptions(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showMoreOptions])

  return (
    <div className="w-full px-6 md:px-10 max-w-5xl mx-auto space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <p className="text-sm text-muted-foreground">{filteredEmails.length} messages</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="cursor-pointer" onClick={handleCompose} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="cursor-pointer">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Main Content */}
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* Email List */}
        <div className="flex-1 bg-card rounded-lg border flex flex-col">
          <div className="divide-y flex-1 overflow-y-auto">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer ${
                  !email.isRead ? 'bg-muted/30' : ''
                }`}
                onClick={() => {
                  setSelectedEmail(email)
                  handleMarkAsRead(email.id)
                }}
              >
                <div onClick={(e) => handleStarToggle(email.id, e)}>
                  {email.isStarred ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 cursor-pointer" />
                  ) : (
                    <Star className="h-4 w-4 text-muted-foreground hover:text-yellow-400 cursor-pointer" />
                  )}
                </div>

                <Avatar className="h-8 w-8">
                  <AvatarImage src="/img/csa.PNG" alt={email.fromName} />
                  <AvatarFallback className="text-xs">{getInitials(email.fromName)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium ${!email.isRead ? 'font-semibold' : ''}`}>
                      {email.fromName}
                    </span>
                    <span className="text-sm text-muted-foreground ml-auto">{email.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${!email.isRead ? 'font-semibold' : ''}`}>
                      {email.subject}
                    </span>
                    {email.hasAttachment && <Paperclip className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {email.preview}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredEmails.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No messages found</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm ? 'Try adjusting your search terms' : 'Your inbox is empty'}
              </p>
            </div>
          )}
        </div>

        {/* Email Detail */}
        {selectedEmail && (
          <div className="w-80 bg-card rounded-lg border p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)} className="cursor-pointer">
                ← Back
              </Button>
               <div className="flex items-center gap-1">
                 <Button variant="ghost" size="sm" onClick={handleReply} className="cursor-pointer" title="Reply to this message">
                   <Reply className="h-4 w-4" />
                 </Button>
                 <Button variant="ghost" size="sm" onClick={handleForward} className="cursor-pointer" title="Forward this message">
                   <Forward className="h-4 w-4" />
                 </Button>
                 <div className="relative">
                   <Button variant="ghost" size="sm" onClick={() => setShowMoreOptions(!showMoreOptions)} className="cursor-pointer" title="More options">
                     <MoreHorizontal className="h-4 w-4" />
                   </Button>
                   
                   {/* More Options Dropdown */}
                   {showMoreOptions && (
                     <div className="absolute right-0 top-full mt-1 w-48 bg-card border rounded-lg shadow-lg z-10">
                       <div className="py-1">
                         <button
                           onClick={() => handleMoreOptions('archive')}
                           className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer"
                         >
                           <Archive className="h-4 w-4" />
                           Archive
                         </button>
                         <button
                           onClick={() => handleMoreOptions('delete')}
                           className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer text-red-600"
                         >
                           <Trash2 className="h-4 w-4" />
                           Delete
                         </button>
                         <button
                           onClick={() => handleMoreOptions('flag')}
                           className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer"
                         >
                           <Flag className="h-4 w-4" />
                           {selectedEmail?.isStarred ? 'Unflag' : 'Flag'}
                         </button>
                         <div className="border-t my-1"></div>
                         <button
                           onClick={() => handleMoreOptions('copy')}
                           className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer"
                         >
                           <Copy className="h-4 w-4" />
                           Copy Content
                         </button>
                         <button
                           onClick={() => handleMoreOptions('download')}
                           className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer"
                         >
                           <Download className="h-4 w-4" />
                           Download
                         </button>
                         <button
                           onClick={() => handleMoreOptions('print')}
                           className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer"
                         >
                           <Printer className="h-4 w-4" />
                           Print
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/img/csa.PNG" alt={selectedEmail.fromName} />
                  <AvatarFallback>{getInitials(selectedEmail.fromName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{selectedEmail.fromName}</span>
                    {selectedEmail.isStarred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedEmail.time}</div>
                </div>
              </div>

               <div>
                 <h2 className="text-lg font-semibold mb-3">{selectedEmail.subject}</h2>
                 <div className="prose prose-sm max-w-none">
                   <div className="text-muted-foreground whitespace-pre-line">
                     {selectedEmail.content || selectedEmail.preview}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {replyMode ? 'Reply to Message' : forwardMode ? 'Forward Message' : 'Compose Message'}
              </h2>
               <Button variant="ghost" size="sm" onClick={handleCancelCompose} className="cursor-pointer">
                 <X className="h-4 w-4" />
               </Button>
            </div>
            
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="relative">
                <label className="text-sm font-medium mb-2 block">To:</label>
                <Input
                  value={composeMessage.to}
                  onChange={(e) => handleToInputChange(e.target.value)}
                  placeholder="Enter username (e.g., john_doe, prof_wilson)"
                  className="w-full"/>
                {/* User Suggestions Dropdown */}
                {showUserSuggestions && filteredUsers.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                        onClick={() => selectUser(user)}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/img/csa.PNG" alt={user.fullName} />
                            <AvatarFallback className="text-xs">{getInitials(user.fullName)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{user.fullName}</div>
                          <div className="text-xs text-muted-foreground">@{user.username} • {user.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Subject:</label>
                <Input
                  value={composeMessage.subject}
                  onChange={(e) => setComposeMessage(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Message subject"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message:</label>
                <textarea
                  value={composeMessage.content}
                  onChange={(e) => setComposeMessage(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Type your message here..."
                  className="w-full h-40 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 p-4 border-t">
               <Button variant="outline" onClick={handleCancelCompose} className="cursor-pointer">
                 Cancel
               </Button>
               <Button onClick={handleSendMessage} className="cursor-pointer">
                 <Send className="h-4 w-4 mr-2" />
                 Send
               </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inbox
