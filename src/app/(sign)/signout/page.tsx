import { Button } from "~/app/_components/ui/button";
import { signOut } from "~/server/auth";

export default function SignOut() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        className="flex w-[400px] flex-col gap-4 rounded-2xl bg-gray-900 p-8"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <div className="">是否确定退出？</div>
        <Button type="submit">退出登录</Button>
      </form>
    </div>
  );
}
