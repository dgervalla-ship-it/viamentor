/**
 * VIAMENTOR - Student Messages Page
 * Page Mes Messages élève avec messagerie interne
 *
 * @module pages/viamentor-student-messages-page
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SendIcon,
  SearchIcon,
  PlusIcon,
  UserIcon,
  ClockIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentMessagesPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Conversation {
  id: string;
  participant: {
    name: string;
    role: "instructor" | "secretary" | "admin";
    avatar?: string;
  };
  lastMessage: {
    text: string;
    date: Date;
    isRead: boolean;
  };
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  date: Date;
  isOwn: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockConversations: Conversation[] = [
  {
    id: "1",
    participant: {
      name: "Marc Dubois",
      role: "instructor",
      avatar: "https://github.com/yusufhilmi.png",
    },
    lastMessage: {
      text: "Parfait, à demain pour la leçon !",
      date: new Date("2024-10-25T14:30:00"),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "2",
    participant: {
      name: "Sophie Martin",
      role: "secretary",
      avatar: "https://github.com/kdrnp.png",
    },
    lastMessage: {
      text: "Votre facture est disponible",
      date: new Date("2024-10-24T10:15:00"),
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: "3",
    participant: {
      name: "Jean Dupont",
      role: "admin",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    lastMessage: {
      text: "Bienvenue à l'auto-école !",
      date: new Date("2024-10-20T09:00:00"),
      isRead: true,
    },
    unreadCount: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "instructor-1",
    senderName: "Marc Dubois",
    text: "Bonjour ! Comment allez-vous ?",
    date: new Date("2024-10-25T14:00:00"),
    isOwn: false,
  },
  {
    id: "2",
    senderId: "student-1",
    senderName: "Moi",
    text: "Très bien merci ! Prêt pour la leçon de demain",
    date: new Date("2024-10-25T14:15:00"),
    isOwn: true,
  },
  {
    id: "3",
    senderId: "instructor-1",
    senderName: "Marc Dubois",
    text: "Parfait, à demain pour la leçon !",
    date: new Date("2024-10-25T14:30:00"),
    isOwn: false,
  },
];

const translations = {
  fr: {
    title: "Mes Messages",
    description: "Messagerie avec moniteurs et secrétariat",
    roles: {
      instructor: "Moniteur",
      secretary: "Secrétariat",
      admin: "Administration",
    },
    actions: {
      newMessage: "Nouveau message",
      send: "Envoyer",
      search: "Rechercher...",
    },
    placeholders: {
      typeMessage: "Tapez votre message...",
      selectConversation: "Sélectionnez une conversation",
    },
    labels: {
      unread: "non lu(s)",
      today: "Aujourd'hui",
      yesterday: "Hier",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentMessagesPage({
  locale = "fr",
}: StudentMessagesPageProps) {
  const t = translations[locale];
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(mockConversations[0].id);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = mockConversations.find(
    (c) => c.id === selectedConversation
  );

  const getRoleColor = (role: Conversation["participant"]["role"]) => {
    switch (role) {
      case "instructor":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
      case "secretary":
        return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400";
      case "admin":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (hours < 48) {
      return t.labels.yesterday;
    } else {
      return date.toLocaleDateString(locale, {
        day: "numeric",
        month: "short",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />

          {t.actions.newMessage}
        </Button>
      </div>

      {/* Messages Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.actions.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border ${
                  selectedConversation === conv.id ? "bg-muted" : ""
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conv.participant.avatar} />

                  <AvatarFallback>
                    <UserIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground truncate">
                      {conv.participant.name}
                    </h4>
                    {conv.unreadCount > 0 && (
                      <Badge variant="default" className="ml-2">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {t.roles[conv.participant.role]}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      conv.lastMessage.isRead
                        ? "text-muted-foreground"
                        : "font-medium text-foreground"
                    }`}
                  >
                    {conv.lastMessage.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(conv.lastMessage.date)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Messages Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {currentConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentConversation.participant.avatar} />

                  <AvatarFallback>
                    <UserIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {currentConversation.participant.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.roles[currentConversation.participant.role]}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        msg.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      } rounded-lg p-3`}
                    >
                      {!msg.isOwn && (
                        <p className="text-xs font-medium mb-1">
                          {msg.senderName}
                        </p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isOwn
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(msg.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Textarea
                    placeholder={t.placeholders.typeMessage}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="resize-none"
                    rows={2}
                  />

                  <Button size="icon" className="shrink-0">
                    <SendIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <UserIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                <p className="text-muted-foreground">
                  {t.placeholders.selectConversation}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
