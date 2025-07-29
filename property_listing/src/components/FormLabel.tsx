export const FormLabel = ({
  htmlFor,
  children,
}: {
  htmlFor?: string
  children: React.ReactNode
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-medium mb-1 text-gray-700 dark:text-gray-500"
    >
      {children}
    </label>
  )
}
