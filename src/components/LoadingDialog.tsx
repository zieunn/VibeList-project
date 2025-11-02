
import React from 'react';

type Props = {
  message: string;
};

export default function LoadingDialog({ message }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="simple-card rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
        {/* 로딩 스피너 */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg">
          <span className="text-4xl animate-spin">⟳</span>
        </div>

        {/* 메시지 */}
        <h3 className="text-xl font-black text-[#EFDE9C] mb-2">
          {message}
        </h3>
        <p className="text-[#727272] text-sm">
          잠시만 기다려주세요...
        </p>

        {/* 로딩 바 */}
        <div className="mt-6 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
