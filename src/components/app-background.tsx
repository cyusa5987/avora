// Light-mode gradient background. Hidden in dark mode via dark:hidden.
export function AppBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 dark:hidden"
      style={{
        background:
          'linear-gradient(to bottom, #aed8f0 0%, #c4e5f8 15%, #d9eefc 30%, #ebf6fd 48%, #f5faff 65%, #fbfdff 80%, #ffffff 93%)',
      }}
    />
  )
}
