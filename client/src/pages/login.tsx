import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { streamUserSchema, type StreamUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, AlertCircle, Loader2 } from "lucide-react";

interface LoginPageProps {
  onLogin: (user: StreamUser) => Promise<void>;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<StreamUser>({
    resolver: zodResolver(streamUserSchema),
    defaultValues: {
      userId: "",
      userToken: "",
      userName: "",
    },
  });

  const handleSubmit = async (data: StreamUser) => {
    try {
      setError("");
      setIsLoading(true);
      await onLogin(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md" data-testid="card-login">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome to StreamChat</CardTitle>
          <CardDescription>
            Enter your Stream Chat credentials to start messaging
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="your-user-id"
                        disabled={isLoading}
                        data-testid="input-user-id"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Token</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your Stream user token"
                        disabled={isLoading}
                        data-testid="input-user-token"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your name"
                        disabled={isLoading}
                        data-testid="input-user-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect to Chat"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
