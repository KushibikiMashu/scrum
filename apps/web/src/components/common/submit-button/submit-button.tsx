import {ButtonHTMLAttributes} from "react";

type Props = {
  label: string
  pending: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function SubmitButton({label, pending = undefined, type = "button", ...props}: Props) {
  return (
    <button
      className="text-xs border border-gray-300 hover:bg-gray-50 rounded-md px-3 py-2"
      aria-disabled={pending}
      disabled={pending}
      type={type}
      {...props}
    >
      {label}
    </button>
  )
}
