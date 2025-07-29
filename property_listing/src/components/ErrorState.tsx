export const ErrorState = ({ message }: { message?: string }) => {
  return (
    <div className="w-full h-full backdrop-blur-[2px] backdrop-brightness-85">
      {message ?? 'An error occured'}
    </div>
  )
}
