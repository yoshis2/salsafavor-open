// MobileHeader.tsx
import React from "react";

const MobileHeader: React.FC<{ onToggleSearch?: () => void }> = ({ onToggleSearch }) => {
  return (
    <div>
      <div className="menu">
        <div className="float-left p-3">
          <h2>検索条件</h2>
        </div>
        <div className="float-right p-25">
          <button
            className="btn btn-primary"
            onClick={onToggleSearch}
            aria-expanded="false"
            aria-controls="collapseSearch"
            type="button"
          >
            検索表示
          </button>
        </div>
      </div>
      <p></p>
    </div>
  );
};

export default MobileHeader;
