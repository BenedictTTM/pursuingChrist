"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, InformationCircleIcon, Alert02Icon, MultiplicationSignCircleIcon, Loading03Icon } from "@hugeicons/core-free-icons"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4" />
        ),
        info: (
          <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-4" />
        ),
        warning: (
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4" />
        ),
        error: (
          <HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} className="size-4" />
        ),
        loading: (
          <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "rgba(18, 19, 26, 0.95)",
          "--normal-text": "#FFFFFF",
          "--normal-border": "rgba(197, 165, 118, 0.25)",
          "--border-radius": "12px",
          "backdropFilter": "blur(8px)",
          "boxShadow": "0 10px 30px rgba(0, 0, 0, 0.25), 0 0 1px 1px rgba(197, 165, 118, 0.1)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast border border-[#C5A576]/25 font-sans p-4",
          title: "text-[#FFFFFF] font-bold text-[13px] font-sans tracking-wide",
          description: "text-[#E3E4E6]/70 text-[11px] mt-1 font-sans",
          actionButton: "!bg-[#C5A576] !text-[#12131A] hover:!bg-[#DFCAA9] !font-bold !rounded-md !px-3 !py-1.5 !text-[10px] !uppercase !tracking-wider transition-all duration-300",
          cancelButton: "!bg-transparent !text-[#FFFFFF]/60 hover:!text-[#FFFFFF] hover:!bg-white/5 !border !border-white/10 hover:!border-white/20 !font-bold !rounded-md !px-3 !py-1.5 !text-[10px] !uppercase !tracking-wider transition-all duration-300",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
