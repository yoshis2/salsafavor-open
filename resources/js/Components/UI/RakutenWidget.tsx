import React from "react";

type RakutenWidgetProps = {
  /** 楽天ウィジェットのTS（タイムスタンプ/ID） */
  ts: string;
  /** ウィジェットの幅（デフォルト 300） */
  width?: string | number;
  /** ウィジェットの高さ（デフォルト 300） */
  height?: string | number;
  /** コンテナの追加クラス */
  className?: string;
};

/**
 * 楽天アフィリエイトウィジェットを表示するコンポーネント
 *
 * document.write を使用するレガシーなスクリプトを安全に読み込むため、
 * iframe の srcdoc を使用して隔離環境で実行します。
 */
const RakutenWidget: React.FC<RakutenWidgetProps> = ({ ts, width = 250, height = 250, className = "" }) => {
  // iframe 内で実行する HTML
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          var rakuten_design="slide";
          var rakuten_affiliateId="${import.meta.env.VITE_RAKUTEN_MOTION_ID || ""}";
          var rakuten_items="ctsmatch";
          var rakuten_genreId="0";
          var rakuten_size="${width}x${height}";
          var rakuten_target="_blank";
          var rakuten_theme="gray";
          var rakuten_border="off";
          var rakuten_auto_mode="on";
          var rakuten_genre_title="off";
          var rakuten_recommend="on";
          var rakuten_ts="${ts}";
        </script>
        <script type="text/javascript" src="https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js?20230106"></script>
      </body>
    </html>
  `;

  return (
    <div className={`rakuten-widget-container flex justify-center w-full ${className}`}>
      <iframe
        title="Rakuten Affiliate Widget"
        srcDoc={srcDoc}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        style={{ border: "none", overflow: "hidden" }}
      />
    </div>
  );
};

export default RakutenWidget;
