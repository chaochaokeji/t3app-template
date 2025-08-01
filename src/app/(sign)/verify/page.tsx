import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-[400px] flex-col gap-4 rounded-2xl bg-gray-900 p-8">
        <div className="">验证邮件已发送！</div>
        <div className="">请通过邮件内链接进行登录。</div>
        <Link href={"/"}>
          <div className="text-center">返回首页</div>
        </Link>
      </div>
    </div>
  );
}
