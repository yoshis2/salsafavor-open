import MainLayout from "@/Layouts/MainLayout";
import Side from "../Beginner/Side";

export default function Withdraw() {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 lg:pr-6">
          <Side />
        </div>
        <article className="w-full lg:w-3/4">
          <h1 className="text-2xl font-bold mb-6">退会完了のお知らせ</h1>
          <p>退会完了しました。</p>
          <p>全ての情報を削除しました。もし機会がありましたら再度ご登録お願い致します。</p>
          <p>ありがとうございました。</p>
        </article>
      </div>
    </MainLayout>
  );
}
