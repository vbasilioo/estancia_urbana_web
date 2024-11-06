import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema, LoginFormType } from "@/interfaces/User/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignInCredentials({ email, password }: LoginFormType) {
    toast.loading("Realizando autenticação...", { id: "sign-in" });

    const data = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (data && data.ok) {
      toast.success("Autenticação realizada com sucesso!", { id: "sign-in" });
      router.push("/dashboard");
    } else {
      toast.error("Erro ao realizar autenticação.", { id: "sign-in" });
    }
  }

  async function onSubmit(data: LoginFormType) {
    setIsSubmiting(true);
    await handleSignInCredentials({
      ...data,
    });
    setIsSubmiting(false);
  }

  return (
    <Card className="mx-auto max-w-sm dark:border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Estância Urbana</CardTitle>
        <CardDescription className="text-center">
          <p>Bem-vindo ao <span className="font-bold text-green-700">Estância Urbana</span>.</p>
          <Separator />
          Coloque seu e-mail e sua senha abaixo para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-0 focus:border-green-900 border-gray-300"
                        placeholder="vinicius.basilio@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="!mt-0 focus:border-green-900 border-gray-300"
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={isSubmiting} className="w-full bg-green-900 text-white font-bold" type="submit">
                Entrar
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
