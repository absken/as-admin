import React from 'react';

function AppFooter() {
  const curYear = new Date().getFullYear();

  return (
    <div className="app-footer flex justify-center text-gray-500 text-sm py-2 px-4 border-t border-t-layout-border">
      <div>
        <span className="ms-1">&copy; {curYear} AbsenseSoft Corp. All rights reserved.</span>
      </div>
    </div>
  );
}

export default React.memo(AppFooter);
