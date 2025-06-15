
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuPortal,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Archive, Clock, Paperclip, Send, Pin, Share, Trash2, Reply, Info } from "lucide-react";

// Mock data to demonstrate the chat UI
const messages = [
  { id: 1, sender: 'Jane Doe', content: 'Hey, how is it going?', timestamp: '10:00 AM', own: false },
  { id: 2, sender: 'Me', content: 'Pretty good! Working on the new messaging feature.', timestamp: '10:01 AM', own: true },
  { id: 3, sender: 'Jane Doe', content: 'Oh nice! How is that coming along?', timestamp: '10:01 AM', own: false },
  { id: 4, sender: 'Jane Doe', content: 'Can you share any screenshots? This is an image message.', timestamp: '10:02 AM', own: false, type: 'image' as const },
  { id: 5, sender: 'Me', content: 'Sure, here is one.', timestamp: '10:03 AM', own: true },
];

export default function Messages() {
  return (
    <div className="flex flex-col h-full text-foreground">
      <h2 className="font-bold text-3xl mb-4">Messages</h2>
      <Tabs defaultValue="all" className="flex-grow flex flex-col">
        <TabsList className="bg-card">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="archive">
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="flex-grow flex flex-col bg-card shadow rounded-xl mt-2">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Jane Doe</h3>
            <p className="text-sm text-muted-foreground">End-to-End Encrypted Messaging. Real-time chat powered by Supabase.</p>
          </div>
          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map(message => (
              <ContextMenu key={message.id}>
                <ContextMenuTrigger>
                  <div className={`flex items-end gap-2 ${message.own ? 'justify-end' : ''}`}>
                    {!message.own && <img src="/placeholder.svg" alt="avatar" className="w-8 h-8 rounded-full" />}
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${message.own ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p>{message.content}</p>
                      <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuPortal>
                  <ContextMenuContent>
                    <ContextMenuSub>
                      <ContextMenuSubTrigger><Pin className="w-4 h-4 mr-2" /> Pin Message</ContextMenuSubTrigger>
                      <ContextMenuPortal>
                        <ContextMenuSubContent>
                          <ContextMenuItem>24 Hours</ContextMenuItem>
                          <ContextMenuItem>7 Days</ContextMenuItem>
                          <ContextMenuItem>30 Days</ContextMenuItem>
                        </ContextMenuSubContent>
                      </ContextMenuPortal>
                    </ContextMenuSub>
                    {message.type === 'image' && <ContextMenuItem><Share className="w-4 h-4 mr-2" /> Share</ContextMenuItem>}
                    <ContextMenuItem><Send className="w-4 h-4 mr-2" /> Send in App</ContextMenuItem>
                    <ContextMenuItem><Reply className="w-4 h-4 mr-2" /> Reply To</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</ContextMenuItem>
                    {message.own && (
                      <>
                        <ContextMenuSeparator />
                        <ContextMenuItem><Info className="w-4 h-4 mr-2" /> Message Info</ContextMenuItem>
                      </>
                    )}
                  </ContextMenuContent>
                </ContextMenuPortal>
              </ContextMenu>
            ))}
          </div>
          <div className="p-4 border-t bg-card rounded-b-xl">
            <div className="relative flex items-center">
              <Textarea placeholder="Type your message..." className="pr-40 min-h-0" rows={1} />
              <div className="absolute right-2 flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><Clock className="w-5 h-5" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Schedule for 24 Hours</DropdownMenuItem>
                    <DropdownMenuItem>Schedule for 7 Days</DropdownMenuItem>
                    <DropdownMenuItem>Schedule for 30 Days</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5" /></Button>
                <Button><Send className="w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="friends">
            <div className="rounded-xl bg-card shadow p-6 min-h-[300px]">
                Friend conversations will be listed here.
            </div>
        </TabsContent>
        <TabsContent value="communities">
            <div className="rounded-xl bg-card shadow p-6 min-h-[300px]">
                Community channels will be listed here.
            </div>
        </TabsContent>
        <TabsContent value="archive">
            <div className="rounded-xl bg-card shadow p-6 min-h-[300px]">
                Archived conversations will be listed here.
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
