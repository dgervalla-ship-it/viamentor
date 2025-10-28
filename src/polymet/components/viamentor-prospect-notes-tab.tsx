/**
 * VIAMENTOR - Prospect Notes Tab
 * Tab Notes avec rich text editor, liste notes, visibilité et pin
 */

"use client";

import * as React from "react";
import { Plus, Pin, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type Prospect,
  type TeamMember,
  type ProspectNote,
  mockNotes,
} from "@/polymet/data/viamentor-prospects-data";
import {
  type ProspectsLocale,
  getProspectsTranslations,
} from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectNotesTabProps {
  prospect: Prospect;
  teamMembers: TeamMember[];
  locale?: ProspectsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectNotesTab({
  prospect,
  teamMembers,
  locale = "fr",
}: ProspectNotesTabProps) {
  const t = getProspectsTranslations(locale);
  const [newNoteContent, setNewNoteContent] = React.useState("");
  const [newNoteVisibility, setNewNoteVisibility] = React.useState<
    "private" | "team"
  >("team");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const notes = mockNotes.filter((n) => n.prospectId === prospect.id);
  const pinnedNotes = notes.filter((n) => n.pinned);
  const regularNotes = notes.filter((n) => !n.pinned);

  const handleCreateNote = () => {
    console.log("Create note:", {
      content: newNoteContent,
      visibility: newNoteVisibility,
    });
    setNewNoteContent("");
    setDialogOpen(false);
  };

  const NoteCard = ({ note }: { note: ProspectNote }) => {
    const author = teamMembers.find((m) => m.id === note.authorId);

    return (
      <Card className={note.pinned ? "border-primary bg-primary/5" : ""}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              {author && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{author?.name}</span>
                  {note.pinned && (
                    <Pin className="h-3 w-3 text-primary fill-primary" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {new Date(note.createdAt).toLocaleDateString(locale)}
                  </span>
                  <span>•</span>
                  <Badge
                    variant={
                      note.visibility === "private" ? "secondary" : "outline"
                    }
                    className="h-5 text-xs"
                  >
                    {note.visibility === "private" ? (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />

                        {t.detail.notes.visibilityOptions.private}
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />

                        {t.detail.notes.visibilityOptions.team}
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pin className="h-4 w-4 mr-2" />

                  {note.pinned ? "Désépingler" : t.detail.notes.pin}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />

                  {t.detail.notes.edit}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />

                  {t.detail.notes.delete}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with New Note button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.detail.notes.title}</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />

              {t.detail.notes.newNote}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.detail.notes.newNote}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t.detail.notes.content}</Label>
                <Textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={6}
                  placeholder="Écrivez votre note..."
                />
              </div>

              <div className="space-y-2">
                <Label>{t.detail.notes.visibility}</Label>
                <RadioGroup
                  value={newNoteVisibility}
                  onValueChange={(value: "private" | "team") =>
                    setNewNoteVisibility(value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />

                    <Label
                      htmlFor="private"
                      className="font-normal cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />

                        {t.detail.notes.visibilityOptions.private}
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />

                    <Label
                      htmlFor="team"
                      className="font-normal cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />

                        {t.detail.notes.visibilityOptions.team}
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateNote} className="flex-1">
                  {t.detail.notes.newNote}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="flex-1"
                >
                  {t.bulk.assignDialog.cancel}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Notes épinglées
          </h4>
          <div className="space-y-2">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notes */}
      {regularNotes.length > 0 && (
        <div className="space-y-2">
          {pinnedNotes.length > 0 && (
            <h4 className="text-sm font-medium text-muted-foreground">
              Toutes les notes
            </h4>
          )}
          <div className="space-y-2">
            {regularNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="rounded-full bg-muted p-6">
            <Plus className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t.detail.notes.noNotes}</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Ajoutez des notes pour garder une trace de vos réflexions et
              observations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
