export default function AnimatedBlob() {
  return (
    <>
      <style>{`
        @keyframes blob-float {
          0%   { transform: translate3d(0px,  0px,  0) scale(1);    }
          33%  { transform: translate3d(30px, -40px, 0) scale(1.08); }
          66%  { transform: translate3d(-25px, 20px, 0) scale(0.95); }
          100% { transform: translate3d(0px,  0px,  0) scale(1);    }
        }
        @keyframes blob-float-centered {
          0%,100% { transform: translate3d(-50%, -25%, 0) scale(1);    }
          25%     { transform: translate3d(-70%,   0%, 0) scale(1.08); }
          50%     { transform: translate3d(-40%,  25%, 0) scale(0.95); }
          75%     { transform: translate3d(-60%,  10%, 0) scale(1.04); }
        }
      `}</style>

      <div
        className="absolute top-1/4 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#F6F4F1] via-[#027094] to-[#1C5364] opacity-20 blur-3xl"
        style={{ animation: 'blob-float 6s cubic-bezier(0.65,0,0.35,1) infinite' }}
      />
      <div
        className="absolute bottom-1/4 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#FF5A1F] via-[#F6F4F1] to-[#027094] opacity-20 blur-3xl"
        style={{ animation: 'blob-float 6s cubic-bezier(0.65,0,0.35,1) infinite', animationDelay: '4s' }}
      />
      <div
        className="absolute -z-10 top-1/4 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#F6F4F1] via-[#FF5A1F] to-[#1C5364] opacity-40 blur-3xl"
        style={{ animation: 'blob-float-centered 9s cubic-bezier(0.65,0,0.35,1) infinite' }}
      />
    </>
  );
}