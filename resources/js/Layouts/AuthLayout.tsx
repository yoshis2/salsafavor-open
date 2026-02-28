// 認証用レイアウト: Beginnerページと同じ見た目に合わせる
import React, { ReactNode } from "react";
import MainLayout from "./MainLayout";

type AuthLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  showTitle?: boolean;
  useWrapper?: boolean;
};

const AuthLayout = ({ title, description, children, showTitle = true, useWrapper = true }: AuthLayoutProps) => {
  if (!useWrapper) {
    return (
      <MainLayout title={title} description={description}>
        {children}
      </MainLayout>
    );
  }

  return (
    <MainLayout title={title} description={description}>
      <div className="w-full px-3 lg:px-0 lg:col-span-12 lg:grid lg:grid-cols-10 lg:gap-6">
        <article className="w-full lg:order-1 lg:col-span-7">
          {showTitle && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
          {children}
        </article>
      </div>
    </MainLayout>
  );
};

export default AuthLayout;
