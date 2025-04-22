import * as React from "react"

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`${className || ""}`}
    {...props}
  />
))
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex rounded-md bg-muted p-1 ${className || ""}`}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string
  }
>(({ className, value, ...props }, ref) => (
  <button
    ref={ref}
    data-state={props["aria-selected"] ? "active" : "inactive"}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className || ""}`}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
  }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const selected = context?.value === value

  if (!selected && !context?.unmount) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      data-state={selected ? "active" : "inactive"}
      className={`ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ""}`}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

// Create a simple tabs context to manage state
interface TabsContextValue {
  value: string
  onChange: (value: string) => void
  unmount?: boolean
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

// Add additional props for the Tab component to handle value and onChange
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  unmount?: boolean
}

const TabsWithContext = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, unmount = true, children, ...props }, ref) => {
    const [tabValue, setTabValue] = React.useState(value || defaultValue || "")

    React.useEffect(() => {
      if (value !== undefined) {
        setTabValue(value)
      }
    }, [value])

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setTabValue(newValue)
        onValueChange?.(newValue)
      },
      [onValueChange]
    )

    return (
      <TabsContext.Provider
        value={{
          value: tabValue,
          onChange: handleValueChange,
          unmount
        }}
      >
        <Tabs ref={ref} {...props}>
          {children}
        </Tabs>
      </TabsContext.Provider>
    )
  }
)
TabsWithContext.displayName = "Tabs"

// Modify TabsTrigger to use context
const TabsTriggerWithContext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string
  }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const selected = context?.value === value

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={selected}
      data-state={selected ? "active" : "inactive"}
      onClick={() => context?.onChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className || ""}`}
      {...props}
    />
  )
})
TabsTriggerWithContext.displayName = "TabsTrigger"

export {
  TabsWithContext as Tabs,
  TabsList,
  TabsTriggerWithContext as TabsTrigger,
  TabsContent
} 