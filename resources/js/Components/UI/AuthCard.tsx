// 認証フォーム用カードコンポーネント
import React, { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  children: ReactNode;
};

const AuthCard = ({ title, children }: AuthCardProps) => (
  <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md border mt-6">
    <div className="px-6 py-4 border-b bg-gray-50 rounded-t-lg text-center">
      <h2 className="text-base font-semibold">{title}</h2>
    </div>
    <div className="px-6 py-8">{children}</div>
  </div>
);

export default AuthCard;
