import React from "react";
import { useIsDesktop } from "@/utils/hooks";
import { toast } from "sonner";

type TShareBtnProps = {
  url: string;
  text: string;
  title: string;
};

const ShareBtn = ({ url, text, title }: TShareBtnProps) => {
  const shareDetails = { title, text, url };
  const isDesktop = useIsDesktop();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share(shareDetails)
          .then(() => console.log("Successfully shared!"));
      } catch (error) {
        console.log(`Couldn't share content: ${error}`);
      }
    } else {
      console.log("Web Share API not supported");
    }
  };

  const handleCopy = () => {
    const data = shareDetails;
    navigator.clipboard
      .writeText(`${decodeURIComponent(data.text)}\n${data.url}`)
      .then(() => toast.success("Copied results to clipboard!"));
  };
  return (
    <div>
      <button
        onClick={
          navigator.share !== undefined && !isDesktop
            ? () => handleShare()
            : () => handleCopy()
        }
        className="px-4 py-2 text-xl font-medium bg-indigo-900 text-indigo-200 rounded-md flex items-center justify-center gap-2 pr-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-indigo-300"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"></path>
        </svg>
        Share Score
      </button>
    </div>
  );
};

export default ShareBtn;
