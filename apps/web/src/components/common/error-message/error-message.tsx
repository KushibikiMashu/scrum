type Props = {
  message: string
}

export function ErrorMessage({message}: Props) {
  return (
    <p className="text-sm leading-6 text-red-600">{message}</p>
  )
}
