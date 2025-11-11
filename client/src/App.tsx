import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { STREAM_API_KEY, STREAM_OPTIONS } from "@/lib/stream-config";
import LoginPage from "@/pages/login";
import { ChatContainer } from "@/components/chat-container";
import { ConnectionStatus } from "@/components/connection-status";
import { ErrorBoundary } from "@/components/error-boundary";
import type { StreamUser } from "@shared/schema";
import "@/stream-chat-custom.css";

function App() {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, [client]);

  const handleLogin = async (user: StreamUser) => {
    setIsConnecting(true);
    try {
      // Initialize Stream Chat client
      const chatClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_OPTIONS);

      // Connect user with token
      await chatClient.connectUser(
        {
          id: user.userId,
          name: user.userName || user.userId,
        },
        user.userToken
      );

      setClient(chatClient);
    } catch (error) {
      console.error("Failed to connect user:", error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = async () => {
    if (client) {
      try {
        await client.disconnectUser();
        setClient(null);
      } catch (error) {
        console.error("Failed to disconnect user:", error);
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <ErrorBoundary>
            <div className="h-screen w-full overflow-hidden">
              {!client ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <>
                  <ConnectionStatus client={client} />
                  <ChatContainer client={client} onLogout={handleLogout} />
                </>
              )}
            </div>
            <Toaster />
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
