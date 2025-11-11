import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChannelSchema, type CreateChannel } from "@shared/schema";
import { StreamChat } from "stream-chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Loader2 } from "lucide-react";

interface CreateChannelModalProps {
  client: StreamChat;
  onClose: () => void;
}

export function CreateChannelModal({ client, onClose }: CreateChannelModalProps) {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateChannel>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      channelId: "",
      channelName: "",
      channelType: "messaging",
      members: [],
    },
  });

  const handleSubmit = async (data: CreateChannel) => {
    try {
      setError("");
      setIsLoading(true);

      // Create or get the channel
      const channel = client.channel(data.channelType, data.channelId, {
        name: data.channelName,
        members: data.members && data.members.length > 0 ? [...data.members, client.userID!] : [client.userID!],
      } as any);

      await channel.create();
      await channel.watch();

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create channel");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-create-channel">
        <DialogHeader>
          <DialogTitle>Create New Channel</DialogTitle>
          <DialogDescription>
            Create a new channel to start messaging with your team
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" data-testid="alert-error">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="channelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="general, random, team-updates..."
                      disabled={isLoading}
                      data-testid="input-channel-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="channelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="unique-channel-id"
                      disabled={isLoading}
                      data-testid="input-channel-id"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="channelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-channel-type">
                        <SelectValue placeholder="Select channel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="messaging">Messaging</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="livestream">Livestream</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Members (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        const members = e.target.value
                          .split(",")
                          .map((m) => m.trim())
                          .filter(Boolean);
                        field.onChange(members);
                      }}
                      placeholder="user1, user2, user3..."
                      disabled={isLoading}
                      data-testid="input-channel-members"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                data-testid="button-create"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Channel"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
