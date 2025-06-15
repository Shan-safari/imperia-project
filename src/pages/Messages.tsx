
import React, { useState } from "react";
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
import {
  Archive,
  Clock,
  Paperclip,
  Send,
  Pin,
  Share,
  Trash2,
  Reply,
  Info,
  Users,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const defaultMessages = [
  { id: 1, sender: "Jane Doe", content: "Hey, how is it going?", timestamp: "10:00 AM", own: false },
  { id: 2, sender: "Me", content: "Pretty good! Working on the new messaging feature.", timestamp: "10:01 AM", own: true },
  { id: 3, sender: "Jane Doe", content: "Oh nice! How is that coming along?", timestamp: "10:01 AM", own: false },
  { id: 4, sender: "Jane Doe", content: "Can you share any screenshots? This is an image message.", timestamp: "10:02 AM", own: false, type: "image" as const },
  { id: 5, sender: "Me", content: "Sure, here is one.", timestamp: "10:03 AM", own: true },
];

const demoGroupChats = [
  {
    id: "g1",
    name: "VC Roundtable",
    description: "Chat for founders and VCs",
    members: ["Jane Doe", "You", "Alex Investor"],
    messages: [
      { id: "g1m1", sender: "Jane Doe", content: "Welcome to the group!", timestamp: "09:00 AM", own: false },
      { id: "g1m2", sender: "You", content: "Thank you!", timestamp: "09:01 AM", own: true },
    ],
  },
];

export default function Messages() {
  const [messages, setMessages] = useState(defaultMessages);
  const [groupChats, setGroupChats] = useState(demoGroupChats);
  const [currentGroup, setCurrentGroup] = useState<string | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupForm, setGroupForm] = useState({ name: "", description: "", members: "" });

  // Handle group chat creation
  const handleCreateGroup = () => {
    const membersArr = groupForm.members.split(",").map(m => m.trim()).filter(Boolean);
    if (!groupForm.name) return;
    setGroupChats([
      ...groupChats,
      {
        id: `g${Date.now()}`,
        name: groupForm.name,
        description: groupForm.description,
        members: ["You", ...membersArr],
        messages: [{ id: `g${Date.now()}m1`, sender: "You", content: "Hello group!", timestamp: "10:15 AM", own: true }]
      }
    ]);
    setGroupForm({ name: "", description: "", members: "" });
    setShowGroupModal(false);
  };

  const activeMessages =
    currentGroup
      ? groupChats.find(g => g.id === currentGroup)?.messages || []
      : messages;

  return (
    <div className="flex flex-col h-full text-foreground">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-3xl">Messages</h2>
        <Button onClick={() => setShowGroupModal(true)} className="flex gap-2" variant="secondary">
          <Plus className="w-4 h-4" />
          Create Group Chat
        </Button>
      </div>
      <Tabs defaultValue={currentGroup ? currentGroup : "all"} className="flex-grow flex flex-col">
        <TabsList className="bg-card flex-wrap">
          <TabsTrigger value="all" onClick={() => setCurrentGroup(null)}>All</TabsTrigger>
          <TabsTrigger value="friends" onClick={() => setCurrentGroup(null)}>Friends</TabsTrigger>
          <TabsTrigger value="communities" onClick={() => setCurrentGroup(null)}>Communities</TabsTrigger>
          {groupChats.map((group) => (
            <TabsTrigger
              key={group.id}
              value={group.id}
              onClick={() => setCurrentGroup(group.id)}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />{group.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="archive" onClick={() => setCurrentGroup(null)}>
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </TabsTrigger>
        </TabsList>
        {/* Direct / Group messages */}
        <TabsContent value={currentGroup ? currentGroup : "all"} className="flex-grow flex flex-col bg-card shadow rounded-xl mt-2">
          {currentGroup ? (
            <div className="p-4 border-b flex flex-col gap-1">
              <h3 className="font-semibold flex items-center gap-2"><Users className="w-4 h-4" /> {groupChats.find(g => g.id === currentGroup)?.name}</h3>
              <span className="text-sm text-muted-foreground">{groupChats.find(g => g.id === currentGroup)?.description}</span>
              <span className="text-xs text-muted-foreground">
                Members: {groupChats.find(g => g.id === currentGroup)?.members.join(", ")}
              </span>
            </div>
          ) : (
            <div className="p-4 border-b">
              <h3 className="font-semibold">Jane Doe</h3>
              <p className="text-sm text-muted-foreground">End-to-End Encrypted Messaging. Real-time chat powered by Supabase.</p>
            </div>
          )}
          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {activeMessages.map(message => (
              <ContextMenu key={message.id}>
                <ContextMenuTrigger>
                  <div className={`flex items-end gap-2 ${message.own ? "justify-end" : ""}`}>
                    {!message.own && <img src="/placeholder.svg" alt="avatar" className="w-8 h-8 rounded-full" />}
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${message.own ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
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
                    {message.type === "image" && <ContextMenuItem><Share className="w-4 h-4 mr-2" /> Share</ContextMenuItem>}
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
      {/* Modal for creating Group Chat */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 shadow-md min-w-[300px] w-full max-w-sm space-y-3 relative">
            <button className="absolute top-2 right-2" onClick={() => setShowGroupModal(false)}><span className="text-lg">&times;</span></button>
            <h3 className="font-semibold mb-2 flex gap-2 items-center"><Users className="w-4 h-4" />Create Group Chat</h3>
            <Input
              placeholder="Group Name"
              className="mb-2"
              value={groupForm.name}
              onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
            />
            <Input
              placeholder="Description"
              className="mb-2"
              value={groupForm.description}
              onChange={e => setGroupForm({ ...groupForm, description: e.target.value })}
            />
            <Input
              placeholder="Members (comma-separated)"
              value={groupForm.members}
              onChange={e => setGroupForm({ ...groupForm, members: e.target.value })}
            />
            <Button className="w-full mt-2" onClick={handleCreateGroup}>Create</Button>
          </div>
        </div>
      )}
    </div>
  );
}

