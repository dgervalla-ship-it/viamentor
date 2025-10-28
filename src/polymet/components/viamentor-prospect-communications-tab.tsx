/**
 * VIAMENTOR - Prospect Communications Tab
 * Tab Communications avec Emails, SMS, Calls sections et composer
 */

"use client";

import * as React from "react";
import { Mail, MessageSquare, Phone, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  type Prospect,
  mockEmails,
  mockSMS,
  mockCalls,
} from "@/polymet/data/viamentor-prospects-data";
import {
  type ProspectsLocale,
  getProspectsTranslations,
} from "@/polymet/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectCommunicationsTabProps {
  prospect: Prospect;
  locale?: ProspectsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectCommunicationsTab({
  prospect,
  locale = "fr",
}: ProspectCommunicationsTabProps) {
  const t = getProspectsTranslations(locale);
  const [emailSubject, setEmailSubject] = React.useState("");
  const [emailBody, setEmailBody] = React.useState("");
  const [smsMessage, setSmsMessage] = React.useState("");

  const emails = mockEmails.filter((e) => e.prospectId === prospect.id);
  const sms = mockSMS.filter((s) => s.prospectId === prospect.id);
  const calls = mockCalls.filter((c) => c.prospectId === prospect.id);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Emails Section */}
      <Accordion type="single" collapsible defaultValue="emails">
        <AccordionItem value="emails">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {t.detail.communications.emails} ({emails.length})
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4">
              {/* Email Composer */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {t.detail.communications.compose}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t.detail.communications.templates}</Label>
                    <Select
                      onValueChange={(value) => {
                        if (value === "infoRequest") {
                          setEmailSubject("Informations sur nos formations");
                          setEmailBody(
                            `Bonjour ${prospect.firstName},\n\nMerci pour votre intérêt...`
                          );
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un modèle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infoRequest">
                          {t.detail.emailTemplates.infoRequest}
                        </SelectItem>
                        <SelectItem value="appointmentProposal">
                          {t.detail.emailTemplates.appointmentProposal}
                        </SelectItem>
                        <SelectItem value="followUp">
                          {t.detail.emailTemplates.followUp}
                        </SelectItem>
                        <SelectItem value="thankYou">
                          {t.detail.emailTemplates.thankYou}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.detail.communications.subject}</Label>
                    <Input
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Objet de l'email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.detail.communications.body}</Label>
                    <Textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={6}
                      placeholder="Votre message..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />

                      {t.detail.communications.attachments}
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />

                      {t.detail.communications.send}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email List */}
              {emails.map((email) => (
                <Card key={email.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium">{email.subject}</h4>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            {t.detail.communications.from}: {email.from}
                          </div>
                          <div>
                            {t.detail.communications.to}: {email.to}
                          </div>
                          <div>
                            {new Date(email.date).toLocaleString(locale)}
                          </div>
                        </div>
                      </div>
                      {email.opened && (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          Ouvert
                        </Badge>
                      )}
                    </div>
                    <Separator />

                    <p className="text-sm text-muted-foreground">
                      {email.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SMS Section */}
        <AccordionItem value="sms">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {t.detail.communications.sms} ({sms.length})
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4">
              {/* SMS Composer */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {t.detail.communications.compose}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t.detail.communications.body}</Label>
                    <Textarea
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      rows={3}
                      maxLength={160}
                      placeholder="Votre message SMS..."
                    />

                    <p className="text-xs text-muted-foreground text-right">
                      {smsMessage.length}/160
                    </p>
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />

                    {t.detail.communications.send}
                  </Button>
                </CardContent>
              </Card>

              {/* SMS List */}
              {sms.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Badge
                          variant={
                            message.direction === "outbound"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {message.direction === "outbound"
                            ? t.detail.communications.outbound
                            : t.detail.communications.inbound}
                        </Badge>
                        <span>
                          {new Date(message.date).toLocaleString(locale)}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Calls Section */}
        <AccordionItem value="calls">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {t.detail.communications.calls} ({calls.length})
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4">
              {calls.map((call) => (
                <Card key={call.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            call.direction === "outbound"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {call.direction === "outbound"
                            ? t.detail.communications.outbound
                            : t.detail.communications.inbound}
                        </Badge>
                        <span className="text-sm font-medium">
                          {t.detail.communications.duration}:{" "}
                          {formatDuration(call.duration)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(call.date).toLocaleString(locale)}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        {t.detail.communications.outcome}:{" "}
                      </span>
                      <span>
                        {t.detail.communications.outcomes[call.outcome]}
                      </span>
                    </div>
                    {call.notes && (
                      <>
                        <Separator />

                        <p className="text-sm text-muted-foreground">
                          {call.notes}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
