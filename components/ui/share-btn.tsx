import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsDesktop } from "@/utils/hooks";

const externalOpen = (URL: string) => window.open(URL, "_blank", "noopener");

type TShareBtnProps = {
  url: string;
  text: string;
  title: string;
};

type TShareBtnGroup = {
  text: string;
  icon: React.ReactNode;
  onClick: (data: TShareBtnProps) => void;
};

const SVG = ({ children }: { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {children}
  </svg>
);

const shareBtnGroup = [
  {
    text: "Twitter",
    icon: (
      <SVG>
        <title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </SVG>
    ),
    onClick: (data: TShareBtnProps) => {
      externalOpen(
        `https://twitter.com/intent/tweet?text=${data.text}&url=${data.url}`
      );
    },
  },
  {
    text: "Facebook",
    icon: (
      <SVG>
        <title>Facebook</title>
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </SVG>
    ),
    onClick: (data: TShareBtnProps) =>
      externalOpen(`https://www.facebook.com/sharer/sharer.php?u=${data.url}`),
  },
  {
    text: "Reddit",
    icon: (
      <SVG>
        <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
      </SVG>
    ),
    onClick: (data: TShareBtnProps) =>
      externalOpen(
        `https://www.reddit.com/submit?url=${data.url}&title=${data.text}`
      ),
  },
  {
    text: "Telegram",
    icon: (
      <SVG>
        <title>Telegram</title>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </SVG>
    ),
    onClick: (data: TShareBtnProps) =>
      externalOpen(
        `https://telegram.me/share/msg?url=${data.url}&text=${data.text}`
      ),
  },
  {
    text: "Email",
    icon: (
      <SVG>
        <path
          fillRule="evenodd"
          d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
          clipRule="evenodd"
        />
      </SVG>
    ),
    onClick: (data: TShareBtnProps) =>
      externalOpen(`mailto:?body=${data.url}&subject=${data.text}`),
  },
  {
    text: "Copy Link",
    icon: (
      <SVG>
        <path
          fillRule="evenodd"
          d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
          clipRule="evenodd"
        />
      </SVG>
    ),
    onClick: (data: TShareBtnProps) =>
      navigator.clipboard.writeText(
        `${decodeURIComponent(data.text)}\n${data.url}`
      ),
  },
];

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
  return (
    <div>
      {navigator.share !== undefined || !isDesktop ? (
        <button
          onClick={handleShare}
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
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 text-xl font-medium bg-indigo-900 text-indigo-200 rounded-md flex items-center justify-center gap-2 pr-5 focus:outline-none">
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Share via</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {shareBtnGroup.map((item, index) => (
              <DropdownMenuItem key={index}>
                <button
                  onClick={() =>
                    item.onClick({
                      title: encodeURIComponent(title),
                      text: encodeURIComponent(text),
                      url,
                    })
                  }
                  className="w-full h-full text-sm font-medium text-zinc-200 rounded-md flex items-center justify-between gap-2 focus:outline-none"
                >
                  {item.text}
                  {item.icon}
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ShareBtn;
