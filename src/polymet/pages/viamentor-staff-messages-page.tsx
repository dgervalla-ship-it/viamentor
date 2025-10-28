/**
 * VIAMENTOR Staff Messages Page
 *
 * Page messagerie interne secrétariat avec threads, compose, folders
 */

"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Archive,
  Trash2,
  Plus,
  Search,
  Paperclip,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockMessageThreads,
  mockMessages,
  type MessageThread,
  type MessageFolder,
  type MessagePriority,
} from "@/polymet/data/viamentor-staff-communications-data";
import {
  getStaffTranslations,
  type StaffLocale,
} from "@/polymet/data/viamentor-staff-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StaffMessagesPageProps {
  locale?: StaffLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StaffMessagesPage({ locale = "fr" }: StaffMessagesPageProps) {
  const t = getStaffTranslations(locale);
  const [folder, setFolder] = useState<MessageFolder>("inbox");
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(
    null
  );
  const [composeDialogOpen, setComposeDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = mockMessageThreads.filter((thread) => {
    if (thread.folder !== folder) return false;
    if (
      searchQuery &&
      !thread.subject.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const unreadCount = mockMessageThreads.filter(
    (t) => t.folder === "inbox" && t.unreadCount > 0
  ).length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t.messages.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t.messages.subtitle}
            </p>
          </div>
          <Dialog open={composeDialogOpen} onOpenChange={setComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />

                {t.messages.actions.newMessage}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t.messages.compose.title}</DialogTitle>
                <DialogDescription>
                  Envoyer un message aux élèves, moniteurs ou personnel
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>{t.messages.compose.to}</Label>
                  <Input placeholder="Sélectionner destinataires..." />
                </div>
                <div>
                  <Label>{t.messages.compose.subject}</Label>
                  <Input placeholder="Objet du message" />
                </div>
                <div>
                  <Label>{t.messages.compose.body}</Label>
                  <Textarea
                    placeholder="Votre message..."
                    rows={8}
                    className="resize-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4 mr-2" />

                    {t.messages.compose.attachments}
                  </Button>
                  <Select defaultValue="normal">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">
                        {t.messages.priority.normal}
                      </SelectItem>
                      <SelectItem value="urgent">
                        {t.messages.priority.urgent}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setComposeDialogOpen(false)}
                >
                  {t.messages.compose.cancel}
                </Button>
                <Button onClick={() => setComposeDialogOpen(false)}>
                  <Send className="w-4 h-4 mr-2" />

                  {t.messages.compose.send}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder={t.common.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs
          value={folder}
          onValueChange={(v) => setFolder(v as MessageFolder)}
          className="h-full"
        >
          <div className="border-b border-border bg-card px-6">
            <TabsList>
              <TabsTrigger value="inbox" className="relative">
                {t.messages.folders.inbox}
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sent">{t.messages.folders.sent}</TabsTrigger>
              <TabsTrigger value="drafts">
                {t.messages.folders.drafts}
              </TabsTrigger>
              <TabsTrigger value="archived">
                {t.messages.folders.archived}
              </TabsTrigger>
              <TabsTrigger value="trash">
                {t.messages.folders.trash}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={folder} className="h-full overflow-auto p-6 m-0">
            {filteredThreads.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />

                  <p className="text-lg font-medium text-foreground">
                    {t.common.noResults}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aucun message dans ce dossier
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredThreads.map((thread) => (
                  <Card
                    key={thread.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                      thread.unreadCount > 0
                        ? "border-l-4 border-l-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedThread(thread)}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={thread.participants[0].avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-medium text-foreground truncate ${
                              thread.unreadCount > 0 ? "font-bold" : ""
                            }`}
                          >
                            {thread.subject}
                          </span>
                          {thread.priority === "urgent" && (
                            <Flag className="w-4 h-4 text-destructive" />
                          )}
                          {thread.unreadCount > 0 && (
                            <Badge
                              variant="default"
                              className="h-5 px-2 text-xs"
                            >
                              {thread.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {thread.participants[0].role}
                          </Badge>
                          <span className="text-muted-foreground">
                            {thread.participants[0].name}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {thread.lastMessage.content}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>
                            {thread.lastMessage.timestamp.toLocaleString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          {thread.attachmentsCount > 0 && (
                            <span className="flex items-center gap-1">
                              <Paperclip className="w-3 h-3" />

                              {thread.attachmentsCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Archive className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Thread Detail Sheet */}
      <Sheet
        open={!!selectedThread}
        onOpenChange={(open) => !open && setSelectedThread(null)}
      >
        <SheetContent side="right" className="w-full sm:max-w-2xl">
          {selectedThread && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedThread.subject}</SheetTitle>
                <SheetDescription>
                  Conversation avec {selectedThread.participants[0].name}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {mockMessages
                  .filter((msg) => msg.threadId === selectedThread.id)
                  .map((message) => (
                    <Card key={message.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={message.senderAvatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">
                              {message.senderName}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {message.senderRole}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {message.timestamp.toLocaleString("fr-FR")}
                            </span>
                          </div>
                          <p className="text-sm text-foreground">
                            {message.content}
                          </p>
                          {message.attachments.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.attachments.map((att) => (
                                <div
                                  key={att.id}
                                  className="flex items-center gap-2 text-sm p-2 bg-muted rounded-md"
                                >
                                  <Paperclip className="w-4 h-4 text-muted-foreground" />

                                  <span className="text-foreground">
                                    {att.name}
                                  </span>
                                  <span className="text-muted-foreground text-xs ml-auto">
                                    {(att.size / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                <div className="pt-4 border-t border-border">
                  <Textarea
                    placeholder={t.messages.actions.reply}
                    rows={4}
                    className="resize-none mb-2"
                  />

                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Joindre
                    </Button>
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />

                      {t.messages.actions.reply}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
