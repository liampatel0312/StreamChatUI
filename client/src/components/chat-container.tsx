import { useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  LoadingIndicator,
  useChannelStateContext,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { Button } from "@/components/ui/button";
import { LogOut, Hash, Users, Menu } from "lucide-react";
import { CreateChannelModal } from "@/components/create-channel-modal";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";
import type { Channel as StreamChannel } from "stream-chat";

interface ChatContainerProps {
  client: StreamChat;
  onLogout: () => void;
}

export function ChatContainer({ client, onLogout }: ChatContainerProps) {
  const { theme } = useTheme();
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [activeChannel, setActiveChannel] = useState<StreamChannel | null>(null);
  const [showChannelList, setShowChannelList] = useState(true);

  const filters = { 
    type: "messaging",
    members: { $in: [client.userID || ""] }
  };
  
  const sort = { last_message_at: -1 as const };
  const options = { limit: 10 };

  return (
    <ErrorBoundary>
      <Chat client={client} theme={theme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"}>
        <div className="flex h-screen w-full" data-testid="container-chat">
          {/* Channel List Sidebar */}
          <div className={`flex w-[260px] flex-col border-r bg-card lg:w-[280px] ${showChannelList ? "block" : "hidden lg:flex"}`}>
            {/* Sidebar Header */}
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                <span className="font-semibold text-card-foreground">Channels</span>
              </div>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onLogout}
                  title="Logout"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Channel List */}
            <div className="flex-1 overflow-hidden">
              <ChannelList
                filters={filters}
                sort={sort}
                options={options}
                showChannelSearch
                Preview={(props) => <ChannelPreview {...props} setActiveChannel={setActiveChannel} activeChannel={activeChannel} />}
                LoadingIndicator={() => (
                  <div className="flex items-center justify-center p-8">
                    <LoadingIndicator />
                  </div>
                )}
                setActiveChannelOnMount={false}
              />
            </div>

            {/* Create Channel Button */}
            <div className="border-t p-4">
              <Button
                className="w-full"
                onClick={() => setShowCreateChannel(true)}
                data-testid="button-create-channel"
              >
                <Hash className="mr-2 h-4 w-4" />
                Create Channel
              </Button>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex flex-1 flex-col">
            {activeChannel ? (
              <Channel channel={activeChannel}>
                <Window>
                  <CustomChannelHeader 
                    onToggleSidebar={() => setShowChannelList(!showChannelList)}
                    showSidebarToggle={!showChannelList}
                  />
                  <MessageList />
                  <MessageInput focus />
                </Window>
                <Thread />
              </Channel>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center p-4">
                  <Users className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="text-lg font-medium text-foreground">No Channel Selected</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select a channel from the sidebar or create a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showCreateChannel && (
          <CreateChannelModal
            client={client}
            onClose={() => setShowCreateChannel(false)}
          />
        )}
      </Chat>
    </ErrorBoundary>
  );
}

// Custom Channel Preview Component
function ChannelPreview(props: any) {
  const { channel, setActiveChannel, activeChannel, watchers } = props;
  const isActive = activeChannel?.id === channel.id;
  const unreadCount = channel.countUnread();
  const lastMessage = channel.state.messages[channel.state.messages.length - 1];

  const handleSelect = () => {
    if (setActiveChannel) {
      setActiveChannel(channel);
    }
  };

  return (
    <button
      onClick={handleSelect}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left hover-elevate active-elevate-2 ${
        isActive ? "bg-sidebar-accent" : ""
      }`}
      data-testid={`channel-preview-${channel.id}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Hash className="h-4 w-4" />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-semibold text-card-foreground">
            {channel.data?.name || "Unnamed Channel"}
          </span>
          {unreadCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        {lastMessage && (
          <p className="truncate text-xs text-muted-foreground">
            {lastMessage.text || "No messages yet"}
          </p>
        )}
      </div>
    </button>
  );
}

// Custom Channel Header
function CustomChannelHeader({ 
  onToggleSidebar, 
  showSidebarToggle 
}: { 
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}) {
  const { channel } = useChannelStateContext();
  const memberCount = Object.keys(channel?.state?.members || {}).length;

  return (
    <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6" data-testid="channel-header">
      <div className="flex items-center gap-3">
        {showSidebarToggle && onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
            data-testid="button-toggle-sidebar"
          >
            <Hash className="h-5 w-5" />
          </Button>
        )}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Hash className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {channel?.data?.name || "Channel"}
          </h2>
          <p className="text-xs text-muted-foreground">
            {memberCount} {memberCount === 1 ? "member" : "members"}
          </p>
        </div>
      </div>
    </div>
  );
}
