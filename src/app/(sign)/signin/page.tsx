import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { signIn } from "~/server/auth";

const SIGNIN_ERROR_URL = "/error";
const VERIFY_EMAIL_URL = "/verify"; // 邮件发送成功重定向地址

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        className="flex w-[400px] flex-col gap-4 rounded-2xl bg-gray-900 p-8"
        action={async (formData) => {
          "use server";
          try {
            await signIn("nodemailer", {
              email: formData.get("email"),
              redirect: false,
            });
            return redirect(VERIFY_EMAIL_URL);
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <div className="text-center text-2xl">登录</div>
        <Label htmlFor="email">邮箱</Label>
        <Input name="email" type="email" id="email" required />
        <Button type="submit">使用邮箱登录</Button>
      </form>
    </div>
  );
}
