type Props = {
  messages: string[] | null | undefined
}

export function ErrorMessage({ messages }: Props) {
  if (messages === null || messages === undefined || messages.length === 0) {
    return null
  }

  return (
    <ol className="my-1">
      {messages.map((message: string) => (
        <li className="text-sm leading-6 text-red-600" key={message}>
          {message}
        </li>
      ))}
    </ol>
  )
}
