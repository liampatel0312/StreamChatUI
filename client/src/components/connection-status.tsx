import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff, Wifi } from "lucide-react";

interface ConnectionStatusProps {
  client: StreamChat;
}

export function ConnectionStatus({ client }: ConnectionStatusProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    const handleConnectionChange = (event: any) => {
      const online = event.online === true;
      setIsOnline(online);
      
      if (!online) {
        setShowOffline(true);
      } else {
        // Hide the banner after a brief delay when back online
        setTimeout(() => setShowOffline(false), 2000);
      }
    };

    client.on("connection.changed", handleConnectionChange);

    return () => {
      client.off("connection.changed", handleConnectionChange);
    };
  }, [client]);

  if (!showOffline && isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Alert
        variant={isOnline ? "default" : "destructive"}
        className="rounded-none border-x-0 border-t-0"
        data-testid={isOnline ? "alert-reconnected" : "alert-offline"}
      >
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <AlertDescription>Reconnected to chat</AlertDescription>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              Connection lost. Attempting to reconnect...
            </AlertDescription>
          </>
        )}
      </Alert>
    </div>
  );
}
